const fs = require('fs');
const path = require('path');

async function run() {
    const rawCsv = fs.readFileSync(path.join(__dirname, 'raw_vocab.csv'), 'utf-8');
    const lines = rawCsv.split('\n').filter(line => line.trim() !== '' && line !== '수준,어휘,길잡이말,품사');
    
    let existingFile = fs.readFileSync(path.join(__dirname, '../src/lib/vocabulary-data.ts'), 'utf-8');
    
    // We can't cleanly import MOCK_VOCABULARY from JS without transpiling. 
    // So let's extract it via a quick eval
    
    // Replace export const MOCK_VOCABULARY... with just a variable assignment
    const match = existingFile.match(/(?:export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
    if (!match) {
        console.error("Could not find MOCK_VOCABULARY in vocabulary-data.ts");
        return;
    }
    
    let dictStr = match[1];
    
    // Eval is slightly dangerous but it's our own code. 
    // Wait, the dict string might contain properties that aren't quoted. 
    // JSON.parse requires strict JSON. Eval can parse JS objects.
    let MOCK_VOCABULARY;
    try {
        MOCK_VOCABULARY = eval('(' + dictStr + ')');
    } catch (e) {
        console.error("Failed to eval MOCK_VOCABULARY", e);
        return;
    }

    // Build a dictionary of existing words from MOCK_VOCABULARY
    const dict = new Map();
    for (const key of Object.keys(MOCK_VOCABULARY)) {
        for (const word of MOCK_VOCABULARY[key]) {
            // Strip numbers from existing kr if any
            const strippedKr = word.kr.replace(/\d+$/, '');
            dict.set(strippedKr, word);
            dict.set(word.kr, word);
        }
    }

    const newVocabulary = {};
    let cycleIndex = 1;
    let currentCycle = [];
    const WORDS_PER_CYCLE = 112; // 14 days * 8 words

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length < 4) continue;
        
        const rawKr = parts[1].trim();
        const hint = parts[2].trim();
        const posStr = parts[3].trim();
        
        const cleanKr = rawKr.replace(/\d+$/, '');
        
        // Find existing translation
        let wordData = dict.get(rawKr) || dict.get(cleanKr);
        
        if (wordData) {
            currentCycle.push({
                ...wordData,
                kr: cleanKr
            });
        } else {
            currentCycle.push({
                kr: cleanKr,
                en: "TBD",
                zh: "TBD",
                pos: posStr,
                sentenceKr: hint ? `${cleanKr} ${hint}` : undefined,
                sentenceMeaning: "TBD",
                sentenceZh: "TBD"
            });
        }

        if (currentCycle.length === WORDS_PER_CYCLE || i === lines.length - 1) {
            newVocabulary[`beginner_cycle_${cycleIndex}`] = currentCycle;
            cycleIndex++;
            currentCycle = [];
        }
    }
    
    // Add any missing cycles from the original MOCK_VOCABULARY that aren't beginner_cycle_X
    for (const key of Object.keys(MOCK_VOCABULARY)) {
        if (!key.startsWith('beginner_cycle_') && !newVocabulary[key]) {
            newVocabulary[key] = MOCK_VOCABULARY[key];
        }
    }

    const newVocabString = JSON.stringify(newVocabulary, null, 4)
        .replace(/"([^"]+)":/g, '$1:'); // remove quotes around keys to match typical TS styling

    const regex = /(export const MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)\{[\s\S]*?\};/;
    const newContent = existingFile.replace(regex, `$1${newVocabString};`);
    
    fs.writeFileSync(path.join(__dirname, '../src/lib/vocabulary-data.ts'), newContent);
    console.log(`Updated vocabulary-data.ts with ${cycleIndex - 1} beginner cycles.`);
}

run();
