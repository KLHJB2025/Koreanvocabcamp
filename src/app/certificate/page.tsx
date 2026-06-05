'use client';

import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import { CertificateCard } from '@/components/rewards/CertificateCard';
import { ChevronLeft, Loader2, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

function CertificateContent() {
    const { profile, loading: authLoading } = useAuth();
    const { language } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryUid = searchParams.get('uid');

    const [targetProfile, setTargetProfile] = useState<any>(null);
    const [fetchingProfile, setFetchingProfile] = useState(false);
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    useEffect(() => {
        if (queryUid) {
            setFetchingProfile(true);
            const docRef = doc(db, 'users', queryUid);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setTargetProfile(docSnap.data());
                }
                setFetchingProfile(false);
                setHasAttemptedFetch(true);
            }).catch((err) => {
                console.error('Failed to fetch user certificate profile:', err);
                setFetchingProfile(false);
                setHasAttemptedFetch(true);
            });
        } else {
            setTargetProfile(null);
            setHasAttemptedFetch(false);
        }
    }, [queryUid]);

    if (authLoading || (queryUid && fetchingProfile)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    // Determine whose profile we are showing
    const activeProfile = queryUid ? targetProfile : profile;
    const isSelf = !queryUid || (profile && queryUid === profile.uid);

    if (queryUid && !targetProfile && hasAttemptedFetch) {
        return (
            <div className="min-h-screen bg-[#FEF9FA] p-8 flex flex-col items-center justify-center text-center">
                <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl border border-strawberry/10 flex flex-col items-center animate-fade-in">
                    <div className="w-20 h-20 bg-strawberry/10 rounded-full flex items-center justify-center text-primary mb-6">
                        <Award size={40} className="opacity-50" />
                    </div>
                    <h2 className="text-2xl font-black italic text-charcoal mb-4 uppercase">Certificate Not Found</h2>
                    <p className="text-sm font-bold text-charcoal/50 leading-relaxed mb-8">
                        {language === 'zh'
                            ? '抱歉，未找到此链接对应的荣誉奖状。可能链接有误或者该学员还没有通关挑战哦！'
                            : 'Apologies, we could not find an accomplishment card for this link. It might be invalid or the student hasn\'t completed the challenge yet!'}
                    </p>
                    <Link href="/dashboard" className="btn-primary-cute w-full py-4 text-center">
                        {language === 'zh' ? '前往控制台' : 'Back to Dashboard'}
                    </Link>
                </div>
            </div>
        );
    }

    if (!activeProfile) {
        // If not logged in and no queryUid is provided
        router.push('/login');
        return null;
    }

    const hasCompletedAny = activeProfile.completedCycles && activeProfile.completedCycles.length > 0;

    if (!hasCompletedAny) {
        return (
            <div className="min-h-screen bg-[#FEF9FA] p-8 flex flex-col items-center justify-center text-center">
                <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl border border-strawberry/10 flex flex-col items-center animate-fade-in">
                    <div className="w-20 h-20 bg-strawberry/10 rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
                        <Award size={40} />
                    </div>
                    <h2 className="text-2xl font-black italic text-charcoal mb-4 uppercase">
                        {isSelf ? 'No Awards Earned Yet' : 'No Awards Earned Yet'}
                    </h2>
                    <p className="text-sm font-bold text-charcoal/50 leading-relaxed mb-8">
                        {isSelf ? (
                            language === 'zh'
                                ? '你需要先在最终决斗（Boss Battle）中拿到 60% 以上的正确率通关，才能获得属于你的荣誉奖状哦！继续加油吧！'
                                : 'You need to complete a camp with at least 60% accuracy in the Boss Battle first to earn your accomplishment card! Keep pushing!'
                        ) : (
                            language === 'zh'
                                ? '该学员尚未通过任何韩语词汇挑战营，因此暂无荣誉奖状。'
                                : 'This student has not completed any Korean vocabulary camps yet, so there is no certificate available.'
                        )}
                    </p>
                    <Link href={profile ? "/dashboard" : "/login"} className="btn-primary-cute w-full py-4 text-center">
                        {profile 
                            ? (language === 'zh' ? '前往控制台' : 'Back to Dashboard')
                            : (language === 'zh' ? '前往登录 / 加入特训营' : 'Log In / Join Bootcamp')}
                    </Link>
                </div>
            </div>
        );
    }

    // Determine active completed cycle to view
    const completedCycles = activeProfile.completedCycles || [];
    const activeCycle = completedCycles[completedCycles.length - 1] || 'beginner_cycle_1';
    
    // Get the score for that completed cycle
    const score = activeProfile.challengeScores?.[activeCycle] || 100;
    const tier = score === 100 ? 'Legendary' : score >= 90 ? 'Gold' : score >= 80 ? 'Silver' : 'Bronze';

    return (
        <div className="min-h-screen bg-[#FEF9FA] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-x-hidden select-none pb-16">
            {/* Soft decorative background circles */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-strawberry/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/5 rounded-full blur-[120px]" />

            <nav className="w-full max-w-2xl flex items-center justify-between mb-8 sm:mb-12 relative z-10">
                <Link 
                    href={profile ? "/dashboard" : "/login"} 
                    className="flex items-center gap-2 text-charcoal/50 hover:text-primary font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
                >
                    <ChevronLeft size={16} />
                    {profile 
                        ? (language === 'zh' ? '返回控制台' : 'Back to Dashboard')
                        : (language === 'zh' ? '前往登录 / 开启我的词汇营' : 'Log In / Start My Camp')}
                </Link>
                
                {!isSelf && (
                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1.5 shadow-sm">
                        <Sparkles size={12} className="animate-pulse" />
                        {language === 'zh' ? '学员分享的奖状' : "SHARED ACHIEVEMENT"}
                    </span>
                )}
            </nav>

            <div className="w-full max-w-2xl relative z-10">
                <CertificateCard
                    userName={activeProfile.displayName || 'Alpha Agent'}
                    campTitle={activeCycle.replace(/_/g, ' ').toUpperCase()}
                    date={new Date(activeProfile.lastCompletedDate || Date.now()).toLocaleDateString()}
                    score={score}
                    tier={tier as any}
                    uid={activeProfile.uid}
                />

                {!isSelf && (
                    <div className="max-w-md mx-auto mt-12 text-center px-4">
                        <Link 
                            href={profile ? "/dashboard" : "/register"}
                            className="btn-primary-cute w-full py-4 text-center bg-gradient-to-r from-amber-400 via-strawberry to-rose-500 hover:from-amber-400 hover:to-rose-500 border-none text-white shadow-xl flex items-center justify-center gap-3 animate-bounce-subtle"
                        >
                            <Sparkles size={20} className="text-white" />
                            <span className="text-sm font-black uppercase tracking-wider">
                                {language === 'zh' ? '我也要加入特训，赢取专属奖状！🏆' : 'Join Bootcamp & Earn Your Award! 🏆'}
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CertificatePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FEFAFB]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        }>
            <CertificateContent />
        </Suspense>
    );
}
