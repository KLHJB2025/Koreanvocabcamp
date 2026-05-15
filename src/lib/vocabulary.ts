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
            // Logic: 100 words per cycle, split into 14 days. 
            // Day 14 is reserved for the Boss Battle.
            // We split words across Days 1-13.
            const totalWords = allWords.length;
            const wordsPerDay = Math.ceil(totalWords / 13); 
            const start = (day - 1) * wordsPerDay;
            const end = Math.min(start + wordsPerDay, totalWords);
            
            if (day >= 14) return []; // Day 14 is challenge day, no new words
            return allWords.slice(start, end);
        }
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
    }

    // Fallback to mock data
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const totalWords = mockCycle.length;
    const wordsPerDay = Math.ceil(totalWords / 13);
    const start = (day - 1) * wordsPerDay;
    const end = Math.min(start + wordsPerDay, totalWords);
    
    if (day >= 14) return []; // Day 14 is challenge day
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
    
    // Standardize wordsPerDay calculation (use 13 days for learning, Day 14 for Boss)
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const wordsPerDay = Math.ceil(mockCycle.length / 13);
    
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
