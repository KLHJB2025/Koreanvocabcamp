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

    // Fallback to original day-based logic if no firestore data
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const wordsPerDay = Math.ceil(mockCycle.length / 14);
    
    // SRS Timeline: 1st(Day+1), 2nd(Day+3), 3rd(Day+6), 4th(Day+13)
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

    return reviewWords;
}
