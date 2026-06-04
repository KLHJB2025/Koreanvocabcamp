const fs = require('fs');
const path = require('path');

// We can read vocabulary-data.ts directly, or import it.
// Since it's typescript, we can either use ts-node, or just parse/extract it since it's standard JSON-like structure.
// Or we can write a script that regex matches the objects.
// Let's write a simple script that reads the file content, strips TypeScript annotations if any, and parses it or regexes it.
// Actually, let's write a script that loads the ts file by compiling it or by using regex.
// A simpler way: we can run a node command requiring ts-node, or we can compile src/lib/vocabulary-data.ts temporarily.
// Let's see if we have ts-node or if we can use babel-node, or simple regex in js.
// Let's write a regex parser for vocabulary-data.ts since it's just a big array declaration.

const filePath = path.join(__dirname, '..', 'src', 'lib', 'vocabulary-data.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Let's parse the JSON-like object
// MOCK_VOCABULARY is defined as: export const MOCK_VOCABULARY: Record<string, Word[]> = { ... }
// We can strip typescript things and evaluate it.
try {
    const jsContent = content
        .replace(/export interface Word[\s\S]*?\}/g, '')
        .replace(/export const MOCK_VOCABULARY: Record<string, Word\[\]> =/g, 'module.exports =')
        .replace(/any/g, ''); // strip some any
    
    // Write it to a temp js file
    const tempFile = path.join(__dirname, 'temp-vocab.js');
    fs.writeFileSync(tempFile, jsContent);
    const mockVocab = require(tempFile);
    fs.unlinkSync(tempFile);

    let totalWords = 0;
    let hasStaticUrl = 0;
    const allWords = [];

    for (const [cycleId, words] of Object.entries(mockVocab)) {
        console.log(`Cycle: ${cycleId}, Word count: ${words.length}`);
        totalWords += words.length;
        words.forEach(w => {
            if (w.illustrationUrl) {
                hasStaticUrl++;
            }
            allWords.push(w);
        });
    }

    console.log(`Total words across all cycles: ${totalWords}`);
    console.log(`Words with static illustrationUrls: ${hasStaticUrl}`);
    console.log(`Words needing dynamic generation: ${totalWords - hasStaticUrl}`);

} catch (err) {
    console.error('Error running count:', err);
}
