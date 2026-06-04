const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

const matches = fileContent.match(/\"[a-zA-Z0-9_\-]+\"\:\s*\[/g);
if (matches) {
    console.log("Cycles found:", matches.map(m => m.replace(/\"|\:\s*\[/g, '')));
} else {
    console.log("No matches found");
}
