/* eslint-disable @typescript-eslint/no-explicit-any */
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, ChevronLeft, PlayCircle, BookOpen, Quote, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface VocabCardProps {
    word: string;
    pos: string;
    meaningZh: string;
    meaningEn: string;
    sentenceKr: string;
    sentenceMeaning: string;
    illustrationUrl?: string;
    animationUrl?: string;
    animationData?: any;
    onNext?: () => void;
    onPrev?: () => void;
}

const POS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    'Noun': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    'Verb': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    'Adjective': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    'Adverb': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
    'Pronoun': { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    'default': { bg: 'bg-strawberry/5', text: 'text-primary', border: 'border-strawberry/10' }
};

export function VocabCard({
    word,
    pos,
    meaningZh,
    meaningEn,
    sentenceKr,
    sentenceMeaning,
    animationData,
    animationUrl,
    illustrationUrl,
    onNext,
    onPrev
}: VocabCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const speak = (text: string, speed: 'normal' | 'slow' = 'normal') => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = speed === 'normal' ? 1.0 : 0.6;
            window.speechSynthesis.speak(utterance);
        }
    };

    const posStyle = POS_COLORS[pos] || POS_COLORS.default;

    return (
        <div className="w-full max-w-lg mx-auto perspective-1000 h-[600px]">
            <motion.div
                className="relative w-full h-full duration-500 preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="puffy-card h-full p-10 flex flex-col items-center justify-between bg-white border-2 border-strawberry/10 overflow-hidden">
                        {/* Decorative background flair */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

                        <div className="w-full flex justify-between items-center relative z-10">
                            <span className={`pill-badge ${posStyle.bg} ${posStyle.text} border ${posStyle.border} font-black`}>
                                {pos}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => speak(word, 'slow')}
                                    className="px-3 py-1.5 bg-white rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-primary transition-colors border border-charcoal/5 shadow-sm"
                                    title="Slow Pronunciation"
                                >
                                    <Volume2 size={14} />
                                    Slow
                                </button>
                                <button
                                    onClick={() => speak(word, 'normal')}
                                    className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md"
                                    title="Normal Pronunciation"
                                >
                                    <Volume2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Animation Area */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative z-10 w-full">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="w-56 h-56 bg-gradient-to-br from-strawberry/5 to-cloud/20 rounded-[60px] flex items-center justify-center relative shadow-inner group"
                            >
                                {illustrationUrl ? (
                                    <img src={illustrationUrl} alt={word} className="w-44 h-44 object-contain rounded-3xl" />
                                ) : animationData ? (
                                    <Lottie
                                        animationData={animationData}
                                        loop={true}
                                        className="w-40 h-40"
                                    />
                                ) : animationUrl ? (
                                    <img src={animationUrl} alt={word} className="w-40 h-40 object-contain" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <Sparkles size={80} className="text-primary/20 animate-pulse" />
                                    </div>
                                )}

                                {/* Glass shine effect */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-[60px] blur-sm pointer-events-none" />
                            </motion.div>

                            <div className="text-center">
                                <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-charcoal drop-shadow-sm">{word}</h2>
                                <div className="flex flex-col gap-1">
                                    <p className="text-3xl font-black text-primary italic leading-tight">{meaningZh}</p>
                                    <p className="text-sm font-bold text-charcoal/30 uppercase tracking-[0.2em]">{meaningEn}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsFlipped(true)}
                            className="btn-primary-cute w-full flex items-center justify-center gap-3 py-5 text-lg group relative z-10"
                        >
                            <BookOpen size={24} className="group-hover:rotate-12 transition-transform" />
                            Case Study (Sentences)
                        </button>
                    </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="puffy-card h-full p-10 flex flex-col bg-charcoal text-white border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h3 className="text-xl font-black italic uppercase tracking-widest text-primary">Intelligence Report</h3>
                            <button
                                onClick={() => setIsFlipped(false)}
                                className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                            >
                                Back to Card
                            </button>
                        </div>

                        <div className="flex-1 space-y-12 relative z-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                                        <Quote className="text-white" size={16} fill="currentColor" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Target Context</span>
                                </div>
                                <div
                                    className="bg-white/5 p-10 rounded-[40px] border border-white/5 relative group cursor-pointer hover:bg-white/10 transition-all active:scale-95 shadow-2xl flex flex-col items-center text-center"
                                    onClick={() => speak(sentenceKr)}
                                >
                                    <p className="text-4xl font-black italic leading-tight mb-6">{sentenceKr}</p>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); speak(sentenceKr, 'slow'); }}
                                            className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/20"
                                        >
                                            Slow
                                        </button>
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                            <PlayCircle size={18} fill="currentColor" className="text-white" />
                                            <span className="text-white/40">Normal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 px-4 border-l-4 border-primary/20">
                                <p className="text-2xl font-bold text-white/80 italic leading-relaxed">
                                    &ldquo;{sentenceMeaning}&rdquo;
                                </p>
                                <div className="flex gap-2">
                                    <span className="pill-badge bg-white/5 text-white/40 border-white/10 text-[8px]">Natural Flow</span>
                                    <span className="pill-badge bg-white/5 text-white/40 border-white/10 text-[8px]">Topik I/II</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12 relative z-10">
                            <button onClick={onPrev} className="btn-secondary-cute h-16 w-16 p-0 flex items-center justify-center bg-white/5 text-white border-white/10 hover:bg-white/10 shrink-0">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={onNext} className="btn-primary-cute flex-1 flex items-center justify-center gap-4 text-xl h-16">
                                Next Word
                                <ChevronRight size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </div>
    );
}
