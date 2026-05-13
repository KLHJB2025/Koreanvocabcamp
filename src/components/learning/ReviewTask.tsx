import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';

interface ReviewTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ReviewTask({ words, onComplete }: ReviewTaskProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        if (currentIndex < words.length) {
            const current = words[currentIndex];
            const others = words.filter(w => w.kr !== current.kr);
            const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
            setOptions([...shuffled.map(s => s.zh), current.zh].sort(() => Math.random() - 0.5));
            setSelectedOption(null);
            setIsCorrect(null);
        }
    }, [currentIndex, words]);

    const handleAnswer = (opt: string) => {
        if (selectedOption) return;
        setSelectedOption(opt);
        const correct = opt === words[currentIndex].zh;
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
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5">
            <div className="text-center mb-10">
                <span className="pill-badge bg-primary/10 text-primary mb-4 inline-block italic">Memory Review</span>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase text-charcoal">{words[currentIndex]?.kr}</h2>
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
                {currentIndex + 1} / {words.length} Words Reviewed
            </p>
        </div>
    );
}
