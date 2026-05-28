import { Word } from './vocabulary-data';
import { getPredefinedStory } from './predefined-stories';


export interface ScenarioTemplate {
    id: string;
    name: string;
    intro: (lang: 'en' | 'zh', mascotName?: string) => string;
    dialogue: {
        speaker: 'Mascot' | 'Friend' | 'Shopkeeper';
        text: (lang: 'en' | 'zh', words: Record<string, string>, mascotName?: string) => string;
        missingWordCategory: string;
        correctWord: string;
    }[];
}

export const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
    {
        id: 'daily_errand',
        name: 'The Daily Errand',
        intro: (lang, mascotName) => lang === 'zh' ? `今天${mascotName || '小步'}有很多事情要做！` : `There are many things for ${mascotName || 'Boopi'} to do today!`,
        dialogue: [
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh' 
                    ? `我们需要去一个${words.place || '___'}买点东西。` 
                    : `We need to go to a ${words.place || '___'} to buy some things.`,
                missingWordCategory: 'place',
                correctWord: ''
            },
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh' 
                    ? `这个${words.object || '物品'}的${words.property || '价格'}是多少？` 
                    : `How much is the ${words.property || 'price'} of this ${words.object || 'item'}?`,
                missingWordCategory: 'property',
                correctWord: ''
            }
        ]
    },
    {
        id: 'express_feeling',
        name: 'Sharing Feelings',
        intro: (lang, mascotName) => lang === 'zh' ? `和好朋友聊聊感受。` : `Talking about feelings with a friend.`,
        dialogue: [
            {
                speaker: 'Friend',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `${mascotName || '朋友'}，你今天感觉怎么样？`
                    : `${mascotName || 'Friend'}, how are you feeling today?`,
                missingWordCategory: '',
                correctWord: 'skip'
            },
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `我觉得非常${words.feeling || '___'}。`
                    : `I feel very ${words.feeling || '___'}.`,
                missingWordCategory: 'feeling',
                correctWord: ''
            },
            {
                speaker: 'Friend',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `为什么呢？`
                    : `Why is that?`,
                missingWordCategory: '',
                correctWord: 'skip'
            },
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `因为这个${words.object || '___'}太漂亮了！`
                    : `Because this ${words.object || '___'} is so beautiful!`,
                missingWordCategory: 'object',
                correctWord: ''
            }
        ]
    },
    {
        id: 'action_day',
        name: 'A Busy Day',
        intro: (lang, mascotName) => lang === 'zh' ? `繁忙的一天开始了！` : `A busy day begins!`,
        dialogue: [
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `我打算今天${words.action || '___'}。`
                    : `I plan to ${words.action || '___'} today.`,
                missingWordCategory: 'action',
                correctWord: ''
            },
            {
                speaker: 'Mascot',
                text: (lang, words, mascotName) => lang === 'zh'
                    ? `那里真的很${words.description || '___'}。`
                    : `It is really ${words.description || '___'} there.`,
                missingWordCategory: 'description',
                correctWord: ''
            }
        ]
    }
];

