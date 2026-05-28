import { Word } from './vocabulary-data';

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

export function findTranslationInStory(word: Word, storyText: string, lang: 'zh' | 'en'): { translation: string, index: number } | null {
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
        if (lang === 'zh') {
            idx = storyText.indexOf(cand);
        } else {
            idx = storyText.toLowerCase().indexOf(cand.toLowerCase());
        }
        
        if (idx !== -1) {
            return {
                translation: storyText.substring(idx, idx + cand.length),
                index: idx
            };
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
    try {
        return JSON.parse(text.trim());
    } catch {
        const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
        if (match) {
            try {
                return JSON.parse(match[1].trim());
            } catch {}
        }
        const braceMatch = text.match(/\{[\s\S]*\}/);
        if (braceMatch) {
            try {
                return JSON.parse(braceMatch[0].trim());
            } catch {}
        }
    }
    throw new Error('Failed to parse JSON');
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

function getSentenceForWord(word: string, cat: string, index: number, lang: 'zh' | 'en'): string {
    if (lang === 'zh') {
        switch (cat) {
            case 'feeling':
                return index === 0 
                    ? `首先，我开始思考关于“${word}”的事情，感觉这会是个很好的起点。`
                    : `这一路走来，脑海里装满了关于“${word}”的憧憬，让步伐更加轻快。`;
            case 'obstacle':
                return index === 0
                    ? `在这过程中，虽然免不了一些“${word}”，但探索的热情依然高涨。`
                    : `虽然生活里偶尔也会有些许“${word}”，但旅途的风景总能治愈心灵。`;
            case 'place':
                return index === 0
                    ? `于是，我决定出门走走，一路上路过的地方仿佛变成了美丽的“${word}”。`
                    : `我漫步前行，不知不觉来到了宁静的“${word}”，感受着大自然的呼吸。`;
            case 'object':
                return index === 0
                    ? `就在这时候，我的视线被一个奇特的目标吸引，那是一个十分显眼的“${word}”。`
                    : `低头看去，地面上摆放着一件做工别致的“${word}”，仿佛是某人遗留的线索。`;
            case 'body_part':
                return index === 0
                    ? `我轻轻地摇了摇“${word}”，心想，这或许就是旅行中的小确幸吧。`
                    : `我揉了揉自己的“${word}”，舒展了一下身体，继续向着未知的前方出发。`;
            case 'companion':
                if (index === 0) return `旁边还站着一个非常有趣的“${word}”，它似乎也在静静感受着这个奇妙的瞬间。`;
                if (index === 1) return `而在大树底下，另一只可爱的“${word}”正在欢快地蹦跳玩耍。`;
                return `不远处甚至还有一只温顺的“${word}”在懒洋洋地晒着太阳。`;
            case 'time_season':
                return index === 0
                    ? `放眼望去，此时的景色犹如温暖的“${word}”般诗情画意，令人心旷神怡。`
                    : `迎面吹来的微风里，夹杂着属于“${word}”的独特气息，清新而惬意。`;
            default:
                return index === 0
                    ? `最后，我的脑海里不断闪现着关于“${word}”的画面，为今天画上了圆满的句号。`
                    : `在回家的路上，我静静回味着与“${word}”相关的一切，感到无比充实。`;
        }
    } else {
        switch (cat) {
            case 'feeling':
                return index === 0
                    ? `First, my thoughts gravitated toward "${word}", thinking it would be a perfect starting point. `
                    : `Along the way, a sense of "${word}" filled my mind, making my steps much lighter. `;
            case 'obstacle':
                return index === 0
                    ? `Along the way, there was a touch of "${word}", yet my excitement remained high. `
                    : `Even though there is occasional "${word}" in life, the journey always brings comfort. `;
            case 'place':
                return index === 0
                    ? `So, I decided to go outside. The surrounding view reminded me of a picturesque "${word}". `
                    : `I wandered along the path and soon arrived at a peaceful "${word}", taking in a deep breath. `;
            case 'object':
                return index === 0
                    ? `Just then, my attention was caught by a peculiar "${word}" nearby. `
                    : `Looking down, I noticed a finely crafted "${word}" resting on the ground. `;
            case 'body_part':
                return index === 0
                    ? `I carefully moved my "${word}", realizing how unexpected life's discoveries can be. `
                    : `I rubbed my "${word}" to relax my body, ready to push forward. `;
            case 'companion':
                if (index === 0) return `Next to it stood a curious "${word}", seemingly appreciating this quiet moment as well. `;
                if (index === 1) return `Under the shade of a big tree, another lovely "${word}" was playing happily. `;
                return `Not far away, a gentle "${word}" was lazily sunbathing. `;
            case 'time_season':
                return index === 0
                    ? `Looking up, the atmosphere felt as cozy as a golden "${word}", filling me with peace. `
                    : `The gentle breeze carried the distinct scent of "${word}", refreshing my spirit. `;
            default:
                return index === 0
                    ? `Finally, the impression of "${word}" lingered in my mind, wrapping up a perfect day. `
                    : `On my way home, I quietly reflected on "${word}", feeling deeply content. `;
        }
    }
}

export function getFallbackStory(words: Word[], lang: 'zh' | 'en'): AIStory {
    const title = lang === 'zh' ? '一天的精彩旅程' : 'A Wonderful Day\'s Journey';
    
    const wordItems = words.map(w => {
        const clean = getCleanCandidate(w, lang);
        const category = classifyWord(w, lang);
        return { word: w, clean, category };
    }).filter(item => item.clean);

    const CATEGORY_ORDER = ['feeling', 'obstacle', 'place', 'object', 'body_part', 'companion', 'time_season', 'other'];

    // Sort wordItems based on category order
    wordItems.sort((a, b) => {
        const aIndex = CATEGORY_ORDER.indexOf(a.category);
        const bIndex = CATEGORY_ORDER.indexOf(b.category);
        const aVal = aIndex === -1 ? CATEGORY_ORDER.length : aIndex;
        const bVal = bIndex === -1 ? CATEGORY_ORDER.length : bIndex;
        return aVal - bVal;
    });

    const categoryCounts: Record<string, number> = {};
    const parts: string[] = [];
    
    if (lang === 'zh') {
        parts.push("今天清晨，我拉开窗帘，心中突然有了一个特别的想法。");
    } else {
        parts.push("This morning, I drew the curtains and felt a sudden burst of inspiration. ");
    }

    wordItems.forEach(item => {
        const cat = item.category;
        const count = categoryCounts[cat] || 0;
        categoryCounts[cat] = count + 1;
        
        const sentence = getSentenceForWord(item.clean, cat, count, lang);
        parts.push(sentence);
    });

    return {
        title,
        story: parts.join("")
    };
}

export async function fetchAIStory(words: Word[], lang: 'zh' | 'en'): Promise<AIStory> {
    try {
        const response = await fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ words, lang })
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data;
    } catch (error) {
        console.error('Failed to fetch AI story from server proxy, using fallback:', error);
        return getFallbackStory(words, lang);
    }
}

