const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');

async function test() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    console.log("Generating word '급하다'...");
    const resWord = await tts.toFile('./scratch', '급하다');
    const sizeWord = fs.statSync(resWord.audioFilePath).size;
    console.log("Size for word:", sizeWord);
    fs.unlinkSync(resWord.audioFilePath);
    
    console.log("Generating sentence '사정이 급해요.'...");
    const resSent = await tts.toFile('./scratch', '사정이 급해요.');
    const sizeSent = fs.statSync(resSent.audioFilePath).size;
    console.log("Size for sentence:", sizeSent);
    fs.unlinkSync(resSent.audioFilePath);
}

test().catch(console.error);
