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

const tempFile = path.join(__dirname, 'temp_vocab_count.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');
const vocabulary = require('./temp_vocab_count.js');
fs.unlinkSync(tempFile);

const summary = {};
const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '와', '과', '의', '도', '만'];

for (const cycle in vocabulary) {
    let total = 0;
    let missingZh = 0;
    let missingEn = 0;
    let spacing = 0;
    const words = vocabulary[cycle];
    words.forEach(w => {
        total++;
        if (w.sentenceKr) {
            if (!w.sentenceZh) missingZh++;
            if (!w.sentenceMeaning) missingEn++;
            
            // Check spacing
            let hasSpacing = false;
            particles.forEach(p => {
                const regex = new RegExp(`\\s(${p})(?=\\s|[\\.,\\?!~]|$|다)`, 'g');
                if (regex.test(w.sentenceKr)) {
                    hasSpacing = true;
                }
            });
            if (hasSpacing) spacing++;
        }
    });
    summary[cycle] = { total, missingZh, missingEn, spacing };
}

console.log(JSON.stringify(summary, null, 2));
