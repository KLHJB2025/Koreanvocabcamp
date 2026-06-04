const fs = require('fs');
const path = require('path');

const wordPath = 'public/audio/words/고르다.mp3';
const sentencePath = 'public/audio/sentences/고르다.mp3';

console.log('Word file exists:', fs.existsSync(wordPath));
if (fs.existsSync(wordPath)) {
    console.log('Word file size:', fs.statSync(wordPath).size);
}

console.log('Sentence file exists:', fs.existsSync(sentencePath));
if (fs.existsSync(sentencePath)) {
    console.log('Sentence file size:', fs.statSync(sentencePath).size);
}
