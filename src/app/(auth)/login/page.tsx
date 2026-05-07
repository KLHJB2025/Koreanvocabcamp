'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">{t('common.login')}</h1>
                <p className="text-foreground/60">Welcome back to the camp!</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button
                    disabled={loading}
                    className="w-full btn-premium py-4"
                >
                    {loading ? 'Logging in...' : t('common.login')}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-foreground/40 font-bold">Or continue with</span>
                </div>
            </div>

            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-xl font-bold hover:bg-secondary/20 transition-all shadow-sm"
            >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                Google
            </button>

            <p className="text-center text-sm text-foreground/60">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                    {t('common.signup')}
                </Link>
            </p>
        </div>
    );
}
