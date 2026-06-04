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

function auditCycle2() {
    console.log('--- AUDITING CYCLE 2 VOCABULARY & AUDIO & ILLUSTRATION ---');
    const vocab = loadVocabularyData();
    const cycle2 = vocab['beginner_cycle_2'];
    
    if (!cycle2) {
        console.error("Cycle 2 data not found!");
        process.exit(1);
    }
    
    console.log(`Auditing ${cycle2.length} words in beginner_cycle_2...`);
    
    const issues = [];
    const wordsDir = path.join(__dirname, '../public/audio/words');
    const sentencesDir = path.join(__dirname, '../public/audio/sentences');
    
    let localIllusCount = 0;
    let directIllusCount = 0;
    
    const downloadedSet = new Set([
      "가장", "가져가다", "가져오다", "가지", "가지다", "각각", "간단하다", "간단히", "간장", "갈비",
      "갈비탕", "갈색", "갈아입다", "갈아타다", "감", "감기", "감기약", "감다", "감사", "감자",
      "갑자기", "값", "강하다", "갖다", "같다", "같이", "갚다", "개", "개월", "거",
      "거기", "거리", "거실", "거울", "거의", "거절", "거짓말", "걱정", "건너가다", "건너다",
      "건물", "걷다", "걸다", "걸리다", "걸어가다", "걸어오다", "검사", "게으르다", "겨울", "결심",
      "결혼", "결혼식", "경기", "경찰", "경찰서", "경치", "경험", "계단", "계란", "계산",
      "계속", "계시다", "계절", "계획", "고개", "고기", "고등학교", "고등학생", "고르다", "고맙다",
      "고모", "고민", "고속버스", "고장", "고추장", "공부", "공책", "과일", "과자", "괴로워하다",
      "교과서", "교사", "교실", "교육", "국", "국수", "권", "그리다", "끝", "넘다",
      "달걀", "돕다", "말", "못생기다", "사이다"
    ]);

    cycle2.forEach((word, index) => {
        const ref = `[beginner_cycle_2][Word #${index + 1}: ${word.kr || 'MISSING'}]`;
        
        // 1. Check spelling and basic fields
        if (!word.kr) issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${ref} is missing "kr".` });
        if (!word.en) issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${ref} is missing "en".` });
        if (!word.zh) issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${ref} is missing "zh".` });
        if (!word.pos) issues.push({ severity: 'HIGH', type: 'MISSING_FIELD', message: `${ref} is missing "pos".` });
        
        if (word.kr) {
            // Unsafe characters in Korean spelling
            if (!/^[가-힣ㄱ-ㅎㅏ-ㅣ0-9\s?.,!~()''""]+$/.test(word.kr.replace(/^-|-$/g, ''))) {
                issues.push({ severity: 'MEDIUM', type: 'SPELLING_KOREAN', message: `${ref} contains non-Korean characters: "${word.kr}"` });
            }
        }
        
        // 2. Check sentences
        if (word.sentenceKr) {
            if (!word.sentenceMeaning) {
                issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_EN', message: `${ref} has sentenceKr but is missing sentenceMeaning.` });
            }
            if (!word.sentenceZh) {
                issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_ZH', message: `${ref} has sentenceKr but is missing sentenceZh.` });
            }
        } else {
            issues.push({ severity: 'MEDIUM', type: 'MISSING_SENTENCE_KR', message: `${ref} does not have an example sentence.` });
        }
        
        // 3. Audio files check
        if (word.kr) {
            const cleanName = word.kr.replace(/[<>:"/\\|?*]/g, '');
            const expectedWordFile = path.join(wordsDir, `${cleanName}.mp3`);
            const expectedSentFile = path.join(sentencesDir, `${cleanName}.mp3`);
            
            if (!fs.existsSync(expectedWordFile)) {
                issues.push({ severity: 'HIGH', type: 'MISSING_WORD_AUDIO', message: `${ref}: Missing word audio file "${cleanName}.mp3".` });
            } else {
                const size = fs.statSync(expectedWordFile).size;
                if (size === 0) issues.push({ severity: 'HIGH', type: 'EMPTY_WORD_AUDIO', message: `${ref}: Word audio file is 0 bytes.` });
            }
            
            if (word.sentenceKr) {
                if (!fs.existsSync(expectedSentFile)) {
                    issues.push({ severity: 'HIGH', type: 'MISSING_SENTENCE_AUDIO', message: `${ref}: Missing sentence audio file "${cleanName}.mp3".` });
                } else {
                    const size = fs.statSync(expectedSentFile).size;
                    if (size === 0) issues.push({ severity: 'HIGH', type: 'EMPTY_SENTENCE_AUDIO', message: `${ref}: Sentence audio file is 0 bytes.` });
                }
            }
        }
        
        // 4. Illustrations audit
        if (word.illustrationUrl) {
            directIllusCount++;
        } else if (downloadedSet.has(word.kr)) {
            localIllusCount++;
        }
    });
    
    console.log(`\nAudit finished for Cycle 2.`);
    console.log(`- Total words: ${cycle2.length}`);
    console.log(`- Words with direct illustrationUrls: ${directIllusCount}`);
    console.log(`- Words with local preloaded illustrations: ${localIllusCount}`);
    console.log(`- Total issues found: ${issues.length}`);
    
    if (issues.length > 0) {
        console.log('\nDetailed Issues:');
        issues.forEach((issue, idx) => {
            console.log(`[${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
        });
    } else {
        console.log('No spelling, translation, audio, or metadata errors found in Cycle 2!');
    }
}

auditCycle2();
