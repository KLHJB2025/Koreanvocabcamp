import { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { getIllustrationUrl } from '@/lib/vocabulary';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { playSuccessSound, playErrorSound } from '@/lib/sound';

interface SpellingTaskProps {
    words: Word[];
    onComplete: () => void;
    onMiss: (word: Word) => void;
}

export function SpellingTask({ words, onComplete, onMiss }: SpellingTaskProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t, language } = useTranslation();

    const currentWord = words[currentIndex];

    const speakTextKo = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const playWordAudio = (wordKr: string) => {
        const cleanName = wordKr.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = `/audio/words/${cleanName}.mp3?v=2`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => {
            console.warn("Audio playback failed, falling back to Web Speech API:", e);
            speakTextKo(wordKr);
        });
        audio.onerror = () => {
            console.warn("Audio file not found, falling back to Web Speech API");
            speakTextKo(wordKr);
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isCorrect === true) return;
        
        const correct = input.trim() === currentWord.kr;
        setIsCorrect(correct);

        if (correct) {
            playSuccessSound();
            playWordAudio(currentWord.kr);
        } else {
            playErrorSound();
            onMiss(currentWord);
            setTimeout(() => setIsCorrect(null), 1500);
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInput('');
            setIsCorrect(null);
        } else {
            onComplete();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[48px] shadow-2xl border-2 border-strawberry/5 text-center">
            <span className="pill-badge bg-primary/10 text-primary mb-8 inline-block italic">
                {t('tasks.spelling.title')}
            </span>
            
            <div className="w-80 h-80 bg-gradient-to-br from-strawberry/5 to-cloud/20 rounded-[80px] flex items-center justify-center relative shadow-inner mx-auto mb-10 overflow-hidden border-2 border-strawberry/5">
                <img 
                    src={getIllustrationUrl(currentWord)} 
                    alt="Hint" 
                    className="w-72 h-72 object-cover rounded-[40px] bg-white/50 shadow-sm" 
                    loading="lazy"
                />
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
                    disabled={isCorrect === true}
                    className={`w-full p-8 rounded-[32px] border-4 text-4xl font-black italic text-center outline-none transition-all ${
                        isCorrect === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' :
                        isCorrect === false ? 'border-rose-400 bg-rose-50 text-rose-600' :
                        'border-secondary/20 bg-secondary/10 focus:border-primary text-charcoal'
                    }`}
                />
                
                {isCorrect === true ? (
                    <button 
                        type="button"
                        onClick={handleNext}
                        className="w-full py-6 text-xl font-black bg-charcoal hover:bg-charcoal/90 text-white rounded-[32px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl"
                    >
                        {language === 'zh' ? '下一题' : 'Next Question'}
                        <ArrowRight size={24} />
                    </button>
                ) : (
                    <button 
                        type="submit"
                        disabled={!input.trim()}
                        className={`w-full py-6 text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                            input.trim()
                            ? 'btn-primary-cute'
                            : 'bg-secondary/30 text-charcoal/30 border-2 border-dashed border-charcoal/10 cursor-not-allowed rounded-[32px]'
                        }`}
                    >
                        {t('tasks.spelling.confirm')}
                        <ArrowRight size={24} />
                    </button>
                )}
            </form>

            <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-charcoal/20 italic">
                {t('tasks.spelling.tip')}
            </p>
        </div>
    );
}
