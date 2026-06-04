const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

const resultsFile = path.join(__dirname, 'rewritten_sentences_results.json');
if (!fs.existsSync(resultsFile)) {
    console.error("Results file does not exist! Please run batch_rewrite_sentences.js first.");
    process.exit(1);
}

const rewrittenResults = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
console.log(`Loaded ${rewrittenResults.length} rewritten sentences.`);

// Parse MOCK_VOCABULARY from vocabulary-data.ts using eval
const match = fileContent.match(/(?:export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
if (!match) {
    console.error("Could not find MOCK_VOCABULARY in vocabulary-data.ts");
    process.exit(1);
}

let MOCK_VOCABULARY;
try {
    MOCK_VOCABULARY = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Failed to eval MOCK_VOCABULARY", e);
    process.exit(1);
}

let mergeCount = 0;
let mismatchCount = 0;

rewrittenResults.forEach(item => {
    const cycle = MOCK_VOCABULARY[item.cycleId];
    if (!cycle) {
        console.error(`Cycle not found: ${item.cycleId}`);
        return;
    }
    
    const wordEntry = cycle[item.index];
    if (!wordEntry) {
        console.error(`Word entry not found at index ${item.index} in cycle ${item.cycleId}`);
        return;
    }
    
    if (wordEntry.kr !== item.word) {
        console.error(`Word mismatch! Expected: ${item.word}, Found: ${wordEntry.kr} in ${item.cycleId} index ${item.index}`);
        mismatchCount++;
        return;
    }
    
    // Apply changes
    wordEntry.sentenceKr = item.sentenceKr;
    wordEntry.sentenceMeaning = item.sentenceMeaning;
    wordEntry.sentenceZh = item.sentenceZh;
    mergeCount++;
});

console.log(`Successfully merged: ${mergeCount} sentences.`);
if (mismatchCount > 0) {
    console.error(`Encountered ${mismatchCount} mismatches!`);
}

// Convert MOCK_VOCABULARY back to formatted TypeScript string
const newVocabString = JSON.stringify(MOCK_VOCABULARY, null, 4)
    .replace(/"([^"]+)":/g, '$1:'); // remove quotes around keys to match typical TS styling

const regex = /(export const MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)\{[\s\S]*?\};/;
const newContent = fileContent.replace(regex, `$1${newVocabString};`);

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log("Successfully wrote updates to vocabulary-data.ts!");
