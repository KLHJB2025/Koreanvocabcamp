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

interface MatchItem {
    id: string; // Unique option ID (e.g. "word_0", "word_1")
    kr: string;
}

interface MeaningItem {
    id: string; // Matches the corresponding MatchItem's id
    text: string;
}

export function MatchingTask({ words, onComplete, onMiss }: MatchingTaskProps) {
    const [koreanWords, setKoreanWords] = useState<MatchItem[]>([]);
    const [meanings, setMeanings] = useState<MeaningItem[]>([]);
    const [selectedKrId, setSelectedKrId] = useState<string | null>(null);
    const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null);
    
    // matches maps: { [krId]: meaningId }
    const [matches, setMatches] = useState<Record<string, string>>({}); 
    
    // Verification states
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctMatches, setCorrectMatches] = useState<string[]>([]);
    const [incorrectMatches, setIncorrectMatches] = useState<string[]>([]);
    
    const { t, language } = useTranslation();

    // Map and shuffle columns with unique item IDs based on index
    useEffect(() => {
        const leftItems = words.map((w, idx) => ({
            id: `word_${idx}`,
            kr: w.kr
        }));
        
        const rightItems = words.map((w, idx) => ({
            id: `word_${idx}`,
            text: language === 'zh' ? w.zh : w.en
        }));

        setKoreanWords([...leftItems].sort(() => Math.random() - 0.5));
        setMeanings([...rightItems].sort(() => Math.random() - 0.5));
        
        setMatches({});
        setCorrectMatches([]);
        setIncorrectMatches([]);
        setSelectedKrId(null);
        setSelectedMeaningId(null);
        setIsSubmitted(false);
    }, [words, language]);

    // Handle selecting and saving a matching pair
    useEffect(() => {
        if (selectedKrId && selectedMeaningId) {
            const newMatches = { ...matches };
            
            // Break any existing match that contains this meaningId
            const oldKrId = Object.keys(newMatches).find(k => newMatches[k] === selectedMeaningId);
            if (oldKrId) {
                delete newMatches[oldKrId];
            }
            
            // Set the new match
            newMatches[selectedKrId] = selectedMeaningId;
            setMatches(newMatches);
            
            // Reset selection highlights
            setSelectedKrId(null);
            setSelectedMeaningId(null);
        }
    }, [selectedKrId, selectedMeaningId, matches]);

    const handleSelectKr = (krId: string) => {
        if (isSubmitted) {
            // Lock correct matches on submission
            if (correctMatches.includes(krId)) return;
        }

        // If already matched, clicking it breaks the match
        if (matches[krId]) {
            const newMatches = { ...matches };
            delete newMatches[krId];
            setMatches(newMatches);
            
            setIncorrectMatches(prev => prev.filter(id => id !== krId));
            setIsSubmitted(false);
            return;
        }

        // Otherwise, select
        if (selectedKrId === krId) {
            setSelectedKrId(null);
        } else {
            setSelectedKrId(krId);
        }
    };

    const getKrIdForMeaning = (meaningId: string) => {
        return Object.keys(matches).find(k => matches[k] === meaningId) || null;
    };

    const handleSelectMeaning = (meaningId: string) => {
        const pairedKrId = getKrIdForMeaning(meaningId);
        
        if (isSubmitted && pairedKrId) {
            if (correctMatches.includes(pairedKrId)) return;
        }

        // If already matched, clicking it breaks the match
        if (pairedKrId) {
            const newMatches = { ...matches };
            delete newMatches[pairedKrId];
            setMatches(newMatches);
            
            setIncorrectMatches(prev => prev.filter(id => id !== pairedKrId));
            setIsSubmitted(false);
            return;
        }

        // Otherwise, select
        if (selectedMeaningId === meaningId) {
            setSelectedMeaningId(null);
        } else {
            setSelectedMeaningId(meaningId);
        }
    };

    const isSemanticMatch = (word: Word, meaningText: string) => {
        const target = (language === 'zh' ? word.zh : word.en || '').trim().toLowerCase();
        const candidate = meaningText.trim().toLowerCase();
        
        if (target === candidate) return true;
        
        const getCleanParts = (text: string) => {
            return text.split(/[\/,，]/)
                .map(p => {
                    let cleaned = p.trim().toLowerCase();
                    // Strip 'to ' prefix for English verbs to align them
                    if (cleaned.startsWith('to ')) {
                        cleaned = cleaned.substring(3).trim();
                    }
                    return cleaned;
                })
                .filter(Boolean);
        };
        
        const targetParts = getCleanParts(target);
        const candidateParts = getCleanParts(candidate);
        
        // Strictly check if there is at least one exact match in the split candidate meanings
        return targetParts.some(tp => candidateParts.some(cp => tp === cp));
    };

    const handleSubmit = () => {
        if (Object.keys(matches).length !== words.length || isSubmitted) return;

        const correctList: string[] = [];
        const incorrectList: string[] = [];

        Object.entries(matches).forEach(([krId, meaningId]) => {
            const krWordItem = koreanWords.find(k => k.id === krId);
            const meaningItem = meanings.find(m => m.id === meaningId);
            
            if (krWordItem && meaningItem) {
                // Find if there is any word in the daily list with this spelling and meaning
                const matchedWord = words.find(w => 
                    w.kr === krWordItem.kr && 
                    isSemanticMatch(w, meaningItem.text)
                );
                if (matchedWord) {
                    correctList.push(krId);
                    return;
                }
            }
            
            incorrectList.push(krId);
            const idx = parseInt(krId.split('_')[1], 10);
            const originalWord = words[idx];
            if (originalWord) {
                onMiss(originalWord);
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
            incorrectMatches.forEach(krId => {
                delete newMatches[krId];
            });
            setMatches(newMatches);
            setIncorrectMatches([]);
            setIsSubmitted(false);
            setSelectedKrId(null);
            setSelectedMeaningId(null);
        }
    };

    const getPairIndex = (krId: string) => {
        return Object.keys(matches).indexOf(krId);
    };

    const getPairStyle = (krId: string) => {
        if (isSubmitted) {
            if (correctMatches.includes(krId)) {
                return 'bg-emerald-50 border-emerald-400 text-emerald-800';
            }
            if (incorrectMatches.includes(krId)) {
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
        
        const idx = getPairIndex(krId);
        return idx !== -1 ? styles[idx % styles.length] : '';
    };

    const getPairNumberBadge = (krId: string) => {
        const idx = getPairIndex(krId);
        if (idx === -1) return null;
        
        if (isSubmitted) {
            if (correctMatches.includes(krId)) {
                return <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">✓</span>;
            }
            if (incorrectMatches.includes(krId)) {
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
                    {koreanWords.map(item => {
                        const isSelected = selectedKrId === item.id;
                        const isMatched = matches[item.id] !== undefined;
                        const pairStyle = isMatched ? getPairStyle(item.id) : '';
                        const badge = isMatched ? getPairNumberBadge(item.id) : null;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            btnClass = pairStyle;
                        } else if (isSelected) {
                            btnClass = 'bg-primary text-white border-transparent shadow-lg shadow-primary/20';
                        }

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelectKr(item.id)}
                                className={`w-full p-6 rounded-3xl border-2 font-black italic text-2xl transition-all flex items-center justify-between min-h-[72px] text-left ${btnClass}`}
                            >
                                <span>{item.kr}</span>
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
                    {meanings.map(item => {
                        const isSelected = selectedMeaningId === item.id;
                        const pairedKrId = getKrIdForMeaning(item.id);
                        const isMatched = pairedKrId !== null;
                        const pairStyle = isMatched ? getPairStyle(pairedKrId) : '';
                        const badge = isMatched ? getPairNumberBadge(pairedKrId) : null;
                        
                        let btnClass = 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal';
                        if (isMatched) {
                            btnClass = pairStyle;
                        } else if (isSelected) {
                            btnClass = 'bg-primary text-white border-transparent shadow-lg shadow-primary/20';
                        }

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSelectMeaning(item.id)}
                                className={`w-full p-6 rounded-3xl border-2 font-bold text-lg transition-all flex items-center justify-between min-h-[72px] text-left ${btnClass}`}
                            >
                                <span>{item.text}</span>
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
