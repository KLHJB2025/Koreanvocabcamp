const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://pollinations.ai/'
            }
        };

        const request = https.get(options, (response) => {
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
        request.setTimeout(15000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function run() {
    const testWords = ['grape', 'strawberry', 'watermelon', 'orange', 'lemon', 'peach', 'cherry', 'tomato', 'cucumber', 'carrot'];
    const outputDir = path.join(__dirname, 'test_images_english');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Starting English prompt test download of ${testWords.length} images...`);
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
        
        // Wait 1.5 seconds between requests
        console.log('Waiting 1.5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log(`Test finished. Success: ${success}/${testWords.length}`);
    
    // clean up
    testWords.forEach(w => {
        const p = path.join(outputDir, `${w}.jpg`);
        if (fs.existsSync(p)) fs.unlinkSync(p);
    });
    if (fs.existsSync(outputDir)) {
        fs.rmdirSync(outputDir);
    }
}

run().catch(console.error);
