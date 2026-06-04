const fs = require('fs');

const { MOCK_VOCABULARY } = require('../src/lib/vocabulary-data.ts');
const mockCycle = MOCK_VOCABULARY['beginner_cycle_1'];
const totalWords = mockCycle.length;
const wordsPerDay = Math.ceil(totalWords / 14);

async function fetchStory(prompt) {
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?jsonMode=true&model=openai`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        // Parse the JSON returned
        const braceMatch = text.match(/\{[\s\S]*\}/);
        if (braceMatch) {
            return JSON.parse(braceMatch[0]);
        }
        return JSON.parse(text);
    } catch (e) {
        console.error("Fetch error:", e.message);
        return null;
    }
}

async function run() {
    const results = {};

    for (let day = 1; day <= 14; day++) {
        const start = (day - 1) * wordsPerDay;
        const end = Math.min(start + wordsPerDay, totalWords);
        const dayWords = mockCycle.slice(start, end);
        
        console.log(`\nGenerating Day ${day}...`);
        
        // Chinese prompt
        const zhWordList = dayWords.map(w => `${w.kr}(${w.zh})`).join(', ');
        const zhPrompt = `用中文写一个逻辑通顺、情感自然生动且画面感强的小故事或生活日记（最多180字）。必须自然融入以下所有词汇，并严格保持“韩语(中文)”的格式（例如“在一年的四个 계절(季节) 中，我最喜欢的是 겨울(冬天)。”）。不要强行堆砌，让情境合情合理。生词列表：${zhWordList}。输出JSON格式：{"title":"故事标题", "story":"故事内容"}。不要包含任何markdown或额外说明，直接返回JSON。`;
        
        // English prompt
        const enWordList = dayWords.map(w => `${w.kr}(${w.en})`).join(', ');
        const enPrompt = `Write a short, highly logical and natural story or diary in English (max 150 words). Naturally integrate all these vocabulary words, strictly keeping the "Korean(English)" format (e.g., "Among the four 계절(seasons) of the year, my favorite is 겨울(winter)."). Avoid forced connections; make the context realistic. Vocabulary: ${enWordList}. Output JSON format: {"title":"story title", "story":"story text"}. No markdown, no explanation, just raw JSON.`;
        
        let zhStory = null;
        let enStory = null;
        
        // Retry a couple of times if it fails
        for (let attempt = 1; attempt <= 3; attempt++) {
            console.log(`  Chinese attempt ${attempt}...`);
            zhStory = await fetchStory(zhPrompt);
            if (zhStory && zhStory.title && zhStory.story) break;
            await new Promise(r => setTimeout(r, 1000));
        }
        
        for (let attempt = 1; attempt <= 3; attempt++) {
            console.log(`  English attempt ${attempt}...`);
            enStory = await fetchStory(enPrompt);
            if (enStory && enStory.title && enStory.story) break;
            await new Promise(r => setTimeout(r, 1000));
        }
        
        results[`day_${day}`] = {
            words: dayWords.map(w => w.kr),
            zh: zhStory || { title: "学习日记", story: `未生成。词汇：${zhWordList}` },
            en: enStory || { title: "Study Diary", story: `Not generated. Vocabulary: ${enWordList}` }
        };
        
        console.log(`  Day ${day} Chinese Title: ${results[`day_${day}`].zh.title}`);
        console.log(`  Day ${day} English Title: ${results[`day_${day}`].en.title}`);
        
        // Sleep to avoid rate limiting
        await new Promise(r => setTimeout(r, 1500));
    }
    
    fs.writeFileSync('d:\\单词网站\\scratch\\draft_stories.json', JSON.stringify(results, null, 2), 'utf-8');
    console.log('\nAll days draft generated successfully!');
}

run();
