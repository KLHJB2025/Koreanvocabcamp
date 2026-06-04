import { db } from './firebase';
import { doc, updateDoc, increment, setDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';

// SRS Intervals (in days) adjusted for a 14-day camp cycle
const SRS_INTERVALS = [1, 2, 4, 7, 12];

export async function addXp(uid: string, amount: number) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        totalXp: increment(amount)
    });
}

export async function completeDay(uid: string, lastCompletedDate?: string) {
    const userRef = doc(db, 'users', uid);
    const updates: Record<string, any> = {
        dayOfCamp: increment(1)
    };
    if (lastCompletedDate) {
        updates.lastCompletedDate = lastCompletedDate;
    }
    await updateDoc(userRef, updates);
}

/**
 * Records words learned for the first time.
 */
export async function recordLearnedWords(uid: string, words: string[]) {
    const batch = words.map(wordKr => {
        const wordRef = doc(db, 'users', uid, 'learned_words', wordKr);
        return setDoc(wordRef, {
            kr: wordKr,
            learnedAt: serverTimestamp(),
            nextReview: new Date(Date.now() + SRS_INTERVALS[0] * 24 * 60 * 60 * 1000),
            level: 1,
            lastInterval: SRS_INTERVALS[0]
        }, { merge: true });
    });
    await Promise.all(batch);
}

/**
 * Updates progress for a word after a review session.
 * @param uid User ID
 * @param wordKr The Korean word
 * @param isCorrect Whether the user got it right
 */
export async function updateWordProgress(uid: string, wordKr: string, isCorrect: boolean) {
    const wordRef = doc(db, 'users', uid, 'learned_words', wordKr);
    const snap = await getDoc(wordRef);
    
    if (!snap.exists()) return;

    const data = snap.data();
    let newLevel = isCorrect ? (data.level || 1) + 1 : Math.max(1, (data.level || 1) - 1);
    
    // Cap level to available intervals
    if (newLevel > SRS_INTERVALS.length) newLevel = SRS_INTERVALS.length;

    const intervalDays = SRS_INTERVALS[newLevel - 1];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + intervalDays);

    await updateDoc(wordRef, {
        level: newLevel,
        lastInterval: intervalDays,
        nextReview: nextReview,
        lastReviewedAt: serverTimestamp()
    });
}

export async function updateStreak(uid: string) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        streakCount: increment(1)
    });
}
