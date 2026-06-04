'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Volume2, Search, Brain, Trophy, Calendar, 
    Sparkles, HelpCircle, CheckCircle, Clock, Filter, ArrowUpDown, Play, ShieldCheck,
    ChevronDown, ChevronUp, Lock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserLearnedWords } from '@/lib/vocabulary';
import { MOCK_VOCABULARY, Word } from '@/lib/vocabulary-data';
import { formatNextReview } from '@/lib/srs';
import { useState, useEffect } from 'react';

const MISSIONS = [
    { en: "Spawn Town", zh: "新手村降临 🐣" },
    { en: "Target Practice", zh: "击打木人桩 🎯" },
    { en: "Word Awakening", zh: "词力初觉醒 ✨" },
    { en: "Tavern Gathering", zh: "酒馆集结令 🍻" },
    { en: "Gale Runner", zh: "疾风行者步 🏃" },
    { en: "Labyrinth Quest", zh: "迷宫寻宝箱 📦" },
    { en: "Slime Echoes", zh: "史莱姆回响 👾" },
    { en: "Watchtower Vista", zh: "登上瞭望塔 🔭" },
    { en: "Wilderness Track", zh: "荒野迷踪迹 🧭" },
    { en: "Camp Supply", zh: "营地补给站 🍖" },
    { en: "Guardian Aegis", zh: "圣盾大洗礼 🛡️" },
    { en: "Magic Frequency", zh: "魔力电波连 📡" },
    { en: "Ruins Recall", zh: "遗迹大回溯 ⏳" },
    { en: "Dawn Charge", zh: "决战前夜蓄 ⚡" },
];

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

