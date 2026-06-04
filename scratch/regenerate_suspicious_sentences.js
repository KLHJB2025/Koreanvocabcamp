const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
const MOCK_VOCABULARY = eval('(' + match[2] + ')');

const wordsDir = 'public/audio/words';
const sentencesDir = 'public/audio/sentences';

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const suspicious = [];

    for (const cycle in MOCK_VOCABULARY) {
        for (const word of MOCK_VOCABULARY[cycle]) {
            if (!word.sentenceKr) continue;
            const safeName = word.kr.replace(/[<>:"/\\|?*]/g, '');
            const wordFile = path.join(wordsDir, `${safeName}.mp3`);
            const sentenceFile = path.join(sentencesDir, `${safeName}.mp3`);

            if (fs.existsSync(wordFile) && fs.existsSync(sentenceFile)) {
                const wordSize = fs.statSync(wordFile).size;
                const sentenceSize = fs.statSync(sentenceFile).size;
                const diffPercent = Math.abs(sentenceSize - wordSize) / wordSize;
                
                const wordLen = word.kr.length;
                const sentenceLen = word.sentenceKr.length;

                // Suspicious criteria:
                // 1. Sentence is longer by at least 3 chars, but size is within 20% of word audio
                // 2. Or sentence file size is extremely small (< 13500 bytes) while sentence is long (> 8 chars)
                const isTooClose = (sentenceLen > wordLen + 2) && (diffPercent < 0.20);
                const isTooSmall = (sentenceLen > 8) && (sentenceSize < 14000);

                if (isTooClose || isTooSmall) {
                    suspicious.push({
                        word: word.kr,
                        sentence: word.sentenceKr,
                        wordSize,
                        sentenceSize,
                        sentenceFile
                    });
                }
            } else if (!fs.existsSync(sentenceFile)) {
                // If sentence file doesn't exist, we should generate it too
                suspicious.push({
                    word: word.kr,
                    sentence: word.sentenceKr,
                    wordSize: 0,
                    sentenceSize: 0,
                    sentenceFile
                });
            }
        }
    }

    console.log(`Found ${suspicious.length} suspicious or missing sentence audios.`);
    
    // Regenerate them serially
    let count = 0;
    for (const item of suspicious) {
        console.log(`[${++count}/${suspicious.length}] Regenerating: "${item.sentence}" for word "${item.word}"`);
        try {
            // Generate to temp file in scratch
            const res = await tts.toFile('./scratch', item.sentence);
            const newSize = fs.statSync(res.audioFilePath).size;
            
            // Move to destination
            fs.copyFileSync(res.audioFilePath, item.sentenceFile);
            fs.unlinkSync(res.audioFilePath);
            
            console.log(`    Success: Size went from ${item.sentenceSize} to ${newSize} bytes`);
            
            // Brief pause to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (e) {
            console.error(`    Failed to regenerate for "${item.word}": ${e.message}`);
        }
    }
    
    console.log("All suspicious sentence audios regenerated!");
}

run().catch(console.error);
