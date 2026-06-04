const fs = require('fs');
const path = require('path');

// Read the vocabulary-data.ts file
const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// We can parse the file content as JS by stripping "export const MOCK_VOCABULARY: Record<string, Word[]> = " and evaluating it,
// or we can clean up the syntax to make it pure JSON or require it since Next.js ts file can be parsed.
// Let's strip the typescript export to load it as a JS object.
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

const tempFile = path.join(__dirname, 'temp_vocab.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');

const vocabulary = require('./temp_vocab.js');
fs.unlinkSync(tempFile);

let totalWords = 0;
let missingZhTranslation = [];
let spacingIssues = [];
let nonSentenceIssues = [];

const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '와', '과', '의', '도', '만'];

for (const cycleId in vocabulary) {
    const words = vocabulary[cycleId];
    words.forEach((word, index) => {
        totalWords++;
        
        // 1. Check missing translations
        if (word.sentenceKr) {
            if (!word.sentenceZh) {
                missingZhTranslation.push({ cycleId, index, word: word.kr, sentenceKr: word.sentenceKr, en: word.sentenceMeaning });
            }
            if (!word.sentenceMeaning) {
                // missing English translation
                console.log(`Missing EN translation: ${word.kr} in ${cycleId}`);
            }
            
            // 2. Check spacing (space before particle)
            const sentence = word.sentenceKr;
            // Matches any space followed by a particle and then space or punctuation
            // e.g. "간장 을 넣다" or "고속버스 를 타다"
            particles.forEach(p => {
                const regex = new RegExp(`\\s+${p}\\b`);
                if (regex.test(sentence)) {
                    spacingIssues.push({ cycleId, index, word: word.kr, sentenceKr: sentence, issue: `Space before particle '${p}'` });
                }
            });

            // 3. Check for non-sentence issues (word lists instead of actual sentences, e.g., "고모 친척", "감자 채소", "감다 눈을")
            // A simple heuristic: if a sentence has no verb ending (like 요, 다, 어, 아, 습니다, 습니까, 죠, 네, 며, 고) and is very short,
            // or if it consists of just repeating words / inverted grammar.
            const lastChar = sentence.trim().slice(-1);
            const tokens = sentence.trim().split(/\s+/);
            if (tokens.length <= 2 && !sentence.includes('요') && !sentence.includes('다') && !sentence.includes('죠')) {
                nonSentenceIssues.push({ cycleId, index, word: word.kr, sentenceKr: sentence });
            } else if (sentence.includes(' 친척') || sentence.includes(' 채소') || sentence.startsWith(word.kr + ' ') && tokens.length <= 3 && !sentence.endsWith('요') && !sentence.endsWith('다') && !sentence.endsWith('.')) {
                nonSentenceIssues.push({ cycleId, index, word: word.kr, sentenceKr: sentence });
            }
        }
    });
}

console.log(`Total words: ${totalWords}`);
console.log(`Missing Chinese translations of sentences: ${missingZhTranslation.length}`);
console.log(`Spacing issues (space before particle): ${spacingIssues.length}`);
console.log(`Potential non-sentence/fragment issues: ${nonSentenceIssues.length}`);

// Print some examples
console.log('\n--- Missing Chinese Translation Examples ---');
missingZhTranslation.slice(0, 10).forEach(x => console.log(`[${x.cycleId}] ${x.word}: "${x.sentenceKr}" -> EN: "${x.en}"`));

console.log('\n--- Spacing Issue Examples ---');
spacingIssues.slice(0, 10).forEach(x => console.log(`[${x.cycleId}] ${x.word}: "${x.sentenceKr}" (${x.issue})`));

console.log('\n--- Fragment/Non-sentence Examples ---');
nonSentenceIssues.slice(0, 10).forEach(x => console.log(`[${x.cycleId}] ${x.word}: "${x.sentenceKr}"`));
