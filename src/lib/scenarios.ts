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
    const title = lang === 'zh' ? '今日词汇例句挑战' : 'Today\'s Sentence Challenge';
    const lines = words.map((w, index) => {
        const sentence = lang === 'zh' 
            ? (w.sentenceZh || `${w.zh}很常见。`)
            : (w.sentenceMeaning || `This represents the word: ${w.en || ''}.`);
        return `${index + 1}. ${sentence}`;
    });
    return {
        title,
        story: lines.join('\n')
    };
}

export async function fetchAIStory(words: Word[], lang: 'zh' | 'en'): Promise<AIStory> {
    const wordTranslations = words.map(w => getCleanCandidate(w, lang)).filter(Boolean);
    const wordListStr = wordTranslations.map(t => `"${t}"`).join(', ');
    
    const systemPrompt = `You are a creative writer. Write a short, engaging story or dialogue in ${lang === 'zh' ? 'Chinese' : 'English'} (max 180 words) that naturally includes these exact terms: ${wordListStr}. 
Important: 
1. You must use the exact terms provided, without changing them (e.g., if "singer" is given, do not use "song").
2. The story must make logical sense, flow beautifully, and be coherent.
3. Return ONLY a JSON object in this format: { "title": "story title", "story": "story text" }.`;

    const userPrompt = `Write a coherent, creative short story containing: ${wordListStr}.`;
    const url = `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}?system=${encodeURIComponent(systemPrompt)}&jsonMode=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        
        return extractJson(text);
    } catch (error) {
        console.error('Failed to fetch AI story, using fallback:', error);
        return getFallbackStory(words, lang);
    }
}

