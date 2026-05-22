const fs = require('fs');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);

if (!match) {
    console.log("Could not find MOCK_VOCABULARY");
    process.exit(1);
}

let MOCK_VOCABULARY;
try {
    MOCK_VOCABULARY = eval('(' + match[2] + ')');
} catch (e) {
    console.error("Eval failed:", e);
    process.exit(1);
}

const cycles = Object.keys(MOCK_VOCABULARY);
console.log("Cycles found:", cycles.length);
let totalWords = 0;
let tbdWords = 0;
let tbdList = [];

for (const cycle of cycles) {
    const words = MOCK_VOCABULARY[cycle];
    totalWords += words.length;
    for (const w of words) {
        if (w.en === 'TBD' || w.zh === 'TBD' || w.sentenceMeaning === 'TBD' || w.sentenceZh === 'TBD') {
            tbdWords++;
            tbdList.push({ cycle, word: w.kr });
        }
    }
}

console.log("Total words in MOCK_VOCABULARY:", totalWords);
console.log("TBD words count:", tbdWords);
if (tbdWords > 0) {
    console.log("Sample TBD words:", tbdList.slice(0, 10));
}
