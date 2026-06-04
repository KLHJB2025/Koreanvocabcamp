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

const tempFile = path.join(__dirname, 'temp_vocab2.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');
const vocabulary = require('./temp_vocab2.js');
fs.unlinkSync(tempFile);

const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '와', '과', '의', '도', '만'];

const issues = [];
for (const cycleId in vocabulary) {
    const words = vocabulary[cycleId];
    words.forEach((word, index) => {
        if (word.sentenceKr) {
            const sentence = word.sentenceKr;
            // Let's search for a space followed by a particle
            particles.forEach(p => {
                // Find all matches of space followed by particle p
                // To avoid matching determiners like "이", we check if p is followed by space/punctuation/end
                const regex = new RegExp(`\\s(${p})(?=\\s|[\\.,\\?!~]|$|다)`, 'g');
                let match;
                while ((match = regex.exec(sentence)) !== null) {
                    issues.push({
                        cycleId,
                        word: word.kr,
                        sentenceKr: sentence,
                        particle: p,
                        index: match.index
                    });
                }
            });
        }
    });
}

console.log(`Total issues found: ${issues.length}`);
issues.slice(0, 100).forEach(x => {
    console.log(`[${x.cycleId}] ${x.word} => Sentence: "${x.sentenceKr}" (Particle: ${x.particle})`);
});
