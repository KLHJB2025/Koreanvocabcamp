const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const resultsFile = path.join(__dirname, 'rewritten_sentences_results.json');
if (!fs.existsSync(resultsFile)) {
    console.error("Results file does not exist! Please run batch_rewrite_sentences.js first.");
    process.exit(1);
}

const rewrittenResults = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
console.log(`Loaded ${rewrittenResults.length} sentences to regenerate audio for.`);

const sentencesDir = path.join(__dirname, '../public/audio/sentences');
if (!fs.existsSync(sentencesDir)) {
    fs.mkdirSync(sentencesDir, { recursive: true });
}

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    let count = 0;
    for (const item of rewrittenResults) {
        count++;
        const safeName = item.word.replace(/[<>:"/\\|?*]/g, '');
        const sentenceFile = path.join(sentencesDir, `${safeName}.mp3`);
        
        console.log(`[${count}/${rewrittenResults.length}] TTS for "${item.word}": "${item.sentenceKr}"`);
        
        try {
            // Generate to temp file in scratch
            const res = await tts.toFile(__dirname, item.sentenceKr);
            
            // Overwrite existing sentence audio file
            fs.copyFileSync(res.audioFilePath, sentenceFile);
            fs.unlinkSync(res.audioFilePath);
            
            // Brief pause to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (e) {
            console.error(`  Failed for "${item.word}": ${e.message}`);
        }
    }
    
    console.log("All rewritten sentence audios regenerated successfully!");
}

run().catch(console.error);
