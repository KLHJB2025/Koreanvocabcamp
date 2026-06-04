const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/lib/vocabulary-data.ts', 'utf-8');
const match = tsData.match(/(export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
const MOCK_VOCABULARY = eval('(' + match[2] + ')');

const issues = [];
for (const cycle in MOCK_VOCABULARY) {
    MOCK_VOCABULARY[cycle].forEach((word, index) => {
        const ref = `${cycle}[index ${index}][${word.kr}]`;
        
        // Check for English in Korean
        if (word.kr && /[a-zA-Z]/.test(word.kr.replace(/^-|-$/g, ''))) {
            issues.push({ type: 'KOREAN_HAS_ENGLISH', word: word.kr, ref });
        }
        
        // Check for Chinese in English
        if (word.en && /[\u4e00-\u9fa5]/.test(word.en)) {
            issues.push({ type: 'ENGLISH_HAS_CHINESE', en: word.en, ref });
        }
        
        // Check for unmatched parens
        if (word.en) {
            const o = (word.en.match(/\(/g) || []).length;
            const c = (word.en.match(/\)/g) || []).length;
            if (o !== c) issues.push({ type: 'PARENS_EN', en: word.en, ref });
        }
        if (word.zh) {
            const o = (word.zh.match(/\(|\（/g) || []).length;
            const c = (word.zh.match(/\)|\）/g) || []).length;
            if (o !== c) issues.push({ type: 'PARENS_ZH', zh: word.zh, ref });
        }
    });
}
console.log('CRITICAL SPELLING ISSUES FOUND:', issues.length);
console.log(JSON.stringify(issues, null, 2));
