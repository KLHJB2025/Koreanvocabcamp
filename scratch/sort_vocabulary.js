const fs = require('fs');
const path = require('path');

const vocabTsPath = path.resolve(__dirname, '../src/lib/vocabulary-data.ts');
const tempJsPath = path.resolve(__dirname, './temp_vocab.js');

console.log('Reading vocabulary-data.ts...');
const tsContent = fs.readFileSync(vocabTsPath, 'utf8');

// Strip TypeScript interfaces and export definitions to make it a valid CommonJS file
let jsContent = tsContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove top comment block if any
    .replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\}/g, '') // Remove interfaces
    .replace(/export\s+const\s+MOCK_VOCABULARY:\s*Record<string,\s*Word\[\]>\s*=\s*/g, 'const MOCK_VOCABULARY = ');

jsContent += '\nmodule.exports = { MOCK_VOCABULARY };\n';

console.log('Writing temp_vocab.js...');
fs.writeFileSync(tempJsPath, jsContent, 'utf8');

// Now require the temp vocab
const { MOCK_VOCABULARY } = require(tempJsPath);

// Categories definitions
const THEMES = [
    {
        name: 'food_dining',
        enKeywords: ['food', 'fruit', 'vegetable', 'cook', 'eat', 'drink', 'snack', 'water', 'soup', 'rice', 'meat', 'milk', 'restaurant', 'taste', 'sweet', 'sour', 'bitter', 'spicy', 'hot pot', 'tea', 'coffee', 'bread', 'salt', 'sugar', 'sauce', 'noodle', 'potato', 'onion', 'apple', 'banana', 'grape', 'fish', 'chicken', 'beef', 'pork', 'kitchen', 'plate', 'cup', 'glass', 'knife', 'fork', 'spoon', 'egg', 'alcohol', 'beer', 'wine', 'juice', 'meal', 'lunch', 'dinner', 'breakfast'],
        zhKeywords: ['吃', '喝', '煮', '做饭', '食物', '水果', '蔬菜', '零食', '水', '汤', '米饭', '肉', '牛奶', '餐馆', '味道', '甜', '酸', '苦', '辣', '茶', '咖啡', '面包', '盐', '糖', '面条', '土豆', '洋葱', '苹果', '香蕉', '葡萄', '鱼', '鸡', '牛肉', '猪肉', '厨房', '盘子', '杯子', '刀', '叉', '勺', '蛋', '酒', '啤酒', '果汁', '餐', '午餐', '晚餐', '早餐']
    },
    {
        name: 'school_education',
        enKeywords: ['school', 'class', 'teacher', 'student', 'pencil', 'book', 'paper', 'desk', 'chair', 'learn', 'study', 'exam', 'test', 'university', 'college', 'lecture', 'read', 'write', 'homework', 'classroom', 'diploma', 'degree', 'subject', 'math', 'science', 'history', 'language', 'notebook', 'eraser', 'bag', 'library', 'education', 'graduation'],
        zhKeywords: ['学校', '班级', '老师', '学生', '铅笔', '书', '纸', '课桌', '椅子', '学习', '考试', '大学', '学院', '讲座', '读', '写', '作业', '教室', '文凭', '学位', '科目', '数学', '科学', '历史', '语言', '笔记本', '橡皮', '书包', '图书馆', '教育', '毕业']
    },
    {
        name: 'home_living',
        enKeywords: ['home', 'house', 'room', 'bed', 'furniture', 'window', 'door', 'kitchen', 'sleep', 'live', 'clean', 'mirror', 'key', 'living room', 'bedroom', 'bathroom', 'apartment', 'sofa', 'desk', 'closet', 'blanket', 'pillow', 'wall', 'floor', 'roof', 'garden', 'yard', 'lamp', 'television', 'tv', 'wash', 'sweep'],
        zhKeywords: ['家', '房子', '房间', '床', '家具', '窗户', '门', '睡眠', '住', '清洁', '镜子', '钥匙', '客厅', '卧室', '浴室', '公寓', '沙发', '衣柜', '毯子', '枕头', '墙', '地板', '屋顶', '花园', '院子', '灯', '电视', '洗', '扫']
    },
    {
        name: 'city_travel_places',
        enKeywords: ['city', 'street', 'store', 'shop', 'bank', 'hospital', 'station', 'train', 'bus', 'car', 'road', 'place', 'subway', 'airport', 'hotel', 'park', 'theater', 'cinema', 'museum', 'building', 'market', 'office', 'pharmacy', 'company', 'map', 'travel', 'trip', 'ticket', 'flight', 'baggage', 'passport', 'tourist', 'visit', 'country', 'nation', 'world'],
        zhKeywords: ['城市', '街道', '商店', '店铺', '银行', '医院', '车站', '火车', '公交', '汽车', '路', '地方', '场所', '地铁', '机场', '酒店', '公园', '剧院', '电影院', '博物馆', '大楼', '市场', '办公室', '药店', '公司', '地图', '旅行', '旅游', '车票', '航班', '行李', '护照', '游客', '访问', '国家', '世界']
    },
    {
        name: 'people_jobs_family',
        enKeywords: ['person', 'people', 'man', 'woman', 'child', 'baby', 'boy', 'girl', 'family', 'mother', 'father', 'friend', 'brother', 'sister', 'doctor', 'nurse', 'singer', 'actor', 'officer', 'police', 'worker', 'job', 'work', 'profession', 'career', 'parent', 'husband', 'wife', 'son', 'daughter', 'uncle', 'aunt', 'grandpa', 'grandma', 'cousin', 'baby', 'kid', 'neighbor', 'guest', 'staff', 'employee', 'manager', 'boss', 'president'],
        zhKeywords: ['人', '男人', '女人', '孩子', '婴儿', '男孩', '女孩', '家庭', '母亲', '父亲', '妈妈', '爸爸', '朋友', '兄弟', '姐妹', '医生', '护士', '歌手', '演员', '警察', '工人', '工作', '职业', '父母', '丈夫', '妻子', '儿子', '女儿', '叔叔', '阿姨', '爷爷', '奶奶', '邻居', '客人', '员工', '经理', '老板', '总统']
    },
    {
        name: 'feelings_emotions',
        enKeywords: ['feel', 'feeling', 'emotion', 'happy', 'sad', 'worry', 'love', 'like', 'hate', 'fear', 'mind', 'heart', 'cry', 'laugh', 'angry', 'trust', 'worry', 'afraid', 'scared', 'excited', 'tired', 'bored', 'joy', 'surprise', 'pride', 'proud', 'hope', 'desire', 'wish', 'lonely', 'nervous', 'anxious', 'peace', 'comfort', 'pain'],
        zhKeywords: ['感觉', '感情', '情绪', '快乐', '开心', '悲伤', '难过', '担心', '爱', '喜欢', '讨厌', '害怕', '心', '哭', '笑', '生气', '信任', '兴奋', '累', '无聊', '喜悦', '惊喜', '骄傲', '希望', '愿望', '孤独', '紧张', '焦虑', '和平', '舒适', '痛苦']
    },
    {
        name: 'nature_animals_plants',
        enKeywords: ['animal', 'dog', 'cat', 'bird', 'fish', 'tree', 'flower', 'plant', 'nature', 'river', 'mountain', 'sky', 'sun', 'moon', 'star', 'sea', 'ocean', 'lake', 'earth', 'wind', 'rain', 'snow', 'cloud', 'weather', 'climate', 'leaf', 'grass', 'forest', 'wood', 'stone', 'rock', 'sand', 'beach', 'pet', 'cow', 'pig', 'sheep', 'horse', 'bear', 'lion', 'tiger', 'monkey', 'insect', 'fly', 'bug'],
        zhKeywords: ['动物', '狗', '猫', '鸟', '鱼', '树', '花', '植物', '自然', '河流', '山', '天空', '太阳', '月亮', '星星', '海', '海洋', '湖泊', '地球', '风', '雨', '雪', '云', '天气', '气候', '叶子', '草', '森林', '石头', '沙子', '沙滩', '宠物', '牛', '猪', '羊', '马', '熊', '狮子', '老虎', '猴子', '昆虫', '虫']
    },
    {
        name: 'time_seasons',
        enKeywords: ['time', 'day', 'year', 'month', 'week', 'hour', 'minute', 'second', 'today', 'yesterday', 'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'spring', 'summer', 'autumn', 'fall', 'winter', 'season', 'clock', 'watch', 'calendar', 'date', 'holiday', 'weekend', 'age', 'future', 'past', 'present', 'early', 'late', 'noon', 'midnight'],
        zhKeywords: ['时间', '天', '日', '年', '月', '星期', '小时', '分钟', '秒', '今天', '昨天', '明天', '早上', '上午', '下午', '晚上', '夜', '春天', '夏天', '秋天', '冬天', '季节', '时钟', '手表', '日历', '日期', '节日', '周末', '年龄', '未来', '过去', '现在', '早', '晚', '中午', '半夜']
    }
];

function classifyWord(word) {
    const enLower = word.en ? word.en.toLowerCase() : '';
    const zh = word.zh || '';
    
    // First, check explicit keywords in English meaning
    for (const theme of THEMES) {
        for (const kw of theme.enKeywords) {
            const regex = new RegExp(`\\b${kw}\\b|\\b${kw}s\\b`, 'i');
            if (regex.test(enLower)) {
                return theme.name;
            }
        }
    }
    
    // Check Chinese keywords
    for (const theme of THEMES) {
        for (const kw of theme.zhKeywords) {
            if (zh.includes(kw)) {
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
    if (word.category && word.category !== 'none') {
        if (word.category === 'place') return 'city_travel_places';
        if (word.category === 'object') return 'home_living';
        if (word.category === 'person') return 'people_jobs_family';
        if (word.category === 'food') return 'food_dining';
        if (word.category === 'feeling') return 'feelings_emotions';
        if (word.category === 'animal') return 'nature_animals_plants';
        if (word.category === 'plant') return 'nature_animals_plants';
        if (word.category === 'action') return 'actions_routines';
        if (word.category === 'description') return 'descriptions_qualities';
    }
    
    return 'miscellaneous';
}

const themeOrder = [
    'food_dining',
    'school_education',
    'home_living',
    'city_travel_places',
    'people_jobs_family',
    'feelings_emotions',
    'nature_animals_plants',
    'time_seasons',
    'actions_routines',
    'descriptions_qualities',
    'miscellaneous'
];

let totalWords = 0;
const processedVocab = {};

for (const [cycle, words] of Object.entries(MOCK_VOCABULARY)) {
    const sortedWords = [...words];
    
    // 1. Assign computed thematic categories
    for (const w of sortedWords) {
        w.category = classifyWord(w);
        totalWords++;
    }
    
    // 2. Sort words by themeOrder, and then alphabetically by kr inside the same theme
    sortedWords.sort((a, b) => {
        const themeA = a.category || 'miscellaneous';
        const themeB = b.category || 'miscellaneous';
        
        const idxA = themeOrder.indexOf(themeA);
        const idxB = themeOrder.indexOf(themeB);
        
        if (idxA !== idxB) {
            return idxA - idxB;
        }
        
        return a.kr.localeCompare(b.kr, 'ko');
    });
    
    processedVocab[cycle] = sortedWords;
}

console.log(`Classified and sorted ${totalWords} words.`);

// 3. Serialize back to TypeScript format
let out = `/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Word {
    kr: string;
    en: string;
    zh: string;
    pos: string;
    sentenceKr?: string;
    sentenceMeaning?: string;
    sentenceZh?: string;
    illustrationUrl?: string;
    animationData?: any;
    animationUrl?: string;
    category?: string;
}

export const MOCK_VOCABULARY: Record<string, Word[]> = {
`;

const cyclesKeys = Object.keys(processedVocab);
cyclesKeys.forEach((cycle, cycleIdx) => {
    out += `    ${cycle}: [\n`;
    const words = processedVocab[cycle];
    
    words.forEach((w, wordIdx) => {
        out += `        {\n`;
        out += `            kr: ${JSON.stringify(w.kr)},\n`;
        out += `            en: ${JSON.stringify(w.en)},\n`;
        out += `            zh: ${JSON.stringify(w.zh)},\n`;
        out += `            pos: ${JSON.stringify(w.pos)},\n`;
        out += `            category: ${JSON.stringify(w.category)},\n`;
        if (w.sentenceKr) out += `            sentenceKr: ${JSON.stringify(w.sentenceKr)},\n`;
        if (w.sentenceMeaning) out += `            sentenceMeaning: ${JSON.stringify(w.sentenceMeaning)},\n`;
        if (w.sentenceZh) out += `            sentenceZh: ${JSON.stringify(w.sentenceZh)},\n`;
        if (w.illustrationUrl) out += `            illustrationUrl: ${JSON.stringify(w.illustrationUrl)},\n`;
        
        // Remove trailing comma from last field inside word object
        out = out.replace(/,\n$/, '\n');
        
        out += `        }${wordIdx < words.length - 1 ? ',' : ''}\n`;
    });
    
    out += `    ]${cycleIdx < cyclesKeys.length - 1 ? ',' : ''}\n`;
});

out += `};\n`;

console.log('Writing back to vocabulary-data.ts...');
fs.writeFileSync(vocabTsPath, out, 'utf8');

// Cleanup
fs.unlinkSync(tempJsPath);
console.log('Done! Verification count of words:', totalWords);