export function buildScenario(words: Word[], lang: 'en' | 'zh', mascotName?: string) {
    // Pick words by category or POS fallback
    const categoryMap: Record<string, Word> = {};
    
    // Sort words to prioritize ones with explicit categories
    const sortedWords = [...words].sort((a, b) => (b.category ? 1 : 0) - (a.category ? 1 : 0));

    sortedWords.forEach(w => {
        const cat = w.category || 
                   (w.pos === 'Noun' ? 'object' : 
                    w.pos === 'Verb' ? 'action' : 
                    w.pos === 'Adjective' ? 'description' : 'other');
        
        if (!categoryMap[cat]) {
            categoryMap[cat] = w;
        }
    });

    // Create a simplified words map for the text function
    const wordsForTemplate: Record<string, string> = {};
    Object.entries(categoryMap).forEach(([cat, word]) => {
        wordsForTemplate[cat] = lang === 'zh' ? word.zh : word.en;
    });

    // Pick a template that has at least one matching word, or pick a random one
    let template = SCENARIO_TEMPLATES[0];
    const suitableTemplates = SCENARIO_TEMPLATES.filter(t => 
        t.dialogue.some(d => d.missingWordCategory && categoryMap[d.missingWordCategory])
    );
    
    if (suitableTemplates.length > 0) {
        template = suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)];
    }
    
    const dialogue = template.dialogue.map(d => {
        if (d.correctWord === 'skip') {
            return { ...d, isSkip: true, renderedText: d.text(lang, wordsForTemplate, mascotName) };
        }
        
        const matchingWord = categoryMap[d.missingWordCategory] || words[Math.floor(Math.random() * words.length)];
        
        // Update the template words with the chosen matching word so the text and hint align
        const currentWordsForTemplate = { ...wordsForTemplate };
        currentWordsForTemplate[d.missingWordCategory] = lang === 'zh' ? matchingWord.zh : matchingWord.en;
        
        const renderedText = d.text(lang, currentWordsForTemplate, mascotName);
        
        return {
            ...d,
            renderedText,
            correctWord: matchingWord.kr,
            hint: lang === 'zh' ? matchingWord.zh : matchingWord.en,
            isSkip: false
        };
    });

    return {
        ...template,
        dialogue,
        introText: template.intro(lang, mascotName)
    };
}

export interface AIStory {
    title: string;
    story: string;
}

export function getCleanCandidate(word: Word, lang: 'zh' | 'en'): string {
    const raw = (lang === 'zh' ? word.zh : word.en || '').trim();
    if (!raw) return '';
    const cleanPart = (part: string) => {
        return part.replace(/\([^)]*\)/g, '').replace(/\（[^）]*\）/g, '').trim();
    };
    const firstPart = raw.split(/[\/,，]/)[0];
    return cleanPart(firstPart);
}

export function findTranslationInStory(
    word: Word, 
    storyText: string, 
    lang: 'zh' | 'en',
    usedIndices: Set<number> = new Set()
): { translation: string, index: number } | null {
    
    const isCleanIndex = (idx: number, len: number) => {
        for (let i = 0; i < len; i++) {
            if (usedIndices.has(idx + i)) return false;
        }
        return true;
    };

    // 1. Try to find the Korean word first
    const krWord = word.kr.trim();
    if (krWord) {
        let krIdx = -1;
        while (true) {
            krIdx = storyText.indexOf(krWord, krIdx + 1);
            if (krIdx === -1) break;
            if (isCleanIndex(krIdx, krWord.length)) {
                return {
                    translation: krWord,
                    index: krIdx
                };
            }
        }
    }

    // 2. Fallback to finding the translation (Chinese or English)
    const raw = (lang === 'zh' ? word.zh : word.en || '').trim();
    if (!raw) return null;
    
    const cleanPart = (part: string) => {
        return part.replace(/\([^)]*\)/g, '').replace(/\（[^）]*\）/g, '').trim();
    };
    
    const candidates: string[] = [];
    const parts = raw.split(/[\/,，]/);
    parts.forEach(p => {
        const cleaned = cleanPart(p);
        if (cleaned) {
            candidates.push(cleaned);
        }
    });
    
    for (const cand of candidates) {
        let idx = -1;
        const lowerStory = storyText.toLowerCase();
        const lowerCand = cand.toLowerCase();
        
        while (true) {
            if (lang === 'zh') {
                idx = storyText.indexOf(cand, idx + 1);
            } else {
                idx = lowerStory.indexOf(lowerCand, idx + 1);
            }
            
            if (idx === -1) break;
            
            if (isCleanIndex(idx, cand.length)) {
                return {
                    translation: storyText.substring(idx, idx + cand.length),
                    index: idx
                };
            }
        }
    }
    
    if (candidates.length > 0) {
        return {
            translation: candidates[0],
            index: -1
        };
    }
    
    return null;
}

