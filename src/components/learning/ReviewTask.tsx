/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { updateWordProgress } from '@/lib/user';

interface ReviewTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ReviewTask({ words, onComplete }: ReviewTaskProps) {
    const { profile } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t, language } = useTranslation();
    
    const generateOptions = (index: number) => {
        if (index >= words.length) return [];
        const current = words[index];
        const others = words.filter(w => w.kr !== current.kr);
        const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
        
        const currentMeaning = language === 'zh' ? current.zh : current.en;
        const otherMeanings = shuffled.map(s => language === 'zh' ? s.zh : s.en);
        
        return [...otherMeanings, currentMeaning].sort(() => Math.random() - 0.5);
    };

    const [options, setOptions] = useState<string[]>(() => generateOptions(0));

    // Handle initial state if words change
    useEffect(() => {
        if (words.length > 0 && currentIndex === 0) {
            setOptions(generateOptions(0));
        } else if (words.length === 0) {
            onComplete();
        }
    }, [words, language, currentIndex, onComplete]);

    const handleAnswer = async (opt: string) => {
        if (selectedOption) return;
        setSelectedOption(opt);
        const currentMeaning = language === 'zh' ? words[currentIndex].zh : words[currentIndex].en;
        const correct = opt === currentMeaning;
        setIsCorrect(correct);

        // Sync to backend
        if (profile?.uid) {
            await updateWordProgress(profile.uid, words[currentIndex].kr, correct);
        }

        setTimeout(() => {
            if (correct) {
                setSelectedOption(null);
                setIsCorrect(null);
                if (currentIndex < words.length - 1) {
                    const nextIndex = currentIndex + 1;
                    setCurrentIndex(nextIndex);
                    setOptions(generateOptions(nextIndex));
                } else {
                    onComplete();
                }
            } else {
                setSelectedOption(null);
                setIsCorrect(null);
            }
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5">
            <div className="text-center mb-10">
                <span className="pill-badge bg-primary/10 text-primary mb-4 inline-block italic">
                    {t('learning.memoryTraining')}
                </span>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase text-charcoal">
                    {words[currentIndex]?.kr}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className={`p-6 rounded-3xl border-2 transition-all text-xl font-bold flex items-center justify-between ${
                            selectedOption === opt 
                                ? (isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-rose-50 border-rose-400 text-rose-600')
                                : 'bg-secondary/30 border-transparent hover:border-primary/20'
                        }`}
                    >
                        {opt}
                        {selectedOption === opt && (
                            isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />
                        )}
                    </button>
                ))}
            </div>
            
            <p className="text-center mt-8 text-[10px] font-black uppercase tracking-widest text-charcoal/20 italic">
                {currentIndex + 1} / {words.length} {t('learning.completed')}
            </p>
        </div>
    );
}
