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

function auditSpelling() {
    console.log('--- STARTING VOCABULARY SPELLING & SYNTAX DEEP AUDIT ---');
    const vocab = loadVocabularyData();
    const issues = [];
    
    let totalCount = 0;
    
    for (const cycle in vocab) {
        vocab[cycle].forEach((word, index) => {
            totalCount++;
            const wordRef = `[${cycle}][Index ${index}][Word: ${word.kr}]`;
            
            // 1. Check Korean word spelling format
            if (word.kr) {
                // Should not contain english letters (unless it's an affix with hyphen like -되다 or -하다)
                if (/[a-zA-Z]/.test(word.kr)) {
                    issues.push({
                        severity: 'HIGH',
                        type: 'KOREAN_HAS_ENGLISH',
                        message: `${wordRef}: Korean word "${word.kr}" contains English letters.`
                    });
                }
                // Check trailing/leading spaces
                if (word.kr !== word.kr.trim()) {
                    issues.push({
                        severity: 'MEDIUM',
                        type: 'SPACING_KOREAN',
                        message: `${wordRef}: Korean word has leading/trailing spaces: "${word.kr}"`
                    });
                }
                // Check double spaces inside Korean words
                if (/\s{2,}/.test(word.kr)) {
                    issues.push({
                        severity: 'MEDIUM',
                        type: 'DOUBLE_SPACES_KOREAN',
                        message: `${wordRef}: Korean word has double spaces: "${word.kr}"`
                    });
                }
            }
            
            // 2. Check English translation spelling anomalies
            if (word.en) {
                // Check trailing/leading spaces
                if (word.en !== word.en.trim()) {
                    issues.push({
                        severity: 'LOW',
                        type: 'SPACING_ENGLISH',
                        message: `${wordRef}: English translation has leading/trailing spaces: "${word.en}"`
                    });
                }
                // Check double spaces
                if (/\s{2,}/.test(word.en)) {
                    issues.push({
                        severity: 'LOW',
                        type: 'DOUBLE_SPACES_ENGLISH',
                        message: `${wordRef}: English translation has double spaces: "${word.en}"`
                    });
                }
                // Check mismatched parentheses
                const openParen = (word.en.match(/\(/g) || []).length;
                const closeParen = (word.en.match(/\)/g) || []).length;
                if (openParen !== closeParen) {
                    issues.push({
                        severity: 'MEDIUM',
                        type: 'MISMATCHED_PARENTHESES_ENGLISH',
                        message: `${wordRef}: English translation has mismatched parentheses: "${word.en}"`
                    });
                }
                // Check for Chinese characters in English translation
                if (/[\u4e00-\u9fa5]/.test(word.en)) {
                    issues.push({
                        severity: 'HIGH',
                        type: 'ENGLISH_HAS_CHINESE',
                        message: `${wordRef}: English translation contains Chinese characters: "${word.en}"`
                    });
                }
                // Check for spelling typos like double letters at start or words ending in comma
                if (word.en.endsWith(',') || word.en.endsWith('.')) {
                    issues.push({
                        severity: 'LOW',
                        type: 'TRAILING_PUNCTUATION_ENGLISH',
                        message: `${wordRef}: English translation ends with comma or period: "${word.en}"`
                    });
                }
            }
            
            // 3. Check Chinese translation spelling anomalies
            if (word.zh) {
                // Check leading/trailing spaces
                if (word.zh !== word.zh.trim()) {
                    issues.push({
                        severity: 'LOW',
                        type: 'SPACING_CHINESE',
                        message: `${wordRef}: Chinese translation has leading/trailing spaces: "${word.zh}"`
                    });
                }
                // Check mismatched parentheses in Chinese
                const openP1 = (word.zh.match(/\(/g) || []).length;
                const closeP1 = (word.zh.match(/\)/g) || []).length;
                const openP2 = (word.zh.match(/\（/g) || []).length;
                const closeP2 = (word.zh.match(/\）/g) || []).length;
                if (openP1 !== closeP1 || openP2 !== closeP2) {
                    issues.push({
                        severity: 'MEDIUM',
                        type: 'MISMATCHED_PARENTHESES_CHINESE',
                        message: `${wordRef}: Chinese translation has mismatched parentheses: "${word.zh}"`
                    });
                }
                // Check if Chinese translation contains English words (excluding common acronyms or indicators like TBD or nouns like (N))
                if (/[a-zA-Z]{4,}/.test(word.zh) && !word.zh.includes('TBD')) {
                    issues.push({
                        severity: 'LOW',
                        type: 'CHINESE_HAS_ENGLISH',
                        message: `${wordRef}: Chinese translation contains long English word: "${word.zh}"`
                    });
                }
            }

            // 4. Check example sentences spelling/syntax
            if (word.sentenceKr) {
                // Example sentences should end with proper Korean endings (요, 다, 죠, 습니다, 오, etc.) or punctuation (. or ?)
                const cleanSent = word.sentenceKr.trim();
                const endsWithPunct = /[.!?~]$/.test(cleanSent);
                if (!endsWithPunct) {
                    // Check if it has any verb-ending but missing punctuation
                    const lastChar = cleanSent.slice(-1);
                    if (['다', '요', '죠', '네', '오', '니', '까'].includes(lastChar)) {
                        issues.push({
                            severity: 'LOW',
                            type: 'MISSING_PUNCTUATION_KOREAN',
                            message: `${wordRef}: Sentence missing trailing punctuation: "${word.sentenceKr}"`
                        });
                    }
                }
                
                // Check if sentence matches word spelling
                const cleanWord = word.kr.replace(/[가-힣]*\-$/, '').replace(/^\-[가-힣]*/, ''); // strip prefix/suffix hyphen
                if (cleanWord && !word.sentenceKr.includes(cleanWord)) {
                    // Sometimes words are conjugated (e.g. 가다 -> 가요). If so, we can check for stem overlap.
                    // But if the stem itself isn't in the sentence, it's suspicious
                    const stem = cleanWord.length > 1 ? cleanWord.slice(0, -1) : cleanWord;
                    if (!word.sentenceKr.includes(stem)) {
                        issues.push({
                            severity: 'MEDIUM',
                            type: 'SENTENCE_MUTATION',
                            message: `${wordRef}: Word "${word.kr}" is not present in its example sentence "${word.sentenceKr}" (stem "${stem}" also missing)`
                        });
                    }
                }
            }
        });
    }
    
    console.log(`Audited ${totalCount} words total.`);
    console.log(`Found ${issues.length} spelling & format anomalies.`);
    
    if (issues.length > 0) {
        console.log('\n--- DETAILED ISSUES ---');
        issues.forEach((issue, idx) => {
            console.log(`[${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
        });
    } else {
        console.log('No spelling or format anomalies found!');
    }
}

auditSpelling();
