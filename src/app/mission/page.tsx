'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { getDailyWords, getReviewWords, getMissionImageUrls } from '@/lib/vocabulary';
import { Word } from '@/lib/vocabulary-data';
import { addXp, completeDay, recordLearnedWords } from '@/lib/user';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Home, CheckCircle2, Star, Trophy, ArrowRight, Loader2, BookOpen, Volume2, Search, Type, Sparkles, AlertCircle, Play } from 'lucide-react';
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

const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function MissionPage() {
    const { profile, loading: authLoading } = useAuth();
    const { t, language } = useTranslation();
    const router = useRouter();
    
    const [step, setStep] = useState<MissionStep>('intro');
    const [words, setWords] = useState<Word[]>([]);
    const [prevWords, setPrevWords] = useState<Word[]>([]);
    const [missedWords, setMissedWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [preloadProgress, setPreloadProgress] = useState(0);
    const [isPreloading, setIsPreloading] = useState(false);
    const [savedProgress, setSavedProgress] = useState<any>(null);

    // Save progress to localStorage
    useEffect(() => {
        if (step !== 'intro' && step !== 'complete' && words.length > 0) {
            const progress = {
                step,
                currentIndex,
                missedWords,
                day: profile?.dayOfCamp
            };
            localStorage.setItem('mission_progress', JSON.stringify(progress));
        }
    }, [step, currentIndex, missedWords, words, profile]);

    // Load progress from localStorage
    useEffect(() => {
        if (words.length > 0 && profile && step === 'intro') {
            const saved = localStorage.getItem('mission_progress');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.day === profile.dayOfCamp) {
                        setSavedProgress(parsed);
                    } else {
                        localStorage.removeItem('mission_progress');
                    }
                } catch (e) {
                    console.error("Failed to parse saved progress", e);
                }
            }
        }
    }, [words, profile, step]);

    const handleResume = () => {
        if (savedProgress) {
            if (savedProgress.step === 'review' && prevWords.length === 0) {
                setStep('learn');
            } else {
                setStep(savedProgress.step);
            }
            setCurrentIndex(savedProgress.currentIndex || 0);
            setMissedWords(savedProgress.missedWords || []);
        }
    };

    const handleStartFresh = () => {
        if (confirm(language === 'zh' ? '确定要重置并从头开始吗？' : 'Are you sure you want to reset and start fresh?')) {
            localStorage.removeItem('mission_progress');
            setSavedProgress(null);
            setCurrentIndex(0);
            setMissedWords([]);
            setStep(prevWords.length > 0 ? 'review' : 'learn');
        }
    };

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

    // Preload all dynamic mission images sequentially to avoid overloading the image API
    useEffect(() => {
        if (words.length === 0) return;

        const urls = getMissionImageUrls(words);
        setIsPreloading(true);
        setPreloadProgress(0);

        let active = true;

        const preloadSequentially = async () => {
            let loadedCount = 0;
            for (let i = 0; i < urls.length; i++) {
                if (!active) break;
                
                const url = urls[i];
                await new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (active) {
                            setPreloadProgress(Math.round((loadedCount / urls.length) * 100));
                        }
                        resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        if (active) {
                            setPreloadProgress(Math.round((loadedCount / urls.length) * 100));
                        }
                        resolve();
                    };
                    img.src = url;
                });
                
                // Add a small 200ms pause between requests to be gentle on the generation API
                if (i < urls.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
            if (active) {
                setIsPreloading(false);
            }
        };

        preloadSequentially();

        return () => {
            active = false;
        };
    }, [words]);

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
        localStorage.removeItem('mission_progress'); // Clear saved progress on completion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4E8D', '#4ADE80', '#FBBF24']
        });

        if (profile?.uid) {
            const wordIds = words.map(w => w.kr);
            const todayStr = getTodayDateString();
            await Promise.all([
                addXp(profile.uid, 150),
                completeDay(profile.uid, todayStr),
                recordLearnedWords(profile.uid, wordIds)
            ]);
        }
    };

    if (authLoading || isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    const isTrialBypass = profile?.email === 'carrinecares@gmail.com';
    const isLockedToday = profile && profile.role !== 'admin' && !isTrialBypass && profile.lastCompletedDate === getTodayDateString();

    if (isLockedToday) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB] px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl border-2 border-strawberry/5 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-strawberry to-primary" />
                    
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-24 h-24 bg-strawberry/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-6 shadow-inner"
                    >
                        <Sparkles size={44} className="text-primary animate-pulse" />
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl font-black italic text-charcoal mb-4 uppercase tracking-tight">
                        {language === 'zh' ? '今日特训已圆满！' : 'Today\'s Intel Secured!'}
                    </h2>
                    
                    <p className="text-sm sm:text-base font-semibold text-charcoal/60 leading-relaxed mb-8">
                        {language === 'zh' 
                            ? '你今天已经完成了一次每日关卡，脑细胞正在高速吸收新词汇中哦！明天的全新任务将在明天解锁 🔒，请先好好休息吧！' 
                            : 'You have already completed your daily training for today! Your brain is actively processing the new words. Tomorrow\'s mission will unlock tomorrow 🔒. Keep up the amazing work!'}
                    </p>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="btn-primary-cute w-full py-4 text-base font-black flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-rose-400 text-white shadow-lg shadow-primary/20 border-none rounded-2xl"
                    >
                        <Home size={18} />
                        <span>{language === 'zh' ? '返回控制台' : 'Back to Dashboard'}</span>
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FEF9FA] pb-20">
            {/* Header Progress */}
            <header className="max-w-4xl mx-auto px-4 sm:px-8 pt-6 sm:pt-12 text-center pb-6 sm:pb-12">
                {step !== 'intro' && step !== 'complete' && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-4 py-2 bg-strawberry/10 hover:bg-strawberry/20 text-primary border border-strawberry/20 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                        >
                            {t('mission.pauseExit')}
                        </button>
                    </div>
                )}
                <div className="flex justify-center gap-1.5 sm:gap-4 mb-4 sm:mb-8">
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
                            <div className="w-40 h-40 bg-white rounded-[48px] shadow-2xl flex items-center justify-center mx-auto mb-4 border-4 border-strawberry/10 overflow-hidden">
                                <motion.img src="/illustrations/mascot.png" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32" />
                            </div>
                            <p className="text-strawberry font-black italic uppercase tracking-widest text-sm mb-6">
                                {profile?.mascotName || 'Boopi'}
                            </p>
                            <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">{t('mission.dailyOperation')}</h1>
                            <p className="text-charcoal/40 font-bold mb-12 uppercase tracking-widest">
                                {words.length > 0 ? t('mission.masterTargets', { count: words.length }) : "No targets available"}
                            </p>
                            {words.length > 0 ? (
                                <div className="space-y-6">
                                    {savedProgress ? (
                                        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                                            <button 
                                                onClick={handleResume} 
                                                className="btn-primary-cute text-2xl px-12 py-6 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-rose-500 text-white border-none shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                <Play size={24} fill="currentColor" />
                                                {language === 'zh' ? '继续上次进度' : 'Resume Session'}
                                            </button>
                                            
                                            <button 
                                                onClick={handleStartFresh} 
                                                className="text-sm font-black text-charcoal/40 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                                            >
                                                <span>{language === 'zh' ? '重新开始' : 'Start Fresh'}</span>
                                            </button>
                                            
                                            <div className="p-4 bg-strawberry/5 border border-strawberry/10 rounded-2xl w-full text-center">
                                                <p className="text-xs font-bold text-charcoal/50">
                                                    {language === 'zh' 
                                                        ? `保存的进度：步骤 [${savedProgress.step === 'learn' ? '学习' : savedProgress.step === 'listen' ? '听力' : savedProgress.step === 'match' ? '匹配' : savedProgress.step === 'spell' ? '拼写' : savedProgress.step === 'errorReview' ? '错题复习' : savedProgress.step === 'scenario' ? '情境' : '复习'}] • 单词 [${savedProgress.currentIndex + 1}/${words.length || 10}]` 
                                                        : `Saved Progress: Step [${savedProgress.step}] • Word [${savedProgress.currentIndex + 1}/${words.length || 10}]`}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <button onClick={handleNextStep} className="btn-primary-cute text-2xl px-12 py-6">
                                            {t('mission.beginMission')}
                                        </button>
                                    )}
                                    
                                    {isPreloading && (
                                        <p className="text-[10px] font-black text-primary/65 uppercase tracking-widest animate-pulse">
                                            {language === 'zh' 
                                                ? `正在后台预缓存记忆画面 (${preloadProgress}%)` 
                                                : `Preloading memory scenes in background (${preloadProgress}%)`}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <button onClick={() => router.push('/dashboard')} className="btn-primary-cute text-2xl px-12 py-6">Return to Base</button>
                            )}
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
                                sentences={words[currentIndex].sentences}
                                illustrationUrl={words[currentIndex].illustrationUrl}
                                category={words[currentIndex].category}
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
                    {step === 'scenario' && <ScenarioTask key="scenario" words={words} onComplete={finalizeMission} mascotName={profile?.mascotName} />}

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
        <div className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${active ? 'scale-105' : 'opacity-40'}`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm border-2 text-xs sm:text-sm ${
                completed ? 'bg-emerald-400 border-emerald-400 text-white' : 
                active ? 'bg-primary border-primary text-white shadow-primary/20' : 'bg-white border-strawberry/5 text-charcoal'
            }`}>
                {completed ? <CheckCircle2 size={14} className="sm:w-[16px] sm:h-[16px]" /> : icon}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${active ? 'text-primary' : 'text-charcoal/40'} ${active ? 'block' : 'hidden sm:block'}`}>{label}</span>
        </div>
    );
}
