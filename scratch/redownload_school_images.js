const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/illustrations/words');

const images = [
    {
        name: '고등학교',
        prompt: 'cute friendly cartoon illustration of a modern high school building exterior, trees and bright blue sky, soft bright colors, vector graphics style, without any text, letters, words'
    },
    {
        name: '고등학생',
        prompt: 'cute friendly cartoon illustration of a happy high school student with a backpack holding books, soft bright colors, vector graphics style, without any text, letters, words'
    },
    {
        name: '경찰서',
        prompt: 'cute friendly cartoon illustration of a police station building exterior, a police car parked outside, blue police sign badge emblem, soft bright colors, vector graphics style, without any text, letters, words'
    }
];

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

        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function run() {
    for (const img of images) {
        // We will try multiple models: first flux, then sana, then default
        const models = ['flux', 'sana', 'default'];
        let success = false;
        
        const dest = path.join(outputDir, `${img.name}.jpg`);
        console.log(`Downloading new illustration for "${img.name}"...`);

        for (const model of models) {
            if (success) break;
            
            let modelParam = model === 'default' ? '' : `&model=${model}`;
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(img.prompt)}?width=400&height=400&nologo=true${modelParam}`;
            
            console.log(`  Trying with model: ${model}...`);
            try {
                await downloadImage(url, dest);
                console.log(`  SUCCESS with model "${model}": Saved to ${dest}`);
                success = true;
            } catch (e) {
                console.warn(`  FAILED with model "${model}": ${e.message}`);
                // Wait 2 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        
        if (!success) {
            console.error(`  ERROR: All models failed for "${img.name}".`);
        }
    }
}

run().catch(console.error);
