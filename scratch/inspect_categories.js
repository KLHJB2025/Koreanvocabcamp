const { MOCK_VOCABULARY } = require('../src/lib/vocabulary-data');

const categories = {};
const emptyCategories = [];
let totalWords = 0;

for (const [cycle, words] of Object.entries(MOCK_VOCABULARY)) {
    for (const w of words) {
        totalWords++;
        if (w.category) {
            categories[w.category] = (categories[w.category] || 0) + 1;
        } else {
            emptyCategories.push(w.kr);
        }
    }
}

console.log('Total words:', totalWords);
console.log('Categories distribution:', JSON.stringify(categories, null, 2));
console.log('Words without category:', emptyCategories.length);
