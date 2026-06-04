const https = require('https');
const fs = require('fs');
const path = require('path');

const testWords = [
    { kr: '고등학교', en: 'High school' },
    { kr: '고등학생', en: 'high school student' },
    { kr: '거실', en: 'Living room' }
];

function downloadImage(url, dest, headers = {}) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: headers
        };
        https.get(options, (res) => {
            if (res.statusCode !== 200) {
                let body = '';
                res.on('data', chunk => body += chunk.toString('binary'));
                res.on('end', () => {
                    reject(new Error(`Status: ${res.statusCode}, Body: ${body.substring(0, 300)}`));
                });
            } else {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
                file.on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            }
        }).on('error', reject);
    });
}

async function run() {
    const outputDir = path.join(__dirname, 'test_seq_out');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('--- TEST 1: Default url format, no headers ---');
    for (const word of testWords) {
        const url = `https://image.pollinations.ai/prompt/realistic%20photography%20of%20${encodeURIComponent(word.en)}?width=400&height=400&nologo=true`;
        const dest = path.join(outputDir, `${word.kr}_test1.jpg`);
        try {
            console.log(`Downloading ${word.kr}...`);
            await downloadImage(url, dest, {});
            console.log(`Success ${word.kr}`);
        } catch (err) {
            console.log(`Failed ${word.kr}: ${err.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('--- TEST 2: Default url format, with model=sana, no headers ---');
    for (const word of testWords) {
        const url = `https://image.pollinations.ai/prompt/realistic%20photography%20of%20${encodeURIComponent(word.en)}?width=400&height=400&nologo=true&model=sana`;
        const dest = path.join(outputDir, `${word.kr}_test2.jpg`);
        try {
            console.log(`Downloading ${word.kr}...`);
            await downloadImage(url, dest, {});
            console.log(`Success ${word.kr}`);
        } catch (err) {
            console.log(`Failed ${word.kr}: ${err.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // clean up
    fs.readdirSync(outputDir).forEach(file => {
        fs.unlinkSync(path.join(outputDir, file));
    });
    fs.rmdirSync(outputDir);
}

run();
