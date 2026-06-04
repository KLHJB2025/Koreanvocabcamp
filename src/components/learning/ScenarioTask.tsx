'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, ArrowRight, CheckCircle2, Volume2, Loader2, BookOpen, HelpingHand } from 'lucide-react';
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
    const getMascotGreeting = () => {
        const name = mascotName || (language === 'zh' ? '小步' : 'Boopi');
        if (language === 'zh') {
            return `🐾 ${name}：“哇！今天新学的单词好棒呀！我把它们都编成了一篇超精彩的情境故事，快来帮我填满它吧！通关即可夺得今日特训徽章哦，一起加油冲鸭！✨🍀”`;
        } else {
            return `🐾 ${name}: "Wow! The words you learned today are amazing! I've woven them into a special story. Help me fill in the blanks to secure your daily badge. Let's do this! ✨🍀"`;
        }
    };
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

    // Audio speaking queue states
    const [readingQueue, setReadingQueue] = useState<string[]>([]);
    const [currentReadingWord, setCurrentReadingWord] = useState<string | null>(null);

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
            
            // Find all word translations and split the text into parts
            const matches: { word: Word; translation: string; index: number; length: number }[] = [];
            const usedIndices = new Set<number>();

            // Sort words by Korean spelling length descending to match longer terms first and prevent Korean substring collision (e.g., 감 inside 감자, 가다 inside 걸어가다)
            const sortedWords = [...words].sort((a, b) => {
                if (b.kr.length !== a.kr.length) {
                    return b.kr.length - a.kr.length;
                }
                const aTransLen = (lang === 'zh' ? a.zh : a.en || '').length;
                const bTransLen = (lang === 'zh' ? b.zh : b.en || '').length;
                return bTransLen - aTransLen;
            });

            const missedWords: Word[] = [];

            // First pass: Match words in the story (checking all occurrences to find a clean, non-overlapping index)
            sortedWords.forEach(w => {
                const matchResult = findTranslationInStory(w, textToParse, lang, usedIndices);
                if (matchResult && matchResult.index !== -1) {
                    const { translation, index } = matchResult;
                    matches.push({
                        word: w,
                        translation,
                        index,
                        length: translation.length
                    });
                    for (let i = 0; i < translation.length; i++) {
                        usedIndices.add(index + i);
                    }
                } else {
                    missedWords.push(w);
                }
            });

            // Second pass: Append missed words and match them at their new appended offsets
            if (missedWords.length > 0) {
                let additions = '';
                if (lang === 'zh') {
                    additions += ' 另外，我们需要温习以下词汇：';
                } else {
                    additions += ' Additionally, we need to review these words: ';
                }
                
                missedWords.forEach((w, idx) => {
                    const cleanTrans = getCleanCandidate(w, lang);
                    const formatted = `${w.kr}(${cleanTrans})`;
                    
                    const startInAdditions = additions.length;
                    
                    if (lang === 'zh') {
                        additions += formatted + (idx < missedWords.length - 1 ? '、' : '。');
                    } else {
                        additions += formatted + (idx < missedWords.length - 1 ? ', ' : '.');
                    }
                    
                    const finalIndex = textToParse.length + startInAdditions;
                    
                    matches.push({
                        word: w,
                        translation: w.kr,
                        index: finalIndex,
                        length: w.kr.length
                    });
                    
                    for (let i = 0; i < w.kr.length; i++) {
                        usedIndices.add(finalIndex + i);
                    }
                });
                
                textToParse += additions;
            }

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

    const speakTextKo = (text: string) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Audio Player Helper for manual clicks (interrupts queue and plays immediately)
    const playAudio = (wordKr: string, type: 'word' | 'sentence') => {
        setReadingQueue([]);
        setCurrentReadingWord(wordKr);

        const cleanName = wordKr.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = type === 'word' 
            ? `/audio/words/${cleanName}.mp3?v=2` 
            : `/audio/sentences/${cleanName}.mp3?v=2`;
        
        const audio = new Audio(audioPath);
        
        let isDone = false;
        const done = () => {
            if (isDone) return;
            isDone = true;
            setCurrentReadingWord(null);
        };
        audio.onended = done;
        audio.onerror = () => {
            console.warn("Audio file not found, falling back to Web Speech API");
            speakTextKo(wordKr);
            done();
        };

        // Safety timeout
        const timeoutId = setTimeout(done, 2000);

        audio.play().catch(e => {
            console.warn("Audio playback failed, falling back to Web Speech API:", e);
            speakTextKo(wordKr);
            done();
        });
    };

    // Sequential audio playback queue handler
    useEffect(() => {
        if (readingQueue.length > 0 && !currentReadingWord) {
            const nextWord = readingQueue[0];
            setReadingQueue(prev => prev.slice(1));
            setCurrentReadingWord(nextWord);

            const cleanName = nextWord.replace(/[<>:"/\\|?*]/g, '');
            const audioPath = `/audio/words/${cleanName}.mp3?v=2`;
            const audio = new Audio(audioPath);
            
            let isDone = false;
            const done = () => {
                if (isDone) return;
                isDone = true;
                setCurrentReadingWord(null);
            };

            audio.onended = done;
            audio.onerror = () => {
                console.warn("Audio queue file not found, falling back to Web Speech API");
                speakTextKo(nextWord);
                done();
            };

            // Safety timeout of 2 seconds
            const timeoutId = setTimeout(done, 2000);

            audio.play().catch(e => {
                console.warn("Audio queue playback failed, falling back to Web Speech API:", e);
                speakTextKo(nextWord);
                done();
            });

            return () => {
                clearTimeout(timeoutId);
                audio.onended = null;
                audio.onerror = null;
                audio.pause();
            };
        }
    }, [readingQueue, currentReadingWord]);

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
        const correctNewly: string[] = [];

        words.forEach(w => {
            if (correctAnswers[w.kr] === true) return;

            const val = (answers[w.kr] || '').trim();
            if (val === w.kr) {
                newCorrect[w.kr] = true;
                correctNewly.push(w.kr);
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
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6 pb-6 border-b border-charcoal/5">
                <div>
                    <span className="pill-badge bg-primary/10 text-primary mb-2 inline-block italic font-bold">
                        {language === 'zh' ? '情境任务' : 'Scenario Mission'}
                    </span>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-charcoal">
                        {language === 'zh' ? '最终挑战：情境短文填空' : 'Final Challenge: Story Context blanks'}
                    </h2>
                </div>
            </div>

            {/* Mascot Cheering Dialogue Card */}
            {!loading && (
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-strawberry/10 via-pink-50/30 to-amber-50/50 p-6 rounded-[28px] border-2 border-strawberry/10 shadow-sm mb-8 animate-float">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 border-2 border-strawberry/20 overflow-hidden shadow-inner transform -rotate-3 hover:rotate-0 transition-transform">
                        <img src="/illustrations/mascot.png" alt="Mascot Avatar" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm sm:text-base font-extrabold text-charcoal/80 leading-relaxed italic">
                            {getMascotGreeting()}
                        </p>
                    </div>
                </div>
            )}

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

                            {/* Word Bank Sticker Book */}
                            <div className="bg-gradient-to-br from-violet-50/50 via-pink-50/50 to-amber-50/30 p-6 rounded-[32px] border-2 border-dashed border-strawberry/15 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-strawberry/5 rounded-full blur-xl pointer-events-none" />
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-charcoal/5">
                                    <h4 className="font-black text-xs uppercase tracking-widest text-charcoal/40 flex items-center gap-1.5">
                                        <BookOpen size={12} className="text-strawberry" />
                                        {language === 'zh' ? '🔑 今日词条贴纸' : '🔑 Word Bank'}
                                    </h4>
                                    <span className={`pill-badge text-xs font-black px-2.5 py-1 ${hintsLeft > 0 ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-rose-100 text-rose-500 font-bold border border-rose-200 animate-pulse'}`}>
                                        {language === 'zh' ? `提示剩: ${hintsLeft}次` : `Hints: ${hintsLeft}`}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {words.map(w => {
                                        const isRevealed = revealedHints[w.kr] || false;
                                        const isCorrect = correctAnswers[w.kr] === true;
                                        return (
                                            <div 
                                                key={w.kr} 
                                                className={`flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-dashed transition-all duration-300 transform hover:scale-102 hover:rotate-1 shadow-sm hover:shadow-md cursor-pointer ${
                                                    isCorrect 
                                                        ? 'border-emerald-300 bg-emerald-50/30' 
                                                        : isRevealed 
                                                        ? 'border-amber-300 bg-amber-50/20' 
                                                        : 'border-strawberry/15 hover:border-strawberry/40'
                                                }`}
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

                                                {isCorrect ? (
                                                    <span className="text-[10px] font-black uppercase text-emerald-600 border-2 border-emerald-500 rounded-lg px-1.5 py-0.5 transform rotate-[-8deg] shrink-0 font-mono tracking-tighter bg-white shadow-sm">
                                                        {language === 'zh' ? '已填入' : 'PASSED'}
                                                    </span>
                                                ) : (
                                                    <button
                                                        disabled={!isRevealed && hintsLeft === 0}
                                                        onClick={() => toggleHint(w.kr)}
                                                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all transform active:scale-95 duration-200 ${
                                                            isRevealed
                                                                ? 'bg-amber-400 text-charcoal shadow-sm hover:bg-amber-300'
                                                                : hintsLeft === 0
                                                                ? 'bg-cloud text-charcoal/20 cursor-not-allowed border border-transparent'
                                                                : 'bg-white border-2 border-amber-200 text-amber-500 hover:bg-amber-50 shadow-sm'
                                                        }`}
                                                    >
                                                        {isRevealed ? w.kr : (language === 'zh' ? '查看提示' : 'Reveal')}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Story Text and Inputs (Diary Notebook layout) */}
                        <div className="lg:col-span-8 flex flex-col justify-between bg-[#FCFBF7] bg-[radial-gradient(#e5e0d8_1.5px,transparent_1.5px)] [background-size:24px_24px] p-6 sm:p-10 rounded-[36px] border-3 border-strawberry/15 shadow-lg relative min-h-[480px]">
                            {/* Cute Notebook Spiral Binding (Left Edge) */}
                            <div className="absolute left-[-15px] top-8 bottom-8 flex flex-col justify-around pointer-events-none hidden sm:flex">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="w-8 h-4 bg-gradient-to-r from-charcoal/30 via-slate-300 to-white rounded-full border border-charcoal/20 shadow-md transform rotate-[-5deg] z-20" />
                                ))}
                            </div>

                            <div className="space-y-6 relative z-10">
                                {/* Story Title */}
                                <h3 className="text-xl sm:text-2xl font-black italic text-primary uppercase tracking-tight pb-3 border-b border-charcoal/5 flex items-center gap-2">
                                    📖 {storyTitle || (language === 'zh' ? '精选情境短文' : 'Scenario Story')}
                                </h3>

                                {/* Interactive Story Text */}
                                <div className="text-base sm:text-lg md:text-xl text-charcoal leading-loose font-bold whitespace-pre-wrap select-text px-2">
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
                                        const isReading = currentReadingWord === word.kr;

                                        let inputStatusClass = 'bg-white border-strawberry/20 text-charcoal focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm';
                                        if (isCorrect) {
                                            inputStatusClass = 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-none font-black shadow-md scale-102';
                                        } else if (isIncorrect) {
                                            inputStatusClass = 'bg-rose-50 border-rose-400 text-rose-600 focus:border-rose-500 focus:ring-rose-200 shadow-sm animate-shake';
                                        }

                                        const highlightClass = isReading 
                                            ? isCorrect 
                                                ? 'ring-4 ring-emerald-400/50 scale-105 z-10 border-emerald-400'
                                                : 'ring-4 ring-primary/40 scale-105 z-10 border-primary animate-pulse'
                                            : '';

                                        return (
                                            <span key={index} className="inline-block mx-1.5 align-middle relative">
                                                <input
                                                    type="text"
                                                    value={val}
                                                    onChange={(e) => handleInputChange(word.kr, e.target.value)}
                                                    disabled={isCorrect}
                                                    placeholder={language === 'zh' ? word.zh : word.en}
                                                    style={{ width: inputWidth }}
                                                    className={`px-2 py-1.5 rounded-xl text-center font-extrabold text-base sm:text-lg outline-none border-2 transition-all ${inputStatusClass} ${highlightClass}`}
                                                    title={language === 'zh' ? `输入韩文以翻译“${word.zh}”` : `Type Korean for "${word.en}"`}
                                                />
                                                {isReading ? (
                                                    <span className="absolute -top-2.5 -right-2 bg-primary text-white rounded-full p-1 shadow-md border border-white animate-bounce">
                                                        <Volume2 size={10} className="stroke-[3] animate-pulse" />
                                                    </span>
                                                ) : isCorrect ? (
                                                    <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-md border border-white">
                                                        <CheckCircle2 size={10} className="stroke-[3]" />
                                                    </span>
                                                ) : null}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* TIP or NEXT Button */}
                            <div className="mt-8 pt-6 border-t border-charcoal/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                                <p className="text-xs sm:text-sm font-bold text-charcoal/40 italic text-center sm:text-left flex items-center gap-1.5">
                                    <HelpingHand size={14} className="text-primary/70 shrink-0" />
                                    {language === 'zh' 
                                        ? '💡 点击左侧词汇卡可以查看提示或播放发音哦！' 
                                        : '💡 Click a word in the Word Bank to reveal hints or hear pronunciation!'}
                                </p>
                                <div className="flex justify-end w-full sm:w-auto shrink-0">
                                    {allCorrect ? (
                                        <button
                                            onClick={advanceTask}
                                            className="btn-primary-cute px-10 py-4.5 text-lg font-black flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-none shadow-lg shadow-emerald-400/20 hover:scale-105 active:scale-95 transition-all animate-bounce-short cursor-pointer"
                                        >
                                            {language === 'zh' ? '通关并完成特训！🎉' : 'Complete Scenario! 🎉'}
                                            <ArrowRight size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleCheckAnswers}
                                            className="btn-primary-cute bg-charcoal hover:bg-charcoal/90 text-white px-10 py-4.5 text-base font-black flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer animate-pulse-soft"
                                        >
                                            {language === 'zh' ? '提交并检查答案 📝' : 'Submit & Check Answers 📝'}
                                            <ArrowRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom local animation styles */}
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 1.5s ease-in-out infinite;
                }
                @keyframes pulse-soft {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                    50% { transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(255, 78, 141, 0.2); }
                }
                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
