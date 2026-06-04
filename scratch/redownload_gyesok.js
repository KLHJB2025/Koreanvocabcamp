const fs = require('fs');
const path = require('path');
const https = require('https');

const dest = path.join(__dirname, '../public/illustrations/words/계속.jpg');
const prompt = 'cute friendly cartoon illustration of a focused child sitting at a desk studying under a desk lamp, with a stack of books and an hourglass or clock beside them to represent continuous and ongoing study, soft bright colors, vector graphics style, without any text, letters, words, or Korean characters in the image';

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Status: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(destPath);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
            file.on('error', (err) => {
                fs.unlink(destPath, () => reject(err));
            });
        });
        
        request.on('error', (err) => {
            reject(err);
        });

        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function run() {
    const models = ['flux', 'sana', 'default'];
    let success = false;
    
    console.log(`Downloading new illustration for "계속"...`);

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
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    if (!success) {
        console.error(`ERROR: All models failed for "계속".`);
        process.exit(1);
    }
}

run().catch(console.error);
