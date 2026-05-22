const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const path = require('path');
const fs = require('fs');

async function run() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const outputDir = path.join(__dirname, '../public');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    
    const text = "안녕하세요. 저는 엣지 뉴럴 TTS입니다. 발음이 훨씬 자연스럽죠? 가게에 갑니다. 가격이 비싸요.";
    
    console.log("Generating TTS...");
    const res = await tts.toFile(outputDir, text);
    const generatedFile = res.audioFilePath;
    const finalFile = path.join(outputDir, 'test_voice.mp3');
    fs.renameSync(generatedFile, finalFile);
    console.log("TTS Generation complete:", finalFile);
}

run().catch(console.error);
