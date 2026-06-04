const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

let cleanedContent = fileContent
    .replace('/* eslint-disable @typescript-eslint/no-explicit-any */', '')
    .replace('export interface Word {', '')
    .replace('    kr: string;', '')
    .replace('    en: string;', '')
    .replace('    zh: string;', '')
    .replace('    pos: string;', '')
    .replace('    sentenceKr?: string;', '')
    .replace('    sentenceMeaning?: string;', '')
    .replace('    sentenceZh?: string;', '')
    .replace('    illustrationUrl?: string;', '')
    .replace('    animationData?: any;', '')
    .replace('    animationUrl?: string;', '')
    .replace('    category?: string;', '')
    .replace('}', '')
    .replace('export const MOCK_VOCABULARY: Record<string, Word[]> = ', 'module.exports = ')
    .replace(/export /g, '');

const tempFile = path.join(__dirname, 'temp_vocab_fragments.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');

const vocabulary = require('./temp_vocab_fragments.js');
fs.unlinkSync(tempFile);

let total = 0;
const results = [];

for (const cycleId in vocabulary) {
    const words = vocabulary[cycleId];
    words.forEach((word, index) => {
        if (word.sentenceKr) {
            const sentence = word.sentenceKr;
            const tokens = sentence.trim().split(/\s+/);
            let isPotential = false;
            
            if (tokens.length <= 2 && !sentence.includes('요') && !sentence.includes('다') && !sentence.includes('죠')) {
                isPotential = true;
            } else if (sentence.includes(' 친척') || sentence.includes(' 채소') || sentence.startsWith(word.kr + ' ') && tokens.length <= 3 && !sentence.endsWith('요') && !sentence.endsWith('다') && !sentence.endsWith('.')) {
                isPotential = true;
            }
            
            if (isPotential) {
                total++;
                results.push({ cycleId, index, kr: word.kr, sentenceKr: sentence });
            }
        }
    });
}

console.log(JSON.stringify(results, null, 2));
console.log(`Found ${total} potential fragments`);
