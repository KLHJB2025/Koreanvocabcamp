const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync(path.join(__dirname, '../src/lib/vocabulary-data.ts'), 'utf-8');
const match = tsData.match(/(?:export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
const MOCK_VOCABULARY = eval('(' + match[1] + ')');

const tts = new MsEdgeTTS();

async function run() {
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const wordsDir = path.join(__dirname, '../public/audio/words');
    const sentencesDir = path.join(__dirname, '../public/audio/sentences');
    if (!fs.existsSync(wordsDir)) fs.mkdirSync(wordsDir, { recursive: true });
    if (!fs.existsSync(sentencesDir)) fs.mkdirSync(sentencesDir, { recursive: true });

    let count = 0;
    
    // Process serially to avoid rate limits
    for (const cycleKey of Object.keys(MOCK_VOCABULARY)) {
        for (const word of MOCK_VOCABULARY[cycleKey]) {
            const kr = word.kr;
            // Clean filename by removing unsafe characters
            const safeName = kr.replace(/[<>:"/\\|?*]/g, '');
            const wordPath = path.join(wordsDir, `${safeName}.mp3`);
            
            if (!fs.existsSync(wordPath)) {
                try {
                    const res = await tts.toFile(wordsDir, kr);
                    let retries = 5;
                    while (retries > 0) {
                        try {
                            fs.renameSync(res.audioFilePath, wordPath);
                            break;
                        } catch (e) {
                            if (e.code === 'EBUSY') {
                                await new Promise(resolve => setTimeout(resolve, 100));
                                retries--;
                            } else {
                                throw e;
                            }
                        }
                    }
                } catch(e) {
                    console.error(`Failed word ${kr}: ${e}`);
                }
            }
            
            if (word.sentenceKr) {
                const sentencePath = path.join(sentencesDir, `${safeName}.mp3`);
                if (!fs.existsSync(sentencePath)) {
                    try {
                        const res = await tts.toFile(sentencesDir, word.sentenceKr);
                        let retries = 5;
                        while (retries > 0) {
                            try {
                                fs.renameSync(res.audioFilePath, sentencePath);
                                break;
                            } catch (e) {
                                if (e.code === 'EBUSY') {
                                    await new Promise(resolve => setTimeout(resolve, 100));
                                    retries--;
                                } else {
                                    throw e;
                                }
                            }
                        }
                    } catch(e) {
                        console.error(`Failed sentence ${kr}: ${e}`);
                    }
                }
            }
            count++;
            if (count % 50 === 0) console.log(`Processed ${count} items...`);
        }
    }
    console.log("ALL TTS GENERATION COMPLETE!");
}

run().catch(console.error);
