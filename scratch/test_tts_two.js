const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const sentence = "간단히 설명해 주세요.";
    const tempDir = './scratch';
    
    console.log("Generating TTS for sentence:", sentence);
    const res = await tts.toFile(tempDir, sentence);
    const size = fs.statSync(res.audioFilePath).size;
    console.log("Generated file size:", size);
}

run().catch(console.error);
