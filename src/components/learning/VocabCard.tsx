/* eslint-disable @typescript-eslint/no-explicit-any */
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface VocabCardProps {
    word: string;
    pos: string;
    meaningZh: string;
    meaningEn: string;
    sentenceKr?: string;
    sentenceMeaning?: string;
    sentenceZh?: string;
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
    sentenceZh,
    animationData,
    animationUrl,
    illustrationUrl,
    onNext,
    onPrev
}: VocabCardProps) {
    const { t, language } = useTranslation();

    const speak = (text?: string, speed: 'normal' | 'slow' = 'normal') => {
        if (!text) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = speed === 'normal' ? 1.0 : 0.6;
            window.speechSynthesis.speak(utterance);
        }
    };

    const posStyle = POS_COLORS[pos] || POS_COLORS.default;
    const displayedMeaning = language === 'zh' ? meaningZh : meaningEn;
    const displayedSentenceMeaning = language === 'zh' ? sentenceZh : sentenceMeaning;

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="puffy-card p-10 flex flex-col items-center bg-white border-2 border-strawberry/10 overflow-hidden relative shadow-xl">
                {/* Decorative background flair */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

                <div className="w-full flex justify-between items-center relative z-10 mb-8">
                    <span className={`pill-badge ${posStyle.bg} ${posStyle.text} border ${posStyle.border} font-black`}>
                        {t(`pos.${pos}`)}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => speak(word, 'slow')}
                            className="px-3 py-1.5 bg-white rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-primary transition-colors border border-charcoal/5 shadow-sm"
                        >
                            <Volume2 size={14} />
                            {t('learning.slow')}
                        </button>
                        <button
                            onClick={() => speak(word, 'normal')}
                            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md"
                        >
                            <Volume2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col items-center space-y-10 relative z-10 w-full">
                    {/* Illustration/Animation Container */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-[380px] h-[380px] bg-gradient-to-br from-strawberry/5 to-cloud/20 rounded-[80px] flex items-center justify-center relative shadow-inner group"
                    >
                        {illustrationUrl ? (
                            <img src={illustrationUrl} alt={word} className="w-[340px] h-[340px] object-contain rounded-[40px] border-2 border-primary/20 bg-white/50 shadow-sm" />
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

                    {/* Word and Meaning */}
                    <div className="text-center">
                        <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 text-charcoal drop-shadow-sm">{word}</h2>
                        <p className="text-4xl font-black text-primary italic leading-tight">{displayedMeaning}</p>
                    </div>

                    {/* Example Sentence Section */}
                    <div className="w-full pt-8 border-t border-strawberry/5">
                        {sentenceKr && (
                            <div className="flex items-start gap-4 bg-cloud/10 p-6 rounded-[32px] mb-8">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <Quote size={18} fill="currentColor" />
                                </div>
                                <div className="space-y-2 text-left">
                                    <p className="text-2xl font-bold text-charcoal leading-snug">
                                        {sentenceKr}
                                        <button 
                                            onClick={() => speak(sentenceKr)}
                                            className="inline-flex ml-2 align-middle text-primary/40 hover:text-primary transition-colors"
                                        >
                                            <Volume2 size={16} />
                                        </button>
                                    </p>
                                    {displayedSentenceMeaning && (
                                        <p className="text-lg font-bold text-charcoal/40 italic">
                                            {displayedSentenceMeaning}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={onPrev}
                                className="flex-1 btn-primary-cute bg-white text-charcoal border-2 border-strawberry/10 py-5 text-lg flex items-center justify-center gap-2"
                            >
                                <ChevronLeft size={24} />
                                {t('mission.prev')}
                            </button>
                            <button
                                onClick={onNext}
                                className="flex-[2] btn-primary-cute py-5 text-lg flex items-center justify-center gap-2"
                            >
                                {t('mission.next')}
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
