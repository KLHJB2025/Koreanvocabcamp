const fs = require('fs');
const path = require('path');

const dump = JSON.parse(fs.readFileSync('scratch/spacing_issues_dump.json', 'utf8'));

const particleTypes = {};
dump.forEach(item => {
    if (!particleTypes[item.particle]) {
        particleTypes[item.particle] = [];
    }
    particleTypes[item.particle].push(item);
});

for (const p in particleTypes) {
    console.log(`\n--- Particle: ${p} (${particleTypes[p].length} cases) ---`);
    particleTypes[p].slice(0, 15).forEach(x => {
        console.log(`[${x.cycleId}] ${x.word} => "${x.sentenceKr}"`);
    });
}
