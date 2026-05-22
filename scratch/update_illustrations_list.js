const fs = require('fs');
const path = require('path');

const wordsDir = path.join(__dirname, '..', 'public', 'illustrations', 'words');
const outputFile = path.join(__dirname, '..', 'src', 'lib', 'downloaded-illustrations.ts');

try {
    if (!fs.existsSync(wordsDir)) {
        console.error(`Directory does not exist: ${wordsDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(wordsDir);
    const words = files
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
        .map(f => path.basename(f, path.extname(f)));

    const content = `export const DOWNLOADED_ILLUSTRATIONS = new Set(${JSON.stringify(words, null, 2)});
`;

    fs.writeFileSync(outputFile, content, 'utf8');
    console.log(`Successfully updated ${outputFile} with ${words.length} illustrations.`);
} catch (error) {
    console.error('Error updating illustrations list:', error);
}
