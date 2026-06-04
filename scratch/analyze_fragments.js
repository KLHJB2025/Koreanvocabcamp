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

const tempFile = path.join(__dirname, 'temp_vocab_frag.js');
fs.writeFileSync(tempFile, cleanedContent, 'utf8');
const vocabulary = require('./temp_vocab_frag.js');
fs.unlinkSync(tempFile);

const fragments = [];
for (const cycle in vocabulary) {
    vocabulary[cycle].forEach((word, index) => {
        if (word.sentenceKr) {
            const sentence = word.sentenceKr;
            // Simple heuristic to detect if the sentence is a fragment
            // 1. If it ends with typical noun categories or words
            const badEndings = ['음식', '채소', '색깔', '지명', '친척', '동물', '식구', '직업', '신체', '계절', '가족', '숫자', '요일', '요일명', '나라', '방향', '달(월)', '과일', '식품', '운동', '가구', '의류', '학용품', '필기구', '도구', '탈것', '자연', '날씨', '단위', '장소', '건물'];
            const tokens = sentence.trim().split(/\s+/);
            
            let isFrag = false;
            if (tokens.length <= 2) {
                // If it doesn't end with 요, 다, 죠, 오, 고, 며, 서, 시, 며 or standard punctuation
                const lastToken = tokens[tokens.length - 1];
                if (!sentence.includes('요') && !sentence.includes('다') && !sentence.includes('죠') && !sentence.includes('.') && !sentence.includes('?')) {
                    isFrag = true;
                }
            }
            
            // Check if any bad endings are in the sentence
            if (badEndings.some(ending => sentence.endsWith(ending) || sentence.endsWith(ending + '.'))) {
                isFrag = true;
            }
            
            // Also check for repeating word lists like "검사 숙제 검사", "방금 방금 가다"
            if (tokens.length === 3 && tokens[0] === word.kr && tokens[2] === word.kr) {
                isFrag = true;
            }
            if (tokens.length === 3 && tokens[0] === tokens[1]) {
                isFrag = true;
            }
            
            if (isFrag) {
                fragments.push({ cycle, word: word.kr, sentenceKr: sentence, sentenceMeaning: word.sentenceMeaning, sentenceZh: word.sentenceZh });
            }
        }
    });
}

console.log(`Total fragments found: ${fragments.length}`);
fs.writeFileSync('scratch/fragments.json', JSON.stringify(fragments, null, 2), 'utf-8');
console.log("Dumped to scratch/fragments.json");
fragments.slice(0, 30).forEach(x => {
    console.log(`[${x.cycle}] ${x.word}: "${x.sentenceKr}" -> EN: "${x.sentenceMeaning}" | ZH: "${x.sentenceZh}"`);
});
