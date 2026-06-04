const fs = require('fs');
const path = require('path');
const https = require('https');

const abstractCategories = ['property', 'feeling', 'time', 'description'];
const abstractKeywords = [
    'price', 'value', 'health', 'worry', 'lie', 'thanks', 'refusal', 'danger', 'safety', 
    'poverty', 'wealth', 'truth', 'fact', 'thought', 'dream', 'mind', 'reason', 'purpose', 
    'goal', 'plan', 'promise', 'appointment', 'success', 'failure', 'error', 'mistake', 
    'chance', 'opportunity', 'possibility', 'ability', 'capability', 'skill', 'power', 
    'energy', 'force', 'effort', 'result', 'effect', 'influence', 'experience', 'memory', 
    'history', 'future', 'past', 'present', 'time', 'period', 'duration', 'season', 
    'weather', 'mood', 'feeling', 'emotion', 'love', 'friendship', 'relationship', 
    'culture', 'art', 'music', 'science', 'math', 'language', 'speech', 'conversation', 
    'discussion', 'meeting', 'gathering', 'party', 'festival', 'event', 'accident', 
    'incident', 'problem', 'trouble', 'difficulty', 'situation', 'condition', 'state', 
    'system', 'method', 'way', 'rule', 'law', 'order', 'peace', 'war', 'battle', 
    'fight', 'game', 'sport', 'play', 'fun', 'joy', 'pleasure', 'happiness', 'sadness', 
    'sorrow', 'anger', 'fear', 'scare', 'surprise', 'wonder', 'interest', 'hobby', 
    'habit', 'custom', 'tradition', 'culture', 'society', 'community', 'world', 'life', 
    'death', 'birth', 'growth', 'change', 'development', 'progress', 'increase', 
    'decrease', 'difference', 'similarity', 'comparison', 'relationship', 'connection', 
    'link', 'contact', 'communication', 'message', 'information', 'news', 'story', 
    'report', 'article', 'book', 'paper', 'letter', 'note', 'document', 'file', 
    'record', 'history', 'tradition', 'custom', 'habit', 'nature', 'environment', 
    'society', 'government', 'politics', 'economy', 'business', 'industry', 'market', 
    'trade', 'money', 'cost', 'fee', 'tax', 'bill', 'receipt', 'income', 'salary', 
    'wage', 'profit', 'loss', 'debt', 'loan', 'credit', 'card', 'bank', 'shop', 
    'store', 'company', 'office', 'factory', 'work', 'job', 'career', 'employment', 
    'labor', 'service', 'product', 'good', 'item', 'thing', 'stuff', 'matter', 
    'problem', 'issue', 'question', 'answer', 'reply', 'response', 'solution', 
    'decision', 'choice', 'selection', 'vote', 'opinion', 'view', 'idea', 'thought', 
    'belief', 'faith', 'hope', 'wish', 'desire', 'need', 'demand', 'supply', 'market', 
    'industry', 'agriculture', 'farming', 'fishing', 'mining', 'construction', 
    'building', 'architecture', 'engineering', 'technology', 'science', 'research', 
    'study', 'learning', 'education', 'teaching', 'training', 'practice', 'exercise', 
    'sport', 'game', 'play', 'match', 'competition', 'race', 'win', 'victory', 'loss', 
    'defeat', 'score', 'point', 'mark', 'grade', 'class', 'course', 'subject', 
    'lesson', 'homework', 'assignment', 'test', 'exam', 'quiz', 'grade', 'degree', 
    'diploma', 'certificate', 'award', 'prize', 'gift', 'present', 'donation', 
    'charity', 'help', 'aid', 'support', 'assistance', 'service', 'benefit', 'advantage', 
    'disadvantage', 'harm', 'damage', 'injury', 'wound', 'pain', 'ache', 'disease', 
    'illness', 'sickness', 'health', 'medicine', 'treatment', 'cure', 'recovery', 
    'rest', 'sleep', 'dream', 'nightmare', 'awake', 'wake', 'life', 'living', 'death', 
    'dead', 'alive', 'birth', 'born', 'age', 'year', 'month', 'week', 'day', 'hour', 
    'minute', 'second', 'time', 'moment', 'period', 'epoch', 'era', 'history', 
    'future', 'past', 'present', 'today', 'yesterday', 'tomorrow', 'morning', 
    'afternoon', 'evening', 'night', 'midnight', 'noon', 'daytime', 'nighttime', 
    'season', 'spring', 'summer', 'autumn', 'fall', 'winter', 'weather', 'climate', 
    'temperature', 'heat', 'cold', 'warmth', 'coolness', 'rain', 'snow', 'wind', 
    'cloud', 'fog', 'mist', 'haze', 'storm', 'typhoon', 'hurricane', 'flood', 
    'drought', 'earthquake', 'disaster', 'hazard', 'danger', 'safety', 'security', 
    'protection', 'defense', 'attack', 'offense', 'war', 'peace', 'treaty', 
    'alliance', 'friendship', 'relationship', 'association', 'union', 'club', 
    'group', 'team', 'party', 'crowd', 'audience', 'public', 'people', 'person', 
    'individual', 'character', 'personality', 'identity', 'name', 'title', 
    'address', 'number', 'code', 'sign', 'signal', 'symbol', 'mark', 'brand', 
    'logo', 'label', 'tag', 'ticket', 'card', 'pass', 'permit', 'license', 
    'document', 'contract', 'agreement', 'treaty', 'law', 'rule', 'regulation', 
    'policy', 'system', 'structure', 'organization', 'institution', 'administration', 
    'management', 'leadership', 'direction', 'guidance', 'advice', 'suggestion', 
    'proposal', 'offer', 'request', 'demand', 'order', 'command', 'instruction', 
    'warning', 'caution', 'notice', 'announcement', 'report', 'news', 'information', 
    'data', 'knowledge', 'wisdom', 'truth', 'fact', 'reality', 'fiction', 
    'imagination', 'fantasy', 'illusion', 'delusion', 'belief', 'opinion', 
    'attitude', 'perspective', 'viewpoint', 'stand', 'position', 'status', 
    'role', 'function', 'duty', 'responsibility', 'obligation', 'right', 
    'privilege', 'freedom', 'liberty', 'justice', 'equality', 'fairness'
];

