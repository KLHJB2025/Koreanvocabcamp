'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { CheckCircle2, Globe, GraduationCap, ChevronRight, Loader2, Sparkles } from 'lucide-react';

type Step = 'language' | 'level';

export default function OnboardingPage() {
    const router = useRouter();
    const { profile, loading: authLoading } = useAuth();

    const [step, setStep] = useState<Step>('language');
    const [language, setLanguage] = useState<'zh' | 'en' | null>(null);
    const [level, setLevel] = useState<'beginner' | 'intermediate' | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFinish = async () => {
        if (!profile?.uid || !language || !level) return;
        setLoading(true);

        try {
            const userRef = doc(db, 'users', profile.uid);
            await updateDoc(userRef, {
                language,
                level,
                currentCycleId: level === 'beginner' ? 'beginner_cycle_1' : 'intermediate_cycle_1',
                dayOfCamp: 1
            });

            // Update local storage for translation hook
            localStorage.setItem('language', language);

            router.push('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FEF9FA] flex flex-col items-center justify-center p-8 overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-strawberry/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cloud/20 rounded-full blur-[100px]" />

            <div className="w-full max-w-xl relative z-10">
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step === 'language' ? 'bg-primary w-8' : 'bg-strawberry/20'}`} />
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step === 'level' ? 'bg-primary w-8' : 'bg-strawberry/20'}`} />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'language' ? (
                        <motion.div
                            key="language"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl mx-auto mb-6 rotate-3">
                                    <Globe size={40} />
                                </div>
                                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Interface Language</h1>
                                <p className="text-charcoal/40 font-medium italic">Which language should we use for meanings and UI?</p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { id: 'zh', name: '简体中文', desc: 'Chinese Interface & Meanings' },
                                    { id: 'en', name: 'English', desc: 'English Interface & Meanings' }
                                ].map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => {
                                            setLanguage(lang.id as any);
                                            setStep('level');
                                        }}
                                        className={`puffy-card p-6 text-left flex items-center justify-between group ${language === lang.id ? 'border-primary ring-2 ring-primary/20 bg-strawberry/5' : 'hover:border-primary/50'}`}
                                    >
                                        <div>
                                            <h3 className="text-xl font-black italic">{lang.name}</h3>
                                            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">{lang.desc}</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${language === lang.id ? 'bg-primary text-white' : 'bg-secondary text-transparent'}`}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="level"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl mx-auto mb-6 -rotate-3">
                                    <GraduationCap size={40} />
                                </div>
                                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Target Grade</h1>
                                <p className="text-charcoal/40 font-medium italic">What is your current TOPIK target level?</p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { id: 'beginner', name: language === 'zh' ? '初级' : 'Beginner', desc: '14 Days x 19 Cycles (1,847 Words)', icon: <Sparkles className="text-amber-400" /> },
                                    { id: 'intermediate', name: language === 'zh' ? '中级' : 'Intermediate', desc: '14 Days x 29 Cycles (3,873 Words)', icon: <CheckCircle2 className="text-primary" /> }
                                ].map((lvl) => (
                                    <button
                                        key={lvl.id}
                                        onClick={() => setLevel(lvl.id as any)}
                                        className={`puffy-card p-6 text-left flex items-center justify-between group ${level === lvl.id ? 'border-primary ring-2 ring-primary/20 bg-strawberry/5' : 'hover:border-primary/50'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                                                {lvl.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black italic">{lvl.name}</h3>
                                                <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">{lvl.desc}</p>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${level === lvl.id ? 'bg-primary text-white' : 'bg-secondary text-transparent'}`}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep('language')} className="btn-secondary-cute flex-1">Back</button>
                                <button
                                    onClick={handleFinish}
                                    disabled={!level || loading}
                                    className="btn-primary-cute flex-1 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Ready to Deploy'}
                                    {!loading && <ChevronRight size={20} />}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
