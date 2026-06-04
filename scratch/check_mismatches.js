const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
const MOCK_VOCABULARY = eval('(' + match[2] + ')');

const wordsDir = 'public/audio/words';
const sentencesDir = 'public/audio/sentences';

let total = 0;
let mismatches = 0;
let results = [];

for (const cycle in MOCK_VOCABULARY) {
    for (const word of MOCK_VOCABULARY[cycle]) {
        if (!word.sentenceKr) continue;
        total++;
        const safeName = word.kr.replace(/[<>:"/\\|?*]/g, '');
        const wordFile = path.join(wordsDir, `${safeName}.mp3`);
        const sentenceFile = path.join(sentencesDir, `${safeName}.mp3`);
        
        if (fs.existsSync(wordFile) && fs.existsSync(sentenceFile)) {
            const wordSize = fs.statSync(wordFile).size;
            const sentenceSize = fs.statSync(sentenceFile).size;
            const diffPercent = Math.abs(sentenceSize - wordSize) / wordSize;
            
            // If the sentence has more than 5 extra characters, but size is within 15%, it's highly suspicious
            const wordLen = word.kr.length;
            const sentenceLen = word.sentenceKr.length;
            
            if (sentenceLen > wordLen + 4 && diffPercent < 0.15) {
                mismatches++;
                results.push({
                    word: word.kr,
                    sentence: word.sentenceKr,
                    wordSize,
                    sentenceSize,
                    diffPercent: (diffPercent * 100).toFixed(1) + '%'
                });
            }
        }
    }
}

console.log(`Checked ${total} words with sentences.`);
console.log(`Found ${mismatches} highly suspicious sentence audios (size too close to word audio).`);
if (results.length > 0) {
    console.log("Samples of suspicious matches:");
    console.log(results.slice(0, 15));
}
