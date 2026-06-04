const fs = require('fs');
const path = require('path');

function loadVocabularyData() {
    const filePath = path.join(__dirname, '..', 'src', 'lib', 'vocabulary-data.ts');
    const content = fs.readFileSync(filePath, 'utf8');
    const startIndex = content.indexOf('export const MOCK_VOCABULARY');
    const declStart = content.indexOf('=', startIndex);
    let jsCode = content.substring(declStart + 1).trim();
    if (jsCode.endsWith(';')) {
        jsCode = jsCode.substring(0, jsCode.length - 1);
    }
    return eval('(' + jsCode + ')');
}

const vocab = loadVocabularyData();
const cycle1 = vocab['beginner_cycle_1'] || [];

let directCount = 0;
cycle1.forEach(word => {
    if (word.illustrationUrl) {
        directCount++;
        console.log(`Word: ${word.kr} has direct illustrationUrl: "${word.illustrationUrl}"`);
    }
});

console.log(`Total direct illustrationUrls in Cycle 1: ${directCount}`);
