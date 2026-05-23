/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Word } from '@/lib/vocabulary-data';
import { Volume2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { playSuccessSound, playErrorSound } from '@/lib/sound';

interface ListeningTaskProps {
    words: Word[];
    onComplete: () => void;
    onMiss: (word: Word) => void;
}

export function ListeningTask({ words, onComplete, onMiss }: ListeningTaskProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<Word[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { t, language } = useTranslation();

    const speak = (word: string, rate: number = 1.0) => {
        const cleanName = word.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = `/audio/words/${cleanName}.mp3`;
        
        const audio = new Audio(audioPath);
        audio.playbackRate = rate === 1.0 ? 1.0 : 0.7; // Ensure slow is 0.7
        audio.play().catch(e => console.error("Audio playback failed:", e));
    };

    useEffect(() => {
        if (currentIndex < words.length) {
            const current = words[currentIndex];
            const others = words.filter(w => w.kr !== current.kr);
            const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
            setOptions([...shuffled, current].sort(() => Math.random() - 0.5));
            setSelectedId(null);
            setIsCorrect(null);
            setIsSubmitted(false);
            
            // Auto play sound
            speak(current.kr);
        }
    }, [currentIndex, words]);

    const handleSelect = (word: Word) => {
        if (isSubmitted) return;
        setSelectedId(word.kr);
    };

    const handleSubmit = () => {
        if (!selectedId || isSubmitted) return;
        
        const correct = selectedId === words[currentIndex].kr;
        setIsCorrect(correct);
        setIsSubmitted(true);

        if (correct) {
            playSuccessSound();
        } else {
            playErrorSound();
            onMiss(words[currentIndex]);
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5 text-center">
            <span className="pill-badge bg-primary/10 text-primary mb-8 inline-block italic">
                {t('tasks.listening.title')}
            </span>
            
            <div className="flex flex-col items-center gap-4 mb-12">
                <button 
                    onClick={() => speak(words[currentIndex].kr)}
                    className="w-32 h-32 bg-primary rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all"
                >
                    <Volume2 size={60} />
                </button>
                <button
                    onClick={() => speak(words[currentIndex].kr, 0.6)}
                    className="px-6 py-2 bg-cloud/20 rounded-2xl flex items-center gap-2 text-sm font-black uppercase tracking-widest text-charcoal/40 hover:text-primary transition-colors border border-charcoal/5 shadow-sm"
                >
                    <Volume2 size={16} />
                    {t('learning.slow')}
                </button>
            </div>

            <h3 className="text-xl font-black italic uppercase tracking-widest text-charcoal/30 mb-8">
                {t('tasks.listening.instruction')}
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
                {options.map((opt) => {
                    const isSelected = selectedId === opt.kr;
                    const isCorrectAnswer = opt.kr === words[currentIndex].kr;
                    
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
                            key={opt.kr}
                            onClick={() => handleSelect(opt)}
                            className={`p-8 rounded-[32px] border-2 transition-all text-2xl font-black italic ${btnClass}`}
                        >
                            {opt.kr}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8">
                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedId}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            selectedId 
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90' 
                                : 'bg-secondary/30 text-charcoal/30 border-2 border-dashed border-charcoal/10 cursor-not-allowed'
                        }`}
                    >
                        {language === 'zh' ? '提交答案' : 'Submit Answer'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full py-5 text-xl font-black italic bg-charcoal hover:bg-charcoal/90 text-white rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl"
                    >
                        {language === 'zh' ? '下一题' : 'Next Question'}
                    </button>
                )}
            </div>
        </div>
    );
}
