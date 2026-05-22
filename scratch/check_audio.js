const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);

if (!match) {
    console.error("Could not find MOCK_VOCABULARY");
    process.exit(1);
}

const MOCK_VOCABULARY = eval('(' + match[2] + ')');
const wordsDir = 'public/audio/words';
const sentencesDir = 'public/audio/sentences';

let totalWords = 0;
let missingWordsAudio = [];
let missingSentencesAudio = [];

for (const cycle in MOCK_VOCABULARY) {
    for (const word of MOCK_VOCABULARY[cycle]) {
        totalWords++;
        const safeName = word.kr.replace(/[<>:"/\\|?*]/g, '');
        const wordFile = path.join(wordsDir, `${safeName}.mp3`);
        if (!fs.existsSync(wordFile)) {
            missingWordsAudio.push(word.kr);
        }
        
        if (word.sentenceKr) {
            const sentenceFile = path.join(sentencesDir, `${safeName}.mp3`);
            if (!fs.existsSync(sentenceFile)) {
                missingSentencesAudio.push(word.kr);
            }
        }
    }
}

console.log("Total words in MOCK_VOCABULARY:", totalWords);
console.log("Missing word audio count:", missingWordsAudio.length);
console.log("Missing sentence audio count:", missingSentencesAudio.length);

if (missingWordsAudio.length > 0) {
    console.log("Missing words sample:", missingWordsAudio.slice(0, 10));
}
if (missingSentencesAudio.length > 0) {
    console.log("Missing sentences sample:", missingSentencesAudio.slice(0, 10));
}
