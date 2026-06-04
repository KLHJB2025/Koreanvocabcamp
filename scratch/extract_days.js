const fs = require('fs');
const path = require('path');

const filePath = 'd:\\单词网站\\src\\lib\\vocabulary-data.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Find the beginning of MOCK_VOCABULARY
const startIdx = content.indexOf('export const MOCK_VOCABULARY');
if (startIdx === -1) {
    console.error('Could not find MOCK_VOCABULARY');
    process.exit(1);
}

// Extract beginner_cycle_1
const cycleStart = content.indexOf('"beginner_cycle_1": [', startIdx);
if (cycleStart === -1) {
    console.error('Could not find beginner_cycle_1');
    process.exit(1);
}

// Find matching bracket for the array [ ... ]
let bracketCount = 0;
let arrayEnd = -1;
for (let i = cycleStart + '"beginner_cycle_1": ['.length - 1; i < content.length; i++) {
    if (content[i] === '[') {
        bracketCount++;
    } else if (content[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
            arrayEnd = i;
            break;
        }
    }
}

if (arrayEnd === -1) {
    console.error('Could not find end of array');
    process.exit(1);
}

const arrayText = content.substring(cycleStart + '"beginner_cycle_1": '.length, arrayEnd + 1);

// Parse the array text
const cleanJson = arrayText.trim();
let words = [];
try {
    words = JSON.parse(cleanJson);
} catch (e) {
    console.error('JSON parse error, trying eval:', e);
    try {
        words = eval(arrayText);
    } catch (e2) {
        console.error('Eval failed too:', e2);
        process.exit(1);
    }
}

console.log(`Successfully parsed ${words.length} words from beginner_cycle_1.`);

const totalWords = words.length;
const wordsPerDay = Math.ceil(totalWords / 14);

for (let day = 1; day <= 14; day++) {
    const start = (day - 1) * wordsPerDay;
    const end = Math.min(start + wordsPerDay, totalWords);
    const dayWords = words.slice(start, end);
    console.log(`\nDAY_${day}_WORDS:`);
    dayWords.forEach(w => {
        console.log(`- ${w.kr} | ${w.zh} | ${w.en}`);
    });
}
