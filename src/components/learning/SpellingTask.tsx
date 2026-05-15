import { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface SpellingTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function SpellingTask({ words, onComplete }: SpellingTaskProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t, language } = useTranslation();

    const currentWord = words[currentIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correct = input.trim() === currentWord.kr;
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                if (currentIndex < words.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setInput('');
                    setIsCorrect(null);
                } else {
                    onComplete();
                }
            }, 1000);
        } else {
            setTimeout(() => setIsCorrect(null), 1500);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5 text-center">
            <span className="pill-badge bg-primary/10 text-primary mb-8 inline-block italic">
                {t('tasks.spelling.title')}
            </span>
            
            <div className="w-80 h-80 bg-gradient-to-br from-strawberry/5 to-cloud/20 rounded-[80px] flex items-center justify-center relative shadow-inner mx-auto mb-10 overflow-hidden border-2 border-strawberry/5">
                {currentWord.illustrationUrl ? (
                    <img src={currentWord.illustrationUrl} alt="Hint" className="w-72 h-72 object-contain rounded-[40px] bg-white/50 shadow-sm" />
                ) : (
                    <Sparkles size={100} className="text-primary/20" />
                )}
            </div>

            {/* Meaning Clue Section */}
            <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/20 mb-2 italic">
                    {t('tasks.spelling.clue')}
                </p>
                <h3 className="text-4xl font-black text-charcoal italic tracking-tighter">
                    {language === 'zh' ? currentWord.zh : currentWord.en}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('tasks.spelling.placeholder')}
                    autoFocus
                    className={`w-full p-8 rounded-[32px] border-4 text-4xl font-black italic text-center outline-none transition-all ${
                        isCorrect === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' :
                        isCorrect === false ? 'border-rose-400 bg-rose-50 text-rose-600' :
                        'border-secondary/20 bg-secondary/10 focus:border-primary text-charcoal'
                    }`}
                />
                
                <button 
                    type="submit"
                    className="btn-primary-cute w-full py-6 text-xl flex items-center justify-center gap-3"
                >
                    {t('tasks.spelling.confirm')}
                    <ArrowRight size={24} />
                </button>
            </form>

            <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-charcoal/20 italic">
                {t('tasks.spelling.tip')}
            </p>
        </div>
    );
}
