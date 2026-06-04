const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Parse cycles
const cycles = {};
const parts = fileContent.split(/(\bbeginner_cycle_\d+\b):\s*\[/);

for (let i = 1; i < parts.length; i += 2) {
    const cycleName = parts[i];
    const cycleContent = parts[i + 1].split(/\n\s*\]/)[0];
    
    const wordBlocks = cycleContent.split(/\{\s*\n/);
    const words = [];
    
    for (const block of wordBlocks) {
        if (!block.trim()) continue;
        const krMatch = block.match(/kr:\s*["']([^"']+)["']/);
        if (!krMatch) continue;
        const kr = krMatch[1];
        
        const enMatch = block.match(/en:\s*["']([^"']+)["']/);
        const en = enMatch ? enMatch[1] : '';
        
        const zhMatch = block.match(/zh:\s*["']([^"']+)["']/);
        const zh = zhMatch ? zhMatch[1] : '';

        const posMatch = block.match(/pos:\s*["']([^"']+)["']/);
        const pos = posMatch ? posMatch[1] : '';

        const catMatch = block.match(/category:\s*["']([^"']+)["']/);
        const category = catMatch ? catMatch[1] : '';

        words.push({ kr, en, zh, pos, currentCategory: category, rawBlock: block });
    }
    cycles[cycleName] = words;
}

// Define heuristic thematic rules based on english meaning
const THEMES = [
    {
        name: 'food_dining',
        keywords: ['food', 'fruit', 'vegetable', 'cook', 'eat', 'drink', 'snack', 'water', 'soup', 'rice', 'meat', 'milk', 'restaurant', 'taste', 'sweet', 'sour', 'bitter', 'spicy', 'hot pot', 'tea', 'coffee', 'bread', 'salt', 'sugar', 'sauce', 'noodle', 'potato', 'onion', 'apple', 'banana', 'grape', 'fish', 'chicken', 'beef', 'pork', 'kitchen', 'plate', 'cup', 'glass', 'knife', 'fork', 'spoon', 'egg', 'alcohol', 'beer', 'wine', 'juice', 'meal', 'lunch', 'dinner', 'breakfast']
    },
    {
        name: 'school_education',
        keywords: ['school', 'class', 'teacher', 'student', 'pencil', 'book', 'paper', 'desk', 'chair', 'learn', 'study', 'exam', 'test', 'university', 'college', 'lecture', 'read', 'write', 'homework', 'classroom', 'diploma', 'degree', 'subject', 'math', 'science', 'history', 'language', 'notebook', 'eraser', 'bag', 'library', 'education', 'graduation']
    },
    {
        name: 'home_living',
        keywords: ['home', 'house', 'room', 'bed', 'furniture', 'window', 'door', 'kitchen', 'sleep', 'live', 'clean', 'mirror', 'key', 'living room', 'bedroom', 'bathroom', 'apartment', 'sofa', 'desk', 'closet', 'blanket', 'pillow', 'wall', 'floor', 'roof', 'garden', 'yard', 'lamp', 'television', 'tv', 'wash', 'sweep']
    },
    {
        name: 'city_travel_places',
        keywords: ['city', 'street', 'store', 'shop', 'bank', 'hospital', 'station', 'train', 'bus', 'car', 'road', 'place', 'subway', 'airport', 'hotel', 'park', 'theater', 'cinema', 'museum', 'building', 'market', 'office', 'pharmacy', 'company', 'map', 'travel', 'trip', 'ticket', 'flight', 'baggage', 'passport', 'tourist', 'visit', 'country', 'nation', 'world']
    },
    {
        name: 'people_jobs_family',
        keywords: ['person', 'people', 'man', 'woman', 'child', 'baby', 'boy', 'girl', 'family', 'mother', 'father', 'friend', 'brother', 'sister', 'doctor', 'nurse', 'singer', 'actor', 'officer', 'police', 'worker', 'job', 'work', 'profession', 'career', 'parent', 'husband', 'wife', 'son', 'daughter', 'uncle', 'aunt', 'grandpa', 'grandma', 'cousin', 'baby', 'kid', 'neighbor', 'guest', 'staff', 'employee', 'manager', 'boss', 'president']
    },
    {
        name: 'feelings_emotions',
        keywords: ['feel', 'feeling', 'emotion', 'happy', 'sad', 'worry', 'love', 'like', 'hate', 'fear', 'mind', 'heart', 'cry', 'laugh', 'angry', 'trust', 'worry', 'afraid', 'scared', 'excited', 'tired', 'bored', 'joy', 'surprise', 'pride', 'proud', 'hope', 'desire', 'wish', 'lonely', 'nervous', 'anxious', 'peace', 'comfort', 'pain']
    },
    {
        name: 'nature_animals_plants',
        keywords: ['animal', 'dog', 'cat', 'bird', 'fish', 'tree', 'flower', 'plant', 'nature', 'river', 'mountain', 'sky', 'sun', 'moon', 'star', 'sea', 'ocean', 'lake', 'earth', 'wind', 'rain', 'snow', 'cloud', 'weather', 'climate', 'leaf', 'grass', 'forest', 'wood', 'stone', 'rock', 'sand', 'beach', 'pet', 'cow', 'pig', 'sheep', 'horse', 'bear', 'lion', 'tiger', 'monkey', 'insect', 'fly', 'bug']
    },
    {
        name: 'time_seasons',
        keywords: ['time', 'day', 'year', 'month', 'week', 'hour', 'minute', 'second', 'today', 'yesterday', 'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'spring', 'summer', 'autumn', 'fall', 'winter', 'season', 'clock', 'watch', 'calendar', 'date', 'holiday', 'weekend', 'age', 'future', 'past', 'present', 'early', 'late', 'noon', 'midnight']
    }
];

function classifyWord(word) {
    const enLower = word.en.toLowerCase();
    const zhLower = word.zh;
    
    // First, check explicit keywords in English meaning
    for (const theme of THEMES) {
        for (const kw of theme.keywords) {
            // Match whole word or simple substrings
            const regex = new RegExp(`\\b${kw}\\b|\\b${kw}s\\b`, 'i');
            if (regex.test(enLower)) {
                return theme.name;
            }
        }
    }
    
    // Check Part of Speech
    if (word.pos === 'Verb' || word.pos === '동사') {
        return 'actions_routines';
    }
    
    if (word.pos === 'Adjective' || word.pos === '형용사' || word.pos === 'Adverb' || word.pos === '부사') {
        return 'descriptions_qualities';
    }
    
    // Fallback based on original category if any
    if (word.currentCategory && word.currentCategory !== 'none') {
        if (word.currentCategory === 'place') return 'city_travel_places';
        if (word.currentCategory === 'object') return 'home_living'; // default object to home/living
        if (word.currentCategory === 'person') return 'people_jobs_family';
        if (word.currentCategory === 'food') return 'food_dining';
        if (word.currentCategory === 'feeling') return 'feelings_emotions';
        if (word.currentCategory === 'animal') return 'nature_animals_plants';
        if (word.currentCategory === 'plant') return 'nature_animals_plants';
        if (word.currentCategory === 'action') return 'actions_routines';
        if (word.currentCategory === 'description') return 'descriptions_qualities';
    }
    
    return 'miscellaneous';
}

const stats = {};
let totalCount = 0;

for (const [cycle, words] of Object.entries(cycles)) {
    for (const w of words) {
        const theme = classifyWord(w);
        stats[theme] = (stats[theme] || 0) + 1;
        totalCount++;
    }
}

console.log('Total words classified:', totalCount);
console.log('Theme distribution:', JSON.stringify(stats, null, 2));
