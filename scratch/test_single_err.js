const https = require('https');

const url = 'https://image.pollinations.ai/prompt/realistic%20photography%20of%20to%20close%20(eyes)%20%2F%20to%20wash%20(hair)?width=400&height=400&nologo=true';

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

https.get(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    let body = '';
    res.on('data', chunk => body += chunk.toString('binary'));
    res.on('end', () => {
        console.log('Body length:', body.length);
        if (res.statusCode !== 200) {
            console.log('Error Body:', body.substring(0, 500));
        }
    });
}).on('error', console.error);
