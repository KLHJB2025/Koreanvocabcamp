const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Load vocabulary
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

const tempFile = path.join(__dirname, 'temp_vocab_analyze.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');
const vocabulary = require('./temp_vocab_analyze.js');
fs.unlinkSync(tempFile);

const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '으로', '와', '과', '의', '도', '만'];

const issues = [];
for (const cycleId in vocabulary) {
    const words = vocabulary[cycleId];
    words.forEach((word, index) => {
        if (word.sentenceKr) {
            const sentence = word.sentenceKr;
            particles.forEach(p => {
                const regex = new RegExp(`\\s(${p})(?=\\s|[\\.,\\?!~]|$|다)`, 'g');
                let match;
                while ((match = regex.exec(sentence)) !== null) {
                    // Extract context
                    const start = Math.max(0, match.index - 10);
                    const end = Math.min(sentence.length, match.index + p.length + 10);
                    const context = sentence.substring(start, end);
                    issues.push({
                        cycleId,
                        word: word.kr,
                        sentenceKr: sentence,
                        particle: p,
                        context: context.trim(),
                        index: match.index
                    });
                }
            });
        }
    });
}

console.log(`Total issues: ${issues.length}`);
fs.writeFileSync('scratch/spacing_issues_dump.json', JSON.stringify(issues, null, 2), 'utf-8');
console.log("Dumped to scratch/spacing_issues_dump.json");
