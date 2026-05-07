'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'admin' | 'student';
    totalXp: number;
    currentRank: string;
    streakCount: number;
    dayOfCamp: number;
    currentCycleId: string | null;
    level: 'beginner' | 'intermediate';
    campCredits: number;
    unlockedCycles: string[];
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                // Fetch extended profile from Firestore
                const docRef = doc(db, 'users', firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProfile(docSnap.data() as UserProfile);
                } else {
                    // Fallback if profile doesn't exist yet
                    setProfile({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        role: 'student',
                        totalXp: 0,
                        currentRank: 'Hangeul Survivor',
                        streakCount: 0,
                        dayOfCamp: 1,
                        currentCycleId: null,
                        level: 'beginner',
                        campCredits: 0,
                        unlockedCycles: []
                    });
                }
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, profile, loading };
}
