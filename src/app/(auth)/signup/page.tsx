'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username,
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            router.push('/onboarding');
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">{t('common.signup')}</h1>
                <p className="text-foreground/60">Start your 14-day mission today.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70">Full Name / Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="Alex Kim"
                        required
                    />
                </div>
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
                    {loading ? 'Creating account...' : t('common.signup')}
                </button>
            </form>

            <p className="text-center text-sm text-foreground/60">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-bold hover:underline">
                    {t('common.login')}
                </Link>
            </p>
        </div>
    );
}
