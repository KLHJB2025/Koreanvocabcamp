const fs = require('fs');
const path = require('path');

const dump = JSON.parse(fs.readFileSync('scratch/spacing_issues_dump.json', 'utf8'));

function fixSpacing(sentence, word) {
    if (!sentence) return sentence;
    let fixed = sentence;
    
    // Replace multiple spaces with a single space first
    fixed = fixed.replace(/\s+/g, ' ');
    
    const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '으로', '와', '과', '의', '도', '만'];
    
    particles.forEach(p => {
        const regex = new RegExp(`\\s(${p})(?=\\s|[\\.,\\?!~]|$|다)`, 'g');
        
        fixed = fixed.replace(regex, (match, particle, offset) => {
            // Check exceptions:
            if (particle === '만') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('원') || after.startsWith('국') || after.startsWith('세')) {
                    return match;
                }
                if (fixed.includes('만 원')) {
                    return match;
                }
            }
            
            if (particle === '서') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('있') || after.startsWith('서') || after.startsWith('다') || after.startsWith('안')) {
                    return match;
                }
            }
            
            if (particle === '이') {
                const after = fixed.substring(offset + match.length).trim();
                const determinerNouns = ['약', '책', '사람', '것', '곳', '씨', '킬로그램', 'kg', '나라', '번', '해', '차례', '가지'];
                if (determinerNouns.some(n => after.startsWith(n))) {
                    return match;
                }
            }
            
            if (particle === '가') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('다') || after.startsWith('지') || after.startsWith('요') || after.startsWith('왔') || after.startsWith('갔')) {
                    return match;
                }
            }
            
            return particle;
        });
    });
    
    return fixed;
}

let unchanged = 0;
let changed = 0;

dump.forEach(item => {
    const fixed = fixSpacing(item.sentenceKr, item.word);
    if (fixed === item.sentenceKr) {
        unchanged++;
        console.log(`[UNCHANGED] ${item.word}: "${item.sentenceKr}"`);
    } else {
        changed++;
        console.log(`[CHANGED] ${item.word}: "${item.sentenceKr}" => "${fixed}"`);
    }
});

console.log(`\nSummary: Changed ${changed}, Unchanged (exceptions) ${unchanged}`);
