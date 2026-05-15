/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';

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
    const [wrongMatch, setWrongMatch] = useState<boolean>(false);
    const { t, language } = useTranslation();

    useEffect(() => {
        setKoreanWords([...words.map(w => w.kr)].sort(() => Math.random() - 0.5));
        setMeanings([...words.map(w => language === 'zh' ? w.zh : w.en)].sort(() => Math.random() - 0.5));
    }, [words, language]);

    useEffect(() => {
        if (selectedKr && selectedMeaning) {
            const correctWord = words.find(w => w.kr === selectedKr);
            const correctMeaning = language === 'zh' ? correctWord?.zh : correctWord?.en;
            
            if (correctMeaning === selectedMeaning) {
                setMatches(prev => [...prev, selectedKr]);
                setSelectedKr(null);
                setSelectedMeaning(null);
                
                if (matches.length + 1 === words.length) {
                    setTimeout(onComplete, 1000);
                }
            } else {
                if (correctWord) onMiss(correctWord);
                setWrongMatch(true);
                setTimeout(() => {
                    setWrongMatch(false);
                    setSelectedKr(null);
                    setSelectedMeaning(null);
                }, 1000);
            }
        }
    }, [selectedKr, selectedMeaning, words, matches, onComplete, language]);

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

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                    {koreanWords.map(kr => (
                        <button
                            key={kr}
                            disabled={matches.includes(kr)}
                            onClick={() => setSelectedKr(kr)}
                            className={`w-full p-6 rounded-3xl border-2 font-black italic text-2xl transition-all ${
                                matches.includes(kr) ? 'bg-emerald-500 text-white border-transparent opacity-50' :
                                selectedKr === kr ? 'bg-primary text-white border-transparent' : 'bg-secondary/30 border-transparent hover:border-primary/20'
                            } ${wrongMatch && selectedKr === kr ? 'bg-rose-500 animate-shake' : ''}`}
                        >
                            {kr}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {meanings.map(meaning => (
                        <button
                            key={meaning}
                            disabled={matches.some(kr => {
                                const w = words.find(word => word.kr === kr);
                                return (language === 'zh' ? w?.zh : w?.en) === meaning;
                            })}
                            onClick={() => setSelectedMeaning(meaning)}
                            className={`w-full p-6 rounded-3xl border-2 font-bold text-xl transition-all ${
                                matches.some(kr => {
                                    const w = words.find(word => word.kr === kr);
                                    return (language === 'zh' ? w?.zh : w?.en) === meaning;
                                }) ? 'bg-emerald-500 text-white border-transparent opacity-50' :
                                selectedMeaning === meaning ? 'bg-primary text-white border-transparent' : 'bg-secondary/30 border-transparent hover:border-primary/20'
                            } ${wrongMatch && selectedMeaning === meaning ? 'bg-rose-500 animate-shake' : ''}`}
                        >
                            {meaning}
                        </button>
                    ))}
                </div>
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
