import { MOCK_VOCABULARY } from '../src/lib/vocabulary-data';

Object.entries(MOCK_VOCABULARY).forEach(([cycle, words]) => {
    console.log(`\n=== ${cycle} (${words.length} words) ===`);
    console.log(words.map(w => `${w.kr} (${w.zh})`).join(', '));
});
