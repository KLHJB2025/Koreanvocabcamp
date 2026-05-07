'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Zap, Shield, ChevronRight, X, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const CHALLENGE_WORDS = [
    { kr: "사랑하다", options: ["To hate", "To love", "To walk", "To read"], correct: 1 },
    { kr: "공부하다", options: ["To play", "To study", "To sleep", "To eat"], correct: 1 },
    { kr: "노래하다", options: ["To sing", "To dance", "To clean", "To talk"], correct: 0 },
    // ... more words would normally be here
];

export default function FinalChallengePage() {
    const [index, setIndex] = useState(0);
    const [hearts, setHearts] = useState(3);
    const [combo, setCombo] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const router = useRouter();

    const currentQuestion = CHALLENGE_WORDS[index];

    const handleAnswer = (idx: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(idx);
        const correct = idx === currentQuestion.correct;
        setIsCorrect(correct);

        if (correct) {
            setCombo(prev => prev + 1);
            // Small success flash or sound would go here
        } else {
            setHearts(prev => prev - 1);
            setCombo(0);
            if (hearts <= 1) {
                setIsGameOver(true);
            }
        }

        setTimeout(() => {
            if (index < CHALLENGE_WORDS.length - 1) {
                setIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                if (hearts > 0) {
                    setIsCleared(true);
                    confetti({
                        particleCount: 200,
                        spread: 90,
                        origin: { y: 0.5 },
                        colors: ['#FFD700', '#C0C0C0', '#CD7F32']
                    });
                }
            }
        }, 1500);
    };

    if (isGameOver) {
        return (
            <ChallengeResultScreen
                title="Challenge Failed"
                subtitle="The boss was too strong this time. Review your words and try again!"
                icon={<AlertTriangle size={64} className="text-red-500" />}
                status="failed"
            />
        );
    }

    if (isCleared) {
        return (
            <ChallengeResultScreen
                title="Epic Victory!"
                subtitle="You've mastered the 14-day TOPIK Bootcamp. You are now a TOPIK Legend!"
                icon={<Trophy size={64} className="text-amber-500" />}
                status="cleared"
                xp={500}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate text-white flex flex-col font-sans">
            {/* Boss HUD */}
            <header className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/dashboard')} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                        <X size={20} />
                    </button>
                    <div className="h-10 w-px bg-white/10" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Final Boss</p>
                        <h1 className="text-lg font-bold">Vocabulary Overlord</h1>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <Heart
                                key={i}
                                size={24}
                                className={i < hearts ? "text-rose-500 fill-rose-500 animate-pulse" : "text-white/10"}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                        <Zap size={20} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold text-xl">{combo}x</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-16">
                        <motion.div
                            key={index}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-block px-12 py-8 bg-white/5 rounded-[40px] border border-white/10 mb-8"
                        >
                            <span className="text-7xl font-bold font-noto-kr">{currentQuestion.kr}</span>
                        </motion.div>
                        <p className="text-white/40 font-medium tracking-widest uppercase text-sm">Select the correct meaning</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((opt, i) => {
                            const isSelected = selectedOption === i;
                            const isThisCorrect = i === currentQuestion.correct;

                            let bgColor = "bg-white/5 border-white/10 hover:border-white/30";
                            if (isSelected) {
                                bgColor = isThisCorrect ? "bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-red-500/20 border-red-500";
                            } else if (selectedOption !== null && isThisCorrect) {
                                bgColor = "bg-emerald-500/20 border-emerald-500/50";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={selectedOption !== null}
                                    className={`relative p-6 rounded-3xl border-2 transition-all text-left group overflow-hidden ${bgColor}`}
                                >
                                    <span className="text-xl font-bold relative z-10">{opt}</span>
                                    {isSelected && isThisCorrect && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.5 }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 opacity-20"
                                        >
                                            <Trophy size={100} />
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>

            <footer className="p-12">
                <div className="max-w-xl mx-auto flex items-center gap-4">
                    <span className="text-xs font-bold text-white/20 uppercase whitespace-nowrap">Battle Progress</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                            animate={{ width: `${(index / CHALLENGE_WORDS.length) * 100}%` }}
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}

function ChallengeResultScreen({ title, subtitle, icon, status, xp = 0 }: any) {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-slate text-white flex flex-col items-center justify-center p-8 text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full"
            >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${status === 'cleared' ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
                    {icon}
                </div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-white/40 text-lg mb-12">{subtitle}</p>

                {status === 'cleared' && (
                    <div className="grid grid-cols-2 gap-4 mb-12">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                            <p className="text-3xl font-bold text-amber-500">+{xp}</p>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">XP Reward</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                            <p className="text-3xl font-bold text-primary italic">S</p>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Rank Tier</p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={() => router.push(status === 'cleared' ? '/certificate' : '/dashboard')}
                        className={`w-full py-5 rounded-full font-bold text-xl transition-all ${status === 'cleared' ? 'bg-amber-500 hover:bg-amber-400 text-slate' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        {status === 'cleared' ? 'Claim Certificate' : 'Back to Dashboard'}
                    </button>
                    {status === 'failed' && (
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-5 rounded-full font-bold text-xl bg-white text-slate hover:bg-white/90"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
