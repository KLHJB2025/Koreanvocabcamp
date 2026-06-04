const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/illustrations/words');
const dest = path.join(outputDir, '가지.jpg');

const prompt = 'cute friendly cartoon illustration of a colorful selection of various kinds of fruits, including apples, bananas, grapes, and oranges, arranged nicely, soft bright colors, vector graphics style, without any text, letters, words, or Korean characters in the image';

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
        
        request.on('error', (err) => {
            reject(err);
        });

        request.setTimeout(35000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function run() {
    const models = ['default', 'flux', 'sana'];
    let success = false;
    
    console.log(`Retrying illustration download for "가지"...`);
    
    for (const model of models) {
        if (success) break;
        
        let modelParam = model === 'default' ? '' : `&model=${model}`;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=400&nologo=true${modelParam}`;
        
        console.log(`Trying with model: ${model}...`);
        try {
            await downloadImage(url, dest);
            console.log(`SUCCESS with model "${model}": Saved to ${dest}`);
            success = true;
        } catch (e) {
            console.warn(`FAILED with model "${model}": ${e.message}`);
            // Wait 3 seconds before retrying next model
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    if (!success) {
        // Retry one more time with default model with a cache buster
        console.log(`Trying one final fallback with default model and cache buster...`);
        const cb = Date.now();
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=400&nologo=true&seed=${cb}`;
        try {
            await downloadImage(url, dest);
            console.log(`SUCCESS with fallback: Saved to ${dest}`);
            success = true;
        } catch (e) {
            console.error(`ALL RETRIES FAILED: ${e.message}`);
        }
    }
}

run().catch(console.error);
