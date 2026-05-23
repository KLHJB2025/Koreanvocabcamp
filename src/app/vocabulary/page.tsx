'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Volume2, Search, Brain, Trophy, Calendar, 
    Sparkles, HelpCircle, CheckCircle, Clock, Filter, ArrowUpDown, Play
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserLearnedWords } from '@/lib/vocabulary';
import { MOCK_VOCABULARY, Word } from '@/lib/vocabulary-data';
import { formatNextReview } from '@/lib/srs';
import { useState, useEffect } from 'react';

interface JoinedLearnedWord {
    kr: string;
    level: number;
    lastInterval: number;
    nextReview: any; // Firestore Timestamp or Date
    lastReviewedAt?: any;
    zh: string;
    en: string;
    category?: string;
    sentenceKr?: string;
    sentenceZh?: string;
    sentenceMeaning?: string;
}

export default function VocabularyLibrary() {
    const { t, language } = useTranslation();
    const { profile, loading } = useAuth();
    const router = useRouter();

    const [learnedList, setLearnedList] = useState<JoinedLearnedWord[]>([]);
    const [filteredList, setFilteredList] = useState<JoinedLearnedWord[]>([]);
    const [loadingWords, setLoadingWords] = useState(true);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [stageFilter, setStageFilter] = useState('all'); // all, due, 1, 2, 3, 4, 5
    const [sortBy, setSortBy] = useState('nextReview'); // nextReview, dateLearned, level

    // Audio Player Helper
    const playAudio = (wordKr: string) => {
        const cleanName = wordKr.replace(/[<>:"/\\|?*]/g, '');
        const audioPath = `/audio/words/${cleanName}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.error("Audio playback failed:", e));
    };

    // Load learned words and join with vocab data
    useEffect(() => {
        if (!profile?.uid) return;

        const loadData = async () => {
            setLoadingWords(true);
            const userLearned = await getUserLearnedWords(profile.uid);
            
            // Get all vocabulary words from mock database in a flattened map for quick lookup
            const vocabMap: Record<string, Word> = {};
            Object.values(MOCK_VOCABULARY).forEach(cycleWords => {
                cycleWords.forEach(w => {
                    vocabMap[w.kr] = w;
                });
            });

            // Join user learned word status with static word metadata
            const joined: JoinedLearnedWord[] = userLearned.map(item => {
                const staticData = vocabMap[item.kr] || {
                    kr: item.kr,
                    zh: '暂无中文翻译',
                    en: 'No English translation',
                    category: 'miscellaneous',
                    sentenceKr: '',
                    sentenceZh: '',
                    sentenceMeaning: ''
                };

                return {
                    kr: item.kr,
                    level: item.level || 1,
                    lastInterval: item.lastInterval || 1,
                    nextReview: item.nextReview,
                    lastReviewedAt: item.lastReviewedAt,
                    zh: staticData.zh,
                    en: staticData.en,
                    category: staticData.category,
                    sentenceKr: staticData.sentenceKr,
                    sentenceZh: staticData.sentenceZh,
                    sentenceMeaning: staticData.sentenceMeaning
                };
            });

            setLearnedList(joined);
            setLoadingWords(false);
        };

        loadData();
    }, [profile]);

    // Apply filters and sorting
    useEffect(() => {
        let list = [...learnedList];
        const now = new Date();

        // 1. Search Query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            list = list.filter(w => 
                w.kr.includes(query) || 
                w.en.toLowerCase().includes(query) || 
                w.zh.includes(query)
            );
        }

        // 2. Stage Filter
        if (stageFilter !== 'all') {
            if (stageFilter === 'due') {
                list = list.filter(w => {
                    if (!w.nextReview) return true;
                    const nextReviewDate = w.nextReview.toDate ? w.nextReview.toDate() : new Date(w.nextReview);
                    return nextReviewDate <= now;
                });
            } else {
                const levelNum = parseInt(stageFilter, 10);
                list = list.filter(w => w.level === levelNum);
            }
        }

        // 3. Sorting
        list.sort((a, b) => {
            if (sortBy === 'nextReview') {
                const dateA = a.nextReview?.toDate ? a.nextReview.toDate().getTime() : (a.nextReview ? new Date(a.nextReview).getTime() : 0);
                const dateB = b.nextReview?.toDate ? b.nextReview.toDate().getTime() : (b.nextReview ? new Date(b.nextReview).getTime() : 0);
                return dateA - dateB; // Soonest first
            } else if (sortBy === 'dateLearned') {
                const dateA = a.lastReviewedAt?.toDate ? a.lastReviewedAt.toDate().getTime() : 0;
                const dateB = b.lastReviewedAt?.toDate ? b.lastReviewedAt.toDate().getTime() : 0;
                return dateB - dateA; // Newest first
            } else if (sortBy === 'level') {
                return b.level - a.level; // Highest level first
            }
            return 0;
        });

        setFilteredList(list);
    }, [learnedList, searchQuery, stageFilter, sortBy]);

    if (loading || loadingWords) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-20 h-20 bg-strawberry/20 rounded-full flex items-center justify-center text-primary"
                    >
                        <Brain size={40} className="text-primary animate-pulse" />
                    </motion.div>
                    <p className="font-black text-primary/40 uppercase tracking-[0.2em] text-xs">
                        {language === 'zh' ? '正在连接记忆记忆库...' : 'Accessing Memory Lab...'}
                    </p>
                </div>
            </div>
        );
    }

    if (!profile) {
        router.push('/login');
        return null;
    }

    // Compute stats
    const now = new Date();
    const totalCount = learnedList.length;
    const dueCount = learnedList.filter(w => {
        if (!w.nextReview) return true;
        const nextReviewDate = w.nextReview.toDate ? w.nextReview.toDate() : new Date(w.nextReview);
        return nextReviewDate <= now;
    }).length;
    const masteredCount = learnedList.filter(w => w.level >= 5).length;

    // Level distribution
    const levelCounts = [0, 0, 0, 0, 0];
    learnedList.forEach(w => {
        const lvl = Math.min(5, Math.max(1, w.level));
        levelCounts[lvl - 1]++;
    });

    return (
        <div className="min-h-screen bg-[#FEF9FA] text-charcoal pb-20 w-full max-w-full overflow-x-hidden">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-strawberry/10 w-full">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-cloud hover:bg-strawberry/10 rounded-full flex items-center justify-center text-charcoal/60 hover:text-primary transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-black text-xl italic uppercase text-primary leading-none tracking-tighter">
                            {language === 'zh' ? '记忆曲线实验室' : 'Memory Lab'}
                        </h1>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-charcoal/30 mt-1">
                            {language === 'zh' ? '艾宾浩斯忘却曲线追踪' : 'Ebbinghaus Forgetting Curve tracker'}
                        </p>
                    </div>
                </div>
                {dueCount > 0 && (
                    <Link href="/mission" className="btn-primary-cute py-2 px-6 text-sm flex items-center gap-2">
                        <Play size={14} fill="currentColor" />
                        {language === 'zh' ? `开始复习待记单词 (${dueCount})` : `Review Due Words (${dueCount})`}
                    </Link>
                )}
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
                {/* Statistics panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title={language === 'zh' ? '已学单词数' : 'Total Learned'} 
                        value={totalCount} 
                        desc={language === 'zh' ? '已收录进记忆库的单词总数' : 'Total words committed to database'} 
                        icon={<Brain className="text-primary" size={28} />}
                        color="from-primary/5 to-primary/10 border-primary/20 text-primary"
                    />
                    <StatCard 
                        title={language === 'zh' ? '今日待复习' : 'Due for Review'} 
                        value={dueCount} 
                        desc={language === 'zh' ? '今日遗忘临界点，需及时复习' : 'Reached forgetting threshold today'} 
                        icon={<Clock className="text-amber-500 animate-pulse" size={28} />}
                        color="from-amber-500/5 to-amber-500/10 border-amber-500/20 text-amber-600"
                    />
                    <StatCard 
                        title={language === 'zh' ? '已牢固掌握' : 'Mastered (Stage 5)'} 
                        value={masteredCount} 
                        desc={language === 'zh' ? '已通过5个抗遗忘复习周期' : 'Completed 5 anti-forgetting cycles'} 
                        icon={<Trophy className="text-emerald-500" size={28} />}
                        color="from-emerald-500/5 to-emerald-500/10 border-emerald-500/20 text-emerald-600"
                    />
                </div>

                {/* Ebbinghaus Forgetting Curve Explainer Card */}
                <section className="bg-white rounded-[40px] p-8 border-2 border-strawberry/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-strawberry/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-2xl shadow-inner">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase italic tracking-tight">
                                {language === 'zh' ? '艾宾浩斯抗遗忘记忆曲线' : 'Ebbinghaus Anti-Forgetting Memory Curve'}
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">
                                {language === 'zh' ? '单词是如何变成长期记忆的？' : 'How words are transferred into long-term memory'}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-charcoal/60 leading-relaxed mb-8 max-w-3xl">
                        {language === 'zh' 
                            ? '根据人类大脑遗忘规律，新学的单词如果不复习，会在24小时内忘掉大半。我们通过智能算法为每个单词追踪 5 个抗遗忘复习周期（复习间隔分别为 1天、2天、4天、7天和12天）。每次您在复习中回答正确，该单词的记忆强度就会升级，复习间隔被自动拉长；若回答错误，单词将退回上一阶段重新加固，直至其牢固锁入您的长期记忆。'
                            : 'According to Ebbinghaus forgetting curve research, newly learned vocabulary decays rapidly within 24 hours. Our program automatically tracks 5 review cycles (intervals of 1, 2, 4, 7, and 12 days). Answering correctly upgrades a word\'s memory stage, stretching its retention interval. If you get it wrong, it steps back a stage to consolidate, ensuring it locks permanently into your long-term memory.'
                        }
                    </p>

                    {/* Timeline Stages */}
                    <div className="grid grid-cols-5 gap-3 md:gap-6 pt-4 border-t border-charcoal/5">
                        {[
                            { step: "Stage 1", label: language === 'zh' ? '初次巩固' : 'Initial', interval: language === 'zh' ? '1 天后' : '1 Day', p: "20%" },
                            { step: "Stage 2", label: language === 'zh' ? '二次加深' : 'Consolidate', interval: language === 'zh' ? '2 天后' : '2 Days', p: "40%" },
                            { step: "Stage 3", label: language === 'zh' ? '复习抗阻' : 'Strengthen', interval: language === 'zh' ? '4 天后' : '4 Days', p: "60%" },
                            { step: "Stage 4", label: language === 'zh' ? '长期锁存' : 'Retain', interval: language === 'zh' ? '7 天后' : '7 Days', p: "80%" },
                            { step: "Stage 5", label: language === 'zh' ? '终极掌握' : 'Mastered', interval: language === 'zh' ? '12 天后' : '12 Days', p: "100%" }
                        ].map((item, idx) => {
                            const isCurrentStageEmpty = levelCounts[idx] === 0;
                            return (
                                <div key={item.step} className="flex flex-col items-center text-center group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-3 border shadow-sm transition-all duration-300 ${isCurrentStageEmpty ? 'bg-secondary text-charcoal/30 border-transparent' : 'bg-primary text-white border-primary shadow-primary/20 scale-105'}`}>
                                        {idx + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-charcoal tracking-tighter leading-tight italic">{item.step}</p>
                                        <p className="text-[9px] font-black text-charcoal/40 uppercase tracking-widest leading-none">{item.interval}</p>
                                        <div className="pt-2">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black ${isCurrentStageEmpty ? 'bg-cloud text-charcoal/20' : 'bg-strawberry/15 text-primary'}`}>
                                                {levelCounts[idx]} {language === 'zh' ? '个词' : 'words'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Filter and vocabulary list grid */}
                <section className="space-y-6">
                    {/* Toolbar */}
                    <div className="bg-white p-4 sm:p-6 rounded-[32px] border-2 border-strawberry/5 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search input */}
                        <div className="relative w-full md:w-80">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === 'zh' ? '搜索韩语/拼音/翻译...' : 'Search word or meaning...'}
                                className="w-full pl-11 pr-5 py-3 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary focus:bg-white text-sm font-bold text-charcoal outline-none transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 w-4 h-4" />
                        </div>

                        {/* Filters and Sorting */}
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                            {/* Filter stage */}
                            <div className="flex items-center gap-2 bg-secondary/30 p-1.5 rounded-2xl border border-transparent">
                                <Filter size={14} className="text-charcoal/40 ml-1.5" />
                                <select 
                                    value={stageFilter}
                                    onChange={(e) => setStageFilter(e.target.value)}
                                    className="bg-transparent text-xs font-black uppercase text-charcoal/60 border-none outline-none pr-3 py-1 cursor-pointer"
                                >
                                    <option value="all">{language === 'zh' ? '全部阶段' : 'All Stages'}</option>
                                    <option value="due">{language === 'zh' ? '⚡ 待复习词汇' : '⚡ Due Words'}</option>
                                    <option value="1">Stage 1</option>
                                    <option value="2">Stage 2</option>
                                    <option value="3">Stage 3</option>
                                    <option value="4">Stage 4</option>
                                    <option value="5">Stage 5</option>
                                </select>
                            </div>

                            {/* Sort selection */}
                            <div className="flex items-center gap-2 bg-secondary/30 p-1.5 rounded-2xl border border-transparent">
                                <ArrowUpDown size={14} className="text-charcoal/40 ml-1.5" />
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-transparent text-xs font-black uppercase text-charcoal/60 border-none outline-none pr-3 py-1 cursor-pointer"
                                >
                                    <option value="nextReview">{language === 'zh' ? '复习时间 (最快)' : 'Next Review'}</option>
                                    <option value="dateLearned">{language === 'zh' ? '学习时间 (最新)' : 'Date Learned'}</option>
                                    <option value="level">{language === 'zh' ? '记忆阶段 (最高)' : 'Memory Stage'}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Vocabulary cards Grid */}
                    {filteredList.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredList.map((word) => {
                                const nextReviewDate = word.nextReview?.toDate ? word.nextReview.toDate() : new Date(word.nextReview);
                                const isDue = nextReviewDate <= now;
                                
                                return (
                                    <motion.div 
                                        key={word.kr}
                                        layout
                                        className={`bg-white rounded-[32px] p-6 border-2 shadow-sm transition-all hover:shadow-lg relative flex flex-col justify-between ${isDue ? 'border-amber-400 bg-amber-50/5' : 'border-strawberry/5'}`}
                                    >
                                        {/* Top section: Word details */}
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">
                                                    {word.category}
                                                </span>
                                                
                                                {/* Stage badge */}
                                                <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase ${
                                                    word.level >= 5 
                                                        ? 'bg-emerald-500/10 text-emerald-600' 
                                                        : isDue 
                                                        ? 'bg-amber-500/15 text-amber-600 animate-pulse'
                                                        : 'bg-primary/10 text-primary'
                                                }`}>
                                                    {word.level >= 5 ? (language === 'zh' ? 'Stage 5 · 已掌握' : 'Stage 5 · Mastered') : `Stage ${word.level}`}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 mb-2">
                                                <h4 className="text-3xl font-black italic tracking-tighter text-charcoal select-all">
                                                    {word.kr}
                                                </h4>
                                                
                                                <button 
                                                    onClick={() => playAudio(word.kr)}
                                                    className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-charcoal/60 hover:bg-strawberry/20 hover:text-primary transition-colors flex-shrink-0"
                                                >
                                                    <Volume2 size={16} />
                                                </button>
                                            </div>

                                            <p className="text-sm font-bold text-charcoal/60 mb-6 italic">
                                                {language === 'zh' ? word.zh : word.en}
                                            </p>
                                        </div>

                                        {/* Bottom section: SRS stats */}
                                        <div className="space-y-4 pt-4 border-t border-charcoal/5">
                                            {/* Memory strength bar */}
                                            <div>
                                                <div className="flex justify-between items-center text-[9px] font-black uppercase text-charcoal/30 mb-1.5">
                                                    <span>{language === 'zh' ? '记忆强度' : 'Memory Strength'}</span>
                                                    <span>{word.level * 20}%</span>
                                                </div>
                                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${word.level >= 5 ? 'bg-emerald-500' : 'bg-primary'}`}
                                                        style={{ width: `${word.level * 20}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Due time */}
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-charcoal/40 uppercase">
                                                {isDue ? (
                                                    <>
                                                        <Clock size={12} className="text-amber-500" />
                                                        <span className="text-amber-600 animate-pulse">
                                                            {language === 'zh' ? '⚡ 现已达到遗忘临界，待复习' : '⚡ Due for review'}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Calendar size={12} className="text-charcoal/20" />
                                                        <span>
                                                            {language === 'zh' ? '下次复习: ' : 'Next Review: '}
                                                            {formatNextReview(nextReviewDate, language)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border-2 border-dashed border-charcoal/10 p-20 text-center text-charcoal/30 flex flex-col items-center gap-4">
                            <Brain size={48} className="text-charcoal/10" />
                            <h4 className="text-lg font-black uppercase italic tracking-tighter">
                                {language === 'zh' ? '未找到单词' : 'No words found'}
                            </h4>
                            <p className="text-xs font-semibold max-w-sm leading-relaxed">
                                {searchQuery || stageFilter !== 'all' 
                                    ? (language === 'zh' ? '尝试调整您的搜索关键字或过滤条件。' : 'Try modifying your search queries or filtering criteria.')
                                    : (language === 'zh' ? '您还没有开始进行今日任务学习，还没有录入的已学词汇。' : 'You have not learned any words yet. Start a daily mission to add words!')
                                }
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

function StatCard({ title, value, desc, icon, color }: { title: string, value: number, desc: string, icon: React.ReactNode, color: string }) {
    return (
        <div className={`bg-gradient-to-br p-6 rounded-[32px] border-2 shadow-sm flex flex-col justify-between h-44 ${color}`}>
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{title}</span>
                <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
            </div>
            <div>
                <p className="text-4xl font-black italic tracking-tighter leading-none mb-1.5 select-all">{value}</p>
                <p className="text-[9px] font-semibold opacity-60 leading-snug">{desc}</p>
            </div>
        </div>
    );
}
