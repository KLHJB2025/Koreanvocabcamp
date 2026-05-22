import { db } from './firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MOCK_VOCABULARY, Word } from './vocabulary-data';

/**
 * Fetches words for a specific cycle and day.
 * If Firestore has no data, falls back to MOCK_VOCABULARY.
 */
export async function getDailyWords(cycleId: string, day: number): Promise<Word[]> {
    try {
        const vocabRef = collection(db, 'vocabulary');
        const q = query(
            vocabRef,
            where('cycleId', '==', cycleId),
            orderBy('kr') // Simple deterministic ordering for now
        );

        const snapshot = await getDocs(q);
        const allWords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        if (allWords.length > 0) {
            // Logic: 100 words per cycle, split into 15 days. 
            // Day 15 is reserved for the Boss Battle.
            // We split words across Days 1-14.
            const totalWords = allWords.length;
            const wordsPerDay = Math.ceil(totalWords / 14); 
            const start = (day - 1) * wordsPerDay;
            const end = Math.min(start + wordsPerDay, totalWords);
            
            if (day >= 15) return []; // Day 15 is challenge day, no new words
            return allWords.slice(start, end);
        }
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
    }

    // Fallback to mock data
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const totalWords = mockCycle.length;
    const wordsPerDay = Math.ceil(totalWords / 14);
    const start = (day - 1) * wordsPerDay;
    const end = Math.min(start + wordsPerDay, totalWords);
    
    if (day >= 15) return []; // Day 15 is challenge day
    return mockCycle.slice(start, end);
}

export async function getReviewWords(uid: string, cycleId: string, day: number): Promise<Word[]> {
    try {
        const learnedRef = collection(db, 'users', uid, 'learned_words');
        const now = new Date();
        const q = query(
            learnedRef,
            where('nextReview', '<=', now),
            limit(20) // Limit review session size
        );

        const snapshot = await getDocs(q);
        const dueWords = snapshot.docs.map(doc => doc.data().kr);

        if (dueWords.length > 0) {
            // Map the Korean words back to full Word objects from mock data or db
            const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
            return mockCycle.filter(w => dueWords.includes(w.kr));
        }
    } catch (error) {
        console.error('Error fetching review words:', error);
    }

    // Fallback to original day-based logic ONLY if Firestore is unavailable (offline)
    // and we are clearly in a development or mock state.
    // For production, if Firestore says no words are due, we return empty.
    
    // Standardize wordsPerDay calculation (use 14 days for learning, Day 15 for Boss)
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const wordsPerDay = Math.ceil(mockCycle.length / 14);
    
    // Only return fallback words if we are specifically looking for a way to fill a session
    // and the user has actually progressed past day 1.
    if (day <= 1) return [];

    const dueDays = [
        day - 1,
        day - 3,
        day - 6,
        day - 13
    ].filter(d => d >= 1);

    let reviewWords: Word[] = [];
    dueDays.forEach(d => {
        const start = (d - 1) * wordsPerDay;
        const end = Math.min(start + wordsPerDay, mockCycle.length);
        reviewWords = [...reviewWords, ...mockCycle.slice(start, end)];
    });

    // To prevent the "never learned" issue, we only use this fallback if we 
    // absolutely have to, but for now let's return empty if Firestore is active.
    // return reviewWords; 
    return []; // Default to empty if Firestore query returned nothing
}

export async function getReviewCount(uid: string): Promise<number> {
    try {
        const learnedRef = collection(db, 'users', uid, 'learned_words');
        const now = new Date();
        const q = query(
            learnedRef,
            where('nextReview', '<=', now)
        );

        const snapshot = await getDocs(q);
        return snapshot.size;
    } catch (error) {
        console.error('Error fetching review count:', error);
        return 0;
    }
}

/**
 * Returns the illustration URL for a word.
 * If a static illustrationUrl is defined, it is used.
 * Otherwise, it determines if the word is abstract:
 * - Verbs, Adjectives, Adverbs, and Pronouns are considered abstract.
 * - Nouns with abstract categories (property, feeling, time, description) or abstract keywords in their English meaning are abstract.
 * If abstract, it dynamically generates an image representing the example sentence.
 * If concrete, it dynamically generates an image of the word itself.
 */
export function getIllustrationUrl(word: Word): string {
    if (word.illustrationUrl) {
        return word.illustrationUrl;
    }

    const pos = word.pos || '';
    const isNoun = pos === 'Noun' || pos === '명사';

    const abstractCategories = ['property', 'feeling', 'time', 'description'];
    const hasAbstractCategory = word.category && abstractCategories.includes(word.category);

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
    const enMeaning = word.en || '';
    const hasAbstractMeaning = abstractKeywords.some(kw => enMeaning.toLowerCase().includes(kw));

    const isAbstract = !isNoun || hasAbstractCategory || hasAbstractMeaning;

    if (isAbstract && word.sentenceMeaning && word.sentenceMeaning !== 'TBD') {
        return `https://image.pollinations.ai/prompt/realistic%20photography%20representing%20the%20scene:%20${encodeURIComponent(word.sentenceMeaning)}?width=400&height=400&nologo=true`;
    }

    return `https://image.pollinations.ai/prompt/realistic%20photography%20of%20${encodeURIComponent(enMeaning)}?width=400&height=400&nologo=true`;
}

