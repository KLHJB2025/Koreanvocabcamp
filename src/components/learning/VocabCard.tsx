/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, Quote, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { getIllustrationUrl } from '@/lib/vocabulary';

interface VocabCardProps {
    word: string;
    pos: string;
    meaningZh: string;
    meaningEn: string;
    sentenceKr?: string;
    sentenceMeaning?: string;
    sentenceZh?: string;
    sentences?: {
        kr: string;
        en: string;
        zh: string;
    }[];
    illustrationUrl?: string;
    animationUrl?: string;
    animationData?: any;
    category?: string;
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
    sentences,
    animationData,
    animationUrl,
    illustrationUrl,
    category,
    onNext,
    onPrev
}: VocabCardProps) {
    const { t, language } = useTranslation();
    const [imageLoaded, setImageLoaded] = useState(false);

    // Reset image loaded state when word changes
    useEffect(() => {
        setImageLoaded(false);
    }, [word]);

    const speakText = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const speakSentence = (sentenceText: string) => {
        if (sentenceText === sentenceKr) {
            const cleanName = word.replace(/[<>:"/\\|?*]/g, '');
            const audioPath = `/audio/sentences/${cleanName}.mp3?v=2`;
            const audio = new Audio(audioPath);
            audio.play().catch(e => {
                console.warn("MP3 playback failed, falling back to Web Speech API:", e);
                speakText(sentenceText);
            });
        } else {
            speakText(sentenceText);
        }
    };

    const speak = (type: 'word' | 'sentence', speed: 'normal' | 'slow' = 'normal') => {
        const cleanName = word.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = type === 'word' 
            ? `/audio/words/${cleanName}.mp3?v=2` 
            : `/audio/sentences/${cleanName}.mp3?v=2`;
        
        const audio = new Audio(audioPath);
        audio.playbackRate = speed === 'normal' ? 1.0 : 0.7;
        audio.play().catch(e => {
            console.error("Audio playback failed:", e);
            if (type === 'sentence') {
                speakText(sentenceKr || '');
            } else {
                speakText(word);
            }
        });
    };

    const posStyle = POS_COLORS[pos] || POS_COLORS.default;
    const displayedMeaning = language === 'zh' ? meaningZh : meaningEn;
    const displayedSentenceMeaning = language === 'zh' ? sentenceZh : sentenceMeaning;

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="puffy-card p-4 sm:p-10 rounded-[32px] sm:rounded-[48px] flex flex-col items-center bg-white border-2 border-strawberry/10 overflow-hidden relative shadow-xl">
                {/* Decorative background flair */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

                <div className="w-full flex justify-between items-center relative z-10 mb-6 sm:mb-8">
                    <span className={`pill-badge ${posStyle.bg} ${posStyle.text} border ${posStyle.border} font-black`}>
                        {t(`pos.${pos}`)}
                    </span>
                    <div className="flex gap-1.5 sm:gap-2">
                        <button
                            onClick={() => speak('word', 'slow')}
                            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white rounded-xl flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-primary transition-colors border border-charcoal/5 shadow-sm cursor-pointer"
                        >
                            <Volume2 size={12} className="sm:w-[14px] sm:h-[14px]" />
                            {t('learning.slow')}
                        </button>
                        <button
                            onClick={() => speak('word', 'normal')}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                        >
                            <Volume2 size={16} className="sm:w-[20px] sm:h-[20px]" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-10 relative z-10 w-full">
                    {/* Illustration/Animation Container */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-full max-w-[380px] aspect-square h-auto bg-gradient-to-br from-strawberry/5 to-cloud/20 rounded-[32px] sm:rounded-[80px] flex items-center justify-center relative shadow-inner group"
                    >
                        {animationData ? (
                            <Lottie
                                animationData={animationData}
                                loop={true}
                                className="w-32 h-32 sm:w-40 sm:h-40"
                            />
                        ) : animationUrl ? (
                            <img src={animationUrl} alt={word} className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
                        ) : (
                            <div className="w-[90%] h-[90%] relative flex items-center justify-center rounded-[24px] sm:rounded-[40px] overflow-hidden border-2 border-primary/20 bg-white/50 shadow-sm">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-cloud/50 text-charcoal/30 gap-2 p-4 text-center">
                                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-spin" />
                                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-normal">
                                            {language === 'zh' ? '正在生成记忆画面...' : 'Generating memory scene...'}
                                        </span>
                                    </div>
                                )}
                                <img 
                                    src={getIllustrationUrl({
                                        kr: word,
                                        pos,
                                        en: meaningEn,
                                        zh: meaningZh,
                                        sentenceKr,
                                        sentenceMeaning,
                                        sentenceZh,
                                        illustrationUrl,
                                        category
                                    })} 
                                    alt={word} 
                                    className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </div>
                        )}

                        {/* Glass shine effect */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-[24px] sm:rounded-t-[60px] blur-sm pointer-events-none" />
                    </motion.div>

                    {/* Word and Meaning */}
                    <div className="text-center w-full px-2">
                        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tighter uppercase mb-2 text-charcoal drop-shadow-sm break-all leading-none">{word}</h2>
                        <p className="text-2xl sm:text-4xl font-black text-primary italic leading-tight">{displayedMeaning}</p>
                    </div>

                    {/* Example Sentence Section */}
                    <div className="w-full pt-6 sm:pt-8 border-t border-strawberry/5 space-y-4">
                        {sentences && sentences.length > 0 ? (
                            sentences.map((s, idx) => {
                                const displayedSentenceMeaning = language === 'zh' ? s.zh : s.en;
                                return (
                                    <div key={idx} className="flex items-start gap-3 sm:gap-4 bg-cloud/10 p-4 sm:p-5 rounded-[20px] sm:rounded-[28px] text-left">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                                            <Quote size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
                                        </div>
                                        <div className="space-y-0.5 sm:space-y-1 flex-1">
                                            <p className="text-base sm:text-xl font-bold text-charcoal leading-snug">
                                                {s.kr}
                                                <button 
                                                    onClick={() => speakSentence(s.kr)}
                                                    className="inline-flex ml-2 align-middle text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    <Volume2 size={14} className="sm:w-[16px] sm:h-[16px]" />
                                                </button>
                                            </p>
                                            {displayedSentenceMeaning && (
                                                <p className="text-xs sm:text-base font-bold text-charcoal/40 italic">
                                                    {displayedSentenceMeaning}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : sentenceKr ? (
                            <div className="flex items-start gap-3 sm:gap-4 bg-cloud/10 p-4 sm:p-6 rounded-[20px] sm:rounded-[32px] text-left">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <Quote size={14} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
                                </div>
                                <div className="space-y-1 sm:space-y-2 flex-1">
                                    <p className="text-lg sm:text-2xl font-bold text-charcoal leading-snug">
                                        {sentenceKr}
                                        <button 
                                            onClick={() => speakSentence(sentenceKr)}
                                            className="inline-flex ml-2 align-middle text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                        >
                                            <Volume2 size={14} className="sm:w-[16px] sm:h-[16px]" />
                                        </button>
                                    </p>
                                    {displayedSentenceMeaning && (
                                        <p className="text-sm sm:text-lg font-bold text-charcoal/40 italic">
                                            {displayedSentenceMeaning}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : null}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 sm:gap-4 pt-4">
                            <button
                                onClick={onPrev}
                                className="flex-1 btn-primary-cute bg-white text-charcoal border-2 border-strawberry/10 py-3 sm:py-5 text-sm sm:text-lg flex items-center justify-center gap-1 sm:gap-2 cursor-pointer"
                            >
                                <ChevronLeft size={18} className="sm:w-[24px] sm:h-[24px]" />
                                {t('mission.prev')}
                            </button>
                            <button
                                onClick={onNext}
                                className="flex-[2] btn-primary-cute py-3 sm:py-5 text-sm sm:text-lg flex items-center justify-center gap-1 sm:gap-2 cursor-pointer"
                            >
                                {t('mission.next')}
                                <ChevronRight size={18} className="sm:w-[24px] sm:h-[24px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
