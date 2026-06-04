const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/illustrations/words');
if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
console.log(`Auditing ${files.length} illustration files for integrity...`);

let corrupted = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    
    if (buffer.length < 100) {
        console.error(`Corrupted: ${file} is too small (${buffer.length} bytes)`);
        corrupted++;
        return;
    }
    
    // Check JPG magic bytes: FF D8 FF
    if (file.endsWith('.jpg')) {
        if (buffer[0] !== 0xFF || buffer[1] !== 0xD8 || buffer[2] !== 0xFF) {
            console.error(`Corrupted: ${file} does not have valid JPEG headers`);
            corrupted++;
        }
    }
    
    // Check PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
    if (file.endsWith('.png')) {
        if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
            console.error(`Corrupted: ${file} does not have valid PNG headers`);
            corrupted++;
        }
    }
});

console.log(`Auditing complete. Corrupted files: ${corrupted}`);
