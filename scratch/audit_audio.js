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

function runAudioAudit() {
    console.log('--- STARTING AUDIO FILES AUDIT ---');
    
    let vocab;
    try {
        vocab = loadVocabularyData();
    } catch (e) {
        console.error('Failed to load vocabulary data:', e.message);
        return;
    }
    
    const wordsDir = path.join(__dirname, '..', 'public', 'audio', 'words');
    const sentencesDir = path.join(__dirname, '..', 'public', 'audio', 'sentences');
    
    if (!fs.existsSync(wordsDir)) {
        console.error(`Words audio directory does not exist at: ${wordsDir}`);
        return;
    }
    if (!fs.existsSync(sentencesDir)) {
        console.error(`Sentences audio directory does not exist at: ${sentencesDir}`);
        return;
    }
    
    // Read actual files in folders
    const wordFiles = fs.readdirSync(wordsDir).filter(f => f.endsWith('.mp3'));
    const sentenceFiles = fs.readdirSync(sentencesDir).filter(f => f.endsWith('.mp3'));
    
    console.log(`Found ${wordFiles.length} actual word audio files in public/audio/words`);
    console.log(`Found ${sentenceFiles.length} actual sentence audio files in public/audio/sentences`);
    
    const wordFileSizes = {};
    const sentenceFileSizes = {};
    
    // Scan sizes and check corruption/empty
    const issues = [];
    
    wordFiles.forEach(file => {
        const filePath = path.join(wordsDir, file);
        const stats = fs.statSync(filePath);
        wordFileSizes[file] = stats.size;
        
        if (stats.size === 0) {
            issues.push({
                severity: 'HIGH',
                type: 'CORRUPTED_EMPTY_FILE',
                message: `Word audio file is empty (0 bytes): public/audio/words/${file}`
            });
        } else if (stats.size < 2048) {
            issues.push({
                severity: 'MEDIUM',
                type: 'SUSPICIOUS_FILE_SIZE',
                message: `Word audio file is extremely small (${stats.size} bytes): public/audio/words/${file}`
            });
        }
    });
    
    sentenceFiles.forEach(file => {
        const filePath = path.join(sentencesDir, file);
        const stats = fs.statSync(filePath);
        sentenceFileSizes[file] = stats.size;
        
        if (stats.size === 0) {
            issues.push({
                severity: 'HIGH',
                type: 'CORRUPTED_EMPTY_FILE',
                message: `Sentence audio file is empty (0 bytes): public/audio/sentences/${file}`
            });
        } else if (stats.size < 2048) {
            issues.push({
                severity: 'MEDIUM',
                type: 'SUSPICIOUS_FILE_SIZE',
                message: `Sentence audio file is extremely small (${stats.size} bytes): public/audio/sentences/${file}`
            });
        }
        
        // Check if sentence audio has the exact same size as the corresponding word audio
        if (wordFileSizes[file] && wordFileSizes[file] === stats.size) {
            issues.push({
                severity: 'HIGH',
                type: 'IDENTICAL_WORD_SENTENCE_AUDIO',
                message: `Sentence audio file public/audio/sentences/${file} is identical in size to word audio (${stats.size} bytes). Sentence text is likely read using the short word audio file by mistake.`
            });
        }
    });
    
    // Cross-reference with vocabulary-data.ts
    const cycles = Object.keys(vocab);
    const dbWords = new Set();
    const dbWordCleanNames = new Map(); // clean name -> raw kr word
    
    cycles.forEach(cycle => {
        vocab[cycle].forEach(word => {
            if (word.kr) {
                dbWords.add(word.kr);
                const cleanName = word.kr.replace(/[<>:"/\\|?*]/g, '');
                dbWordCleanNames.set(cleanName, word.kr);
            }
        });
    });
    
    console.log(`Total unique words defined in vocabulary-data.ts: ${dbWords.size}`);
    
    // Check missing files for words in vocabulary-data
    let missingWordsAudioCount = 0;
    let missingSentencesAudioCount = 0;
    const missingAudiosList = [];
    
    dbWordCleanNames.forEach((rawWord, cleanName) => {
        const expectedFilename = `${cleanName}.mp3`;
        
        if (!wordFileSizes[expectedFilename]) {
            missingWordsAudioCount++;
            missingAudiosList.push({
                word: rawWord,
                type: 'word',
                message: `Missing word audio file: "${expectedFilename}" for word "${rawWord}"`
            });
        }
        
        if (!wordFileSizes[expectedFilename] || !sentenceFileSizes[expectedFilename]) {
            // Wait, does the word have sentence fields?
            // Let's find the word structure in the db
            let hasSentence = false;
            for (const cycle of cycles) {
                const found = vocab[cycle].find(w => w.kr === rawWord);
                if (found && (found.sentenceKr || (found.sentences && found.sentences.length > 0))) {
                    hasSentence = true;
                    break;
                }
            }
            
            if (hasSentence && !sentenceFileSizes[expectedFilename]) {
                missingSentencesAudioCount++;
                missingAudiosList.push({
                    word: rawWord,
                    type: 'sentence',
                    message: `Missing sentence audio file: "${expectedFilename}" for word "${rawWord}"`
                });
            }
        }
    });
    
    console.log(`Missing word audios: ${missingWordsAudioCount} / ${dbWords.size}`);
    console.log(`Missing sentence audios (for words that have example sentences): ${missingSentencesAudioCount}`);
    
    // Check orphaned files (audio files that don't match any word in vocabulary-data.ts)
    const orphanedWordsAudios = [];
    const orphanedSentencesAudios = [];
    
    wordFiles.forEach(file => {
        const cleanName = file.replace('.mp3', '');
        if (!dbWordCleanNames.has(cleanName)) {
            orphanedWordsAudios.push(file);
        }
    });
    
    sentenceFiles.forEach(file => {
        const cleanName = file.replace('.mp3', '');
        if (!dbWordCleanNames.has(cleanName)) {
            orphanedSentencesAudios.push(file);
        }
    });
    
    console.log(`Orphaned word audios (files in folder but not in vocabulary-data): ${orphanedWordsAudios.length}`);
    console.log(`Orphaned sentence audios (files in folder but not in vocabulary-data): ${orphanedSentencesAudios.length}`);
    
    if (orphanedWordsAudios.length > 0) {
        console.log('Sample orphaned word audios:', orphanedWordsAudios.slice(0, 10));
    }
    
    // Add missing audios to issues list (capped to report only summaries or critical ones)
    if (missingWordsAudioCount > 0) {
        issues.push({
            severity: 'HIGH',
            type: 'MISSING_WORD_AUDIOS',
            message: `${missingWordsAudioCount} words are missing word audio files. (e.g. first 5: ${missingAudiosList.filter(a => a.type === 'word').slice(0, 5).map(a => a.word).join(', ')})`
        });
    }
    if (missingSentencesAudioCount > 0) {
        issues.push({
            severity: 'HIGH',
            type: 'MISSING_SENTENCE_AUDIOS',
            message: `${missingSentencesAudioCount} words with example sentences are missing sentence audio files. (e.g. first 5: ${missingAudiosList.filter(a => a.type === 'sentence').slice(0, 5).map(a => a.word).join(', ')})`
        });
    }
    if (orphanedWordsAudios.length > 0 || orphanedSentencesAudios.length > 0) {
        issues.push({
            severity: 'LOW',
            type: 'ORPHANED_AUDIO_FILES',
            message: `Found ${orphanedWordsAudios.length} orphaned word audios and ${orphanedSentencesAudios.length} orphaned sentence audios.`
        });
    }
    
    console.log('\n--- AUDIO AUDIT ISSUES SUMMARY ---');
    issues.forEach((issue, idx) => {
        console.log(`[${idx + 1}] [${issue.severity}] [${issue.type}] ${issue.message}`);
    });
}

runAudioAudit();
