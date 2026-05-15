'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { buildScenario } from '@/lib/scenarios';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ScenarioTaskProps {
    words: Word[];
    onComplete: () => void;
}

export function ScenarioTask({ words, onComplete }: ScenarioTaskProps) {
    const { language, t } = useTranslation();
    const [scenario, setScenario] = useState<any>(null);
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const built = buildScenario(words, language as any);
        setScenario(built);
    }, [words, language]);

    const currentStep = scenario?.dialogue[currentDialogueIndex];

    // Auto-advance if it's a skip step
    useEffect(() => {
        if (currentStep?.isSkip) {
            const timer = setTimeout(() => {
                if (currentDialogueIndex < scenario.dialogue.length - 1) {
                    setCurrentDialogueIndex(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [currentDialogueIndex, currentStep, scenario]);

    if (!scenario) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentStep || currentStep.isSkip) return;

        const correct = input.trim() === currentStep.correctWord;
        setIsCorrect(correct);

        if (correct) {
            setShowHint(false);
            setTimeout(() => {
                if (currentDialogueIndex < scenario.dialogue.length - 1) {
                    setCurrentDialogueIndex(prev => prev + 1);
                    setInput('');
                    setIsCorrect(null);
                } else {
                    setIsFinished(true);
                }
            }, 1000);
        } else {
            setTimeout(() => setIsCorrect(null), 1500);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-12 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="relative z-10 text-center mb-12">
                <span className="pill-badge bg-primary/10 text-primary mb-6 inline-block italic">
                    {t('mission.scenarioMission') || 'Scenario Mission'}
                </span>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-charcoal">
                    {scenario.name}
                </h2>
            </div>

            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div 
                        key={currentDialogueIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        {/* Speaker & Chat Bubble */}
                        <div className={`flex items-end gap-6 ${currentStep.speaker === 'Mascot' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className="w-24 h-24 bg-cloud rounded-3xl flex-shrink-0 flex items-center justify-center border-2 border-strawberry/5 shadow-inner">
                                <motion.img 
                                    src={currentStep.speaker === 'Mascot' ? "/illustrations/mascot.png" : "/illustrations/friend.png"} 
                                    className="w-20 h-20"
                                    onError={(e) => { e.currentTarget.src = "/illustrations/mascot.png" }}
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            </div>
                            <div className={`p-8 rounded-[32px] border-2 border-strawberry/5 relative flex-1 ${
                                currentStep.speaker === 'Mascot' 
                                ? 'bg-secondary/20 rounded-bl-none' 
                                : 'bg-primary/10 rounded-br-none'
                            }`}>
                                <p className="text-sm font-black uppercase tracking-widest text-charcoal/40 mb-2">
                                    {currentStep.speaker}
                                </p>
                                <p className="text-2xl font-bold text-charcoal leading-relaxed">
                                    {currentStep.text(language, { [currentStep.missingWordCategory]: '???' })}
                                </p>
                            </div>
                        </div>

                        {/* Input Area (Only if not skip) */}
                        {!currentStep.isSkip && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={t('tasks.spelling.placeholder')}
                                        className={`w-full p-8 rounded-[32px] border-4 text-4xl font-black italic text-center outline-none transition-all ${
                                            isCorrect === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' :
                                            isCorrect === false ? 'border-rose-400 bg-rose-50 text-rose-600' :
                                            'border-secondary/20 bg-secondary/10 focus:border-primary text-charcoal'
                                        }`}
                                    />
                                    {isCorrect === true && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500">
                                            <CheckCircle2 size={40} />
                                        </motion.div>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setShowHint(true)}
                                        className="px-8 py-6 rounded-[24px] bg-amber-100 text-amber-600 font-bold border-2 border-amber-200 hover:bg-amber-200 transition-colors"
                                    >
                                        {showHint ? currentStep.hint : 'Hint?'}
                                    </button>
                                    <button 
                                        type="submit"
                                        className="btn-primary-cute flex-1 py-6 text-xl flex items-center justify-center gap-3"
                                    >
                                        {t('tasks.spelling.confirm')}
                                        <ArrowRight size={24} />
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                    >
                        <div className="w-32 h-32 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <Sparkles size={64} />
                        </div>
                        <h3 className="text-5xl font-black italic tracking-tighter uppercase text-emerald-600 mb-6">
                            MISSION ACCOMPLISHED!
                        </h3>
                        <p className="text-xl font-bold text-charcoal/40 mb-12 max-w-md mx-auto">
                            {t('mission.scenarioSuccess') || 'You successfully navigated the scenario using your new vocabulary. Great job!'}
                        </p>
                        <button onClick={onComplete} className="btn-primary-cute px-12 py-6 text-2xl">
                            {t('mission.returnToBase')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
