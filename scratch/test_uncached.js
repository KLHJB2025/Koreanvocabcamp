const https = require('https');

const prompt = `realistic photography of a purple cat eating a yellow banana on Mars at ${Date.now()}`;

function fetchWithModel(prompt, model) {
    return new Promise((resolve) => {
        const start = Date.now();
        const modelParam = model ? `&model=${model}` : '';
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=400&nologo=true${modelParam}`;
        
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk.toString('binary'));
            res.on('end', () => {
                const duration = Date.now() - start;
                console.log(`Model: ${model || 'default'} | Status: ${res.statusCode} | Time: ${duration}ms | Body length: ${body.length}`);
                resolve(duration);
            });
        }).on('error', (err) => {
            console.log(`Model: ${model || 'default'} | Error: ${err.message}`);
            resolve(null);
        });
    });
}

async function run() {
    console.log(`Testing uncached prompt: "${prompt}"`);
    console.log('\n--- Testing Turbo model ---');
    await fetchWithModel(prompt, 'turbo');
    console.log('\n--- Testing Sana model ---');
    await fetchWithModel(prompt, 'sana');
}

run();
