const fs = require('fs');

function run() {
    const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
    const fixes = JSON.parse(fs.readFileSync('scratch/tbd_fixes.json', 'utf-8'));
    
    // Extract MOCK_VOCABULARY
    const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
    if (!match) return;
    
    const MOCK_VOCABULARY = eval('(' + match[2] + ')');
    
    let fixedCount = 0;
    for (const cycle in MOCK_VOCABULARY) {
        for (const word of MOCK_VOCABULARY[cycle]) {
            if (word.en === 'TBD' && fixes[word.kr]) {
                const fix = fixes[word.kr];
                word.en = fix.en;
                word.zh = fix.zh;
                word.sentenceMeaning = fix.sentenceMeaning;
                word.sentenceZh = fix.sentenceZh;
                fixedCount++;
            }
        }
    }
    
    const newVocabString = JSON.stringify(MOCK_VOCABULARY, null, 4).replace(/"([^"]+)":/g, '$1:');
    const newContent = tsData.replace(match[0], `${match[1]}${newVocabString};`);
    
    fs.writeFileSync('src/lib/vocabulary-data.ts', newContent);
    console.log(`Fixed ${fixedCount} TBD words.`);
}

run();
