const https = require('https');

const url = 'https://image.pollinations.ai/prompt/realistic%20photography%20of%20to%20close%20(eyes)%20%2F%20to%20wash%20(hair)?width=400&height=400&nologo=true';

function test(name, headers) {
    return new Promise((resolve) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: headers
        };
        https.get(options, (res) => {
            console.log(`${name}: Status = ${res.statusCode}`);
            resolve();
        }).on('error', (err) => {
            console.log(`${name}: Error = ${err.message}`);
            resolve();
        });
    });
}

async function run() {
    await test('1. No headers', {});
    await test('2. Only User-Agent', {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    await test('3. Only Referer', {
        'Referer': 'https://pollinations.ai/'
    });
    await test('4. UA + Referer', {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://pollinations.ai/'
    });
    await test('5. UA + Accept + Referer', {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://pollinations.ai/'
    });
}

run();
