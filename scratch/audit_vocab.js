const fs = require('fs');
const path = require('path');

function loadVocabularyData() {
    const filePath = path.join(__dirname, '..', 'src', 'lib', 'vocabulary-data.ts');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find where MOCK_VOCABULARY is defined
    const startIndex = content.indexOf('export const MOCK_VOCABULARY');
    if (startIndex === -1) {
        throw new Error('Could not find MOCK_VOCABULARY definition in vocabulary-data.ts');
    }
    
    // Extract everything from MOCK_VOCABULARY onwards
    const declStart = content.indexOf('=', startIndex);
    if (declStart === -1) {
        throw new Error('Could not find assignment in MOCK_VOCABULARY');
    }
    
    let jsCode = content.substring(declStart + 1).trim();
    // If it ends with a semicolon, remove it if it's the very last char
    if (jsCode.endsWith(';')) {
        jsCode = jsCode.substring(0, jsCode.length - 1);
    }
    
    // Evaluate the object literal
    try {
        const vocab = eval('(' + jsCode + ')');
        return vocab;
    } catch (err) {
        console.error('Error evaluating vocabulary data:', err);
        throw err;
    }
}

function runAudit() {
    console.log('--- STARTING VOCABULARY DATA AUDIT ---');
    let vocab;
    try {
        vocab = loadVocabularyData();
    } catch (e) {
        console.error('Failed to load vocabulary data:', e.message);
        return;
    }
    
    const cycles = Object.keys(vocab);
    console.log(`Found ${cycles.length} cycles:`, cycles);
    
    const posCounts = {};
    const categories = new Set();
    const wordDuplicates = {};
    const issues = [];
    
    let totalWords = 0;
    
    cycles.forEach(cycle => {
        const words = vocab[cycle];
        if (!Array.isArray(words)) {
            issues.push({
                severity: 'HIGH',
                type: 'INVALID_CYCLE',
                message: `Cycle "${cycle}" is not an array.`
            });
            return;
        }
        
        console.log(`Cycle "${cycle}": ${words.length} words`);
        
        words.forEach((word, index) => {
            totalWords++;
            const wordRef = `[${cycle}][Word #${index + 1}: ${word.kr || 'MISSING_KR'}]`;
            
            // Check required fields
            if (!word.kr) {
                issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${wordRef} is missing "kr" (Korean word).` });
            }
            if (!word.en) {
                issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${wordRef} is missing "en" (English translation).` });
            }
            if (!word.zh) {
                issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${wordRef} is missing "zh" (Chinese translation).` });
            }
            if (!word.pos) {
                issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${wordRef} is missing "pos" (Part of Speech).` });
            }
            
            // Collect categories and POS
            if (word.pos) {
                posCounts[word.pos] = (posCounts[word.pos] || 0) + 1;
            }
            if (word.category) {
                categories.add(word.category);
            }
            
            // Duplicate word check within cycle
            if (word.kr) {
                if (!wordDuplicates[word.kr]) {
                    wordDuplicates[word.kr] = [];
                }
                wordDuplicates[word.kr].push({ cycle, index, word });
            }
            
            // Check spelling/character consistency
            if (word.kr && !/^[가-힣ㄱ-ㅎㅏ-ㅣ0-9\s?.,!~()''""]+$/.test(word.kr)) {
                // Warning if Korean word contains non-Korean characters (except allowed ones like spaces, numbers, punctuation)
                issues.push({
                    severity: 'MEDIUM',
                    type: 'SPELLING_KOREAN',
                    message: `${wordRef} contains non-Korean characters in "kr": "${word.kr}"`
                });
            }
            
            // Check POS Consistency: e.g. "명사" (Korean) vs "Noun" (English), "동사" (Korean) vs "Verb" (English)
            // Ideally they should be consistent across the whole dataset.
            
            // Check sentences
            // Single sentence fields
            if (word.sentenceKr || word.sentenceMeaning || word.sentenceZh) {
                if (!word.sentenceKr) {
                    issues.push({ severity: 'MEDIUM', type: 'MISSING_SENTENCE_FIELD', message: `${wordRef} has sentence translations but is missing "sentenceKr".` });
                }
                if (!word.sentenceMeaning) {
                    issues.push({ severity: 'MEDIUM', type: 'MISSING_SENTENCE_FIELD', message: `${wordRef} has sentence but is missing "sentenceMeaning".` });
                }
                if (!word.sentenceZh) {
                    issues.push({ severity: 'MEDIUM', type: 'MISSING_SENTENCE_FIELD', message: `${wordRef} has sentence but is missing "sentenceZh".` });
                }
            }
            
            // Multiple sentences array
            if (word.sentences) {
                if (!Array.isArray(word.sentences)) {
                    issues.push({ severity: 'HIGH', type: 'INVALID_SENTENCES', message: `${wordRef} "sentences" field is not an array.` });
                } else {
                    word.sentences.forEach((s, sIndex) => {
                        const sRef = `${wordRef}[Sentence #${sIndex + 1}]`;
                        if (!s.kr) issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_FIELD', message: `${sRef} missing "kr".` });
                        if (!s.en) issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_FIELD', message: `${sRef} missing "en".` });
                        if (!s.zh) issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_FIELD', message: `${sRef} missing "zh".` });
                    });
                }
            }
            
            // Check illustrationUrl format
            if (word.illustrationUrl) {
                if (!word.illustrationUrl.startsWith('/illustrations/')) {
                    issues.push({
                        severity: 'LOW',
                        type: 'ILLUSTRATION_PATH',
                        message: `${wordRef} illustrationUrl "${word.illustrationUrl}" does not start with "/illustrations/".`
                    });
                }
            }
        });
    });
    
    // Report duplicates
    Object.keys(wordDuplicates).forEach(kr => {
        const list = wordDuplicates[kr];
        if (list.length > 1) {
            const locations = list.map(item => `${item.cycle} (index ${item.index})`).join(', ');
            // Let's check if duplicates are in the same cycle or different cycles
            const cyclesForWord = new Set(list.map(item => item.cycle));
            if (cyclesForWord.size > 1) {
                issues.push({
                    severity: 'LOW',
                    type: 'DUPLICATE_WORD_CROSS_CYCLE',
                    message: `Word "${kr}" appears in multiple cycles: ${locations}`
                });
            } else {
                issues.push({
                    severity: 'MEDIUM',
                    type: 'DUPLICATE_WORD_SAME_CYCLE',
                    message: `Word "${kr}" is duplicated in the same cycle: ${locations}`
                });
            }
        }
    });
    
    console.log('\n--- AUDIT RESULTS ---');
    console.log(`Total words audited: ${totalWords}`);
    console.log('POS distribution:', posCounts);
    console.log('Categories count:', categories.size);
    
    const highIssues = issues.filter(i => i.severity === 'HIGH');
    const mediumIssues = issues.filter(i => i.severity === 'MEDIUM');
    const lowIssues = issues.filter(i => i.severity === 'LOW');
    
    console.log(`\nIssues Found: ${issues.length} (${highIssues.length} High, ${mediumIssues.length} Medium, ${lowIssues.length} Low)`);
    
    if (issues.length > 0) {
        console.log('\nDetailed Issues:');
        issues.forEach((issue, idx) => {
            console.log(`[${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
        });
    } else {
        console.log('No issues found!');
    }
}

runAudit();
