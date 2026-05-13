import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';

interface MatchingTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function MatchingTask({ words, onComplete }: MatchingTaskProps) {
    const [koreanWords, setKoreanWords] = useState<string[]>([]);
    const [meanings, setMeanings] = useState<string[]>([]);
    const [selectedKr, setSelectedKr] = useState<string | null>(null);
    const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
    const [matches, setMatches] = useState<string[]>([]); // Array of matched KR words
    const [wrongMatch, setWrongMatch] = useState<boolean>(false);

    useEffect(() => {
        setKoreanWords([...words.map(w => w.kr)].sort(() => Math.random() - 0.5));
        setMeanings([...words.map(w => w.zh)].sort(() => Math.random() - 0.5));
    }, [words]);

    useEffect(() => {
        if (selectedKr && selectedMeaning) {
            const correctWord = words.find(w => w.kr === selectedKr);
            if (correctWord?.zh === selectedMeaning) {
                setMatches(prev => [...prev, selectedKr]);
                setSelectedKr(null);
                setSelectedMeaning(null);
                
                if (matches.length + 1 === words.length) {
                    setTimeout(onComplete, 1000);
                }
            } else {
                setWrongMatch(true);
                setTimeout(() => {
                    setWrongMatch(false);
                    setSelectedKr(null);
                    setSelectedMeaning(null);
                }, 1000);
            }
        }
    }, [selectedKr, selectedMeaning, words, matches, onComplete]);

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5">
            <div className="text-center mb-12">
                <span className="pill-badge bg-primary/10 text-primary mb-4 inline-block italic">Drag & Match Challenge</span>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Pair the Korean and Chinese Meanings</h2>
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
                    {meanings.map(zh => (
                        <button
                            key={zh}
                            disabled={matches.some(kr => words.find(w => w.kr === kr)?.zh === zh)}
                            onClick={() => setSelectedMeaning(zh)}
                            className={`w-full p-6 rounded-3xl border-2 font-bold text-xl transition-all ${
                                matches.some(kr => words.find(w => w.kr === kr)?.zh === zh) ? 'bg-emerald-500 text-white border-transparent opacity-50' :
                                selectedMeaning === zh ? 'bg-primary text-white border-transparent' : 'bg-secondary/30 border-transparent hover:border-primary/20'
                            } ${wrongMatch && selectedMeaning === zh ? 'bg-rose-500 animate-shake' : ''}`}
                        >
                            {zh}
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
