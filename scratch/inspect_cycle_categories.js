const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// We want to extract cycles and their words.
// Let's do a simple parse: split by beginner_cycle_\d+
const cycles = {};
const parts = fileContent.split(/(\bbeginner_cycle_\d+\b):\s*\[/);

for (let i = 1; i < parts.length; i += 2) {
    const cycleName = parts[i];
    const cycleContent = parts[i + 1].split(/\n\s*\]/)[0]; // get content up to matching ]
    
    // Find all objects inside
    const wordBlocks = cycleContent.split(/\{\s*\n/);
    const words = [];
    
    for (const block of wordBlocks) {
        if (!block.trim()) continue;
        const krMatch = block.match(/kr:\s*["']([^"']+)["']/);
        if (!krMatch) continue;
        const kr = krMatch[1];
        
        const catMatch = block.match(/category:\s*["']([^"']+)["']/);
        const category = catMatch ? catMatch[1] : 'none';
        
        words.push({ kr, category });
    }
    cycles[cycleName] = words;
}

for (const [cycle, words] of Object.entries(cycles)) {
    const categories = {};
    for (const w of words) {
        categories[w.category] = (categories[w.category] || 0) + 1;
    }
    console.log(`Cycle: ${cycle}, total words: ${words.length}`);
    console.log('Categories:', categories);
    console.log('---');
}
