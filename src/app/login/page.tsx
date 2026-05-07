'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { LogIn, Mail, Lock, Chrome, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const { t } = useTranslation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex grid lg:grid-cols-2 overflow-hidden">
            {/* Left side - Visual/Branding */}
            <div className="hidden lg:flex flex-col justify-center px-16 bg-primary/5 border-r border-border relative">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-12 shadow-xl shadow-primary/20">
                        T
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-slate to-primary bg-clip-text text-transparent">
                        Welcome back to the Bootcamp.
                    </h1>
                    <p className="text-xl text-foreground/50 mb-12 max-w-md">
                        Continuously master your Korean vocabulary with our gamified platform. Your 14-day mission is waiting.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                                <ArrowRight size={20} />
                            </div>
                            <span className="font-bold text-foreground/70 text-lg">Pick up where you left off</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                                <ArrowRight size={20} />
                            </div>
                            <span className="font-bold text-foreground/70 text-lg">Check your ranking status</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex flex-col items-center justify-center p-8 lg:p-24 bg-white dark:bg-card">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2">Account Login</h2>
                        <p className="text-foreground/40 font-medium tracking-tight">Enter your credentials to access your dashboard</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-border rounded-2xl font-bold hover:bg-secondary/20 transition-all shadow-sm group"
                        >
                            <Chrome size={20} className="text-primary group-hover:scale-110 transition-transform" />
                            Sign in with Google
                        </button>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-1 border-t border-border" />
                            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">or email login</span>
                            <div className="flex-1 border-t border-border" />
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

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
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Password</label>
                                    <Link href="/forgot-password" size={18} className="text-[10px] font-bold text-primary uppercase hover:underline">Forgot?</Link>
                                </div>
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
                                {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
                                {loading ? 'Authenticating...' : 'Sign In Now'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-foreground/40 font-medium">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