function isConcreteWord(word) {
    const pos = word.pos || '';
    const isNoun = pos === 'Noun' || pos === '명사';
    const hasAbstractCategory = word.category && abstractCategories.includes(word.category);
    const enMeaning = word.en || '';
    const hasAbstractMeaning = abstractKeywords.some(kw => enMeaning.toLowerCase().includes(kw));

    return isNoun && !hasAbstractCategory && !hasAbstractMeaning;
}

function cleanPrompt(text) {
    if (!text) return '';
    // Replace slash and backslash with 'or', other special URL chars with space
    return text
        .replace(/[\/\\]/g, ' or ')
        .replace(/[\?\\#%&~`|:;<>'"()[\]{}.,!]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getIllustrationUrl(word) {
    const enMeaning = word.en || '';
    const cleanEn = cleanPrompt(enMeaning);
    
    let promptBase = `cute friendly cartoon illustration of: ${cleanEn}`;
    if (word.sentenceMeaning && word.sentenceMeaning !== 'TBD') {
        const cleanScene = cleanPrompt(word.sentenceMeaning);
        promptBase += `, representing the scene: ${cleanScene}`;
    }
    
    const finalPrompt = promptBase + ", without any text, letters, words, or Korean characters in the image";
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=400&height=400&nologo=true&model=sana`;
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {}
        };

        const request = https.get(options, (response) => {
            if (response.statusCode !== 200) {
                const err = new Error(`Status: ${response.statusCode}`);
                err.statusCode = response.statusCode;
                reject(err);
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
            file.on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
        });
        
        request.on('error', (err) => {
            reject(err);
        });

        request.setTimeout(15000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function downloadWithRetry(url, dest, retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            await downloadImage(url, dest);
            return;
        } catch (err) {
            const isRateLimit = err.statusCode === 402;
            const waitTime = isRateLimit ? 8000 : 4000;
            console.log(`Failed download for ${path.basename(dest)}: ${err.message}. Retry ${i+1}/${retries} in ${waitTime}ms...`);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
                throw err;
            }
        }
    }
}

async function run() {
    const vocabPath = path.join(__dirname, '..', 'src', 'lib', 'vocabulary-data.ts');
    const content = fs.readFileSync(vocabPath, 'utf8');

    const match = content.match(/(?:export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
    if (!match) {
        throw new Error("Could not find MOCK_VOCABULARY in vocabulary-data.ts");
    }
    const mockVocab = eval('(' + match[1] + ')');

    const outputDir = path.join(__dirname, '..', 'public', 'illustrations', 'words');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const tasks = [];
    for (const [cycleId, words] of Object.entries(mockVocab)) {
        words.forEach(word => {
            if (!word.illustrationUrl) {
                const cleanName = word.kr.replace(/[<>:"/\\|?*]/g, '');
                const destFile = path.join(outputDir, `${cleanName}.jpg`);
                
                if (!fs.existsSync(destFile)) {
                    tasks.push({
                        word: word,
                        url: getIllustrationUrl(word),
                        dest: destFile,
                        cleanName: cleanName
                    });
                }
            }
        });
    }

    console.log(`Total tasks to download: ${tasks.length}`);
    if (tasks.length === 0) {
        console.log('All illustrations are already downloaded!');
        return;
    }

function updateRegistry() {
    try {
        const wordsDir = path.join(__dirname, '..', 'public', 'illustrations', 'words');
        const outputFile = path.join(__dirname, '..', 'src', 'lib', 'downloaded-illustrations.ts');
        if (!fs.existsSync(wordsDir)) return;
        const files = fs.readdirSync(wordsDir);
        const words = files
            .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
            .map(f => path.basename(f, path.extname(f)));
        const content = `export const DOWNLOADED_ILLUSTRATIONS = new Set(${JSON.stringify(words, null, 2)});\n`;
        fs.writeFileSync(outputFile, content, 'utf8');
        console.log(`Auto-updated registry with ${words.length} illustrations.`);
    } catch (e) {
        console.error('Error auto-updating registry:', e.message);
    }
}

    let completed = 0;
    let failed = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const { word, url, dest, cleanName } = task;
        
        console.log(`[${i + 1}/${tasks.length}] Starting download for ${cleanName} (${word.en})...`);
        try {
            await downloadWithRetry(url, dest);
            completed++;
            console.log(`[${i + 1}/${tasks.length}] SUCCESS: Saved ${cleanName}.jpg (Total Success: ${completed}, Failed: ${failed})`);
            updateRegistry();
            // Wait 1000ms between requests to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            failed++;
            console.error(`[${i + 1}/${tasks.length}] FAILED download for ${cleanName}: ${err.message}`);
            // Wait 3000ms after a failure
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    console.log(`Download finished! Completed: ${completed}, Failed: ${failed}`);
}

run().catch(console.error);
