import { db } from './firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export async function addXp(uid: string, amount: number) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        totalXp: increment(amount)
    });
}

export async function completeDay(uid: string) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        dayOfCamp: increment(1)
    });
}

export async function updateStreak(uid: string) {
    const userRef = doc(db, 'users', uid);
    // Logic for streak could be more complex (checking last active)
    // For now just increment
    await updateDoc(userRef, {
        streakCount: increment(1)
    });
}