function extractJson(text: string): any {
    let parsed: any = null;
    
    // Try to parse the text directly
    try {
        parsed = JSON.parse(text.trim());
    } catch {
        const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
        if (match) {
            try {
                parsed = JSON.parse(match[1].trim());
            } catch {}
        }
        if (!parsed) {
            const braceMatch = text.match(/\{[\s\S]*\}/);
            if (braceMatch) {
                try {
                    parsed = JSON.parse(braceMatch[0].trim());
                } catch {}
            }
        }
    }

    if (!parsed) {
        throw new Error('Failed to parse JSON');
    }

    // Handle nested ChatCompletion envelopes
    if (parsed.choices && parsed.choices[0]?.message?.content) {
        return extractJson(parsed.choices[0].message.content);
    }
    if (parsed.message?.content) {
        return extractJson(parsed.message.content);
    }
    if (parsed.content && typeof parsed.content === 'string') {
        try {
            return extractJson(parsed.content);
        } catch {}
    }

    // Check if it has the required fields
    if (parsed.title && parsed.story) {
        return parsed;
    }

    throw new Error('Parsed object does not contain title and story');
}

function classifyWord(w: Word, lang: 'zh' | 'en'): string {
    const zh = (w.zh || '').trim();
    const en = (w.en || '').toLowerCase();
    
    if (
        zh.includes('头') || zh.includes('手') || zh.includes('足') || zh.includes('脸') || 
        zh.includes('耳') || zh.includes('眼') || zh.includes('颈') || zh.includes('眉') ||
        en.includes('head') || en.includes('hand') || en.includes('foot') || en.includes('face') || 
        en.includes('ear') || en.includes('eye') || en.includes('neck') || en.includes('shoulder')
    ) {
        return 'body_part';
    }
    
    if (
        zh.includes('狗') || zh.includes('猫') || zh.includes('人') || zh.includes('友') || 
        zh.includes('师') || zh.includes('客') || zh.includes('鸟') || zh.includes('鱼') || 
        zh.includes('猪') || zh.includes('牛') || zh.includes('羊') || zh.includes('鸡') ||
        w.category === 'animal' || w.category?.includes('people') ||
        en.includes('dog') || en.includes('cat') || en.includes('puppy') || en.includes('kitten') || 
        en.includes('person') || en.includes('friend') || en.includes('teacher') || en.includes('student') || 
        en.includes('animal') || en.includes('bird') || en.includes('fish')
    ) {
        return 'companion';
    }
    
    if (
        zh.includes('江') || zh.includes('河') || zh.includes('山') || zh.includes('海') || 
        zh.includes('湖') || zh.includes('院') || zh.includes('学校') || zh.includes('公园') || 
        zh.includes('街') || zh.includes('路') || zh.includes('室') || zh.includes('馆') || 
        zh.includes('家') || zh.includes('店') || zh.includes('房') || zh.includes('车站') || 
        w.category === 'place' || w.category === 'travel' ||
        en.includes('river') || en.includes('mountain') || en.includes('sea') || en.includes('lake') || 
        en.includes('school') || en.includes('park') || en.includes('street') || en.includes('road') || 
        en.includes('room') || en.includes('station') || en.includes('shop') || en.includes('house') || 
        en.includes('place')
    ) {
        return 'place';
    }
    
    if (
        zh.includes('春') || zh.includes('夏') || zh.includes('秋') || zh.includes('冬') || 
        zh.includes('天') || zh.includes('季') || zh.includes('朝') || zh.includes('夕') || 
        zh.includes('晨') || zh.includes('晚') || zh.includes('夜') || zh.includes('日') || 
        zh.includes('时') || zh.includes('期') ||
        en.includes('spring') || en.includes('summer') || en.includes('autumn') || en.includes('winter') || 
        en.includes('morning') || en.includes('evening') || en.includes('night') || en.includes('day') || 
        en.includes('season') || en.includes('weather') || en.includes('time')
    ) {
        return 'time_season';
    }
    
    if (
        zh.includes('烦脑') || zh.includes('烦恼') || zh.includes('苦恼') || zh.includes('难过') || 
        zh.includes('伤心') || zh.includes('愁') || zh.includes('悲') || zh.includes('气') || 
        zh.includes('痛') || zh.includes('累') || zh.includes('倦') ||
        en.includes('worry') || en.includes('distress') || en.includes('sadness') || en.includes('pain') || 
        en.includes('angry') || en.includes('tired') || en.includes('difficulty')
    ) {
        return 'obstacle';
    }
    
    if (
        zh.includes('决心') || zh.includes('希望') || zh.includes('想法') || zh.includes('高兴') || 
        zh.includes('快乐') || zh.includes('满足') || zh.includes('爱') || zh.includes('喜') ||
        en.includes('resolution') || en.includes('hope') || en.includes('idea') || en.includes('happy') || 
        en.includes('joy') || en.includes('love') || en.includes('satisfaction')
    ) {
        return 'feeling';
    }
    
    if (
        w.category?.includes('food') || w.category?.includes('object') ||
        zh.includes('剪刀') || zh.includes('零食') || zh.includes('酱油') || zh.includes('排骨') ||
        zh.includes('柿子') || zh.includes('土豆') || zh.includes('鸡蛋') ||
        en.includes('scissors') || en.includes('snack') || en.includes('sauce') || en.includes('meat') || 
        en.includes('fruit') || en.includes('egg') || en.includes('vegetable')
    ) {
        return 'object';
    }
    
    return 'other';
}

