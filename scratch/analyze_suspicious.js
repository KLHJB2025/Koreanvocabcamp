const fs = require('fs');
const path = require('path');

const suspicious = require('./suspicious_sentences.json');
console.log(`Loaded ${suspicious.length} suspicious sentences.`);

const verbs = {};
suspicious.forEach(x => {
    verbs[x.lastWord] = (verbs[x.lastWord] || 0) + 1;
});

const sortedVerbs = Object.entries(verbs).sort((a, b) => b[1] - a[1]);
console.log("\nTop verb/adjective endings in dictionary form:");
sortedVerbs.slice(0, 50).forEach(([verb, count]) => {
    console.log(`- ${verb}: ${count}`);
});
