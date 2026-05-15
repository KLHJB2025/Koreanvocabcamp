'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { getDailyWords, getReviewWords } from '@/lib/vocabulary';
import { Word } from '@/lib/vocabulary-data';
import { addXp, completeDay, recordLearnedWords } from '@/lib/user';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Home, CheckCircle2, Star, Trophy, ArrowRight, Loader2, BookOpen, Volume2, Search, Type, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

// Components
import { VocabCard } from '@/components/learning/VocabCard';
import { ReviewTask } from '@/components/learning/ReviewTask';
import { ListeningTask } from '@/components/learning/ListeningTask';
import { MatchingTask } from '@/components/learning/MatchingTask';
import { SpellingTask } from '@/components/learning/SpellingTask';
import { ScenarioTask } from '@/components/learning/ScenarioTask';
import { ErrorReviewTask } from '@/components/learning/ErrorReviewTask';

type MissionStep = 'intro' | 'review' | 'learn' | 'listen' | 'match' | 'spell' | 'errorReview' | 'scenario' | 'complete';

export default function MissionPage() {
    const { profile, loading: authLoading } = useAuth();
    const { t } = useTranslation();
    const router = useRouter();
    
    const [step, setStep] = useState<MissionStep>('intro');
    const [words, setWords] = useState<Word[]>([]);
    const [prevWords, setPrevWords] = useState<Word[]>([]);
    const [missedWords, setMissedWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMiss = (word: Word) => {
        setMissedWords(prev => {
            if (prev.find(w => w.kr === word.kr)) return prev;
            return [...prev, word];
        });
    };

    useEffect(() => {
        const load = async () => {
            if (profile) {
                const day = profile.dayOfCamp || 1;
                const cycle = profile.currentCycleId || 'beginner_cycle_1';
                
                const [daily, review] = await Promise.all([
                    getDailyWords(cycle, day),
                    getReviewWords(profile.uid, cycle, day)
                ]);
                
                setWords(daily);
                setPrevWords(review);
                setIsLoading(false);
            }
        };

        if (!authLoading) load();
    }, [profile, authLoading]);

    const handleNextStep = () => {
        if (step === 'intro') setStep(prevWords.length > 0 ? 'review' : 'learn');
        else if (step === 'review') setStep('learn');
        else if (step === 'learn') setStep('listen');
        else if (step === 'listen') setStep('match');
        else if (step === 'match') setStep('spell');
        else if (step === 'spell') {
            if (missedWords.length > 0) setStep('errorReview');
            else setStep('scenario');
        }
        else if (step === 'errorReview') {
            setMissedWords([]); // Clear errors once mastered
            setStep('scenario');
        }
        else if (step === 'scenario') finalizeMission();
    };

    const finalizeMission = async () => {
        setStep('complete');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4E8D', '#4ADE80', '#FBBF24']
        });

        if (profile?.uid) {
            const wordIds = words.map(w => w.kr);
            await Promise.all([
                addXp(profile.uid, 150),
                completeDay(profile.uid),
                recordLearnedWords(profile.uid, wordIds)
            ]);
        }
    };

    if (authLoading || isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FEF9FA] pb-20">
            {/* Header Progress */}
            <header className="max-w-4xl mx-auto px-8 pt-12 text-center pb-12">
                <div className="flex justify-center gap-4 mb-8">
                    <StepIndicator active={step === 'review'} completed={['learn', 'listen', 'match', 'spell', 'complete'].includes(step)} icon={<Search size={14} />} label={t('tasks.review.label')} />
                    <StepIndicator active={step === 'learn'} completed={['listen', 'match', 'spell', 'complete'].includes(step)} icon={<BookOpen size={14} />} label={t('tasks.learn.label')} />
                    <StepIndicator active={step === 'listen'} completed={['match', 'spell', 'complete'].includes(step)} icon={<Volume2 size={14} />} label={t('tasks.listen.label')} />
                    <StepIndicator active={step === 'match'} completed={['spell', 'scenario', 'complete'].includes(step)} icon={<Trophy size={14} />} label={t('tasks.match.label')} />
                    <StepIndicator active={step === 'spell'} completed={['scenario', 'complete'].includes(step)} icon={<Type size={14} />} label={t('tasks.spell.label')} />
                    <StepIndicator active={step === 'scenario'} completed={['complete'].includes(step)} icon={<Sparkles size={14} />} label={t('mission.scenarioMission') || 'Scenario'} />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8">
                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-20">
                            <div className="w-40 h-40 bg-white rounded-[48px] shadow-2xl flex items-center justify-center mx-auto mb-10 border-4 border-strawberry/10">
                                <motion.img src="/illustrations/mascot.png" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32" />
                            </div>
                            <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">{t('mission.dailyOperation')}</h1>
                            <p className="text-charcoal/40 font-bold mb-12 uppercase tracking-widest">
                                {t('mission.masterTargets', { count: words.length })}
                            </p>
                            <button onClick={handleNextStep} className="btn-primary-cute text-2xl px-12 py-6">{t('mission.beginMission')}</button>
                        </motion.div>
                    )}

                    {step === 'review' && <ReviewTask key="review" words={prevWords} onComplete={handleNextStep} />}
                    
                    {step === 'learn' && (
                        <div key="learn" className="space-y-12">
                            <VocabCard 
                                word={words[currentIndex].kr} 
                                pos={words[currentIndex].pos} 
                                meaningZh={words[currentIndex].zh} 
                                meaningEn={words[currentIndex].en} 
                                sentenceKr={words[currentIndex].sentenceKr} 
                                sentenceMeaning={words[currentIndex].sentenceMeaning}
                                sentenceZh={words[currentIndex].sentenceZh}
                                illustrationUrl={words[currentIndex].illustrationUrl}
                                onNext={() => currentIndex < words.length - 1 ? setCurrentIndex(prev => prev + 1) : handleNextStep()}
                                onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            />
                            <div className="text-center">
                                <p className="text-[10px] font-black text-charcoal/20 uppercase tracking-widest italic">
                                    {t('mission.cardProgress', { current: currentIndex + 1, total: words.length })}
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 'listen' && <ListeningTask key="listen" words={words} onComplete={handleNextStep} onMiss={handleMiss} />}
                    {step === 'match' && <MatchingTask key="match" words={words} onComplete={handleNextStep} onMiss={handleMiss} />}
                    {step === 'spell' && <SpellingTask key="spell" words={words} onComplete={handleNextStep} onMiss={handleMiss} />}
                    {step === 'errorReview' && <ErrorReviewTask key="errorReview" words={missedWords} onComplete={handleNextStep} />}
                    {step === 'scenario' && <ScenarioTask key="scenario" words={words} onComplete={finalizeMission} />}

                    {step === 'complete' && (
                        <motion.div key="complete" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
                            <div className="w-40 h-40 bg-emerald-400 rounded-[48px] shadow-2xl flex items-center justify-center mx-auto mb-10 text-white">
                                <CheckCircle2 size={80} />
                            </div>
                            <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2">{t('mission.congrats')}</h2>
                            <p className="text-charcoal/40 font-bold mb-12 uppercase tracking-widest">
                                {t('mission.streakInfo', { count: profile?.streakCount || 1 })}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-12">
                                <div className="puffy-card p-8 bg-strawberry/5 border-none">
                                    <Star className="text-amber-500 mx-auto mb-2" size={32} fill="currentColor" />
                                    <p className="text-4xl font-black italic">+150 XP</p>
                                    <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">{t('mission.reward')}</p>
                                </div>
                                <div className="puffy-card p-8 bg-strawberry/5 border-none">
                                    <Trophy className="text-primary mx-auto mb-2" size={32} />
                                    <p className="text-4xl font-black italic">ELITE</p>
                                    <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">{t('mission.performance')}</p>
                                </div>
                            </div>

                            <Link href="/dashboard" className="btn-primary-cute flex items-center justify-center gap-3 px-12 mx-auto w-fit">
                                {t('mission.returnToBase')}
                                <ArrowRight size={24} />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

interface StepIndicatorProps {
    active: boolean;
    completed: boolean;
    icon: React.ReactNode;
    label: string;
}

function StepIndicator({ active, completed, icon, label }: StepIndicatorProps) {
    return (
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${active ? 'scale-110' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm border-2 ${
                completed ? 'bg-emerald-400 border-emerald-400 text-white' : 
                active ? 'bg-primary border-primary text-white shadow-primary/20' : 'bg-white border-strawberry/5 text-charcoal'
            }`}>
                {completed ? <CheckCircle2 size={16} /> : icon}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${active ? 'text-primary' : 'text-charcoal/40'}`}>{label}</span>
        </div>
    );
}
