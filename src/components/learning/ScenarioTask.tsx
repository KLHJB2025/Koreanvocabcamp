'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Word } from '@/lib/vocabulary-data';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, ArrowRight, CheckCircle2, Volume2, HelpCircle, AlertCircle, GripVertical, Loader2 } from 'lucide-react';
import { isConcreteWord, getIllustrationUrl } from '@/lib/vocabulary';


interface ScenarioTaskProps {
    words: Word[];
    onComplete: () => void;
    mascotName?: string;
}

interface LabelingItem {
    word: Word;
    correctKr: string;
    english: string;
    chinese: string;
    isCorrect: boolean;
    inputValue: string;
}

export function ScenarioTask({ words, onComplete, mascotName }: ScenarioTaskProps) {
    const { language, t } = useTranslation();
    const [tasks, setTasks] = useState<any[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    // Labeling Game State
    const [labelingItems, setLabelingItems] = useState<LabelingItem[]>([]);
    const [labelingErrorId, setLabelingErrorId] = useState<string | null>(null);
    const [revealedLabelHints, setRevealedLabelHints] = useState<Record<string, boolean>>({});

    const [imageLoaded, setImageLoaded] = useState(false);

    // Reset image loaded state when task changes
    useEffect(() => {
        setImageLoaded(false);
    }, [currentTaskIndex]);

    const toggleLabelHint = (kr: string) => {
        setRevealedLabelHints(prev => ({ ...prev, [kr]: !prev[kr] }));
    };

    // Sentence Translation Game State
    const [sentenceInput, setSentenceInput] = useState('');
    const [isSentenceCorrect, setIsSentenceCorrect] = useState<boolean | null>(null);
    const [showSentenceHint, setShowSentenceHint] = useState(false);

    // Final Completion State
    const [isFinished, setIsFinished] = useState(false);



    // Initialize Game Tasks
    useEffect(() => {
        const concrete = words.filter(isConcreteWord);
        const abstract = words.filter(w => !isConcreteWord(w));

        const newTasks: any[] = [];

        // Task 1: Scene Labeling (if concrete nouns exist)
        if (concrete.length > 0) {
            // Find dominant theme
            const themeCounts: Record<string, number> = {};
            concrete.forEach(w => {
                const cat = w.category || 'miscellaneous';
                themeCounts[cat] = (themeCounts[cat] || 0) + 1;
            });
            
            let dominantTheme = 'miscellaneous';
            let maxCount = 0;
            for (const [theme, count] of Object.entries(themeCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    dominantTheme = theme;
                }
            }

            // Map theme to custom scenery featuring characters interactively using the words
            let sceneHeader = 'cheerful cartoon playroom scene featuring cute kids playing and having fun, with a';
            if (dominantTheme === 'food_dining') {
                sceneHeader = 'bright and cozy cartoon kitchen or restaurant dining scene featuring happy family members cooking and eating, with a';
            } else if (dominantTheme === 'school_education') {
                sceneHeader = 'cheerful cartoon school classroom scene featuring students and a teacher studying interactively, with a';
            } else if (dominantTheme === 'home_living') {
                sceneHeader = 'cozy cartoon living room or bedroom scene featuring people relaxing and enjoying their time, with a';
            } else if (dominantTheme === 'city_travel_places') {
                sceneHeader = 'vibrant cartoon city street or park scene featuring travelers walking and exploring, with a';
            } else if (dominantTheme === 'nature_animals_plants') {
                sceneHeader = 'sunny cartoon park or forest scene featuring happy people and cute animals, with a';
            } else if (dominantTheme === 'people_jobs_family') {
                sceneHeader = 'friendly cartoon neighborhood or office scene featuring diverse characters working and chatting together, with a';
            }

            const itemsList = concrete.map(w => w.en).join(', a ');
            const scenePrompt = `cute cartoon digital illustration of ${sceneHeader} ${itemsList}. Colorful, friendly characters, clean vector style, no text, no labels, high resolution.`;

            newTasks.push({
                type: 'labeling',
                words: concrete,
                scenePrompt
            });
        }

        // Tasks 2+: Contextual Translation Cards for each abstract word
        abstract.forEach(w => {
            newTasks.push({
                type: 'sentence',
                word: w
            });
        });

        setTasks(newTasks);
        setCurrentTaskIndex(0);

        if (concrete.length > 0) {
            initLabeling(concrete);
        }
    }, [words]);

    // Initialize the labeling game elements
    const initLabeling = (concreteWords: Word[]) => {
        const items = concreteWords.map(w => ({
            word: w,
            correctKr: w.kr,
            english: w.en || '',
            chinese: w.zh || '',
            isCorrect: false,
            inputValue: ''
        }));
        setLabelingItems(items);
    };

    const currentTask = tasks[currentTaskIndex];

    // Audio Player Helper
    const playAudio = (wordKr: string, type: 'word' | 'sentence') => {
        const cleanName = wordKr.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = type === 'word' 
            ? `/audio/words/${cleanName}.mp3` 
            : `/audio/sentences/${cleanName}.mp3`;
        
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.error("Audio playback failed:", e));
    };

    // Clean sentence template by replacing the target word with [ ___ ]
    const getDisplaySentence = (word: Word) => {
        let sentence = word.sentenceKr || '';
        if (!sentence) return '';

        // Try replacing exact match
        if (sentence.includes(word.kr)) {
            return sentence.replace(word.kr, ' [ ___ ] ');
        }

        // Fallback: replace using first 2 characters (e.g. root stem)
        const stem = word.kr.slice(0, Math.min(word.kr.length, 2));
        if (sentence.includes(stem)) {
            const regex = new RegExp(`\\b\\w*${stem}\\w*\\b|${stem}\\w*`, 'g');
            return sentence.replace(regex, ' [ ___ ] ');
        }

        return sentence + ` (${word.kr})`;
    };

    // Text typing validation for Labeling
    const handleLabelInput = (targetIndex: number, text: string) => {
        const updated = [...labelingItems];
        updated[targetIndex].inputValue = text;
        setLabelingItems(updated);

        const item = updated[targetIndex];
        if (text.trim() === item.correctKr) {
            updated[targetIndex].isCorrect = true;
            setLabelingItems(updated);
            playAudio(item.correctKr, 'word');

            if (updated.every(i => i.isCorrect)) {
                setTimeout(() => {
                    advanceTask();
                }, 1500);
            }
        }
    };

    // Abstract Card Submit Action
    const handleSentenceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentTask || isSentenceCorrect === true) return;

        const targetWord = currentTask.word;
        const correct = sentenceInput.trim() === targetWord.kr;
        setIsSentenceCorrect(correct);

        if (correct) {
            playAudio(targetWord.kr, 'word');
            setShowSentenceHint(false);
            setTimeout(() => {
                setSentenceInput('');
                setIsSentenceCorrect(null);
                advanceTask();
            }, 1500);
        } else {
            setTimeout(() => setIsSentenceCorrect(null), 1500);
        }
    };

    // Advance to the next game card / complete step
    const advanceTask = () => {
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (tasks.length === 0) return null;

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-12 bg-white rounded-[32px] sm:rounded-[48px] shadow-2xl border-2 border-strawberry/5 relative overflow-hidden">
            {/* Background Flair */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -ml-40 -mb-40" />
            
            {/* Progress Bar & Header */}
            <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-charcoal/5">
                <div>
                    <span className="pill-badge bg-primary/10 text-primary mb-2 inline-block italic font-bold">
                        {t('mission.scenarioMission') || 'Scenario Mission'}
                    </span>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-charcoal">
                        {currentTask?.type === 'labeling' ? 'Task 1: Label the Scene' : `Task ${currentTaskIndex + 1}: Context Translation`}
                    </h2>
                </div>
                <div className="text-right">
                    <span className="text-xs font-black text-charcoal/40 uppercase tracking-widest">
                        Progress: {currentTaskIndex + 1} / {tasks.length}
                    </span>
                    <div className="w-24 h-2 bg-cloud rounded-full mt-2 overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-500" 
                            style={{ width: `${((currentTaskIndex + (isFinished ? 1 : 0)) / tasks.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key={currentTaskIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                    >
                        {/* --------------------- CONCRETE LABELING MODE --------------------- */}
                        {currentTask.type === 'labeling' && (
                            <div className="space-y-6">
                                <div className="text-center max-w-xl mx-auto mb-2">
                                    <p className="text-base sm:text-lg font-bold text-charcoal/60">
                                        {language === 'zh' 
                                            ? '观察场景，在对应的单词输入框中输入韩语！' 
                                            : 'Look at the scene and type the corresponding Korean word for each item!'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                                    {/* Left Column: Scene Illustration */}
                                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
                                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-secondary/15 bg-cloud shadow-xl group">
                                            {!imageLoaded && (
                                                <div className="absolute top-4 right-4 bg-charcoal/80 text-white backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 z-30 shadow-md animate-pulse">
                                                    <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">
                                                        {language === 'zh' ? '场景生成中...' : 'Generating scene...'}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <img 
                                                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(currentTask.scenePrompt)}?width=640&height=480&nologo=true`} 
                                                alt="Scene illustration" 
                                                className={`w-full h-full object-cover transition-all duration-750 group-hover:scale-[1.02] ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                                onLoad={() => setImageLoaded(true)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Right Column: Labeling Input Cards */}
                                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3 max-h-[380px] lg:max-h-[480px] overflow-y-auto pr-1">
                                        {labelingItems.map((item, idx) => {
                                            const showHint = revealedLabelHints[item.correctKr];
                                            return (
                                                <div 
                                                    key={item.english}
                                                    className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 bg-white shadow-sm ${
                                                        item.isCorrect 
                                                            ? 'border-emerald-500 bg-emerald-50/50' 
                                                            : labelingErrorId === item.english
                                                            ? 'border-rose-400 bg-rose-50 animate-shake'
                                                            : 'border-charcoal/5 hover:border-primary/20'
                                                    }`}
                                                >
                                                    {/* Word Thumbnail / Meaning */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cloud bg-white flex-shrink-0">
                                                            <img 
                                                                src={getIllustrationUrl(item.word)} 
                                                                alt={item.english}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {item.isCorrect && (
                                                                <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                                                    <CheckCircle2 size={18} className="text-emerald-500 stroke-[3]" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-black text-charcoal/40 uppercase tracking-wide">
                                                                {language === 'zh' ? '物品' : 'Item'}
                                                            </div>
                                                            <div className="text-sm font-black text-charcoal leading-tight">
                                                                {language === 'zh' ? item.chinese : item.english}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Input Box & Hints */}
                                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                        <div className="relative">
                                                            <input 
                                                                type="text"
                                                                value={item.inputValue}
                                                                onChange={(e) => handleLabelInput(idx, e.target.value)}
                                                                disabled={item.isCorrect}
                                                                placeholder={item.isCorrect ? '✓ Correct' : (language === 'zh' ? '输入韩语...' : 'Korean...')}
                                                                className={`w-28 sm:w-32 px-2.5 py-1.5 pr-7 rounded-xl text-center font-bold text-xs outline-none border transition-all ${
                                                                    item.isCorrect
                                                                        ? 'bg-emerald-500 text-white border-transparent font-black pr-2.5'
                                                                        : 'bg-white border-charcoal/15 focus:border-primary focus:ring-2 focus:ring-primary/20 text-charcoal'
                                                                }`}
                                                            />
                                                            {!item.isCorrect && (
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => toggleLabelHint(item.correctKr)}
                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60 transition-colors"
                                                                    title="Show hint"
                                                                >
                                                                    <HelpCircle size={14} />
                                                                </button>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Hint text */}
                                                        {showHint && !item.isCorrect && (
                                                            <span className="text-[10px] font-black text-amber-600 animate-pulse">
                                                                Hint: {item.correctKr[0] + '•'.repeat(Math.max(1, item.correctKr.length - 1))}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --------------------- ABSTRACT TRANSLATION MODE --------------------- */}
                        {currentTask.type === 'sentence' && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Left: Dynamic context image */}
                                <div className="relative rounded-[32px] overflow-hidden border-4 border-secondary/15 bg-cloud aspect-square shadow-xl flex items-center justify-center">
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cloud text-charcoal/30 gap-2">
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {language === 'zh' ? '正在加载情境画面...' : 'Loading scene illustration...'}
                                            </span>
                                        </div>
                                    )}
                                    <img 
                                        src={`https://image.pollinations.ai/prompt/realistic%20photography%20representing%20the%20scene:%20${encodeURIComponent(currentTask.word.sentenceMeaning || '')}?width=500&height=500&nologo=true`} 
                                        alt="Context scene" 
                                        className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent pointer-events-none" />
                                </div>

                                {/* Right: Translation & Input details */}
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs font-black text-primary uppercase tracking-widest block mb-2">Translate Example Sentence</span>
                                        <div className="p-5 bg-cloud rounded-2xl border border-charcoal/5 font-semibold text-lg text-charcoal italic leading-relaxed">
                                            "{language === 'zh' ? currentTask.word.sentenceZh : currentTask.word.sentenceMeaning}"
                                        </div>
                                    </div>

                                    {/* Korean sentence with blank */}
                                    <div className="space-y-2">
                                        <span className="text-xs font-black text-charcoal/40 uppercase tracking-widest block">Korean Context</span>
                                        <div className="flex items-center gap-3">
                                            <p className="text-2xl font-bold text-charcoal tracking-tight">
                                                {getDisplaySentence(currentTask.word)}
                                            </p>
                                            <button 
                                                onClick={() => playAudio(currentTask.word.kr, 'sentence')}
                                                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-charcoal/60 hover:bg-strawberry/20 hover:text-primary transition-colors flex-shrink-0"
                                            >
                                                <Volume2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Input Form */}
                                    <form onSubmit={handleSentenceSubmit} className="space-y-4 pt-2">
                                        <div className="relative">
                                            <input 
                                                autoFocus
                                                type="text"
                                                value={sentenceInput}
                                                onChange={(e) => setSentenceInput(e.target.value)}
                                                disabled={isSentenceCorrect === true}
                                                placeholder={t('tasks.spelling.placeholder') || 'Type Korean word...'}
                                                className={`w-full p-5 rounded-[20px] border-3 text-2xl font-black text-center outline-none transition-all ${
                                                    isSentenceCorrect === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' :
                                                    isSentenceCorrect === false ? 'border-rose-400 bg-rose-50 text-rose-600 animate-shake' :
                                                    'border-secondary/15 bg-white focus:border-primary text-charcoal'
                                                }`}
                                            />
                                            {isSentenceCorrect === true && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                                                    <CheckCircle2 size={30} />
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <button 
                                                type="button"
                                                onClick={() => setShowSentenceHint(true)}
                                                className="px-5 py-4 rounded-[16px] bg-amber-50 text-amber-600 font-bold border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-2 text-sm"
                                            >
                                                <HelpCircle size={16} />
                                                {showSentenceHint ? (language === 'zh' ? currentTask.word.zh : currentTask.word.en) : 'Hint?'}
                                            </button>

                                            <button 
                                                type="submit"
                                                disabled={isSentenceCorrect === true}
                                                className="btn-primary-cute flex-1 py-4 text-sm font-black flex items-center justify-center gap-2"
                                            >
                                                {t('tasks.spelling.confirm') || 'Confirm'}
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* --------------------- CONGRATS SCREEN --------------------- */
                    <motion.div 
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-28 h-28 bg-emerald-100 text-emerald-500 rounded-[36px] flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse">
                            <Sparkles size={52} />
                        </div>
                        <h3 className="text-4xl font-black italic tracking-tighter uppercase text-emerald-600 mb-4">
                            SCENARIO PASSED!
                        </h3>
                        <p className="text-lg font-bold text-charcoal/40 mb-10 max-w-md mx-auto">
                            {t('mission.scenarioSuccess') || 'You successfully navigated the scenario tasks using your new vocabulary. Great job!'}
                        </p>
                        <button onClick={onComplete} className="btn-primary-cute px-12 py-5 text-xl">
                            {t('mission.returnToBase')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
