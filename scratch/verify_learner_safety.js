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

function verifyLearnerSafety() {
    console.log('--- STARTING LEARNER SAFETY & STABILITY AUDIT ---');
    const vocab = loadVocabularyData();
    const issues = [];
    
    let totalWords = 0;
    
    for (const cycle in vocab) {
        vocab[cycle].forEach((word, index) => {
            totalWords++;
            const wordRef = `[${cycle}][Index ${index}][Word: ${word.kr}]`;
            
            // 1. Check for empty fields
            if (!word.kr || !word.kr.trim()) issues.push({ severity: 'HIGH', type: 'EMPTY_KOREAN', message: `${wordRef}: Korean word is empty.` });
            if (!word.en || !word.en.trim()) issues.push({ severity: 'HIGH', type: 'EMPTY_ENGLISH', message: `${wordRef}: English translation is empty.` });
            if (!word.zh || !word.zh.trim()) issues.push({ severity: 'HIGH', type: 'EMPTY_CHINESE', message: `${wordRef}: Chinese translation is empty.` });
            
            // 2. Check for suspicious translations or placeholders
            const suspiciousKeywords = ['todo', 'placeholder', 'null', 'undefined', 'temp', 'fixme', 'error', 'none'];
            suspiciousKeywords.forEach(kw => {
                if (word.en && word.en.toLowerCase() === kw) {
                    issues.push({ severity: 'HIGH', type: 'SUSPICIOUS_TRANSLATION_EN', message: `${wordRef}: English translation is a placeholder: "${word.en}"` });
                }
                if (word.zh && word.zh.toLowerCase() === kw) {
                    issues.push({ severity: 'HIGH', type: 'SUSPICIOUS_TRANSLATION_ZH', message: `${wordRef}: Chinese translation is a placeholder: "${word.zh}"` });
                }
                if (word.sentenceMeaning && word.sentenceMeaning.toLowerCase() === kw) {
                    issues.push({ severity: 'HIGH', type: 'SUSPICIOUS_SENTENCE_EN', message: `${wordRef}: Sentence English is a placeholder: "${word.sentenceMeaning}"` });
                }
                if (word.sentenceZh && word.sentenceZh.toLowerCase() === kw) {
                    issues.push({ severity: 'HIGH', type: 'SUSPICIOUS_SENTENCE_ZH', message: `${wordRef}: Sentence Chinese is a placeholder: "${word.sentenceZh}"` });
                }
            });
            
            // 3. Sentence presence check
            if (!word.sentenceKr || !word.sentenceKr.trim()) {
                issues.push({ severity: 'MEDIUM', type: 'MISSING_SENTENCE_KR', message: `${wordRef}: Missing Korean example sentence.` });
            } else {
                if (!word.sentenceMeaning || !word.sentenceMeaning.trim()) {
                    issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_MEANING', message: `${wordRef}: Sentence has Korean but missing English translation.` });
                }
                if (!word.sentenceZh || !word.sentenceZh.trim()) {
                    issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_ZH', message: `${wordRef}: Sentence has Korean but missing Chinese translation.` });
                }
            }
        });
    }
    
    console.log(`Total words verified: ${totalWords}`);
    console.log(`Total learner-safety issues: ${issues.length}`);
    
    if (issues.length > 0) {
        issues.forEach((issue, idx) => {
            console.log(`[${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
        });
    } else {
        console.log('Learner safety check passed: No empty values or suspicious placeholders found!');
    }
}

verifyLearnerSafety();
