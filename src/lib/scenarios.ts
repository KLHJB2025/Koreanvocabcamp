import { Word } from './vocabulary-data';

export interface ScenarioTemplate {
    id: string;
    name: string;
    intro: (lang: 'en' | 'zh') => string;
    dialogue: {
        speaker: 'Mascot' | 'Friend' | 'Shopkeeper';
        text: (lang: 'en' | 'zh', words: Record<string, string>) => string;
        missingWordCategory: string;
        correctWord: string;
    }[];
}

export const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
    {
        id: 'daily_errand',
        name: 'The Daily Errand',
        intro: (lang) => lang === 'zh' ? '今天有很多事情要做！' : 'There are many things to do today!',
        dialogue: [
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh' 
                    ? `我们需要去一个${words.place || '___'}买点东西。` 
                    : `We need to go to a ${words.place || '___'} to buy some things.`,
                missingWordCategory: 'place',
                correctWord: ''
            },
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh' 
                    ? `看看这个，它的${words.object || '___'}是多少？` 
                    : `Look at this, what is its ${words.object || '___'}?`,
                missingWordCategory: 'object',
                correctWord: ''
            }
        ]
    },
    {
        id: 'express_feeling',
        name: 'Sharing Feelings',
        intro: (lang) => lang === 'zh' ? '和好朋友聊聊感受。' : 'Talking about feelings with a friend.',
        dialogue: [
            {
                speaker: 'Friend',
                text: (lang, words) => lang === 'zh'
                    ? `你今天感觉怎么样？`
                    : `How are you feeling today?`,
                missingWordCategory: '',
                correctWord: 'skip'
            },
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh'
                    ? `我觉得非常${words.feeling || '___'}。`
                    : `I feel very ${words.feeling || '___'}.`,
                missingWordCategory: 'feeling',
                correctWord: ''
            },
            {
                speaker: 'Friend',
                text: (lang, words) => lang === 'zh'
                    ? `为什么呢？`
                    : `Why is that?`,
                missingWordCategory: '',
                correctWord: 'skip'
            },
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh'
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
        intro: (lang) => lang === 'zh' ? '繁忙的一天开始了！' : 'A busy day begins!',
        dialogue: [
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh'
                    ? `我打算今天${words.action || '___'}。`
                    : `I plan to ${words.action || '___'} today.`,
                missingWordCategory: 'action',
                correctWord: ''
            },
            {
                speaker: 'Mascot',
                text: (lang, words) => lang === 'zh'
                    ? `那里真的很${words.description || '___'}。`
                    : `It is really ${words.description || '___'} there.`,
                missingWordCategory: 'description',
                correctWord: ''
            }
        ]
    }
];

export function buildScenario(words: Word[], lang: 'en' | 'zh') {
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

    // Pick a template that has at least one matching word, or pick a random one
    let template = SCENARIO_TEMPLATES[0];
    const suitableTemplates = SCENARIO_TEMPLATES.filter(t => 
        t.dialogue.some(d => d.missingWordCategory && categoryMap[d.missingWordCategory])
    );
    
    if (suitableTemplates.length > 0) {
        template = suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)];
    }
    
    const dialogue = template.dialogue.map(d => {
        if (d.correctWord === 'skip') return { ...d, isSkip: true };
        
        const matchingWord = categoryMap[d.missingWordCategory] || words[Math.floor(Math.random() * words.length)];
        return {
            ...d,
            correctWord: matchingWord.kr,
            hint: lang === 'zh' ? matchingWord.zh : matchingWord.en,
            isSkip: false
        };
    });

    return {
        ...template,
        dialogue,
        introText: template.intro(lang)
    };
}
