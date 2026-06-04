const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const sentence = "마음에 드는 선물을 고르세요.";
    const tempDir = './scratch';
    
    console.log("Generating TTS for sentence:", sentence);
    const res = await tts.toFile(tempDir, sentence);
    const size = fs.statSync(res.audioFilePath).size;
    console.log("Generated file path:", res.audioFilePath);
    console.log("Generated file size:", size);
    
    // overwrite the sentence file
    const dest = 'public/audio/sentences/고르다.mp3';
    fs.copyFileSync(res.audioFilePath, dest);
    console.log("Copied to", dest, "new size:", fs.statSync(dest).size);
}

run().catch(console.error);
