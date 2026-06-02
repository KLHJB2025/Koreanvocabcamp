'use client';
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import { MOCK_VOCABULARY, Word } from '@/lib/vocabulary-data';
import { Timer, Zap, Home, Ticket, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { CertificateCard } from '@/components/rewards/CertificateCard';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function ChallengePage() {
    const { profile, loading: authLoading } = useAuth();
    const { t, language } = useTranslation();
    const router = useRouter();

    const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
    const [questions, setQuestions] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [timeLeft, setTimeLeft] = useState(90);
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [wrongWords, setWrongWords] = useState<Word[]>([]);
    const [combo, setCombo] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong', combo: number } | null>(null);
    const [generatedVoucherCode, setGeneratedVoucherCode] = useState('');

    const startChallenge = useCallback(() => {
        const cycleId = profile?.currentCycleId || 'beginner_cycle_1';
        const allWords = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];

        // Shuffle and pick 30
        const shuffled = [...allWords].sort(() => Math.random() - 0.5).slice(0, Math.min(30, allWords.length));
        setQuestions(shuffled);
        setAnswers([]);
        setCurrentIndex(0);
        setScore(0);
        setCombo(0);
        setWrongWords([]);
        setTimeLeft(90);
        setGeneratedVoucherCode('');
        setGameState('playing');
    }, [profile]);

    const handleFinishedChallenge = useCallback(async (finalScore?: number) => {
        const actualScore = finalScore !== undefined ? finalScore : score;
        const accuracy = (actualScore / (questions.length || 1)) * 100;

        if (accuracy === 100) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF4E8D', '#4ADE80', '#FBBF24']
            });
        }

        if (profile?.uid) {
            const userRef = doc(db, 'users', profile.uid);
            const xpGained = actualScore * 10 + (accuracy === 100 ? 500 : accuracy >= 80 ? 200 : 0);

            await updateDoc(userRef, {
                totalXp: (profile.totalXp || 0) + xpGained
            });

            if (accuracy === 100) {
                const uniqueCode = 'BOSS10-' + Math.random().toString(36).substring(7).toUpperCase();
                setGeneratedVoucherCode(uniqueCode);
                await updateDoc(userRef, {
                    vouchers: arrayUnion({
                        code: uniqueCode,
                        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        value: 'RM10',
                        isUsed: false
                    })
                });
            }

            // Mark cycle as completed if accuracy is at least 60%
            if (accuracy >= 60) {
                await updateDoc(userRef, {
                    completedCycles: arrayUnion(profile.currentCycleId || 'beginner_cycle_1')
                });
            }

            // Save frequently mistaken words
            if (wrongWords.length > 0) {
                await updateDoc(userRef, {
                    mistakes: arrayUnion(...wrongWords.map(w => w.kr))
                });
            }
        }
    }, [profile, score, questions.length, wrongWords]);

    useEffect(() => {
        if (gameState === 'playing' && currentIndex < questions.length) {
            const currentWord = questions[currentIndex];
            const cycleId = profile?.currentCycleId || 'beginner_cycle_1';
            const allWords = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];

            const wrongOptions = allWords
                .filter(w => w.kr !== currentWord.kr)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => language === 'zh' ? w.zh : w.en);

            const correctOption = language === 'zh' ? currentWord.zh : currentWord.en;
            setOptions([...wrongOptions, correctOption].sort(() => Math.random() - 0.5));
        }
    }, [currentIndex, gameState, questions, language, profile]);

    useEffect(() => {
        let timer: any;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('result');
            handleFinishedChallenge();
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, handleFinishedChallenge]);

    const handleAnswer = (selected: string) => {
        if (feedback) return; // Prevent spam

        const currentWord = questions[currentIndex];
        const correct = language === 'zh' ? currentWord.zh : currentWord.en;
        const isCorrect = selected === correct;

        if (isCorrect) {
            const newCombo = combo + 1;
            setCombo(newCombo);
            setScore(prev => prev + 1);
            setFeedback({ type: 'correct', combo: newCombo });
        } else {
            setCombo(0);
            setWrongWords(prev => [...prev, currentWord]);
            setFeedback({ type: 'wrong', combo: 0 });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setGameState('result');
                handleFinishedChallenge(isCorrect ? score + 1 : score);
            }
        }, 800);
    };

    const accuracy = Math.round((score / (questions.length || 1)) * 100);
    const tier = accuracy === 100 ? 'Legendary' : accuracy >= 90 ? 'Gold' : accuracy >= 80 ? 'Silver' : 'Bronze';

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-charcoal text-white selection:bg-primary/30">
            <AnimatePresence mode="wait">
                {gameState === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, -2, 2, 0], scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="w-32 h-32 bg-primary rounded-[40px] flex items-center justify-center shadow-[0_0_50px_rgba(255,78,141,0.4)] mb-10 border-b-8 border-black/20"
                        >
                            <Zap size={60} fill="currentColor" />
                        </motion.div>

                        <h1 className="text-[100px] font-black italic tracking-tighter leading-none mb-4 uppercase drop-shadow-2xl">
                            {t('challenge.title').split(' ')[0]}<br /><span className="text-primary italic">{t('challenge.title').split(' ')[1]}</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[0.5em] mb-12 text-sm">Target: 30 Words | Time: 90s</p>

                        <div className="flex flex-col gap-6 w-full max-w-sm">
                            <button onClick={startChallenge} className="btn-primary-cute text-xl py-6 rounded-[32px] bg-white text-charcoal hover:bg-primary hover:text-white transition-all border-none shadow-2xl">
                                {t('challenge.commence')}
                            </button>
                            <Link href="/dashboard" className="text-white/20 hover:text-white transition-colors font-black uppercase tracking-widest text-xs">
                                {t('challenge.abandon')}
                            </Link>
                        </div>
                    </motion.div>
                )}

                {gameState === 'playing' && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto px-8 py-20 min-h-screen flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                                    <Timer size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                                        {t('challenge.timeRemaining')}
                                    </p>
                                    <p className={`text-2xl font-black italic ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {questions.map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < currentIndex ? (answers[i] ? 'bg-emerald-400' : 'bg-rose-500') : i === currentIndex ? 'bg-primary animate-pulse' : 'bg-white/10'}`} />
                                ))}
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                                    {t('challenge.progress')}
                                </p>
                                <p className="text-2xl font-black italic">{currentIndex + 1} / {questions.length}</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <AnimatePresence>
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.5, y: -20 }}
                                        className="absolute z-50 pointer-events-none"
                                    >
                                        {feedback.type === 'correct' ? (
                                            <div className="text-center">
                                                <h3 className="text-6xl font-black italic text-primary drop-shadow-[0_0_20px_rgba(255,78,141,0.6)] mb-2">
                                                    {t('challenge.perfect')}
                                                </h3>
                                                {feedback.combo >= 3 && (
                                                    <p className="text-3xl font-black italic text-amber-400">
                                                        {t('challenge.combo', { count: feedback.combo })}
                                                    </p>
                                                )}
                                                <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400 mt-2">
                                                    {t('challenge.memoryIncreased')}
                                                </p>
                                                <p className="text-xl font-black italic text-white/60">+20 XP</p>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <h3 className="text-5xl font-black italic text-rose-500 mb-2 uppercase">
                                                    {t('challenge.almost')}
                                                </h3>
                                                <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                                                    {t('challenge.retrainingRequired')}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-20"
                            >
                                <h2 className="text-8xl font-black italic tracking-tighter uppercase leading-none mb-4 drop-shadow-2xl">{questions[currentIndex]?.kr}</h2>
                                <div className="w-20 h-2 bg-primary mx-auto rounded-full" />
                            </motion.div>

                            <div className="grid grid-cols-2 gap-6 w-full">
                                {options.map((opt, i) => (
                                    <motion.button
                                        key={opt}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 78, 141, 0.1)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswer(opt)}
                                        className={`p-8 rounded-[32px] border-2 bg-white/5 text-2xl font-black italic transition-all text-left flex justify-between items-center group ${
                                            feedback?.type === 'correct' && language === 'zh' ? (opt === questions[currentIndex].zh ? 'border-emerald-400 bg-emerald-400/20' : 'border-white/10 opacity-30') :
                                            feedback?.type === 'wrong' && language === 'zh' ? (opt === questions[currentIndex].zh ? 'border-emerald-400' : 'border-rose-400 bg-rose-400/20') : 'border-white/10 hover:border-primary'
                                        }`}
                                    >
                                        <span>{opt}</span>
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-white/20 font-mono transition-all">
                                            {i + 1}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {gameState === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-h-screen py-20 px-8 flex flex-col items-center bg-gradient-to-b from-charcoal to-black overflow-y-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-2">
                                {t('challenge.complete')}
                            </h2>
                            <p className="text-white/40 font-bold uppercase tracking-widest">
                                {t('challenge.accuracy')}: {accuracy}%
                            </p>
                        </div>

                        {accuracy >= 60 ? (
                            <div className="w-full max-w-4xl space-y-12 mb-20">
                                <CertificateCard
                                    userName={profile?.displayName || 'Alpha Agent'}
                                    campTitle={profile?.currentCycleId?.replace(/_/g, ' ').toUpperCase() || 'TOP SECRET CAMP'}
                                    date={new Date().toLocaleDateString()}
                                    score={accuracy}
                                    tier={tier as any}
                                />

                                {accuracy === 100 && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="puffy-card p-10 bg-amber-400 text-charcoal border-none flex flex-col md:flex-row items-center gap-8 text-left shadow-[0_0_60px_rgba(251,191,36,0.5)]"
                                    >
                                        <div className="w-24 h-24 bg-white/20 rounded-[32px] flex items-center justify-center shrink-0 border border-white/30">
                                            <Ticket size={48} className="rotate-12" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="inline-block px-3 py-1 bg-charcoal text-white rounded-full text-[8px] font-black uppercase tracking-widest mb-3">
                                                {t('challenge.legendaryReward')}
                                            </div>
                                            <h3 className="text-3xl font-black italic uppercase leading-none mb-2">
                                                {t('challenge.scholarshipUnlocked')}
                                            </h3>
                                            <p className="text-sm font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                                                {t('challenge.voucherInstruction').replace('BOSS10-VICTORY', generatedVoucherCode || 'BOSS10-VICTORY')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(generatedVoucherCode || 'BOSS10-VICTORY');
                                                alert(t('challenge.copied'));
                                            }}
                                            className="px-8 py-4 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                                        >
                                            {t('challenge.copyCode')}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-8 mb-20">
                                <div className="w-40 h-40 bg-rose-500/10 rounded-[48px] flex items-center justify-center text-rose-500 border-2 border-rose-500/20">
                                    <XCircle size={80} />
                                </div>
                                <div className="text-center max-w-md">
                                    <h3 className="text-3xl font-black italic uppercase mb-2 text-rose-500">
                                        {t('challenge.retrainingRequired')}
                                    </h3>
                                    <p className="text-white/40 font-medium italic">You need at least 60% accuracy to earn a certificate. Don&apos;t give up, Agent!</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 w-full max-w-sm">
                            <button onClick={() => setGameState('intro')} className="btn-secondary-cute flex-1 flex items-center justify-center gap-2 bg-transparent text-white border-white/10 hover:bg-white/5">
                                {t('challenge.retry')}
                            </button>
                            <Link href="/dashboard" className="btn-primary-cute flex-1 flex items-center justify-center gap-2">
                                <Home size={20} />
                                {t('challenge.hq')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .puffy-card {
                    border-radius: 32px;
                }
            `}</style>
        </div>
    );
}
