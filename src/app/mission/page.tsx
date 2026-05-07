'use client';

import { useState, useEffect } from 'react';
import { VocabCard } from '@/components/learning/VocabCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Settings, Trophy, HelpCircle, CheckCircle2, Star, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { getDailyWords } from '@/lib/vocabulary';
import { Word } from '@/lib/vocabulary-data';
import { addXp, completeDay } from '@/lib/user';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function MissionPage() {
    const { profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWords = async () => {
            if (profile) {
                const day = profile.dayOfCamp || 1;
                const cycle = profile.currentCycleId || 'beginner_cycle_1';
                const dailyWords = await getDailyWords(cycle, day);
                setWords(dailyWords);
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchWords();
        }
    }, [profile, authLoading]);

    const handleNext = async () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF4E8D', '#4ADE80', '#FBBF24']
            });

            if (profile?.uid) {
                await addXp(profile.uid, 50); // Mission base XP
                await completeDay(profile.uid);
            }
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (authLoading || words.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 bg-mint rounded-[40px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-mint/20"
                >
                    <CheckCircle2 size={64} fill="currentColor" className="text-white" />
                </motion.div>

                <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Mission Cleared!</h1>
                <p className="text-charcoal/40 font-medium italic mb-12">You've mastered today's target vocabulary.</p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
                    <div className="puffy-card p-6 bg-strawberry/5 border-none">
                        <Star className="text-amber-500 mx-auto mb-2" size={24} fill="currentColor" />
                        <p className="text-2xl font-black italic">+50 XP</p>
                        <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">Training Bonus</p>
                    </div>
                    <div className="puffy-card p-6 bg-strawberry/5 border-none">
                        <Trophy className="text-primary mx-auto mb-2" size={24} />
                        <p className="text-2xl font-black italic">Day {profile?.dayOfCamp}</p>
                        <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">Streak Intact</p>
                    </div>
                </div>

                <Link href="/dashboard" className="btn-primary-cute flex items-center gap-2 px-12">
                    Return to Base
                    <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    const currentWord = words[currentIndex];

    return (
        <div className="min-h-screen bg-[#FEF9FA] pb-20">
            {/* Side HUD Left */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-10">
                <Link href="/dashboard" className="hud-btn"><Home size={20} /></Link>
                <button className="hud-btn"><Settings size={20} /></button>
            </div>

            {/* Side HUD Right */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-10">
                <button className="hud-btn"><Trophy size={20} /></button>
                <button className="hud-btn"><HelpCircle size={20} /></button>
            </div>

            <header className="max-w-4xl mx-auto px-8 pt-12 text-center pb-12">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 px-6 py-2 bg-white rounded-full shadow-sm border border-strawberry/5 mb-8"
                >
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Day {profile?.dayOfCamp}: Operation Learning</span>
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30">Word {currentIndex + 1} of {words.length}</span>
                </motion.div>

                <div className="w-full max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                        className="h-full bg-primary"
                    />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8">
                <VocabCard
                    word={currentWord.kr}
                    pos="Noun" // This should ideally come from data
                    meaningZh={currentWord.zh}
                    meaningEn={currentWord.en}
                    sentenceKr={currentWord.sentenceKr || "이것은 예문입니다."}
                    sentenceMeaning={currentWord.sentenceMeaning || "This is an example sentence."}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </main>

            <footer className="text-center mt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/20">
                    Hold [S] to speak • Press [H] for hint
                </p>
            </footer>

            <style jsx>{`
        .hud-btn {
           width: 56px;
           height: 56px;
           background: white;
           border-radius: 20px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: #FF4E8D;
           box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
           border: 1.5px solid rgba(255, 78, 141, 0.05);
           transition: all 0.3s;
        }
        .hud-btn:hover {
           transform: translateX(5px);
           background: #FF4E8D;
           color: white;
        }
      `}</style>
        </div>
    );
}
