const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Status: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
            file.on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
        });
        request.on('error', reject);
        request.setTimeout(10000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function run() {
    const testWords = ['사과', '바나나', '포도', '딸기', '수박', '오렌지', '레몬', '복숭아', '체리', '토마토', '오이', '당근', '양파', '마늘', '감자'];
    const outputDir = path.join(__dirname, 'test_images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Starting test download of ${testWords.length} images...`);
    let success = 0;
    for (let i = 0; i < testWords.length; i++) {
        const word = testWords[i];
        const url = `https://image.pollinations.ai/prompt/realistic%20photography%20of%20${encodeURIComponent(word)}?width=400&height=400&nologo=true`;
        const dest = path.join(outputDir, `${word}.jpg`);
        
        console.log(`[${i+1}/${testWords.length}] Fetching ${word}...`);
        try {
            await downloadImage(url, dest);
            success++;
            console.log(`[${i+1}/${testWords.length}] SUCCESS: Saved ${word}.jpg`);
        } catch (err) {
            console.error(`[${i+1}/${testWords.length}] FAILED: ${err.message}`);
        }
        
        // Wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`Test finished. Success: ${success}/${testWords.length}`);
    // clean up
    testWords.forEach(w => {
        const p = path.join(outputDir, `${w}.jpg`);
        if (fs.existsSync(p)) fs.unlinkSync(p);
    });
    fs.rmdirSync(outputDir);
}

run().catch(console.error);
