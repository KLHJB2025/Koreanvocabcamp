'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function OnboardingPage() {
    const { language, setLanguage } = useTranslation();
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const handleFinish = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            await supabase
                .from('profiles')
                .update({ preferred_language: language })
                .eq('id', user.id);
        }

        router.push('/dashboard');
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center"
            >
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Initialization</span>
                <h1 className="text-4xl font-bold mb-12">Choose your interface language</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <button
                        onClick={() => setLanguage('zh')}
                        className={`relative p-8 rounded-[32px] border-2 transition-all text-left group ${language === 'zh'
                                ? 'border-primary bg-primary/5 shadow-xl text-primary'
                                : 'border-border bg-white text-foreground/60 hover:border-primary/50'
                            }`}
                    >
                        <span className="text-4xl font-bold block mb-2">中文</span>
                        <span className="text-lg opacity-60">Chinese Interface & Meanings</span>
                        {language === 'zh' && (
                            <div className="absolute top-6 right-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                <Check size={20} />
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => setLanguage('en')}
                        className={`relative p-8 rounded-[32px] border-2 transition-all text-left group ${language === 'en'
                                ? 'border-primary bg-primary/5 shadow-xl text-primary'
                                : 'border-border bg-white text-foreground/60 hover:border-primary/50'
                            }`}
                    >
                        <span className="text-4xl font-bold block mb-2">English</span>
                        <span className="text-lg opacity-60">English Interface & Meanings</span>
                        {language === 'en' && (
                            <div className="absolute top-6 right-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                <Check size={20} />
                            </div>
                        )}
                    </button>
                </div>

                <button
                    onClick={handleFinish}
                    disabled={loading}
                    className="btn-premium w-full py-5 text-xl"
                >
                    {loading ? 'Setting up your campsite...' : 'Start Training'}
                </button>
            </motion.div>
        </div>
    );
}
