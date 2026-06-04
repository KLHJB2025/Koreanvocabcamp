const https = require('https');

const prompts = [
    'realistic photography of High school',
    'realistic photography of library',
    'realistic photography of supermarket'
];

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
    console.log('Testing speed of different models...');
    for (let i = 0; i < prompts.length; i++) {
        console.log(`\n--- Round ${i+1}: ${prompts[i]} ---`);
        await fetchWithModel(prompts[i], null); // Default (Flux)
        await fetchWithModel(prompts[i], 'sana');
        await fetchWithModel(prompts[i], 'turbo');
        // Wait a bit
        await new Promise(r => setTimeout(r, 1000));
    }
}

run();
