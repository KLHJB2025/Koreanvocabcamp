import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { Volume2, Play } from 'lucide-react';

interface ListeningTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ListeningTask({ words, onComplete }: ListeningTaskProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<Word[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        if (currentIndex < words.length) {
            const current = words[currentIndex];
            const others = words.filter(w => w.kr !== current.kr);
            const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
            setOptions([...shuffled, current].sort(() => Math.random() - 0.5));
            setSelectedId(null);
            setIsCorrect(null);
            
            // Auto play sound
            speak(current.kr);
        }
    }, [currentIndex, words]);

    const speak = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        window.speechSynthesis.speak(utterance);
    };

    const handleSelect = (word: Word) => {
        if (selectedId) return;
        setSelectedId(word.kr);
        const correct = word.kr === words[currentIndex].kr;
        setIsCorrect(correct);

        setTimeout(() => {
            if (currentIndex < words.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5 text-center">
            <span className="pill-badge bg-primary/10 text-primary mb-8 inline-block italic">Listening Challenge</span>
            
            <button 
                onClick={() => speak(words[currentIndex].kr)}
                className="w-32 h-32 bg-primary rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-primary/40 mx-auto mb-12 hover:scale-110 active:scale-95 transition-all"
            >
                <Volume2 size={60} />
            </button>

            <h3 className="text-xl font-black italic uppercase tracking-widest text-charcoal/30 mb-8">What word was spoken?</h3>

            <div className="grid grid-cols-2 gap-6">
                {options.map((opt) => (
                    <button
                        key={opt.kr}
                        onClick={() => handleSelect(opt)}
                        className={`p-8 rounded-[32px] border-2 transition-all text-2xl font-black italic ${
                            selectedId === opt.kr 
                                ? (isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-600' : 'bg-rose-50 border-rose-400 text-rose-600')
                                : 'bg-secondary/30 border-transparent hover:border-primary/20 text-charcoal'
                        }`}
                    >
                        {opt.kr}
                    </button>
                ))}
            </div>
        </div>
    );
}
