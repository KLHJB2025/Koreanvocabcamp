const fs = require('fs');
const path = require('path');

const suspicious = require('./suspicious_sentences.json');
suspicious.slice(0, 40).forEach((x, i) => {
    console.log(`${i+1}. [${x.cycleId}] Word: ${x.word} | Pos: ${x.pos}
   Kr: "${x.sentenceKr}"
   En: "${x.sentenceMeaning}"
   Zh: "${x.sentenceZh}"`);
});
