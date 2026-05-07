'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useState } from 'react';

interface VocabCardProps {
    word: string;
    pronunciation: string;
    meaning: string;
    exampleKr: string;
    exampleTrans: string;
    animationType?: 'float' | 'shake' | 'bounce';
    onNext: () => void;
}

export function VocabCard({ word, pronunciation, meaning, exampleKr, exampleTrans, animationType = 'float', onNext }: VocabCardProps) {
    const { language } = useTranslation();
    const [showExample, setShowExample] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            className="max-w-md w-full aspect-[3/4] glass-card rounded-[48px] p-10 flex flex-col items-center relative overflow-hidden"
        >
            <div className="absolute top-8 right-8">
                <button className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                    <Volume2 size={24} />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full">
                {/* Animated Illustration Placeholder */}
                <motion.div
                    animate={animationType === 'float' ? {
                        y: [0, -15, 0],
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 bg-primary/5 rounded-[40px] flex items-center justify-center mb-8"
                >
                    {/* In a real app, this would be a Lottie or Rive animation */}
                    <div className="text-6xl">✨</div>
                </motion.div>

                <h2 className="text-6xl font-bold font-noto-kr mb-2 tracking-tight">{word}</h2>
                <p className="text-xl text-foreground/30 font-medium mb-8">[{pronunciation}]</p>

                <div className="w-12 h-1 bg-primary/20 rounded-full mb-8" />

                <AnimatePresence mode="wait">
                    {!showExample ? (
                        <motion.div
                            key="meaning"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                        >
                            <p className="text-3xl font-bold text-slate mb-2">{meaning}</p>
                            <p className="text-sm text-foreground/40 font-medium uppercase tracking-widest">Meaning</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="example"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                        >
                            <p className="text-lg font-medium font-noto-kr text-slate mb-2 leading-relaxed">
                                {exampleKr}
                            </p>
                            <p className="text-sm text-foreground/50 italic">
                                {exampleTrans}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 w-full flex flex-col gap-3">
                <button
                    onClick={() => setShowExample(!showExample)}
                    className="w-full py-4 text-sm font-bold text-foreground/40 hover:text-primary transition-colors"
                >
                    {showExample ? 'Hide Example' : 'Show Example sentence'}
                </button>
                <button
                    onClick={onNext}
                    className="w-full btn-premium flex items-center justify-center gap-2 group"
                >
                    Got it!
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-primary' : 'bg-primary/20'}`} />
                ))}
            </div>
        </motion.div>
    );
}
