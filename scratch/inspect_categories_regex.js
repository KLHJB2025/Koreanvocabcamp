const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

const regex = /category:\s*["']([^"']+)["']/g;
let match;
const categories = {};
let count = 0;

while ((match = regex.exec(fileContent)) !== null) {
    const cat = match[1];
    categories[cat] = (categories[cat] || 0) + 1;
    count++;
}

console.log('Found', count, 'category declarations.');
console.log('Categories distribution:', JSON.stringify(categories, null, 2));
