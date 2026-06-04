const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const crypto = require('crypto');

async function test() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("ko-KR-SunHiNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const resWord = await tts.toFile('./scratch', '급하다');
    const bytesWord = fs.readFileSync(resWord.audioFilePath);
    const hashWord = crypto.createHash('md5').update(bytesWord).digest('hex');
    fs.unlinkSync(resWord.audioFilePath);
    
    const resSent = await tts.toFile('./scratch', '사정이 급해요.');
    const bytesSent = fs.readFileSync(resSent.audioFilePath);
    const hashSent = crypto.createHash('md5').update(bytesSent).digest('hex');
    fs.unlinkSync(resSent.audioFilePath);
    
    console.log("MD5 for word:", hashWord);
    console.log("MD5 for sentence:", hashSent);
    console.log("Are they identical?", hashWord === hashSent);
}

test().catch(console.error);
