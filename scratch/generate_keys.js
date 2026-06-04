const { MOCK_VOCABULARY } = require('../src/lib/vocabulary-data.ts');
const mockCycle = MOCK_VOCABULARY['beginner_cycle_1'];
const totalWords = mockCycle.length;
const wordsPerDay = Math.ceil(totalWords / 14);

for (let day = 1; day <= 14; day++) {
    const start = (day - 1) * wordsPerDay;
    const end = Math.min(start + wordsPerDay, totalWords);
    const dayWords = mockCycle.slice(start, end);
    const key = dayWords.map(w => w.kr).sort().join(',');
    console.log(`Day ${day} key: "${key}"`);
}
