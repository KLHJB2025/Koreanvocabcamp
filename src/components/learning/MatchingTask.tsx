/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';
import { playSuccessSound, playErrorSound } from '@/lib/sound';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface MatchingTaskProps {
    words: Word[];
    onComplete: () => void;
    onMiss: (word: Word) => void;
}

export function MatchingTask({ words, onComplete, onMiss }: MatchingTaskProps) {
    const [koreanWords, setKoreanWords] = useState<string[]>([]);
    const [meanings, setMeanings] = useState<string[]>([]);
    const [selectedKr, setSelectedKr] = useState<string | null>(null);
    const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
    const [matches, setMatches] = useState<string[]>([]); // Array of matched KR words
    
    // Submit states
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [wrongMatch, setWrongMatch] = useState<boolean>(false);
    
    const { t, language } = useTranslation();

    useEffect(() => {
        setKoreanWords([...words.map(w => w.kr)].sort(() => Math.random() - 0.5));
        setMeanings([...words.map(w => language === 'zh' ? w.zh : w.en)].sort(() => Math.random() - 0.5));
        setMatches([]);
        setSelectedKr(null);
        setSelectedMeaning(null);
        setIsSubmitted(false);
        setIsCorrect(null);
        setWrongMatch(false);
    }, [words, language]);

    const handleSelectKr = (kr: string) => {
        if (isSubmitted) return;
        setSelectedKr(kr);
    };

    const handleSelectMeaning = (meaning: string) => {
        if (isSubmitted) return;
        setSelectedMeaning(meaning);
    };

    const handleSubmit = () => {
        if (!selectedKr || !selectedMeaning || isSubmitted) return;

        const correctWord = words.find(w => w.kr === selectedKr);
        const correctMeaning = language === 'zh' ? correctWord?.zh : correctWord?.en;

        if (correctMeaning === selectedMeaning) {
            setIsCorrect(true);
            setIsSubmitted(true);
            playSuccessSound();
            // Add to matches immediately so it's visually marked
            setMatches(prev => [...prev, selectedKr]);
        } else {
            setIsCorrect(false);
            setIsSubmitted(true);
            setWrongMatch(true);
            playErrorSound();
            if (correctWord) {
                onMiss(correctWord);
            }
        }
    };

    const handleNext = () => {
        if (isCorrect) {
            setSelectedKr(null);
            setSelectedMeaning(null);
            setIsSubmitted(false);
            setIsCorrect(null);
            
            if (matches.length === words.length) {
                onComplete();
            }
        } else {
            // Incorrect match reset
            setSelectedKr(null);
            setSelectedMeaning(null);
            setIsSubmitted(false);
            setIsCorrect(null);
            setWrongMatch(false);
        }
    };

    const isSelectionComplete = selectedKr !== null && selectedMeaning !== null;

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5">
            <div className="text-center mb-12">
                <span className="pill-badge bg-primary/10 text-primary mb-4 inline-block italic">
                    {t('tasks.matching.title')}
                </span>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                    {t('tasks.matching.instruction')}
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-10">
                {/* Korean Words Column */}
                <div className="space-y-4">
                    {koreanWords.map(kr => {
                        const isMatched = matches.includes(kr);
                        const isSelected = selectedKr === kr;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            // If correct and in matches, show green and disabled
                            btnClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-200 opacity-50 cursor-not-allowed';
                        } else if (isSubmitted && isSelected) {
                            if (isCorrect) {
                                btnClass = 'bg-emerald-500 text-white border-transparent';
                            } else {
                                btnClass = 'bg-rose-500 text-white border-transparent animate-shake';
                            }
                        } else if (isSelected) {
                            btnClass = 'bg-primary/15 border-primary text-primary';
                        }

                        return (
                            <button
                                key={kr}
                                disabled={isSubmitted || isMatched}
                                onClick={() => handleSelectKr(kr)}
                                className={`w-full p-6 rounded-3xl border-2 font-black italic text-2xl transition-all ${btnClass}`}
                            >
                                {kr}
                            </button>
                        );
                    })}
                </div>

                {/* Meanings Column */}
                <div className="space-y-4">
                    {meanings.map(meaning => {
                        const isMatched = matches.some(kr => {
                            const w = words.find(word => word.kr === kr);
                            return (language === 'zh' ? w?.zh : w?.en) === meaning;
                        });
                        const isSelected = selectedMeaning === meaning;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            btnClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-200 opacity-50 cursor-not-allowed';
                        } else if (isSubmitted && isSelected) {
                            if (isCorrect) {
                                btnClass = 'bg-emerald-500 text-white border-transparent';
                            } else {
                                btnClass = 'bg-rose-500 text-white border-transparent animate-shake';
                            }
                        } else if (isSelected) {
                            btnClass = 'bg-primary/15 border-primary text-primary';
                        }

                        return (
                            <button
                                key={meaning}
                                disabled={isSubmitted || isMatched}
                                onClick={() => handleSelectMeaning(meaning)}
                                className={`w-full p-6 rounded-3xl border-2 font-bold text-xl transition-all ${btnClass}`}
                            >
                                {meaning}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Submit / Action Button */}
            <div className="max-w-md mx-auto">
                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!isSelectionComplete}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            isSelectionComplete
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 cursor-pointer'
                                : 'bg-secondary/30 text-charcoal/30 border-2 border-dashed border-charcoal/10 cursor-not-allowed'
                        }`}
                    >
                        {language === 'zh' ? '提交匹配' : 'Submit Match'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
                            isCorrect 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200' 
                                : 'bg-charcoal hover:bg-charcoal/90 text-white'
                        }`}
                    >
                        {isCorrect ? (
                            matches.length === words.length ? (
                                <>
                                    {language === 'zh' ? '完成匹配挑战' : 'Complete Challenge'}
                                    <ArrowRight size={20} />
                                </>
                            ) : (
                                <>
                                    {language === 'zh' ? '下一组' : 'Next Match'}
                                    <ArrowRight size={20} />
                                </>
                            )
                        ) : (
                            language === 'zh' ? '重新匹配' : 'Try Again'
                        )}
                    </button>
                )}
            </div>
            
            <div className="text-center mt-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/20 italic">
                    {language === 'zh' 
                        ? `已匹配 ${matches.length} / ${words.length}` 
                        : `Matched ${matches.length} / ${words.length}`}
                </p>
            </div>
            
            <style jsx>{`
                .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </div>
    );
}
