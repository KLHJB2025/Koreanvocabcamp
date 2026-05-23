/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';
import { playSuccessSound, playErrorSound } from '@/lib/sound';
import { ArrowRight } from 'lucide-react';

interface MatchingTaskProps {
    words: Word[];
    onComplete: () => void;
    onMiss: (word: Word) => void;
}

interface MeaningOption {
    wordKr: string; // Unique Korean word spelling this translation belongs to
    text: string;   // The translation string (can have duplicate values, e.g. "去")
}

export function MatchingTask({ words, onComplete, onMiss }: MatchingTaskProps) {
    const [koreanWords, setKoreanWords] = useState<string[]>([]);
    const [meanings, setMeanings] = useState<MeaningOption[]>([]);
    const [selectedKr, setSelectedKr] = useState<string | null>(null);
    const [selectedMeaningKr, setSelectedMeaningKr] = useState<string | null>(null);
    
    // matches maps: { [koreanSpelling]: meaningWordKr }
    const [matches, setMatches] = useState<Record<string, string>>({}); 
    
    // Verification states
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctMatches, setCorrectMatches] = useState<string[]>([]);
    const [incorrectMatches, setIncorrectMatches] = useState<string[]>([]);
    
    const { t, language } = useTranslation();

    // Shuffle and initialize columns
    useEffect(() => {
        setKoreanWords([...words.map(w => w.kr)].sort(() => Math.random() - 0.5));
        setMeanings([...words.map(w => ({
            wordKr: w.kr,
            text: language === 'zh' ? w.zh : w.en
        }))].sort(() => Math.random() - 0.5));
        
        setMatches({});
        setCorrectMatches([]);
        setIncorrectMatches([]);
        setSelectedKr(null);
        setSelectedMeaningKr(null);
        setIsSubmitted(false);
    }, [words, language]);

    // Symmetrical matching connector
    useEffect(() => {
        if (selectedKr && selectedMeaningKr) {
            const newMatches = { ...matches };
            
            // If the meaning was already matched to a different kr, break it
            const oldKrForMeaning = Object.keys(newMatches).find(k => newMatches[k] === selectedMeaningKr);
            if (oldKrForMeaning) {
                delete newMatches[oldKrForMeaning];
            }
            
            // Link them
            newMatches[selectedKr] = selectedMeaningKr;
            setMatches(newMatches);
            
            // Reset selection highlights
            setSelectedKr(null);
            setSelectedMeaningKr(null);
        }
    }, [selectedKr, selectedMeaningKr, matches]);

    const handleSelectKr = (kr: string) => {
        if (isSubmitted) {
            // Lock correct matches on submission
            if (correctMatches.includes(kr)) return;
        }

        // If already matched, clicking it breaks the match
        if (matches[kr]) {
            const newMatches = { ...matches };
            delete newMatches[kr];
            setMatches(newMatches);
            
            setIncorrectMatches(prev => prev.filter(k => k !== kr));
            setIsSubmitted(false);
            return;
        }

        // Otherwise, select
        if (selectedKr === kr) {
            setSelectedKr(null);
        } else {
            setSelectedKr(kr);
        }
    };

    const getKrForMeaning = (meaningKr: string) => {
        return Object.keys(matches).find(k => matches[k] === meaningKr) || null;
    };

    const handleSelectMeaning = (meaningKr: string) => {
        const pairedKr = getKrForMeaning(meaningKr);
        
        if (isSubmitted && pairedKr) {
            if (correctMatches.includes(pairedKr)) return;
        }

        // If already matched, clicking it breaks the match
        if (pairedKr) {
            const newMatches = { ...matches };
            delete newMatches[pairedKr];
            setMatches(newMatches);
            
            setIncorrectMatches(prev => prev.filter(k => k !== pairedKr));
            setIsSubmitted(false);
            return;
        }

        // Otherwise, select
        if (selectedMeaningKr === meaningKr) {
            setSelectedMeaningKr(null);
        } else {
            setSelectedMeaningKr(meaningKr);
        }
    };

    const handleSubmit = () => {
        if (Object.keys(matches).length !== words.length || isSubmitted) return;

        const correctList: string[] = [];
        const incorrectList: string[] = [];

        Object.entries(matches).forEach(([kr, meaningKr]) => {
            if (kr === meaningKr) {
                correctList.push(kr);
            } else {
                incorrectList.push(kr);
                const originalWord = words.find(w => w.kr === kr);
                if (originalWord) {
                    onMiss(originalWord);
                }
            }
        });

        setCorrectMatches(correctList);
        setIncorrectMatches(incorrectList);
        setIsSubmitted(true);

        if (correctList.length === words.length) {
            playSuccessSound();
        } else {
            playErrorSound();
        }
    };

    const handleAction = () => {
        const isAllCorrect = correctMatches.length === words.length;

        if (isAllCorrect) {
            onComplete();
        } else {
            // Keep correct matches, reset incorrect ones
            const newMatches = { ...matches };
            incorrectMatches.forEach(kr => {
                delete newMatches[kr];
            });
            setMatches(newMatches);
            setIncorrectMatches([]);
            setIsSubmitted(false);
            setSelectedKr(null);
            setSelectedMeaningKr(null);
        }
    };

    const getPairIndex = (kr: string) => {
        return Object.keys(matches).indexOf(kr);
    };

    const getPairStyle = (kr: string) => {
        if (isSubmitted) {
            if (correctMatches.includes(kr)) {
                return 'bg-emerald-50 border-emerald-400 text-emerald-800';
            }
            if (incorrectMatches.includes(kr)) {
                return 'bg-rose-50 border-rose-400 text-rose-800 animate-shake';
            }
        }

        // Shuffled pastel colors for matched pairs to differentiate them visually
        const styles = [
            'bg-blue-50 border-blue-400 text-blue-800',
            'bg-purple-50 border-purple-400 text-purple-800',
            'bg-amber-50 border-amber-400 text-amber-800',
            'bg-pink-50 border-pink-400 text-pink-800',
            'bg-indigo-50 border-indigo-400 text-indigo-800',
            'bg-orange-50 border-orange-400 text-orange-800',
            'bg-cyan-50 border-cyan-400 text-cyan-800',
            'bg-teal-50 border-teal-400 text-teal-800',
            'bg-lime-50 border-lime-400 text-lime-800',
            'bg-violet-50 border-violet-400 text-violet-800',
        ];
        
        const idx = getPairIndex(kr);
        return idx !== -1 ? styles[idx % styles.length] : '';
    };

    const getPairNumberBadge = (kr: string) => {
        const idx = getPairIndex(kr);
        if (idx === -1) return null;
        
        if (isSubmitted) {
            if (correctMatches.includes(kr)) {
                return <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">✓</span>;
            }
            if (incorrectMatches.includes(kr)) {
                return <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-black">✗</span>;
            }
        }
        
        return (
            <span className="w-5 h-5 rounded-full bg-black/10 text-charcoal/70 flex items-center justify-center text-[10px] font-black">
                {idx + 1}
            </span>
        );
    };

    const currentMatchCount = Object.keys(matches).length;
    const isAllMatched = currentMatchCount === words.length;
    const isAllCorrect = correctMatches.length === words.length;

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

            <div className="grid grid-cols-2 gap-6 sm:gap-12 mb-10">
                {/* Korean Words Column */}
                <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-charcoal/30 text-center mb-2">
                        {language === 'zh' ? '韩语单词' : 'Korean Words'}
                    </p>
                    {koreanWords.map(kr => {
                        const isSelected = selectedKr === kr;
                        const isMatched = matches[kr] !== undefined;
                        const pairStyle = isMatched ? getPairStyle(kr) : '';
                        const badge = isMatched ? getPairNumberBadge(kr) : null;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            btnClass = pairStyle;
                        } else if (isSelected) {
                            btnClass = 'bg-primary text-white border-transparent shadow-lg shadow-primary/20';
                        }

                        return (
                            <button
                                key={kr}
                                onClick={() => handleSelectKr(kr)}
                                className={`w-full p-6 rounded-3xl border-2 font-black italic text-2xl transition-all flex items-center justify-between min-h-[72px] text-left ${btnClass}`}
                            >
                                <span>{kr}</span>
                                {badge}
                            </button>
                        );
                    })}
                </div>

                {/* Meanings Column */}
                <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-charcoal/30 text-center mb-2">
                        {language === 'zh' ? '对应释义' : 'Meanings'}
                    </p>
                    {meanings.map(opt => {
                        const isSelected = selectedMeaningKr === opt.wordKr;
                        const pairedKr = getKrForMeaning(opt.wordKr);
                        const isMatched = pairedKr !== null;
                        const pairStyle = isMatched ? getPairStyle(pairedKr) : '';
                        const badge = isMatched ? getPairNumberBadge(pairedKr) : null;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            btnClass = pairStyle;
                        } else if (isSelected) {
                            btnClass = 'bg-primary text-white border-transparent shadow-lg shadow-primary/20';
                        }

                        return (
                            <button
                                key={opt.wordKr}
                                onClick={() => handleSelectMeaning(opt.wordKr)}
                                className={`w-full p-6 rounded-3xl border-2 font-bold text-lg transition-all flex items-center justify-between min-h-[72px] text-left ${btnClass}`}
                            >
                                <span>{opt.text}</span>
                                {badge}
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
                        disabled={!isAllMatched}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            isAllMatched
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 cursor-pointer'
                                : 'bg-secondary/30 text-charcoal/30 border-2 border-dashed border-charcoal/10 cursor-not-allowed'
                        }`}
                    >
                        {language === 'zh' 
                            ? `检查匹配 (${currentMatchCount}/${words.length})` 
                            : `Check Matches (${currentMatchCount}/${words.length})`}
                    </button>
                ) : (
                    <button
                        onClick={handleAction}
                        className={`w-full py-5 text-xl font-black italic rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
                            isAllCorrect 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200' 
                                : 'bg-charcoal hover:bg-charcoal/90 text-white'
                        }`}
                    >
                        {isAllCorrect ? (
                            <>
                                {language === 'zh' ? '进入下一关' : 'Continue'}
                                <ArrowRight size={20} />
                            </>
                        ) : (
                            <>
                                {language === 'zh' ? '重置错误匹配' : 'Reset Incorrect Matches'}
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                )}
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
