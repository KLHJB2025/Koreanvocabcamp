const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// A simple way to require it by stripping TypeScript interface
let cleaned = fileContent
    .replace(/export interface Word[\s\S]*?illustrationUrl\?\:\s*string\;\s*\}/g, '')
    .replace('export const MOCK_VOCABULARY: Record<string, Word[]> = ', 'module.exports = ')
    .replace(/export /g, '')
    .replace(/\:\s*Word\[\]/g, '')
    .replace(/\:\s*Record<string,\s*Word\[\]>/g, '');

const tempFile = path.join(__dirname, 'temp_vocab.js');
fs.writeFileSync(tempFile, cleaned, 'utf8');
const MOCK_VOCABULARY = require('./temp_vocab.js');
fs.unlinkSync(tempFile);

Object.entries(MOCK_VOCABULARY).forEach(([cycle, words]) => {
    console.log(`\n=== ${cycle} (${words.length} words) ===`);
    console.log(words.map(w => `${w.kr} (${w.zh})`).join(', '));
});
