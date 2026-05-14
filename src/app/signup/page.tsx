'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, Loader2, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const { t } = useTranslation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile with full name
            await updateProfile(user, { displayName: fullName });

            // Create user profile in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: fullName,
                phoneNumber: phoneNumber,
                purpose: purpose,
                totalXp: 0,
                currentRank: 'Hangeul Survivor',
                streakCount: 0,
                status: 'pending', // Requires admin approval
                role: 'student',
                unlockedCycles: ['beginner_cycle_1'], // Everyone gets the first cycle
                createdAt: new Date().toISOString(),
            });

            router.push('/pending-approval');
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if profile exists, if not create one
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                totalXp: 0,
                currentRank: 'Hangeul Survivor',
                streakCount: 0,
                status: 'pending',
                role: 'student',
                unlockedCycles: ['beginner_cycle_1'],
                createdAt: new Date().toISOString(),
            }, { merge: true });

            router.push('/pending-approval');
        } catch (err: any) {
            setError(err.message || 'Google signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex grid lg:grid-cols-2 overflow-hidden">
            <div className="hidden lg:flex flex-col justify-center px-16 bg-primary/5 border-r border-border relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-12 shadow-xl shadow-primary/20">
                        T
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-slate to-primary bg-clip-text text-transparent">
                        Start your 14-day mission.
                    </h1>
                    <p className="text-xl text-foreground/50 mb-12 max-w-md">
                        Join the elite circle of Korean learners. Master core vocabulary and clear the bootcamp challenges.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Personalized SRS Engine",
                            "Daily Missions & Rewards",
                            "Global Leaderboard",
                            "Certification of Mastery"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-foreground/70 font-bold">
                                <CheckCircle2 size={24} className="text-emerald-500" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 lg:p-24 bg-white dark:bg-card">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                        <p className="text-foreground/40 font-medium tracking-tight">Begin your Korean mastery journey today</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleSignup}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-border rounded-2xl font-bold hover:bg-secondary/20 transition-all shadow-sm group"
                        >
                            <svg width={20} height={20} viewBox="0 0 24 24" className="text-primary group-hover:scale-110 transition-transform"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Sign up with Google
                        </button>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 border-t border-border" />
                            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">or email signup</span>
                            <div className="flex-1 border-t border-border" />
                        </div>

                        <form onSubmit={handleSignup} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium"
                                        placeholder="Alex Kim"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium"
                                        placeholder="name@example.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium"
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium"
                                        placeholder="+60 12-345 6789"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest ml-1">Purpose of Joining</label>
                                <div className="relative">
                                    <textarea
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium min-h-[100px]"
                                        placeholder="Tell us why you want to join the bootcamp..."
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-premium py-5 text-lg flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-foreground/40 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
