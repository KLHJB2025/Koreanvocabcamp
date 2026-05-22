import { MOCK_VOCABULARY, Word } from '../src/lib/vocabulary-data';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
    const rawCsv = fs.readFileSync(path.join(__dirname, 'raw_vocab.csv'), 'utf-8');
    const lines = rawCsv.split('\n').filter(line => line.trim() !== '' && line !== '수준,어휘,길잡이말,품사');
    
    // Build a dictionary of existing words from MOCK_VOCABULARY
    const dict = new Map<string, Word>();
    for (const key of Object.keys(MOCK_VOCABULARY)) {
        for (const word of MOCK_VOCABULARY[key]) {
            // Strip numbers from existing kr if any
            const strippedKr = word.kr.replace(/\d+$/, '');
            dict.set(strippedKr, word);
            dict.set(word.kr, word);
        }
    }

    const newVocabulary: { [key: string]: Word[] } = {};
    let cycleIndex = 1;
    let currentCycle: Word[] = [];
    const WORDS_PER_CYCLE = 112; // 14 days * 8 words

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length < 4) continue;
        
        const rawKr = parts[1].trim(); // e.g. 가게, 가격03
        const hint = parts[2].trim();
        const posStr = parts[3].trim();
        
        const cleanKr = rawKr.replace(/\d+$/, '');
        
        // Find existing translation
        let wordData = dict.get(rawKr) || dict.get(cleanKr);
        
        if (wordData) {
            // Found existing! We'll just clone it but ensure kr is clean
            currentCycle.push({
                ...wordData,
                kr: cleanKr // use clean word
            });
        } else {
            // Missing word. Create placeholder
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

    // Now, we want to update vocabulary-data.ts. 
    // We shouldn't lose the cycles > cycleIndex if they exist, or maybe the user just wants us to overwrite beginner cycles?
    // Let's just output the new MOCK_VOCABULARY JSON string.
    
    let existingFile = fs.readFileSync(path.join(__dirname, '../src/lib/vocabulary-data.ts'), 'utf-8');
    
    // Convert newVocabulary to string
    const newVocabString = JSON.stringify(newVocabulary, null, 4)
        // clean up quotes on keys
        .replace(/"([^"]+)":/g, '$1:');

    // Replace everything from export const MOCK_VOCABULARY
    const regex = /(export const MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)\{[\s\S]*?\};/;
    const newContent = existingFile.replace(regex, `$1${newVocabString};`);
    
    fs.writeFileSync(path.join(__dirname, '../src/lib/vocabulary-data.ts'), newContent);
    console.log(`Updated vocabulary-data.ts with ${cycleIndex - 1} beginner cycles.`);
}

run();
