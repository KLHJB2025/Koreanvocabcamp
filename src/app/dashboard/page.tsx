'use client';

import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, Star, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { t, language } = useTranslation();

    // Mock data for UI development
    const userData = {
        username: "Alex",
        currentRank: 1,
        xp: 250,
        nextRankXp: 500,
        streak: 3,
        todayProgress: 60, // percentage
        dayOfCamp: 4,
    };

    return (
        <div className="min-h-screen bg-[#F8F9FE]">
            {/* Top Header */}
            <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">T</div>
                    <h1 className="font-bold text-lg hidden sm:block">TOPIK Bootcamp</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100">
                        <Flame size={18} className="text-amber-500 fill-amber-500" />
                        <span className="font-bold text-amber-700">{userData.streak} {t('learning.days')}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                        <Star size={18} className="text-primary fill-primary" />
                        <span className="font-bold text-primary">{userData.xp} XP</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate flex items-center justify-center text-white font-bold">
                        {userData.username[0]}
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-8 py-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Left Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Rank Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-[32px] p-8 relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
                                    {t('learning.rankProgress')}
                                </span>
                                <h2 className="text-3xl font-bold mb-6">
                                    {t(`ranks.${userData.currentRank}`)}
                                </h2>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold">{userData.xp} / {userData.nextRankXp} XP</span>
                                        <span className="text-foreground/40">{Math.round((userData.xp / userData.nextRankXp) * 100)}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-secondary rounded-full overflow-hidden border border-border/50">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(userData.xp / userData.nextRankXp) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-primary to-accent"
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-foreground/40 font-medium italic">
                                    Rank up in 250 XP to unlock "Beginner Conqueror"
                                </p>
                            </div>
                            <Trophy size={180} className="absolute right-[-20px] bottom-[-20px] text-primary/5 -rotate-12" />
                        </motion.div>

                        {/* Daily Mission Entry */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate text-white rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate/20"
                        >
                            <div>
                                <div className="bg-white/10 w-fit px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-widest">
                                    Day {userData.dayOfCamp} of 14
                                </div>
                                <h3 className="text-4xl font-bold mb-4">
                                    Day {userData.dayOfCamp}: {language === 'zh' ? '动词词汇 I' : 'Action Verbs I'}
                                </h3>
                                <p className="text-white/60 text-lg mb-6 max-w-md">
                                    Master 15 high-frequency verbs used in TOPIK Level 1. Clear this mission to earn 100 XP.
                                </p>
                                <Link href="/mission" className="btn-premium bg-white text-slate hover:bg-white/90 px-10 py-4 flex items-center gap-3 w-fit">
                                    <Play size={20} className="fill-slate" />
                                    {language === 'zh' ? '开始任务' : 'Start Mission'}
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-[10px] border-white/5 flex items-center justify-center text-3xl font-bold">
                                    {userData.todayProgress}%
                                </div>
                                <svg className="absolute top-0 left-0 w-32 h-32 rotate-[-90deg]">
                                    <circle
                                        cx="64" cy="64" r="59"
                                        className="fill-none stroke-white/10"
                                        strokeWidth="10"
                                    />
                                    <motion.circle
                                        cx="64" cy="64" r="59"
                                        className="fill-none stroke-white"
                                        strokeWidth="10"
                                        strokeDasharray="370"
                                        initial={{ strokeDashoffset: 370 }}
                                        animate={{ strokeDashoffset: 370 - (370 * userData.todayProgress) / 100 }}
                                        transition={{ duration: 1.5, delay: 0.8 }}
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Quick Actions / SRS */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white border border-border p-6 rounded-3xl hover:border-primary transition-all group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Target size={24} />
                                </div>
                                <h4 className="font-bold mb-1">{t('learning.memoryTraining')}</h4>
                                <p className="text-xs text-foreground/40 font-medium mb-4">12 words ready for review</p>
                                <div className="flex items-center text-primary font-bold text-sm">
                                    Re-focus Mind <ChevronRight size={16} />
                                </div>
                            </div>
                            <div className="bg-white border border-border p-6 rounded-3xl hover:border-accent transition-all group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                                    <Trophy size={24} />
                                </div>
                                <h4 className="font-bold mb-1">Final Challenge</h4>
                                <p className="text-xs text-foreground/40 font-medium mb-4">Unlocks on Day 15</p>
                                <div className="flex items-center text-accent/50 font-bold text-sm">
                                    Locked <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white border border-border rounded-3xl p-6">
                            <h3 className="font-bold text-lg mb-6">Leaderboard</h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Suji", xp: 1240, avatar: "S" },
                                    { name: "Kevin", xp: 980, avatar: "K" },
                                    { name: "You", xp: 250, avatar: "Y", isMe: true },
                                    { name: "Meiling", xp: 180, avatar: "M" },
                                ].map((user, i) => (
                                    <div key={user.name} className={`flex items-center justify-between p-3 rounded-2xl ${user.isMe ? 'bg-primary/5 border border-primary/20' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-foreground/30 w-4">{i + 1}</span>
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                                                {user.avatar}
                                            </div>
                                            <span className={`text-sm font-bold ${user.isMe ? 'text-primary' : 'text-foreground/70'}`}>{user.name}</span>
                                        </div>
                                        <span className="text-sm font-bold">{user.xp} XP</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 text-sm font-bold text-primary hover:underline">View Full Leaderboard</button>
                        </div>

                        <div className="bg-gradient-to-br from-lavender to-mint rounded-3xl p-6 border border-white">
                            <h3 className="font-bold mb-2">My Badges</h3>
                            <div className="flex flex-wrap gap-3">
                                <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center border border-white/50 text-amber-500 shadow-sm">
                                    <Flame size={24} />
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 text-white/40">
                                    <Sparkles size={24} />
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 text-white/40">
                                    <Rocket size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