interface StoryTheme {
    title: (lang: 'zh' | 'en') => string;
    intro: (lang: 'zh' | 'en') => string;
    getSentence: (clean: string, sentence: string, index: number, lang: 'zh' | 'en') => string;
}

const FALLBACK_THEMES: StoryTheme[] = [
    // Theme 0: Travel Journal
    {
        title: (lang) => lang === 'zh' ? '一天的精彩旅程' : 'A Wonderful Day\'s Journey',
        intro: (lang) => lang === 'zh' ? '今天清晨，我拉开窗帘，心中突然有了一个特别的想法。我决定来一场温习词汇的旅行。' : 'This morning, I drew the curtains and felt a sudden burst of inspiration. I decided to take a vocabulary learning journey.',
        getSentence: (clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `首先，脑海里浮现出关于“${clean}”的练习：“${sentence}”。这会是个很好的起点。`;
                if (index === 1) return `出发时，我想起如何使用“${clean}”：“${sentence}”。虽然旅途免不了劳累，但我的热情依然高涨。`;
                if (index === 2) return `一路上，看着两旁的风景，我想到了“${clean}”的例句：“${sentence}”，这让路途显得非常有趣。`;
                if (index === 3) return `路过一个小店时，橱窗上的图案让我想起“${clean}”的用法：“${sentence}”。`;
                if (index === 4) return `走累了，我坐下休息，本子上写着“${clean}”的释义：“${sentence}”。这或许就是旅行中的小确幸吧。`;
                if (index === 5) return `不远处有一位路人，这场景正符合“${clean}”的描述：“${sentence}”。`;
                if (index === 6) return `抬头望去，天边的云彩犹如“${clean}”般诗情画意：“${sentence}”。`;
                if (index === 7) return `虽然在温习“${clean}”时遇到了一点疑惑：“${sentence}”，但这次旅行收获满满。`;
                return `最后，我脑海中依然回想着关于“${clean}”的场景：“${sentence}”，为今天画上了圆满的句号。`;
            } else {
                if (index === 0) return `First, my thoughts gravitated toward "${clean}", recalling the sentence: "${sentence}". It felt like a perfect starting point.`;
                if (index === 1) return `As I set out, I remembered how to use "${clean}": "${sentence}". Despite the effort, my excitement remained high.`;
                if (index === 2) return `Wandering along the path and seeing the scenery, I reflected on "${clean}": "${sentence}". It made the walk very interesting.`;
                if (index === 3) return `Passing by a small shop, the window display reminded me of "${clean}": "${sentence}".`;
                if (index === 4) return `Feeling a bit tired, I sat down to rest, reading about "${clean}": "${sentence}". This was a pleasant discovery.`;
                if (index === 5) return `Not far away, a scene caught my eye, perfectly matching the usage of "${clean}": "${sentence}".`;
                if (index === 6) return `Looking up at the sky, the view felt as poetic as "${clean}": "${sentence}".`;
                if (index === 7) return `Although I had a minor confusion about "${clean}": "${sentence}", this journey was deeply rewarding.`;
                return `Finally, I reflected on "${clean}": "${sentence}", wrapping up a perfect day.`;
            }
        }
    },
    // Theme 1: Kitchen Cooking
    {
        title: (lang) => lang === 'zh' ? '惬意的午后厨房' : 'Cozy Kitchen Afternoon',
        intro: (lang) => lang === 'zh' ? '今天是周末，我决定下厨做一顿丰盛的午餐，顺便复习一下我的生词笔记。' : 'It is the weekend, and I decided to cook a hearty lunch in the kitchen while reviewing my vocabulary notes.',
        getSentence: (clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `系上围裙，我脑海中闪过的第一个词是“${clean}”，正如例句所写：“${sentence}”。`;
                if (index === 1) return `切菜时，我联想到了“${clean}”的用法：“${sentence}”。这让做饭变得很有意思。`;
                if (index === 2) return `锅里的汤开始沸腾，散发出香味，让我想起“${clean}”的表达：“${sentence}”。`;
                if (index === 3) return `拿调料瓶时，我顺手在便签上写下“${clean}”的记忆方法：“${sentence}”。`;
                if (index === 4) return `擦了擦手，我坐着等待出锅，翻开笔记本读到“${clean}”：“${sentence}”。`;
                if (index === 5) return `看着桌上的摆设，感觉可以用“${clean}”来形容此景：“${sentence}”。`;
                if (index === 6) return `温暖的阳光洒进厨房，这惬意的氛围正是“${clean}”的写照：“${sentence}”。`;
                if (index === 7) return `虽然今天尝试“${clean}”相关的烹饪有些许手忙脚乱：“${sentence}”，但结果非常令人期待。`;
                return `品尝着热气腾腾的佳肴，我默默记下了“${clean}”的句子：“${sentence}”。`;
            } else {
                if (index === 0) return `Putting on my apron, the first word that came to mind was "${clean}", just like the example: "${sentence}".`;
                if (index === 1) return `While chopping ingredients, I thought of "${clean}": "${sentence}". It made cooking feel like an intellectual game.`;
                if (index === 2) return `As the soup started boiling and filling the room with aroma, I recalled "${clean}": "${sentence}".`;
                if (index === 3) return `Reaching for the spices, I scribbled a note about "${clean}": "${sentence}".`;
                if (index === 4) return `Wiping my hands and waiting for the dish to simmer, I opened my book to "${clean}": "${sentence}".`;
                if (index === 5) return `Looking at the table setup, it felt like a good illustration of "${clean}": "${sentence}".`;
                if (index === 6) return `Warm sunlight streamed into the kitchen, capturing the very essence of "${clean}": "${sentence}".`;
                if (index === 7) return `Although practicing "${clean}" during cooking was slightly challenging: "${sentence}", the overall experience was rewarding.`;
                return `Tasting the delicious meal, I made a mental note of "${clean}": "${sentence}".`;
            }
        }
    },
    // Theme 2: Forest Adventure
    {
        title: (lang) => lang === 'zh' ? '奇妙的森林探险' : 'Mystical Forest Adventure',
        intro: (lang) => lang === 'zh' ? '清晨，我背起双肩包，决定在森林中进行一次充满词汇灵感的探险。' : 'In the early morning, carrying my backpack, I set out on a forest walk to find vocabulary inspiration.',
        getSentence: (clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `刚踏入树林，清新的空气让我想起“${clean}”的定义：“${sentence}”。这是一个很好的开始。`;
                if (index === 1) return `沿着小路前行，我注意到了关于“${clean}”的生动情景：“${sentence}”。`;
                if (index === 2) return `穿过一片灌木丛，我脑海中突然冒出了“${clean}”的句子：“${sentence}”。`;
                if (index === 3) return `在老树根旁小憩时，我看着四周，联想到了“${clean}”：“${sentence}”。`;
                if (index === 4) return `抬头看着树叶间洒下的光斑，想到了“${clean}”的用法：“${sentence}”。`;
                if (index === 5) return `耳边传来清脆的鸟鸣声，这场景让我想起“${clean}”的描述：“${sentence}”。`;
                if (index === 6) return `林间的微风拂面，氛围犹如“${clean}”般宁静致远：“${sentence}”。`;
                if (index === 7) return `虽然探险中遇到了关于“${clean}”的小疑惑：“${sentence}”，但大自然治愈了一切。`;
                return `在归途中，我默默回味着“${clean}”的含义，感到十分充实：“${sentence}”。`;
            } else {
                if (index === 0) return `Stepping into the woods, the fresh air reminded me of "${clean}": "${sentence}". It was a great start.`;
                if (index === 1) return `Walking along the path, I noticed a detail representing "${clean}": "${sentence}".`;
                if (index === 2) return `Pushing through the dense bushes, a sentence for "${clean}" popped up: "${sentence}".`;
                if (index === 3) return `Resting near the tree roots, I watched the forest around me and reflected on "${clean}": "${sentence}".`;
                if (index === 4) return `Looking at the sunlight filtering through the canopy, I recalled "${clean}": "${sentence}".`;
                if (index === 5) return `Hearing birds singing nearby, this lively scene reminded me of "${clean}": "${sentence}".`;
                if (index === 6) return `A gentle breeze brushed my face, creating a quiet atmosphere like "${clean}": "${sentence}".`;
                if (index === 7) return `Although I encountered a puzzle about "${clean}": "${sentence}", nature brought peace to my mind.`;
                return `On my way back, I quietly reflected on "${clean}": "${sentence}".`;
            }
        }
    },
    // Theme 3: Library Reading
    {
        title: (lang) => lang === 'zh' ? '宁静的书房午后' : 'Quiet Library Afternoon',
        intro: (lang) => lang === 'zh' ? '细雨轻敲窗台，我捧着一杯热茶，在书房里整理我的单词卡片。' : 'Rain gently tapped the window as I enjoyed a quiet library afternoon with hot tea, sorting my vocabulary cards.',
        getSentence: (clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `翻开书本的第一页，我读到了关于“${clean}”的句子：“${sentence}”。这十分引人入胜。`;
                if (index === 1) return `字里行间，我温习了“${clean}”的结构：“${sentence}”。这让我受益匪浅。`;
                if (index === 2) return `合上这一章，我把“${clean}”的用法写在书页旁作为标记：“${sentence}”。`;
                if (index === 3) return `看着杯中升腾的热气，我脑海里掠过“${clean}”的场景：“${sentence}”。`;
                if (index === 4) return `揉了揉疲倦的眼睛，我看着笔记上的“${clean}”：“${sentence}”，继续深入思考。`;
                if (index === 5) return `窗外的雨声渐渐变小，这场景让我想起书中关于“${clean}”的描写：“${sentence}”。`;
                if (index === 6) return `屋里的墨香让人沉静，仿佛进入了“${clean}”的唯美意境：“${sentence}”。`;
                if (index === 7) return `虽然理解“${clean}”的精髓需要花些心思：“${sentence}”，但读书的时光非常充实。`;
                return `合上日记，我彻底掌握了“${clean}”的含义：“${sentence}”。`;
            } else {
                if (index === 0) return `Opening the first page of the book, I read a sentence about "${clean}": "${sentence}". It was fascinating.`;
                if (index === 1) return `Between the lines, I reviewed the structure of "${clean}": "${sentence}". It was very helpful.`;
                if (index === 2) return `Finishing this chapter, I wrote a marginal note on "${clean}": "${sentence}".`;
                if (index === 3) return `Looking at my warm teacup, a scenario for "${clean}" flashed through my mind: "${sentence}".`;
                if (index === 4) return `Rubbing my tired eyes, I stared at "${clean}": "${sentence}", thinking deeper.`;
                if (index === 5) return `As the rain softened outside, it reminded me of a description of "${clean}": "${sentence}".`;
                if (index === 6) return `The scent of ink brought a calm state, resembling the mood of "${clean}": "${sentence}".`;
                if (index === 7) return `Although understanding "${clean}" took some effort: "${sentence}", it was time well spent.`;
                return `Closing the diary, I fully mastered "${clean}": "${sentence}".`;
            }
        }
    },
    // Theme 4: City Walk
    {
        title: (lang) => lang === 'zh' ? '繁华的城市漫步' : 'Scenic City Walk',
        intro: (lang) => lang === 'zh' ? '今天下午，我决定在城市的街道上进行一次漫步，并在路上寻找单词的线索。' : 'This afternoon, I decided to take a walk along the city streets, searching for vocabulary clues along the way.',
        getSentence: (clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `刚走到街角，街道上的繁华景象让我想起“${clean}”：“${sentence}”。`;
                if (index === 1) return `穿过人行横道，我注意到了一个与“${clean}”有关的城市牌匾：“${sentence}”。`;
                if (index === 2) return `路过一家复古小店，橱窗里的一幅画极其符合“${clean}”的意境：“${sentence}”。`;
                if (index === 3) return `买了一瓶凉茶，我看着包装上的标语，想到了“${clean}”：“${sentence}”。`;
                if (index === 4) return `在街角的长椅上坐下，我翻出卡片温习“${clean}”：“${sentence}”。`;
                if (index === 5) return `看到路边一位热心的行路人，这情景正是“${clean}”的生动写照：“${sentence}”。`;
                if (index === 6) return `夕阳下的街景流光溢彩，氛围就像“${clean}”般温暖人心：“${sentence}”。`;
                if (index === 7) return `虽然今天探索“${clean}”时遇到了一点疑惑：“${sentence}”，但这也是城市漫步的魅力所在。`;
                return `坐上回程的巴士，我把关于“${clean}”的句子深深记在脑海里：“${sentence}”。`;
            } else {
                if (index === 0) return `Just reaching the corner, the bustling street reminded me of "${clean}": "${sentence}".`;
                if (index === 1) return `Crossing the street, I noticed a city sign related to "${clean}": "${sentence}".`;
                if (index === 2) return `Passing an antique shop, a painting in the window matched the mood of "${clean}": "${sentence}".`;
                if (index === 3) return `Buying a cold drink, the text on the label reminded me of "${clean}": "${sentence}".`;
                if (index === 4) return `Sitting on a bench to rest, I opened my notes to review "${clean}": "${sentence}".`;
                if (index === 5) return `Seeing a kind pedestrian nearby, the scene was a perfect illustration of "${clean}": "${sentence}".`;
                if (index === 6) return `The city in the sunset was glowing, feeling as warm as "${clean}": "${sentence}".`;
                if (index === 7) return `Although I had a minor confusion about "${clean}": "${sentence}", it was all part of the city experience.`;
                return `On the bus back, I kept the usage of "${clean}" in my heart: "${sentence}".`;
            }
        }
    }
];

