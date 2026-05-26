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

function extractJson(text: string): any {
    try {
        // Try parsing directly
        return JSON.parse(text.trim());
    } catch {
        // Try extracting from markdown code blocks
        const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
        if (match) {
            try {
                return JSON.parse(match[1].trim());
            } catch {}
        }
        // Fallback: extract anything between { and }
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
    const title = lang === 'zh' ? '今日情境小故事' : 'Today\'s Story';
    const sentences = words.map(w => {
        if (lang === 'zh') {
            return w.sentenceZh || `${w.zh}很常见。`;
        } else {
            return w.sentenceMeaning || `This represents the word: ${w.en}.`;
        }
    });
    return {
        title,
        story: sentences.join(' ')
    };
}

export async function fetchAIStory(words: Word[], lang: 'zh' | 'en'): Promise<AIStory> {
    const wordTranslations = words.map(w => lang === 'zh' ? w.zh : w.en).filter(Boolean);
    const wordListStr = wordTranslations.map(t => `"${t}"`).join(', ');
    
    const systemPrompt = `You are a creative writer. Write a short, engaging story or dialogue in ${lang === 'zh' ? 'Chinese' : 'English'} (max 180 words) that naturally includes these exact terms: ${wordListStr}. 
Important: 
1. You must use the exact terms provided, without changing them (e.g., if "镜子" is given, do not use "镜面").
2. The story must make logical sense.
3. Return ONLY a JSON object in this format: { "title": "story title", "story": "story text" }. No markdown wrapper, no extra text, just the raw JSON.`;

    try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        
        return extractJson(text);
    } catch (error) {
        console.error('Failed to fetch AI story, using fallback:', error);
        return getFallbackStory(words, lang);
    }
}

