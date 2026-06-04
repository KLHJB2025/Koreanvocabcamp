const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
const MOCK_VOCABULARY = eval('(' + match[2] + ')');

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const sentencesDir = 'public/audio/sentences';
    let count = 0;
    let mismatchCount = 0;
    
    // Pick 30 words with sentences to test
    const allWords = [];
    for (const cycle in MOCK_VOCABULARY) {
        for (const word of MOCK_VOCABULARY[cycle]) {
            if (word.sentenceKr) {
                allWords.push(word);
            }
        }
    }
    
    const sample = allWords.slice(100, 130);
    
    for (const word of sample) {
        const safeName = word.kr.replace(/[<>:"/\\|?*]/g, '');
        const existingPath = path.join(sentencesDir, `${safeName}.mp3`);
        if (!fs.existsSync(existingPath)) continue;
        
        const existingSize = fs.statSync(existingPath).size;
        
        // Generate TTS
        const res = await tts.toFile('./scratch', word.sentenceKr);
        const newSize = fs.statSync(res.audioFilePath).size;
        fs.unlinkSync(res.audioFilePath);
        
        const match = existingSize === newSize;
        if (!match) mismatchCount++;
        console.log(`Word: "${word.kr}", Sentence: "${word.sentenceKr}"`);
        console.log(`    Existing size: ${existingSize}, New size: ${newSize}, Match: ${match}`);
    }
    
    console.log(`Checked ${sample.length} files. Mismatches: ${mismatchCount}`);
}

run().catch(console.error);
