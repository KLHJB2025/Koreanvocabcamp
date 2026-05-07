import { db } from './firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
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
            // Logic: 100 words per cycle, split into 14 days
            // Day 1: 0-7, Day 2: 7-14, ... Day 14: 91-100
            const wordsPerDay = Math.ceil(allWords.length / 14);
            const start = (day - 1) * wordsPerDay;
            const end = start + wordsPerDay;
            return allWords.slice(start, end);
        }
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
    }

    // Fallback to mock data
    const mockCycle = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const wordsPerDay = Math.ceil(mockCycle.length / 14);
    const start = (day - 1) * wordsPerDay;
    const end = start + wordsPerDay;
    return mockCycle.slice(start, end);
}
