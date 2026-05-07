'use client';

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
import { UserPlus, Mail, Lock, User, Chrome, Loader2, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const { t } = useTranslation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
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
                totalXp: 0,
                currentRank: 'Hangeul Survivor',
                streakCount: 0,
                createdAt: new Date().toISOString(),
            });

            router.push('/onboarding');
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
                createdAt: new Date().toISOString(),
            }, { merge: true });

            router.push('/onboarding');
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
                            <Chrome size={20} className="text-primary group-hover:scale-110 transition-transform" />
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
