/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Word, MOCK_VOCABULARY } from '@/lib/vocabulary-data';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { playSuccessSound, playErrorSound } from '@/lib/sound';
import { useAuth } from '@/hooks/use-auth';
import { updateWordProgress } from '@/lib/user';

interface ReviewTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ReviewTask({ words, onComplete }: ReviewTaskProps) {
    const { profile } = useAuth();
    const [queue, setQueue] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { t, language } = useTranslation();
    
    // Track which words have already been attempted in this session to update database only once
    const [attemptedWords, setAttemptedWords] = useState<string[]>([]);

    // Initialize queue from words prop
    useEffect(() => {
        if (words.length > 0) {
            setQueue(words);
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsCorrect(null);
            setIsSubmitted(false);
            setAttemptedWords([]);
        } else {
            onComplete();
        }
    }, [words]);

    const generateOptions = (index: number, currentQueue: Word[]) => {
        if (index >= currentQueue.length) return [];
        const current = currentQueue[index];
        
        // Find other words for incorrect choices.
        let others = words.filter(w => w.kr !== current.kr);
        
        // If due list is small, grab decoys from the global database to ensure 4 options
        if (others.length < 3) {
            const allDecoys = Object.values(MOCK_VOCABULARY)
                .flat()
                .filter(w => w.kr !== current.kr && !others.some(o => o.kr === w.kr));
            
            const extraDecoys = [...allDecoys].sort(() => Math.random() - 0.5).slice(0, 3 - others.length);
            others = [...others, ...extraDecoys];
        }
        
        const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
        const currentMeaning = language === 'zh' ? current.zh : current.en;
        const otherMeanings = shuffled.map(s => language === 'zh' ? s.zh : s.en);
        
        return [...otherMeanings, currentMeaning].sort(() => Math.random() - 0.5);
    };

    const [options, setOptions] = useState<string[]>([]);

    // Update options whenever current index or queue changes
    useEffect(() => {
        if (queue.length > 0 && currentIndex < queue.length) {
            setOptions(generateOptions(currentIndex, queue));
        }
    }, [queue, currentIndex, language]);

    const handleSelect = (opt: string) => {
        if (isSubmitted) return;
        setSelectedOption(opt);
    };

    const handleSubmit = async () => {
        if (!selectedOption || isSubmitted || queue.length === 0) return;
        
        const currentWord = queue[currentIndex];
        const currentMeaning = language === 'zh' ? currentWord.zh : currentWord.en;
        const correct = selectedOption === currentMeaning;
        setIsCorrect(correct);
        setIsSubmitted(true);

        if (correct) {
            playSuccessSound();
        } else {
            playErrorSound();
            
            // Recycle incorrect word to the end of the queue so they must answer it correctly to pass
            setQueue(prev => [...prev, currentWord]);
        }

        // Sync to backend (only on the first attempt of this word in this session)
        const wordKr = currentWord.kr;
        if (!attemptedWords.includes(wordKr)) {
            setAttemptedWords(prev => [...prev, wordKr]);
            if (profile?.uid) {
                await updateWordProgress(profile.uid, wordKr, correct);
            }
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        setIsSubmitted(false);
        
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    if (queue.length === 0 || currentIndex >= queue.length) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5">
            <div className="text-center mb-10">
                <span className="pill-badge bg-primary/10 text-primary mb-4 inline-block italic">
                    {t('learning.memoryTraining')}
                </span>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase text-charcoal">
                    {queue[currentIndex]?.kr}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const currentMeaning = language === 'zh' ? queue[currentIndex].zh : queue[currentIndex].en;
                    const isCorrectAnswer = opt === currentMeaning;
                    
                    let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                    if (isSubmitted) {
                        if (isCorrectAnswer) {
                            btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-600';
                        } else if (isSelected) {
                            btnClass = 'bg-rose-50 border-rose-400 text-rose-600';
                        } else {
                            btnClass = 'bg-secondary/10 border-transparent text-charcoal/40 opacity-60';
                        }
                    } else if (isSelected) {
                        btnClass = 'bg-primary/10 border-primary text-primary';
                    }

                    return (
                        <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleSelect(opt)}
                            className={`p-6 rounded-3xl border-2 transition-all text-xl font-bold flex items-center justify-between ${btnClass}`}
                        >
                            {opt}
                            {isSubmitted && isCorrectAnswer && <CheckCircle2 size={24} />}
                            {isSubmitted && isSelected && !isCorrectAnswer && <XCircle size={24} />}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8">
                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            selectedOption 
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 cursor-pointer' 
                                : 'bg-secondary/30 text-charcoal/30 border-2 border-dashed border-charcoal/10 cursor-not-allowed'
                        }`}
                    >
                        {language === 'zh' ? '提交答案' : 'Submit Answer'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full py-5 text-xl font-black italic bg-charcoal hover:bg-charcoal/90 text-white rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl cursor-pointer"
                    >
                        {language === 'zh' ? '下一题' : 'Next Question'}
                    </button>
                )}
            </div>
            
            <p className="text-center mt-8 text-[10px] font-black uppercase tracking-widest text-charcoal/20 italic">
                {currentIndex + 1} / {queue.length} {t('learning.completed')}
            </p>
        </div>
    );
}