const getStageBadgeInfo = (level: number, lang: 'zh' | 'en') => {
    const stages: Record<number, { nameZh: string; nameEn: string; color: string; descZh: string; descEn: string }> = {
        1: { nameZh: '🌱 萌芽级', nameEn: '🌱 Seedling', color: 'bg-lime-50 text-lime-700 border-lime-100', descZh: '遗忘高危期', descEn: 'High decay risk' },
        2: { nameZh: '🌿 幼苗级', nameEn: '🌿 Sprout', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', descZh: '记忆形成中', descEn: 'Consolidating' },
        3: { nameZh: '🌳 小树级', nameEn: '🌳 Sapling', color: 'bg-teal-50 text-teal-700 border-teal-100', descZh: '中度稳固', descEn: 'Strengthening' },
        4: { nameZh: '🌲 成树级', nameEn: '🌲 Tree', color: 'bg-cyan-50 text-cyan-700 border-cyan-100', descZh: '长期存留', descEn: 'Retaining' },
        5: { nameZh: '👑 永恒黄金林', nameEn: '👑 Golden Forest', color: 'bg-amber-100 text-amber-800 border-amber-300 font-black', descZh: '永久记忆', descEn: 'Permanent memory' }
    };
    const levelKey = Math.min(5, Math.max(1, level));
    const stage = stages[levelKey];
    return {
        name: lang === 'zh' ? stage.nameZh : stage.nameEn,
        color: stage.color,
        desc: lang === 'zh' ? stage.descZh : stage.descEn
    };
};

function ForgettingCurveGraph({ lang }: { lang: 'zh' | 'en' }) {
    return (
        <div className="w-full bg-secondary/20 p-4 sm:p-6 rounded-[32px] border border-charcoal/5 shadow-inner">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/45">
                    {lang === 'zh' ? '📈 记忆遗忘与复习重建示意图' : '📈 Memory Decay & Recovery Graph'}
                </span>
                <div className="flex gap-4 text-[9px] font-black uppercase text-charcoal/50">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-red-400 inline-block rounded-full"></span>{lang === 'zh' ? '无复习（自然遗忘）' : 'No Review'}</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-emerald-500 inline-block rounded-full"></span>{lang === 'zh' ? '定期复习（巩固）' : 'With Review'}</span>
                </div>
            </div>
            <svg className="w-full h-32 text-primary" viewBox="0 0 500 130">
                {/* Grid Lines */}
                <line x1="40" y1="10" x2="480" y2="10" stroke="#e0e0e0" strokeDasharray="3" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#e0e0e0" strokeDasharray="3" />
                <line x1="40" y1="110" x2="480" y2="110" stroke="#e0e0e0" strokeDasharray="3" />
                
                {/* Y Axis Labels */}
                <text x="5" y="14" fill="#888" className="text-[9px] font-bold">100%</text>
                <text x="10" y="64" fill="#888" className="text-[9px] font-bold">50%</text>
                <text x="15" y="114" fill="#888" className="text-[9px] font-bold">0%</text>

                {/* X Axis Labels */}
                <text x="40" y="128" fill="#888" className="text-[8px] font-bold">{lang === 'zh' ? '学完' : 'Learn'}</text>
                <text x="120" y="128" fill="#888" className="text-[8px] font-bold">1 {lang === 'zh' ? '天' : 'Day'}</text>
                <text x="200" y="128" fill="#888" className="text-[8px] font-bold">2 {lang === 'zh' ? '天' : 'Days'}</text>
                <text x="280" y="128" fill="#888" className="text-[8px] font-bold">4 {lang === 'zh' ? '天' : 'Days'}</text>
                <text x="360" y="128" fill="#888" className="text-[8px] font-bold">7 {lang === 'zh' ? '天' : 'Days'}</text>
                <text x="440" y="128" fill="#888" className="text-[8px] font-bold">12 {lang === 'zh' ? '天' : 'Days'}</text>
                
                {/* Forgetting curves (decay paths) */}
                <path d="M 40 10 Q 80 80, 120 90" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 120 10 Q 160 60, 200 65" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 200 10 Q 240 40, 280 45" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 280 10 Q 320 25, 360 30" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 360 10 Q 400 18, 440 20" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3" />
                
                {/* Review jumps */}
                <line x1="120" y1="90" x2="120" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
                <line x1="200" y1="65" x2="200" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
                <line x1="280" y1="45" x2="280" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
                <line x1="360" y1="30" x2="360" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
                <line x1="440" y1="20" x2="440" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />

                {/* Permanent memory ceiling line */}
                <path d="M 40 10 L 120 10 L 200 10 L 280 10 L 360 10 L 440 10 L 480 10" fill="none" stroke="#10b981" strokeWidth="2.5" />

                {/* Target nodes */}
                <circle cx="40" cy="10" r="3" fill="#10b981" />
                <circle cx="120" cy="10" r="3" fill="#10b981" />
                <circle cx="200" cy="10" r="3" fill="#10b981" />
                <circle cx="280" cy="10" r="3" fill="#10b981" />
                <circle cx="360" cy="10" r="3" fill="#10b981" />
                <circle cx="440" cy="10" r="3" fill="#10b981" />
                
                {/* Cute visual text labels for stages */}
                <text x="45" y="22" fill="#047857" className="text-[7px] font-black">🌱 {lang === 'zh' ? '萌芽' : 'Seedling'}</text>
                <text x="125" y="22" fill="#047857" className="text-[7px] font-black">🌿 {lang === 'zh' ? '幼苗' : 'Sprout'}</text>
                <text x="205" y="22" fill="#047857" className="text-[7px] font-black">🌳 {lang === 'zh' ? '小树' : 'Sapling'}</text>
                <text x="285" y="22" fill="#047857" className="text-[7px] font-black">🌲 {lang === 'zh' ? '成树' : 'Tree'}</text>
                <text x="365" y="22" fill="#d97706" className="text-[7px] font-black">👑 {lang === 'zh' ? '黄金林' : 'Forest'}</text>
            </svg>
        </div>
    );
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

    // Tab and Day Browser state
    const [activeTab, setActiveTab] = useState<'tracker' | 'days'>('tracker');
    const [expandedDay, setExpandedDay] = useState<number | null>(null);

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

    // Slicing words for active cycle
    const cycleId = profile?.currentCycleId || 'beginner_cycle_1';
    const cycleWords = MOCK_VOCABULARY[cycleId] || MOCK_VOCABULARY['beginner_cycle_1'];
    const totalWordsCount = cycleWords.length;
    const wordsPerDay = Math.ceil(totalWordsCount / 14);

    const getWordsForDay = (dayNum: number) => {
        const start = (dayNum - 1) * wordsPerDay;
        const end = Math.min(start + wordsPerDay, totalWordsCount);
        return cycleWords.slice(start, end);
    };

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
                <section className="bg-white rounded-[40px] p-8 border-2 border-strawberry/5 shadow-xl relative overflow-hidden space-y-8">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-strawberry/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-3">
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

                            <p className="text-sm font-semibold text-charcoal/60 leading-relaxed">
                                {language === 'zh' 
                                    ? '根据人类大脑遗忘规律，新学的词如果不复习，会在24小时内忘掉大半。我们通过智能算法为每个词追踪 5 个“成长阶段”复习周期（复习间隔分别为 1天、2天、4天、7天和12天）。每次您在复习中回答正确，单词的记忆阶段就会升级成长，复习间隔自动拉长；若回答错误，单词会退回上一阶段重新加固，直至它牢牢成长为黄金林，锁入您的长期记忆。'
                                    : 'According to Ebbinghaus forgetting curve research, newly learned vocabulary decays rapidly within 24 hours. Our program automatically tracks 5 growth stages (intervals of 1, 2, 4, 7, and 12 days). Answering correctly upgrades a word\'s memory stage, stretching its retention interval. If you get it wrong, it steps back a stage to consolidate, ensuring it locks permanently into your long-term memory.'
                                }
                            </p>
                        </div>

                        {/* Interactive-looking graph */}
                        <div className="w-full md:w-[45%] flex-shrink-0">
                            <ForgettingCurveGraph lang={language === 'zh' ? 'zh' : 'en'} />
                        </div>
                    </div>

                    {/* Timeline Stages */}
                    <div className="grid grid-cols-5 gap-3 md:gap-6 pt-6 border-t border-charcoal/5">
                        {[
                            { step: language === 'zh' ? "🌱 萌芽级" : "🌱 Seedling", label: language === 'zh' ? '初次巩固' : 'Initial', interval: language === 'zh' ? '1 天后' : '1 Day', p: "20%" },
                            { step: language === 'zh' ? "🌿 幼苗级" : "🌿 Sprout", label: language === 'zh' ? '二次加深' : 'Consolidate', interval: language === 'zh' ? '2 天后' : '2 Days', p: "40%" },
                            { step: language === 'zh' ? "🌳 小树级" : "🌳 Sapling", label: language === 'zh' ? '复习抗阻' : 'Strengthen', interval: language === 'zh' ? '4 天后' : '4 Days', p: "60%" },
                            { step: language === 'zh' ? "🌲 成树级" : "🌲 Tree", label: language === 'zh' ? '长期锁存' : 'Retain', interval: language === 'zh' ? '7 天后' : '7 Days', p: "80%" },
                            { step: language === 'zh' ? "👑 黄金林" : "👑 Forest", label: language === 'zh' ? '终极掌握' : 'Mastered', interval: language === 'zh' ? '12 天后' : '12 Days', p: "100%" }
                        ].map((item, idx) => {
                            const isCurrentStageEmpty = levelCounts[idx] === 0;
                            return (
                                <div key={item.step} className="flex flex-col items-center text-center group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-3 border shadow-sm transition-all duration-300 ${isCurrentStageEmpty ? 'bg-secondary text-charcoal/30 border-transparent' : 'bg-primary text-white border-primary shadow-primary/20 scale-105'}`}>
                                        {idx + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] sm:text-xs font-black text-charcoal tracking-tighter leading-tight italic">{item.step}</p>
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

                {/* Tab Switcher */}
                <div className="flex justify-center">
                    <div className="bg-strawberry/5 p-1.5 rounded-[24px] border border-strawberry/15 flex gap-2 shadow-sm">
                        <button
                            onClick={() => setActiveTab('tracker')}
                            className={`px-6 py-2.5 rounded-[20px] font-black text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                                activeTab === 'tracker'
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-charcoal/60 hover:text-primary hover:bg-strawberry/5'
                            }`}
                        >
                            <Brain size={16} />
                            {language === 'zh' ? '记忆追踪' : 'Memory Tracker'}
                        </button>
                        <button
                            onClick={() => setActiveTab('days')}
                            className={`px-6 py-2.5 rounded-[20px] font-black text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                                activeTab === 'days'
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-charcoal/60 hover:text-primary hover:bg-strawberry/5'
                            }`}
                        >
                            <Calendar size={16} />
                            {language === 'zh' ? '按天浏览' : 'Browse by Day'}
                        </button>
                    </div>
                </div>

                {/* Content based on Active Tab */}
                {activeTab === 'tracker' ? (
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
                                    const badgeInfo = getStageBadgeInfo(word.level, language === 'zh' ? 'zh' : 'en');
                                    
                                    return (
                                        <motion.div 
                                            key={word.kr}
                                            layout
                                            className={`bg-white rounded-[32px] p-6 border-2 shadow-sm transition-all hover:shadow-lg relative flex flex-col justify-between ${isDue ? 'border-amber-400 bg-amber-50/5 shadow-md shadow-amber-400/5' : 'border-strawberry/5'}`}
                                        >
                                            {/* Top section: Word details */}
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">
                                                        {word.category}
                                                    </span>
                                                    
                                                    {/* Stage badge */}
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase border ${badgeInfo.color}`} title={badgeInfo.desc}>
                                                        {badgeInfo.name}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between gap-4 mb-2">
                                                    <h4 className="text-3xl font-black italic tracking-tighter text-charcoal select-all">
                                                        {word.kr}
                                                    </h4>
                                                    
                                                    <div className="flex items-center gap-1.5">
                                                        <button 
                                                            onClick={() => playAudio(word.kr)}
                                                            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-charcoal/60 hover:bg-strawberry/20 hover:text-primary transition-colors flex-shrink-0 cursor-pointer"
                                                        >
                                                            <Volume2 size={16} />
                                                        </button>
                                                        
                                                        <button 
                                                            onClick={() => {
                                                                window.dispatchEvent(new CustomEvent('open-dictionary-lookup', {
                                                                    detail: { query: word.kr }
                                                                }));
                                                            }}
                                                            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                                                            title={language === 'zh' ? '查找字典/AI解析' : 'Dictionary Lookup'}
                                                        >
                                                            <Search size={16} />
                                                        </button>
                                                    </div>
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
                                                            <span className="text-amber-600 animate-pulse font-bold">
                                                                {language === 'zh' ? '🔥 处于遗忘边缘，亟需复习！' : '🔥 VERGE OF FORGETTING, REVIEW NOW!'}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldCheck size={12} className="text-emerald-500" />
                                                            <span className="text-emerald-600 font-bold">
                                                                {language === 'zh' ? '🛡️ 记忆安全期 • ' : '🛡️ MEMORY SAFE • '}
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
                ) : (
                    <section className="space-y-4">
                        {Array.from({ length: 14 }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const mission = MISSIONS[idx] || { en: `Day ${dayNum}`, zh: `第 ${dayNum} 天` };
                            const dayWords = getWordsForDay(dayNum);
                            const totalCount = dayWords.length;
                            const learnedDayWords = dayWords.filter(w => learnedList.some(lw => lw.kr === w.kr));
                            const learnedCount = learnedDayWords.length;
                            const isCompleted = learnedCount === totalCount && totalCount > 0;
                            const isExpanded = expandedDay === dayNum;

                            return (
                                <div 
                                    key={dayNum}
                                    className={`bg-white rounded-[32px] border-2 transition-all ${
                                        isExpanded 
                                            ? 'border-primary shadow-lg' 
                                            : isCompleted
                                                ? 'border-emerald-200/60 shadow-sm hover:border-emerald-300'
                                                : 'border-strawberry/5 shadow-sm hover:border-strawberry/15'
                                    }`}
                                >
                                    {/* Accordion Header */}
                                    <button
                                        onClick={() => setExpandedDay(isExpanded ? null : dayNum)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                Day {dayNum}
                                            </span>
                                            <h3 className="text-base sm:text-lg font-black italic tracking-tighter text-charcoal leading-none">
                                                {language === 'zh' ? mission.zh : mission.en}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Progress badge */}
                                            {isCompleted ? (
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center gap-1">
                                                    <CheckCircle size={10} fill="currentColor" className="text-white" />
                                                    {language === 'zh' ? '已全部掌握' : 'Fully Mastered'} ({learnedCount}/{totalCount})
                                                </span>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                                                    learnedCount > 0 
                                                        ? 'bg-strawberry/15 border-strawberry/20 text-primary' 
                                                        : 'bg-secondary border-transparent text-charcoal/40'
                                                }`}>
                                                    {language === 'zh' ? '已学' : 'Learned'} {learnedCount}/{totalCount}
                                                </span>
                                            )}

                                            {/* Expand/Collapse Chevron */}
                                            <div className="text-charcoal/40">
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Accordion Content */}
                                    {isExpanded && (
                                        <div className="px-6 pb-6 pt-2 border-t border-charcoal/5 bg-secondary/5 rounded-b-[30px] transition-all duration-300">
                                            {totalCount > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                                    {dayWords.map((word) => {
                                                        const learnedInfo = learnedList.find(lw => lw.kr === word.kr);
                                                        const isLearned = !!learnedInfo;
                                                        const badgeInfo = isLearned 
                                                            ? getStageBadgeInfo(learnedInfo.level, language === 'zh' ? 'zh' : 'en') 
                                                            : null;

                                                        return (
                                                            <div 
                                                                key={word.kr}
                                                                className={`bg-white rounded-[24px] p-5 border-2 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                                                                    isLearned 
                                                                        ? 'border-strawberry/5 bg-white' 
                                                                        : 'border-charcoal/5 bg-[#FDF9FA] opacity-75'
                                                                }`}
                                                            >
                                                                <div>
                                                                    {/* Card Top: Category and Badge */}
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">
                                                                            {word.category || 'Vocabulary'}
                                                                        </span>
                                                                        {isLearned && badgeInfo ? (
                                                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${badgeInfo.color}`} title={badgeInfo.desc}>
                                                                                {badgeInfo.name}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase border bg-charcoal/5 border-charcoal/10 text-charcoal/40 flex items-center gap-1">
                                                                                <Lock size={8} />
                                                                                {language === 'zh' ? '未学习' : 'Locked'}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Card Middle: Spelling, Audio & Search */}
                                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                                        <h4 className="text-2xl font-black italic tracking-tighter text-charcoal select-all">
                                                                            {word.kr}
                                                                        </h4>
                                                                        
                                                                        <div className="flex items-center gap-1">
                                                                            {/* Pronounce Button */}
                                                                            <button 
                                                                                onClick={() => playAudio(word.kr)}
                                                                                className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-charcoal/60 hover:bg-strawberry/20 hover:text-primary transition-colors cursor-pointer"
                                                                                title={language === 'zh' ? '发音' : 'Pronounce'}
                                                                            >
                                                                                <Volume2 size={14} />
                                                                            </button>
                                                                            
                                                                            {/* Dictionary Lookup Event */}
                                                                            <button 
                                                                                onClick={() => {
                                                                                    window.dispatchEvent(new CustomEvent('open-dictionary-lookup', {
                                                                                        detail: { query: word.kr }
                                                                                    }));
                                                                                }}
                                                                                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                                                                                title={language === 'zh' ? '查找字典/AI解析' : 'Dictionary Lookup'}
                                                                            >
                                                                                <Search size={14} />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <p className="text-xs font-bold text-charcoal/60 italic mb-2">
                                                                        {language === 'zh' ? word.zh : word.en}
                                                                    </p>
                                                                </div>

                                                                {/* Word sentence detail if learned */}
                                                                {isLearned && learnedInfo?.sentenceKr && (
                                                                    <div className="mt-3 pt-3 border-t border-charcoal/5 space-y-1">
                                                                        <p className="text-[11px] font-black text-charcoal leading-snug">
                                                                            {learnedInfo.sentenceKr}
                                                                        </p>
                                                                        <p className="text-[10px] font-semibold text-charcoal/50 leading-snug">
                                                                            {language === 'zh' ? learnedInfo.sentenceZh : learnedInfo.sentenceMeaning}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-charcoal/40 text-center py-4 font-semibold">
                                                    {language === 'zh' ? '本天无词汇数据' : 'No words for this day'}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                )}
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
