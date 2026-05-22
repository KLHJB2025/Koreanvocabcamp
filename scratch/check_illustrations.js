const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);

if (!match) {
    console.error("Could not find MOCK_VOCABULARY");
    process.exit(1);
}

const MOCK_VOCABULARY = eval('(' + match[2] + ')');

let totalWords = 0;
let nouns = 0;
let nounsWithIllustration = 0;
let totalWithIllustration = 0;
const categories = new Set();

for (const cycle in MOCK_VOCABULARY) {
    for (const word of MOCK_VOCABULARY[cycle]) {
        totalWords++;
        if (word.pos === 'Noun' || word.pos === '명사') {
            nouns++;
            if (word.illustrationUrl) {
                nounsWithIllustration++;
            }
        }
        if (word.illustrationUrl) {
            totalWithIllustration++;
        }
        if (word.category) {
            categories.add(word.category);
        }
    }
}

console.log("Total words:", totalWords);
console.log("Nouns:", nouns);
console.log("Nouns with illustration:", nounsWithIllustration);
console.log("Total words with illustration:", totalWithIllustration);
console.log("Categories found:", Array.from(categories));
