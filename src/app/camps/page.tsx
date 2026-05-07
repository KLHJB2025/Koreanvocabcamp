'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { ChevronRight, Sword, BookOpen, Star, Lock, Loader2, Home, Crown, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

export default function CampsPage() {
    const { t, language } = useTranslation();
    const { profile, loading } = useAuth();
    const router = useRouter();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    if (!profile) {
        router.push('/login');
        return null;
    }

    const level = profile.level || 'beginner';
    const cycleCount = level === 'beginner' ? 19 : 29;
    const campCredits = profile.campCredits || 0;
    const unlockedCycles = profile.unlockedCycles || [];

    const handleSelectCycle = async (id: string, isLocked: boolean, isStarter: boolean) => {
        if (!profile.uid) return;
        const userRef = doc(db, 'users', profile.uid);

        if (isLocked) {
            if (campCredits > 0) {
                // Spend a credit
                await updateDoc(userRef, {
                    campCredits: increment(-1),
                    unlockedCycles: arrayUnion(id),
                    currentCycleId: id,
                    dayOfCamp: 1
                });
            } else {
                router.push('/pricing');
                return;
            }
        } else {
            // Already unlocked or starter
            await updateDoc(userRef, {
                currentCycleId: id,
                dayOfCamp: 1
            });
        }
        router.push('/dashboard');
    };

    const cycles = Array.from({ length: cycleCount }, (_, i) => {
        const id = `${level}_cycle_${i + 1}`;
        const isStarter = i === 0;
        const isUnlocked = unlockedCycles.includes(id) || isStarter || profile.role === 'admin';

        return {
            id,
            titleEn: `Camp #${i + 1}`,
            titleZh: `词汇训练营 #${i + 1}`,
            wordCount: i === cycleCount - 1 ? (level === 'beginner' ? 47 : 100) : 100,
            locked: !isUnlocked,
            isStarter
        };
    });

    return (
        <div className="min-h-screen bg-[#FEF9FA] pb-20">
            <header className="bg-white/80 backdrop-blur-md px-10 py-6 border-b border-strawberry/10 sticky top-0 z-20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-charcoal/40 hover:bg-strawberry/20 transition-all">
                        <Home size={18} />
                    </Link>
                    <h1 className="font-black text-2xl italic uppercase tracking-tighter text-primary leading-none">Mission Select</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-6 py-2 bg-charcoal text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        {campCredits} Credits
                    </div>
                    {!profile.role === 'admin' && (
                        <Link href="/pricing" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                            <Sparkles size={14} fill="currentColor" />
                            Buy Credits
                        </Link>
                    )}
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-10 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Training Base</h2>
                        <p className="text-charcoal/40 font-medium italic">Select your mission. Score 100% on the final exam to earn a free Voucher!</p>
                    </div>
                    <div className={`p-6 rounded-[32px] border-2 border-dashed flex items-center gap-6 ${campCredits > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-strawberry/20'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${campCredits > 0 ? 'bg-amber-100 text-amber-600' : 'bg-strawberry/5 text-primary'}`}>
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h4 className="font-black italic text-lg leading-none mb-1">{campCredits > 0 ? 'Elite Resources Ready' : 'Depleted Resources'}</h4>
                            <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest leading-none">
                                {campCredits} Voucher Transfers available
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cycles.map((cycle, i) => (
                        <motion.div
                            key={cycle.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => handleSelectCycle(cycle.id, cycle.locked, cycle.isStarter)}
                            className={`puffy-card p-8 group relative overflow-hidden transition-all duration-300 ${cycle.locked ? 'bg-secondary/20 grayscale-[1]' : 'cursor-pointer hover:border-primary active:scale-95'}`}
                        >
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shadow-inner ${cycle.locked ? 'bg-white text-charcoal/10' : 'bg-strawberry/10 text-primary group-hover:scale-110 transition-transform'}`}>
                                    {cycle.locked ? <Lock size={24} /> : <Sword size={24} />}
                                </div>
                                {cycle.isStarter && (
                                    <span className="pill-badge bg-emerald-50 text-emerald-600 border border-emerald-100">Starter</span>
                                )}
                                {!cycle.locked && !cycle.isStarter && (
                                    <span className="pill-badge bg-amber-50 text-amber-600 border border-amber-100">Deployed</span>
                                )}
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2">
                                    {language === 'zh' ? cycle.titleZh : cycle.titleEn}
                                </h3>
                                <p className="text-sm font-bold text-charcoal/40 uppercase mb-8">
                                    {cycle.wordCount} Words Total
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className={`pill-badge ${cycle.locked ? 'bg-charcoal text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                                        {cycle.locked ? (campCredits > 0 ? 'SPEND 1 CREDIT' : 'BUY CREDIT') : (profile.currentCycleId === cycle.id ? 'ACTIVE' : 'DEPLOYY AGAIN')}
                                    </span>
                                    {cycle.locked && campCredits > 0 && (
                                        <div className="flex items-center gap-1 text-amber-500 animate-pulse">
                                            <Star size={16} fill="currentColor" />
                                        </div>
                                    )}
                                    {!cycle.locked && <ChevronRight size={20} className="transition-transform text-primary group-hover:translate-x-2" />}
                                </div>
                            </div>

                            {/* Background Pattern */}
                            <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-primary">
                                <BookOpen size={120} />
                            </div>

                            {profile.currentCycleId === cycle.id && (
                                <div className="absolute top-0 right-0 left-0 h-2 bg-primary" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
