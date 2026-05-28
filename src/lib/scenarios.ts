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

export function getFallbackStory(words: Word[], lang: 'zh' | 'en'): AIStory {
    const title = lang === 'zh' ? '一天的精彩旅程' : 'A Wonderful Day\'s Journey';
    const wordCleanList = words.map(w => getCleanCandidate(w, lang)).filter(Boolean);
    
    if (lang === 'zh') {
        const parts: string[] = [];
        parts.push("今天清晨，我拉开窗帘，心中突然有了一个特别的想法。");
        
        wordCleanList.forEach((word, index) => {
            if (index === 0) {
                parts.push(`首先，我开始思考关于“${word}”的事情，感觉这是一个很好的起点。`);
            } else if (index === 1) {
                parts.push(`在这过程中，虽然免不了一些“${word}”，但探索的热情依然高涨。`);
            } else if (index === 2) {
                parts.push(`于是，我决定出门走走，一路上，路过的地方仿佛变成了美丽的“${word}”。`);
            } else if (index === 3) {
                parts.push(`就在这时候，我的视线被一个奇特的目标吸引，那是一个十分显眼的“${word}”。`);
            } else if (index === 4) {
                parts.push(`我轻轻摇了摇“${word}”，心想，这或许就是旅行中的小确幸吧。`);
            } else if (index === 5) {
                parts.push(`旁边还站着一个非常有趣的“${word}”，它似乎也在静静感受着这个奇妙的瞬间。`);
            } else if (index === 6) {
                parts.push(`放眼望去，此时的景色犹如温暖的“${word}”般诗情画意，令人心旷神怡。`);
            } else if (index === 7) {
                parts.push(`虽然偶尔会遇到一点“${word}”，但能在这段旅途中收获成长，一切都非常值得。`);
            } else {
                parts.push(`最后，我的脑海里不断闪现着“${word}”的画面，为今天画上了圆满的句号。`);
            }
        });
        
        return {
            title,
            story: parts.join("")
        };
    } else {
        const parts: string[] = [];
        parts.push("This morning, I drew the curtains and felt a sudden burst of inspiration. ");
        
        wordCleanList.forEach((word, index) => {
            if (index === 0) {
                parts.push(`First, my thoughts gravitated toward "${word}", thinking it would be a perfect starting point. `);
            } else if (index === 1) {
                parts.push(`Along the way, there was a touch of "${word}", yet my excitement remained high. `);
            } else if (index === 2) {
                parts.push(`So, I decided to go outside. The surrounding view reminded me of a picturesque "${word}". `);
            } else if (index === 3) {
                parts.push(`Just then, my attention was caught by a peculiar "${word}" nearby. `);
            } else if (index === 4) {
                parts.push(`I carefully moved my "${word}", realizing how unexpected life's little discoveries can be. `);
            } else if (index === 5) {
                parts.push(`Next to it stood a curious "${word}", seemingly appreciating this quiet moment as well. `);
            } else if (index === 6) {
                parts.push(`Looking up, the atmosphere felt as cozy as a golden "${word}", filling me with peace. `);
            } else if (index === 7) {
                parts.push(`Despite some occasional "${word}", the growth I gained today made everything worthwhile. `);
            } else {
                parts.push(`Finally, the impression of "${word}" lingered in my mind, wrapping up a perfect day. `);
            }
        });
        
        return {
            title,
            story: parts.join("")
        };
    }
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

