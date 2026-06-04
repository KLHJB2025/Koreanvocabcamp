const fs = require('fs');
const path = require('path');

// Reusable loader for vocabulary data
function loadVocabularyData() {
    const filePath = path.join(__dirname, '..', 'src', 'lib', 'vocabulary-data.ts');
    if (!fs.existsSync(filePath)) {
        throw new Error(`Vocabulary data file not found at: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    
    const startIndex = content.indexOf('export const MOCK_VOCABULARY');
    if (startIndex === -1) {
        throw new Error('Could not find MOCK_VOCABULARY definition in vocabulary-data.ts');
    }
    
    const declStart = content.indexOf('=', startIndex);
    if (declStart === -1) {
        throw new Error('Could not find assignment in MOCK_VOCABULARY');
    }
    
    let jsCode = content.substring(declStart + 1).trim();
    if (jsCode.endsWith(';')) {
        jsCode = jsCode.substring(0, jsCode.length - 1);
    }
    
    try {
        const vocab = eval('(' + jsCode + ')');
        return vocab;
    } catch (err) {
        console.error('Error evaluating vocabulary data:', err);
        throw err;
    }
}

function auditCamp1() {
    console.log('--- STARTING CAMP 1 AUDIT ---');
    const vocab = loadVocabularyData();
    const camp1Words = vocab['beginner_cycle_1'];
    
    if (!camp1Words) {
        console.error('Could not find beginner_cycle_1 in vocabulary data');
        return;
    }
    
    console.log(`Found ${camp1Words.length} words in Camp 1 (beginner_cycle_1).`);
    
    // Check downloaded-illustrations
    const downloadedIllusPath = path.join(__dirname, '..', 'src', 'lib', 'downloaded-illustrations.ts');
    const downloadedIllusContent = fs.readFileSync(downloadedIllusPath, 'utf8');
    const downloadedIllus = new Set();
    // Parse words from downloaded-illustrations
    const arrayMatch = downloadedIllusContent.match(/new Set\(\[([\s\S]*?)\]\)/);
    if (arrayMatch) {
        arrayMatch[1].split(',').forEach(item => {
            const trimmed = item.trim().replace(/['"]/g, '');
            if (trimmed) downloadedIllus.add(trimmed);
        });
    }
    
    const wordsDir = path.join(__dirname, '..', 'public', 'audio', 'words');
    const sentencesDir = path.join(__dirname, '..', 'public', 'audio', 'sentences');
    const illusDir = path.join(__dirname, '..', 'public', 'illustrations', 'words');
    
    const issues = [];
    
    camp1Words.forEach((word, idx) => {
        const cleanName = word.kr.replace(/[<>:"/\\|?*]/g, '');
        
        // 1. Check word audio
        const wordAudioFile = path.join(wordsDir, `${cleanName}.mp3`);
        if (!fs.existsSync(wordAudioFile)) {
            issues.push({
                word: word.kr,
                type: 'WORD_AUDIO_MISSING',
                message: `Word audio missing: public/audio/words/${cleanName}.mp3`
            });
        } else {
            const stats = fs.statSync(wordAudioFile);
            if (stats.size === 0) {
                issues.push({
                    word: word.kr,
                    type: 'WORD_AUDIO_EMPTY',
                    message: `Word audio is 0 bytes: public/audio/words/${cleanName}.mp3`
                });
            }
        }
        
        // 2. Check sentence audio
        const sentenceAudioFile = path.join(sentencesDir, `${cleanName}.mp3`);
        if (!fs.existsSync(sentenceAudioFile)) {
            issues.push({
                word: word.kr,
                type: 'SENTENCE_AUDIO_MISSING',
                message: `Sentence audio missing: public/audio/sentences/${cleanName}.mp3`
            });
        } else {
            const stats = fs.statSync(sentenceAudioFile);
            if (stats.size === 0) {
                issues.push({
                    word: word.kr,
                    type: 'SENTENCE_AUDIO_EMPTY',
                    message: `Sentence audio is 0 bytes: public/audio/sentences/${cleanName}.mp3`
                });
            } else if (fs.existsSync(wordAudioFile)) {
                const wordStats = fs.statSync(wordAudioFile);
                if (wordStats.size === stats.size) {
                    issues.push({
                        word: word.kr,
                        type: 'IDENTICAL_WORD_SENTENCE_AUDIO',
                        message: `Sentence audio size identical to word audio (${stats.size} bytes): ${word.kr}`
                    });
                }
            }
        }
        
        // 3. Check illustration
        let illustrationUrl = word.illustrationUrl;
        let isLocal = false;
        let localPath = '';
        
        if (illustrationUrl) {
            // Static illustration defined
            localPath = path.join(__dirname, '..', 'public', illustrationUrl.replace(/^\//, ''));
            isLocal = true;
        } else if (downloadedIllus.has(word.kr)) {
            localPath = path.join(illusDir, `${word.kr}.jpg`);
            isLocal = true;
        }
        
        if (isLocal) {
            if (!fs.existsSync(localPath)) {
                issues.push({
                    word: word.kr,
                    type: 'LOCAL_ILLUSTRATION_MISSING',
                    message: `Local illustration file missing at: ${localPath}`
                });
            } else {
                const stats = fs.statSync(localPath);
                if (stats.size === 0) {
                    issues.push({
                        word: word.kr,
                        type: 'LOCAL_ILLUSTRATION_EMPTY',
                        message: `Local illustration is 0 bytes: ${localPath}`
                    });
                }
            }
        } else {
            // Abstract/Concrete fallback illustration
            // Check if there is a spelling mistake in sentenceMeaning or en meaning
            if (!word.en || word.en === 'TBD') {
                issues.push({
                    word: word.kr,
                    type: 'MISSING_ENGLISH_MEANING',
                    message: `Missing English meaning for dynamic image generation: ${word.kr}`
                });
            }
        }
    });
    
    console.log(`\nCamp 1 Audit Completed with ${issues.length} issue(s).`);
    issues.forEach(issue => {
        console.log(`- [${issue.type}] ${issue.word}: ${issue.message}`);
    });
}

auditCamp1();
