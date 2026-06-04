const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Strip TypeScript annotations to parse as JS
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
    .replace('    sentences?: {', '')
    .replace('        kr: string;', '')
    .replace('        en: string;', '')
    .replace('        zh: string;', '')
    .replace('    }[];', '')
    .replace('    illustrationUrl?: string;', '')
    .replace('    animationData?: any;', '')
    .replace('    animationUrl?: string;', '')
    .replace('    category?: string;', '')
    .replace('}', '')
    .replace('export function normalizePos(pos: string): string {', 'function normalizePos(pos) {')
    .replace('export const MOCK_VOCABULARY: Record<string, Word[]> = ', 'module.exports = ')
    .replace(/export /g, '');

// Strip the helper function completely if we don't need it, or replace module.exports safely
cleanedContent = cleanedContent.replace(/function normalizePos[\s\S]*?\n\}/, '');

const tempFile = path.join(__dirname, 'temp_vocab_find.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');

const vocabulary = require('./temp_vocab_find.js');
fs.unlinkSync(tempFile);

const dictionaryFormEndings = [];
const allEndings = new Set();

const endingInDaPattern = /다$/;

// List of common dictionary form verbs/adjectives ending in 다
// that are not normally used as sentence-ending conjugated forms in conversation.
// For example:
// - 하다 (dictionary) vs 한다 (plain form, allowed in some contexts, but let's check)
// - 넣다 (dictionary) vs 넣는다 (plain), 넣어요 (polite)
// - 타다 (dictionary) vs 탄다 (plain), 타요 (polite)
// - 되다 (dictionary) vs 된다 (plain), 돼요 (polite)
// - 나누다 (dictionary) vs 나눈다 (plain), 나눠요 (polite)
// - 마시다 (dictionary) vs 마신다 (plain), 마셔요 (polite)
// Let's identify sentences ending in "다" (without a trailing period, or with a period).
// Let's print out all sentences ending in a verb/adjective concluding with "다" (like "~다" or "~다.").

for (const cycleId in vocabulary) {
    const words = vocabulary[cycleId];
    words.forEach((word, index) => {
        if (word.sentenceKr) {
            const cleanSent = word.sentenceKr.trim().replace(/[.!?]$/, '');
            const tokens = cleanSent.split(/\s+/);
            const lastWord = tokens[tokens.length - 1];
            
            // Check if last word ends with '다'
            if (lastWord.endsWith('다')) {
                // Let's exclude some valid endings:
                // - ~ㅂ니다/습니다 (polite plain)
                // - ~ㄴ다/는다 (plain form, although usually user wants polite form, wait - let's see)
                // - ~었다/았다/였다 (past plain)
                // - ~겠다 (future plain)
                // - ~단다, ~란다, ~단다
                // Let's see what they look like.
                const isPolitePlain = lastWord.endsWith('니다') || lastWord.endsWith('시다'); // 습니다, ㅂ니다, etc.
                const isPastPlain = lastWord.endsWith('었다') || lastWord.endsWith('았다') || lastWord.endsWith('였다') || lastWord.endsWith('했다');
                const isPlainVerbs = lastWord.endsWith('는다') || lastWord.endsWith('ㄴ다');
                const isFuturePlain = lastWord.endsWith('겠다');
                
                // If it ends with '다' but is not one of the polite/conjugated forms:
                // Or if it is a dictionary form specifically (stem + 다, where stem does not have past/present/future suffixes like -었-, -았-, -ㄴ-, -는-, -겠-, -ㅂ니-).
                // E.g., '넣다', '타다', '되다', '나누다', '걸리다', '쓰다', '사다', '만들다'.
                // Note: Adjectives in plain form are identical to dictionary form (e.g. '춥다', '예쁘다').
                // Let's capture all ending in "다" to inspect them.
                dictionaryFormEndings.push({
                    cycleId,
                    index,
                    word: word.kr,
                    pos: word.pos,
                    sentenceKr: word.sentenceKr,
                    sentenceMeaning: word.sentenceMeaning,
                    sentenceZh: word.sentenceZh,
                    lastWord,
                    type: isPolitePlain ? 'PolitePlain' : (isPastPlain ? 'PastPlain' : (isPlainVerbs ? 'PlainVerb' : (isFuturePlain ? 'FuturePlain' : 'SuspiciousDictionary')))
                });
            }
        }
    });
}

console.log(`Found ${dictionaryFormEndings.length} sentences ending in '다'.`);
const suspicious = dictionaryFormEndings.filter(x => x.type === 'SuspiciousDictionary');
console.log(`Found ${suspicious.length} suspicious dictionary-form ending sentences.`);

fs.writeFileSync(
    path.join(__dirname, 'suspicious_sentences.json'),
    JSON.stringify(suspicious, null, 2),
    'utf8'
);

console.log('\n--- First 20 Suspicious Examples ---');
suspicious.slice(0, 20).forEach((x, i) => {
    console.log(`${i+1}. [${x.cycleId}] Word: ${x.word} | POS: ${x.pos} | Sentence: "${x.sentenceKr}" | LastWord: "${x.lastWord}"`);
});
