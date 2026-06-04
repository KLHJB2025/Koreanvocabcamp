const fs = require('fs');
const files = fs.readdirSync('public/audio/sentences');
console.log('Total files:', files.length);
console.log('Example files:', files.slice(0, 10));
console.log('Includes 고르다.mp3:', files.includes('고르다.mp3'));
