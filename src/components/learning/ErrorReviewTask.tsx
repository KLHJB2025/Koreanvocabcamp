'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface ErrorReviewTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ErrorReviewTask({ words, onComplete }: ErrorReviewTaskProps) {
    const { language, t } = useTranslation();
    const [localWords, setLocalWords] = useState<Word[]>(words);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const currentWord = localWords[currentIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (showCorrection) {
            handleNext(false); // Move to next, but word was wrong
            return;
        }
        if (isCorrect === true) {
            handleNext(true);
            return;
        }

        const correct = input.trim() === currentWord.kr;
        setIsCorrect(correct);

        if (!correct) {
            setShowCorrection(true);
        }
    };

    const handleNext = (wasCorrect: boolean) => {
        setIsCorrect(null);
        setShowCorrection(false);
        setInput('');
        
        if (!wasCorrect) {
            // Add the word to the end of the list to try again later
            setLocalWords(prev => [...prev, currentWord]);
        }

        if (currentIndex < localWords.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-12 bg-white rounded-[60px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border-2 border-strawberry/10 text-center relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-strawberry/20" />
            
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-strawberry/10 rounded-2xl text-strawberry">
                    <AlertCircle size={24} />
                </div>
                <span className="text-strawberry font-black italic uppercase tracking-widest text-sm">
                    {t('tasks.errorReview.title') || 'Error Review'}
                </span>
            </div>

            <h2 className="text-4xl font-black text-charcoal italic tracking-tighter mb-4">
                {t('tasks.errorReview.instruction') || 'Let\'s master the tricky ones!'}
            </h2>
            
            <p className="text-charcoal/40 font-bold mb-10">
                {t('tasks.errorReview.subtitle') || 'Correct your mistakes to move forward'}
            </p>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-10"
                >
                    <div className="inline-block p-4 px-8 bg-secondary/30 rounded-full text-charcoal font-black text-2xl mb-4 italic">
                        {language === 'zh' ? currentWord.zh : currentWord.en}
                    </div>
                </motion.div>
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('tasks.spelling.placeholder')}
                        autoFocus
                        disabled={showCorrection || isCorrect === true}
                        className={`w-full p-8 rounded-[40px] border-4 text-4xl font-black italic text-center outline-none transition-all ${
                            isCorrect === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' :
                            isCorrect === false ? 'border-strawberry/40 bg-strawberry/5 text-strawberry' :
                            'border-secondary/20 bg-secondary/10 focus:border-strawberry text-charcoal shadow-inner'
                        }`}
                    />
                    
                    {showCorrection && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 p-8 bg-emerald-50 border-2 border-emerald-200 rounded-[32px] text-left"
                        >
                            <p className="text-emerald-800 font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                <CheckCircle2 size={16} /> {t('tasks.errorReview.correctAnswer') || 'Correct Spelling'}
                            </p>
                            <p className="text-5xl font-black text-emerald-600 italic tracking-tighter">
                                {currentWord.kr}
                            </p>
                        </motion.div>
                    )}
                </div>
                
                {isCorrect === true ? (
                    <button 
                        type="button"
                        onClick={() => handleNext(true)}
                        className="w-full py-8 text-2xl font-black bg-charcoal hover:bg-charcoal/90 text-white rounded-[40px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl animate-bounce-short"
                    >
                        {language === 'zh' ? '下一题' : 'Next Question'}
                        <ArrowRight size={28} />
                    </button>
                ) : (
                    <button 
                        type="submit"
                        className={`w-full py-8 text-2xl font-black italic rounded-[40px] flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            showCorrection 
                            ? 'bg-charcoal text-white shadow-xl' 
                            : 'bg-strawberry text-white shadow-xl shadow-strawberry/30 hover:bg-strawberry/90'
                        }`}
                    >
                        {showCorrection ? (t('tasks.errorReview.gotIt') || 'I got it!') : (t('tasks.spelling.confirm'))}
                        <ArrowRight size={28} />
                    </button>
                )}
            </form>

            <div className="mt-12 flex justify-center gap-2">
                {words.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            idx === currentIndex ? 'w-12 bg-strawberry' : 
                            idx < currentIndex ? 'w-4 bg-emerald-400' : 'w-4 bg-secondary/30'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