export function getFallbackStory(words: Word[], lang: 'zh' | 'en'): AIStory {
    const title = lang === 'zh' ? '📚 词汇学习日记' : '📚 Vocabulary Study Diary';
    
    const lines = words.map((w, index) => {
        const cleanTrans = getCleanCandidate(w, lang);
        let sentence = lang === 'zh' ? w.sentenceZh : w.sentenceMeaning;
        if (!sentence) {
            sentence = lang === 'zh' 
                ? `我们在日常生活中常常使用这个词。` 
                : `We often use this word in daily life.`;
        }
        
        // Example format: 1. 계절(季节): 韩国的春天是个美丽的季节。
        return `${index + 1}. ${w.kr}(${cleanTrans}): ${sentence.trim()}`;
    });

    return {
        title,
        story: lines.join('\n\n')
    };
}

export async function fetchAIStory(words: Word[], lang: 'zh' | 'en'): Promise<AIStory> {
    // 1. Check if there is a predefined story in the local database first
    const predefined = getPredefinedStory(words, lang);
    if (predefined) {
        return predefined;
    }

    // 2. If no predefined story exists (e.g. dynamic review session), return the structured study diary immediately.
    // This completely prevents AI failure and avoids long API load times/errors for users.
    return getFallbackStory(words, lang);
}

