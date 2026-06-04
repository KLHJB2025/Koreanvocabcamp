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

function auditRemainingCycles() {
    console.log('--- STARTING AUDIT FOR ALL REMAINING CYCLES (CYCLE 5 - 17) ---');
    const vocab = loadVocabularyData();
    const cycles = Object.keys(vocab).filter(c => {
        const num = parseInt(c.replace('beginner_cycle_', ''), 10);
        return num >= 5 && num <= 17;
    });
    
    console.log(`Found ${cycles.length} cycles to audit:`, cycles);
    
    const wordsDir = path.join(__dirname, '../public/audio/words');
    const sentencesDir = path.join(__dirname, '../public/audio/sentences');
    
    let totalWords = 0;
    const globalIssues = [];
    
    cycles.forEach(cycleId => {
        const cycleWords = vocab[cycleId] || [];
        console.log(`Auditing ${cycleId}: ${cycleWords.length} words...`);
        
        cycleWords.forEach((word, index) => {
            totalWords++;
            const ref = `[${cycleId}][Word #${index + 1}: ${word.kr || 'MISSING'}]`;
            
            // 1. Basic properties
            if (!word.kr) globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_FIELD', message: `${ref} is missing "kr".` });
            if (!word.en) globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_FIELD', message: `${ref} is missing "en".` });
            if (!word.zh) globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_FIELD', message: `${ref} is missing "zh".` });
            if (!word.pos) globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_FIELD', message: `${ref} is missing "pos".` });
            
            if (word.kr) {
                // Spelling regex check
                if (!/^[가-힣ㄱ-ㅎㅏ-ㅣ0-9\s?.,!~()''""]+$/.test(word.kr.replace(/^-|-$/g, ''))) {
                    globalIssues.push({ severity: 'MEDIUM', cycleId, type: 'SPELLING_KOREAN', message: `${ref} contains non-Korean characters: "${word.kr}"` });
                }
            }
            
            // 2. Sentences check
            if (word.sentenceKr) {
                if (!word.sentenceMeaning) {
                    globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_SENTENCE_EN', message: `${ref} has sentenceKr but is missing sentenceMeaning.` });
                }
                if (!word.sentenceZh) {
                    globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_SENTENCE_ZH', message: `${ref} has sentenceKr but is missing sentenceZh.` });
                }
            } else {
                globalIssues.push({ severity: 'MEDIUM', cycleId, type: 'MISSING_SENTENCE_KR', message: `${ref} does not have an example sentence.` });
            }
            
            // 3. Audio existence checks
            if (word.kr) {
                const cleanName = word.kr.replace(/[<>:"/\\|?*]/g, '');
                const expectedWordFile = path.join(wordsDir, `${cleanName}.mp3`);
                const expectedSentFile = path.join(sentencesDir, `${cleanName}.mp3`);
                
                if (!fs.existsSync(expectedWordFile)) {
                    globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_WORD_AUDIO', message: `${ref}: Missing word audio file "${cleanName}.mp3".` });
                } else {
                    const size = fs.statSync(expectedWordFile).size;
                    if (size === 0) globalIssues.push({ severity: 'HIGH', cycleId, type: 'EMPTY_WORD_AUDIO', message: `${ref}: Word audio file is 0 bytes.` });
                }
                
                if (word.sentenceKr) {
                    if (!fs.existsSync(expectedSentFile)) {
                        globalIssues.push({ severity: 'HIGH', cycleId, type: 'MISSING_SENTENCE_AUDIO', message: `${ref}: Missing sentence audio file "${cleanName}.mp3".` });
                    } else {
                        const size = fs.statSync(expectedSentFile).size;
                        if (size === 0) globalIssues.push({ severity: 'HIGH', cycleId, type: 'EMPTY_SENTENCE_AUDIO', message: `${ref}: Sentence audio file is 0 bytes.` });
                    }
                }
            }
        });
    });
    
    console.log('\n==================================================');
    console.log('                 AUDIT COMPLETED                  ');
    console.log('==================================================');
    console.log(`Cycles Audited: ${cycles.length} (Cycles 5 - 17)`);
    console.log(`Total words audited: ${totalWords}`);
    console.log(`Total issues found: ${globalIssues.length}`);
    
    if (globalIssues.length > 0) {
        const byCycle = {};
        globalIssues.forEach(issue => {
            if (!byCycle[issue.cycleId]) byCycle[issue.cycleId] = [];
            byCycle[issue.cycleId].push(issue);
        });
        
        console.log('\nDetailed Breakdown of Issues:');
        Object.keys(byCycle).forEach(cId => {
            console.log(`\n--- ${cId} (${byCycle[cId].length} issues) ---`);
            byCycle[cId].forEach((issue, idx) => {
                console.log(` [${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
            });
        });
    } else {
        console.log('\n🌟 Perfect Score! No spelling, translation, metadata, or audio errors found across all remaining Cycles (5 to 17)!');
    }
}

auditRemainingCycles();
