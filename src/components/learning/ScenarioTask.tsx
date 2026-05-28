'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, ArrowRight, CheckCircle2, Volume2, Loader2 } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '@/lib/sound';
import { fetchAIStory, findTranslationInStory, getCleanCandidate } from '@/lib/scenarios';

interface ScenarioTaskProps {
    words: Word[];
    onComplete: () => void;
    mascotName?: string;
}

interface StoryPart {
    type: 'text' | 'input';
    content: string; // the translation of the word (placeholder)
    word?: Word;
}

export function ScenarioTask({ words, onComplete, mascotName }: ScenarioTaskProps) {
    const { language } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [storyTitle, setStoryTitle] = useState('');
    const [storyParts, setStoryParts] = useState<StoryPart[]>([]);
    
    // User answer tracking
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
    const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
    const [hintsLeft, setHintsLeft] = useState(3);
    
    // UI Image states
    const [imageLoaded, setImageLoaded] = useState(false);

    // Initialize Game Story
    useEffect(() => {
        let active = true;

        async function generateStory() {
            setLoading(true);
            setImageLoaded(false);
            
            const lang = language === 'zh' ? 'zh' : 'en';
            const storyData = await fetchAIStory(words, lang);
            
            if (!active) return;
            
            setStoryTitle(storyData.title);
            
            // Parse story text and substitute target vocabulary words
            let textToParse = storyData.story;
            
            // Fallback strategy: ensure every single word is represented.
            // If the AI missed some words, append them to the story in the Korean(Translation) format.
            const missedWords = words.filter(w => {
                const matchResult = findTranslationInStory(w, textToParse, lang);
                return !matchResult || matchResult.index === -1;
            });
            
            if (missedWords.length > 0) {
                let additions = '';
                if (lang === 'zh') {
                    additions += ' 另外，我们需要温习以下词汇：';
                    additions += missedWords.map(w => `${w.kr}(${getCleanCandidate(w, lang)})`).join('、');
                    additions += '。';
                } else {
                    additions += ' Additionally, we need to review these words: ';
                    additions += missedWords.map(w => `${w.kr}(${getCleanCandidate(w, lang)})`).join(', ');
                    additions += '.';
                }
                textToParse += additions;
            }

            // Find all word translations and split the text into parts
            const matches: { word: Word; translation: string; index: number; length: number }[] = [];
            const usedIndices = new Set<number>();

            // Sort words by max length (spelling or translation) descending to match longer terms first and prevent substring collision (e.g., 가다 inside 걸어가다)
            const sortedWords = [...words].sort((a, b) => {
                const aLen = Math.max(a.kr.length, (lang === 'zh' ? a.zh : a.en || '').length);
                const bLen = Math.max(b.kr.length, (lang === 'zh' ? b.zh : b.en || '').length);
                return bLen - aLen;
            });

            sortedWords.forEach(w => {
                const matchResult = findTranslationInStory(w, textToParse, lang);
                if (!matchResult) return;

                const { translation, index } = matchResult;

                // Check if index is valid and not already consumed by a longer word match
                if (index !== -1 && !Array.from(usedIndices).some(i => index >= i && index < i + translation.length)) {
                    matches.push({
                        word: w,
                        translation,
                        index,
                        length: translation.length
                    });
                    
                    for (let i = 0; i < translation.length; i++) {
                        usedIndices.add(index + i);
                    }
                }
            });

            // Sort matches by index
            matches.sort((a, b) => a.index - b.index);

            // Rebuild into parts
            const parts: StoryPart[] = [];
            let lastIndex = 0;

            matches.forEach(match => {
                if (match.index > lastIndex) {
                    parts.push({
                        type: 'text',
                        content: textToParse.substring(lastIndex, match.index)
                    });
                }
                parts.push({
                    type: 'input',
                    content: match.translation,
                    word: match.word
                });
                lastIndex = match.index + match.length;
            });

            if (lastIndex < textToParse.length) {
                parts.push({
                    type: 'text',
                    content: textToParse.substring(lastIndex)
                });
            }

            setStoryParts(parts);
            setAnswers({});
            setCorrectAnswers({});
            setRevealedHints({});
            setHintsLeft(3);
            setLoading(false);
        }

        generateStory();

        return () => {
            active = false;
        };
    }, [words, language]);

    // Audio Player Helper
    const playAudio = (wordKr: string, type: 'word' | 'sentence') => {
        const cleanName = wordKr.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = type === 'word' 
            ? `/audio/words/${cleanName}.mp3?v=2` 
            : `/audio/sentences/${cleanName}.mp3?v=2`;
        
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.error("Audio playback failed:", e));
    };

    // Text typing validation
    const handleInputChange = (kr: string, val: string) => {
        if (correctAnswers[kr] === true) return;

        const newAnswers = { ...answers, [kr]: val };
        setAnswers(newAnswers);

        // Reset incorrect state if they make changes
        if (correctAnswers[kr] === false) {
            setCorrectAnswers(prev => ({ ...prev, [kr]: undefined } as any));
        }
    };

    const handleCheckAnswers = () => {
        let allCorrect = true;
        const newCorrect: Record<string, boolean> = { ...correctAnswers };

        words.forEach(w => {
            if (correctAnswers[w.kr] === true) return;

            const val = (answers[w.kr] || '').trim();
            if (val === w.kr) {
                newCorrect[w.kr] = true;
                playAudio(w.kr, 'word');
            } else {
                newCorrect[w.kr] = false;
                allCorrect = false;
            }
        });

        setCorrectAnswers(newCorrect);

        if (allCorrect) {
            playSuccessSound();
        } else {
            playErrorSound();
        }
    };

    const toggleHint = (kr: string) => {
        if (revealedHints[kr]) {
            setRevealedHints(prev => ({ ...prev, [kr]: !prev[kr] }));
            return;
        }

        if (hintsLeft > 0) {
            setHintsLeft(prev => prev - 1);
            setRevealedHints(prev => ({ ...prev, [kr]: true }));
        } else {
            playErrorSound();
        }
    };

    const advanceTask = () => {
        onComplete();
    };

    const allCorrect = words.every(w => correctAnswers[w.kr] === true);

    // Cover art prompt matching the story theme
    const themeArtPrompt = `cute cartoon illustration of mascot ${mascotName || 'Boopi'} in a story themed "${storyTitle}". Soft bright colors, vector graphics style, friendly, cheerful mood, without any text, letters, words, or Korean characters in the image`;

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-12 bg-white rounded-[32px] sm:rounded-[48px] shadow-2xl border-2 border-strawberry/5 relative overflow-hidden">
            {/* Background Flair */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -ml-40 -mb-40" />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-charcoal/5">
                <div>
                    <span className="pill-badge bg-primary/10 text-primary mb-2 inline-block italic font-bold">
                        {language === 'zh' ? '情境任务' : 'Scenario Mission'}
                    </span>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-charcoal">
                        {language === 'zh' ? '最终挑战：情境短文填空' : 'Final Challenge: Story Context blanks'}
                    </h2>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {loading ? (
                    /* --------------------- LOADING Mascot --------------------- */
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-16 flex flex-col items-center justify-center text-center gap-6 relative z-10"
                    >
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        <div>
                            <h3 className="text-xl sm:text-2xl font-black italic uppercase text-charcoal mb-2">
                                {language === 'zh' ? '正在创作情境故事...' : 'Writing your scenario story...'}
                            </h3>
                            <p className="text-sm font-bold text-charcoal/40 max-w-sm mx-auto">
                                {language === 'zh' 
                                    ? `${mascotName || '小步'} 正在用今天学习的单词为你编写专属故事，请稍候！` 
                                    : `${mascotName || 'Boopi'} is crafting a unique story using today's words. Please wait!`}
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    /* --------------------- STORY FILL IN BLANKS GAME --------------------- */
                    <motion.div
                        key="game"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
                    >
                        {/* Left Column: Cover art and Word Bank */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Thematic Cover Illustration */}
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-secondary/15 bg-cloud shadow-lg group">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-cloud text-charcoal/20">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                )}
                                <img 
                                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(themeArtPrompt)}?width=640&height=480&nologo=true&model=sana`} 
                                    alt="Story Cover Art" 
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent pointer-events-none" />
                            </div>

                            {/* Word Bank Reference Helper */}
                            <div className="bg-cloud p-5 rounded-3xl border border-charcoal/5 shadow-sm">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-charcoal/5">
                                    <h4 className="font-black text-xs uppercase tracking-widest text-charcoal/40">
                                        {language === 'zh' ? '🔑 今日词汇库' : '🔑 Word Bank'}
                                    </h4>
                                    <span className={`pill-badge text-xs font-black px-2.5 py-1 ${hintsLeft > 0 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-500 font-bold animate-pulse'}`}>
                                        {language === 'zh' ? `提示: ${hintsLeft}次` : `Hints: ${hintsLeft}`}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {words.map(w => {
                                        const isRevealed = revealedHints[w.kr] || false;
                                        return (
                                            <div 
                                                key={w.kr} 
                                                className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-charcoal/5 shadow-sm hover:border-primary/10 transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => playAudio(w.kr, 'word')}
                                                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-charcoal/60 hover:bg-strawberry/20 hover:text-primary transition-colors flex-shrink-0"
                                                        title="Play pronunciation"
                                                    >
                                                        <Volume2 size={14} />
                                                    </button>
                                                    <div>
                                                        <div className="text-xs sm:text-sm font-black text-charcoal leading-tight">
                                                            {language === 'zh' ? w.zh : w.en}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    disabled={!isRevealed && hintsLeft === 0}
                                                    onClick={() => toggleHint(w.kr)}
                                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                        isRevealed
                                                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                            : hintsLeft === 0
                                                            ? 'bg-cloud text-charcoal/20 cursor-not-allowed'
                                                            : 'bg-cloud text-charcoal/40 hover:bg-charcoal/10 hover:text-charcoal/60'
                                                    }`}
                                                >
                                                    {isRevealed ? w.kr : (language === 'zh' ? '提示' : 'Hint')}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Story Text and Inputs */}
                        <div className="lg:col-span-8 flex flex-col justify-between bg-cloud p-6 sm:p-8 rounded-3xl border border-charcoal/5 shadow-inner">
                            <div className="space-y-6">
                                {/* Story Title */}
                                <h3 className="text-xl sm:text-2xl font-black italic text-primary uppercase tracking-tight pb-3 border-b border-charcoal/5">
                                    📖 {storyTitle || (language === 'zh' ? '精选情境短文' : 'Scenario Story')}
                                </h3>

                                {/* Interactive Story Text */}
                                <div className="text-base sm:text-lg md:text-xl text-charcoal leading-loose font-medium whitespace-pre-wrap select-text">
                                    {storyParts.map((part, index) => {
                                        if (part.type === 'text') {
                                            return <span key={index}>{part.content}</span>;
                                        }

                                        const word = part.word!;
                                        const isCorrect = correctAnswers[word.kr] === true;
                                        const isIncorrect = correctAnswers[word.kr] === false;
                                        const val = answers[word.kr] || '';

                                        // Estimate input width based on spelling length
                                        const inputWidth = `${Math.max(4.5, word.kr.length * 1.5 + 2)}rem`;

                                        return (
                                            <span key={index} className="inline-block mx-1.5 align-middle relative">
                                                <input
                                                    type="text"
                                                    value={val}
                                                    onChange={(e) => handleInputChange(word.kr, e.target.value)}
                                                    disabled={isCorrect}
                                                    placeholder={language === 'zh' ? word.zh : word.en}
                                                    style={{ width: inputWidth }}
                                                    className={`px-2 py-1 rounded-xl text-center font-bold text-base sm:text-lg outline-none border-2 transition-all ${
                                                        isCorrect
                                                            ? 'bg-emerald-500 text-white border-transparent font-black shadow-sm'
                                                            : isIncorrect
                                                            ? 'bg-rose-50 border-rose-400 text-rose-600 focus:border-rose-500 shadow-sm'
                                                            : 'bg-white border-charcoal/15 focus:border-primary text-charcoal focus:ring-2 focus:ring-primary/20 shadow-inner'
                                                    }`}
                                                    title={language === 'zh' ? `输入韩文以翻译“${word.zh}”` : `Type Korean for "${word.en}"`}
                                                />
                                                {isCorrect && (
                                                    <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-md border border-white">
                                                        <CheckCircle2 size={10} className="stroke-[3]" />
                                                    </span>
                                                )}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* TIP or NEXT Button */}
                            <div className="mt-8 pt-6 border-t border-charcoal/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs sm:text-sm font-bold text-charcoal/40 italic text-center sm:text-left">
                                    {language === 'zh' 
                                        ? '💡 提示：遇到记不起来的单词？可以点击左侧词汇库中的“显示答案”或播放发音哦！' 
                                        : '💡 Tip: Stumble on a word? Click "Reveal" or play the audio in the Word Bank on the left!'}
                                </p>
                                <div className="flex justify-end w-full sm:w-auto">
                                    {allCorrect ? (
                                        <button
                                            onClick={advanceTask}
                                            className="btn-primary-cute px-8 py-4 text-base font-black flex items-center justify-center gap-2 animate-bounce-short"
                                        >
                                            {language === 'zh' ? '通关并完成任务' : 'Complete Scenario'}
                                            <ArrowRight size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleCheckAnswers}
                                            className="btn-primary-cute bg-charcoal hover:bg-charcoal/90 text-white px-8 py-4 text-base font-black flex items-center justify-center gap-2"
                                        >
                                            {language === 'zh' ? '提交并检查答案' : 'Submit & Check Answers'}
                                            <ArrowRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
