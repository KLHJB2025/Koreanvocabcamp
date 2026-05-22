'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, ChevronRight, Play, ShieldCheck, Loader2, LogOut, Map as MapIcon, GraduationCap, Heart, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { MissionRoadmap } from '@/components/learning/MissionRoadmap';
import { getRankInfo } from '@/lib/ranks';
import { getDailyEncouragement } from '@/lib/encouragement';
import { MOCK_VOCABULARY } from '@/lib/vocabulary-data';
import { getReviewCount } from '@/lib/vocabulary';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { t, language } = useTranslation();
    const { profile, loading } = useAuth();
    const router = useRouter();
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        if (profile?.uid) {
            getReviewCount(profile.uid).then(setReviewCount);
        }
    }, [profile]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-20 h-20 bg-strawberry/20 rounded-full flex items-center justify-center text-primary"
                    >
                        <Heart size={40} fill="currentColor" />
                    </motion.div>
                    <p className="font-black text-primary/40 uppercase tracking-[0.3em] text-xs">
                        {t('dashboard.wakingUp')}
                    </p>
                </div>
            </div>
        );
    }

    if (!profile) {
        router.push('/login');
        return null;
    }

    const isAdmin = profile.role === 'admin';
    const rankInfo = getRankInfo(profile.totalXp || 0, language);

    return (
        <div className="min-h-screen bg-[#FEF9FA] text-charcoal pb-20">
            {/* Cuter Top Header */}
            <header className="bg-white/80 backdrop-blur-md px-4 sm:px-10 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-20 border-b border-strawberry/10">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-12 h-12 bg-primary rounded-[20px] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 border-b-4 border-black/10"
                    >
                        T
                    </motion.div>
                    <div className="hidden sm:block">
                        <h1 className="font-black text-2xl leading-none tracking-tighter italic uppercase text-primary">TOPIK</h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">
                            {t('dashboard.hq')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-4">
                    <StatBadge icon={<Flame size={14} className="sm:w-[16px] sm:h-[16px]" />} value={profile.streakCount || 0} color="bg-orange-50 text-orange-500 border-orange-100" />
                    <StatBadge icon={<Star size={14} className="sm:w-[16px] sm:h-[16px]" />} value={profile.totalXp || 0} color="bg-amber-50 text-amber-600 border-amber-100" />

                    <div className="flex items-center gap-1 sm:gap-3 ml-1 sm:ml-4 bg-white p-1 sm:p-2 pr-1.5 sm:pr-6 rounded-full border border-strawberry/10 shadow-sm">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-strawberry/10 flex items-center justify-center font-black text-primary border-2 border-white shadow-inner text-xs sm:text-base">
                            {profile.displayName?.[0] || 'Y'}
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-black tracking-tight">{profile.displayName}</p>
                            <p className="text-[8px] font-black uppercase text-primary/40 tracking-wider">
                                {isAdmin ? t('dashboard.adminCommander') : t('dashboard.challenger')}
                            </p>
                        </div>
                        <button onClick={handleLogout} className="ml-1 p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
                            <LogOut size={14} className="sm:w-[16px] sm:h-[16px]" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-10 py-6 sm:py-12 space-y-6 sm:space-y-12">
                {/* Admin Section */}
                {isAdmin && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 sm:p-8 bg-charcoal text-white rounded-[32px] sm:rounded-[48px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black italic uppercase leading-none mb-2">
                                    {t('dashboard.commandCenter.title')}
                                </h2>
                                <p className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                                    {t('dashboard.commandCenter.desc')}
                                </p>
                            </div>
                        </div>
                        <Link href="/admin" className="btn-primary-cute w-full sm:w-auto text-center bg-white text-charcoal border-white relative z-10">
                            {t('dashboard.commandCenter.launch')}
                        </Link>
                    </motion.div>
                )}

                {/* Mascot & Progress Header */}
                <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-4 bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-xl border-2 border-strawberry/5 relative group"
                    >
                        <div className="absolute top-4 right-4 px-3 py-1 bg-strawberry/10 rounded-full text-[8px] font-black uppercase tracking-widest text-primary group-hover:scale-110 transition-transform">
                            {t('dashboard.activeCompanion')}
                        </div>
                        <motion.img 
                            src="/illustrations/mascot.png" 
                            alt="Mascot" 
                            className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-6"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        />
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 italic">
                                {t('learning.memoryTraining')}
                            </p>
                            <h3 className="text-lg sm:text-xl font-black italic text-primary leading-tight">
                                {getDailyEncouragement(profile.displayName || 'Agent', profile.dayOfCamp || 1, language)}
                            </h3>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-8 bg-charcoal rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                        
                        <div className="relative z-10">
                            <h3 className="text-lg sm:text-xl font-black uppercase italic tracking-widest text-primary mb-6 sm:mb-10 flex items-center gap-3">
                                <GraduationCap size={24} />
                                {t('dashboard.vocabMastery')}
                            </h3>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-12 mb-6 sm:mb-10">
                                <div>
                                    <p className="text-3xl sm:text-5xl font-black italic tracking-tighter mb-2">
                                        {(() => {
                                            const cycleKeys = Object.keys(MOCK_VOCABULARY);
                                            const currentCycleIndex = cycleKeys.indexOf(profile.currentCycleId || 'beginner_cycle_1');
                                            const masteredInPrevCycles = currentCycleIndex * 100;
                                            const currentDay = profile.dayOfCamp || 1;
                                            const masteredInCurrentCycle = Math.min(100, Math.floor(((currentDay - 1) / 14) * 100));
                                            return masteredInPrevCycles + masteredInCurrentCycle;
                                        })()}
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight">
                                        {t('dashboard.stats.mastered')}<br/>{t('dashboard.stats.totalIntel')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-3xl sm:text-5xl font-black italic tracking-tighter mb-2">
                                        {profile.streakCount || 0}
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight">
                                        {t('dashboard.stats.streak')}<br/>{t('dashboard.stats.training')}
                                    </p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-3xl sm:text-5xl font-black italic tracking-tighter mb-2 text-primary">
                                        {profile.currentCycleId?.split('_').pop() || '1'}
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight">
                                        {t('dashboard.stats.cycle')}<br/>{t('dashboard.stats.path')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5 mt-4 sm:mt-0">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, ((profile.dayOfCamp || 1) / 14) * 100)}%` }}
                                className="h-full bg-gradient-to-r from-primary to-rose-400"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Roadmap & Daily Mission */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-12">

                        {/* Roadmap */}
                        <section className="puffy-card p-6 sm:p-10 rounded-[32px] sm:rounded-[48px]">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 sm:mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cloud rounded-2xl flex items-center justify-center text-primary shadow-inner">
                                        <MapIcon size={20} />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-black uppercase italic tracking-tight">
                                        {profile.level === 'beginner' ? 'Beginner' : 'Intermediate'} {t('dashboard.roadmap.camp')}: {profile.currentCycleId?.split('_').pop() || '1'}
                                    </h3>
                                </div>
                                <Link href="/camps" className="px-4 py-1.5 bg-strawberry/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary hover:bg-strawberry/20 transition-all">
                                    {t('dashboard.roadmap.switch')}
                                </Link>
                            </div>
                            <MissionRoadmap currentDay={profile.dayOfCamp || 1} language={language} />
                        </section>

                        {/* Daily Mission Hero or Boss Battle */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`relative overflow-hidden puffy-card p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 bg-gradient-to-br transition-all duration-500 ${profile.dayOfCamp === 15 ? 'from-charcoal to-black text-white border-primary shadow-[0_0_50px_rgba(255,78,141,0.2)]' : 'from-white to-strawberry/5'}`}
                        >
                            <div className="relative z-10 flex-1 w-full text-center md:text-left">
                                <span className={`pill-badge mb-4 sm:mb-6 inline-block ${profile.dayOfCamp === 15 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                                    {profile.dayOfCamp === 15 
                                        ? t('dashboard.dailyMission.finalBreach') 
                                        : t('dashboard.dailyMission.objectives', { day: profile.dayOfCamp || 1 })}
                                </span>
                                <h2 className={`text-3xl sm:text-5xl font-black italic mb-4 sm:mb-6 tracking-tighter uppercase leading-none ${profile.dayOfCamp === 15 ? 'text-white' : 'text-charcoal'}`}>
                                    {profile.dayOfCamp === 15
                                        ? t('dashboard.dailyMission.deployBoss')
                                        : t('dashboard.dailyMission.deployToday')}
                                </h2>
                                <p className={`text-sm sm:text-lg font-medium mb-6 sm:mb-10 leading-relaxed max-w-sm mx-auto md:mx-0 ${profile.dayOfCamp === 15 ? 'text-white/60' : 'text-charcoal/40'}`}>
                                    {profile.dayOfCamp === 15
                                        ? t('dashboard.dailyMission.bossDesc')
                                        : t('dashboard.dailyMission.todayDesc')}
                                </p>
                                <Link
                                    href={profile.dayOfCamp === 15 ? "/challenge" : "/mission"}
                                    className={`btn-primary-cute flex items-center justify-center gap-3 w-full sm:w-fit ${profile.dayOfCamp === 15 ? 'bg-white text-charcoal border-none' : ''}`}
                                >
                                    <Play size={20} fill="currentColor" />
                                    {profile.dayOfCamp === 15 
                                        ? t('dashboard.dailyMission.beginBattle') 
                                        : t('dashboard.dailyMission.commenceTraining')}
                                </Link>
                            </div>

                            <div className="relative shrink-0 mt-6 md:mt-0">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className={`w-36 h-36 sm:w-56 sm:h-56 rounded-[36px] sm:rounded-[60px] flex flex-col items-center justify-center shadow-inner border-2 ${profile.dayOfCamp === 15 ? 'bg-primary/20 border-primary/20' : 'bg-strawberry/10 border-white'}`}
                                >
                                    <span className={`text-3xl sm:text-5xl font-black italic ${profile.dayOfCamp === 15 ? 'text-white' : 'text-primary'}`}>
                                        {profile.dayOfCamp === 15 ? '100%' : '+150'}
                                    </span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest mt-2 ${profile.dayOfCamp === 15 ? 'text-white/40' : 'text-primary/40'}`}>
                                        {profile.dayOfCamp === 15 
                                            ? t('dashboard.dailyMission.targetScore') 
                                            : t('dashboard.dailyMission.missionXp')}
                                    </span>
                                </motion.div>

                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                                    <Star size={24} fill="currentColor" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Sub-Actions */}
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                            <ActionCard
                                title={t('dashboard.actions.memoryLab.title')}
                                desc={t('dashboard.actions.memoryLab.desc')}
                                icon={<Target size={24} />}
                                badge={t('dashboard.actions.memoryLab.badge', { count: reviewCount })}
                                color="bg-mint"
                                href="/mission"
                            />
                            <ActionCard
                                title={t('dashboard.actions.store.title')}
                                desc={t('dashboard.actions.store.desc')}
                                icon={<Trophy size={24} />}
                                badge={t('dashboard.actions.store.locked')}
                                color="bg-lavender"
                                locked
                            />
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-6 sm:space-y-12">
                        {/* Rank Progress */}
                        <div className="puffy-card p-6 sm:p-8 rounded-[32px] sm:rounded-[48px]">
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">
                                    {t('dashboard.intelReport.title')}
                                </p>
                                <Trophy size={16} className="text-amber-500" />
                            </div>

                            <h4 className="text-2xl sm:text-4xl font-black italic tracking-tighter text-primary leading-none mb-2">
                                {rankInfo.currentKr}
                            </h4>
                            <p className="text-xs font-bold text-charcoal/40 uppercase mb-8">{rankInfo.current}</p>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">
                                        {t('dashboard.intelReport.nextObjective')}
                                    </span>
                                    <span className="text-2xl font-black italic">{Math.round(rankInfo.progress)}%</span>
                                </div>
                                <div className="w-full h-10 bg-secondary rounded-[20px] p-2 overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${rankInfo.progress}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-primary rounded-full relative"
                                    >
                                        <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-full mx-2 my-1 h-2" />
                                    </motion.div>
                                </div>
                                <p className="text-[10px] font-black text-center text-charcoal/20 uppercase tracking-tight italic">
                                    {t('dashboard.intelReport.collectMore', { count: rankInfo.nextThreshold - (profile.totalXp || 0) })}
                                </p>
                            </div>
                        </div>

                        {/* Mini Leaderboard */}
                        <div className="puffy-card p-6 sm:p-8 rounded-[32px] sm:rounded-[48px]">
                            <h4 className="text-xl font-black italic uppercase tracking-tight mb-8">
                                {t('dashboard.rankings.title')}
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { name: "Suji", xp: 1240, avatar: "S" },
                                    { name: profile.displayName || "You", xp: profile.totalXp || 0, avatar: profile.displayName?.[0] || "Y", isMe: true },
                                ].map((user) => (
                                    <div key={user.name} className={`flex items-center justify-between p-4 rounded-3xl ${user.isMe ? 'bg-strawberry/10 border-2 border-primary/20 shadow-md' : 'bg-secondary/30'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${user.isMe ? 'bg-primary text-white shadow-lg' : 'bg-white text-charcoal/20 shadow-inner'}`}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className={`text-xs font-black italic ${user.isMe ? 'text-primary' : 'text-charcoal'}`}>{user.name}</p>
                                                <p className="text-[8px] font-black text-charcoal/30 uppercase tracking-widest">
                                                    {t('dashboard.rankings.activeMember')}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black italic">{user.xp} XP</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
        .puffy-card:hover {
          box-shadow: 0 20px 50px -12px rgba(0,0,0,0.12);
          transform: translateY(-5px);
        }
      `}</style>
        </div>
    );
}

function StatBadge({ icon, value, color }: { icon: React.ReactNode, value: number | string, color: string }) {
    return (
        <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-5 py-1 sm:py-2.5 rounded-full border shadow-sm text-xs sm:text-base ${color}`}>
            <div className="animate-pulse">{icon}</div>
            <span className="font-black tracking-tight">{value}</span>
        </div>
    );
}

interface ActionCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    badge: string;
    color: string;
    locked?: boolean;
    href?: string;
}

function ActionCard({ title, desc, icon, badge, color, locked = false, href }: ActionCardProps) {
    const content = (
        <div className={`puffy-card p-6 sm:p-8 rounded-[32px] sm:rounded-[48px] flex flex-col group h-full transition-all ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary'}`}>
            <div className={`w-14 h-14 ${color}/20 rounded-[24px] flex items-center justify-center ${color.replace('bg-', 'text-')} mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                {icon}
            </div>
            <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">{title}</h4>
            <p className="text-sm font-medium text-charcoal/40 mb-8 leading-relaxed">{desc}</p>
            <div className="mt-auto flex items-center justify-between">
                <span className={`pill-badge ${color}/10 ${color.replace('bg-', 'text-')}`}>{badge}</span>
                {!locked && (
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-sm text-primary">
                        <ChevronRight size={18} />
                    </div>
                )}
            </div>
        </div>
    );

    if (locked || !href) return content;

    return (
        <Link href={href} className="block h-full">
            {content}
        </Link>
    );
}
