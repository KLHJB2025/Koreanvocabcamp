'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Trophy, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface MissionNodeProps {
    day: number;
    status: 'locked' | 'current' | 'completed';
    titleEn: string;
    titleZh: string;
}

function MissionNode({ day, status, titleEn, titleZh }: MissionNodeProps) {
    const { t, language } = useTranslation();
    const isLocked = status === 'locked';
    const isCurrent = status === 'current';
    const isCompleted = status === 'completed';

    return (
        <div className="flex flex-col items-center">
            <motion.div
                whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
                className={`relative w-24 h-24 rounded-[32px] flex items-center justify-center transition-all shadow-xl ${isCompleted ? 'bg-mint text-white border-b-4 border-black/5' :
                        isCurrent ? 'bg-primary text-white ring-8 ring-primary/10 border-b-4 border-black/10' :
                            'bg-white text-charcoal/10 border-2 border-dashed border-strawberry/20'
                    }`}
            >
                <span className={`text-3xl font-black ${isCompleted ? 'text-emerald-500' : isCurrent ? 'text-white' : 'text-charcoal/10'}`}>
                    {day}
                </span>

                {isCompleted && (
                    <div className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg border-2 border-emerald-50 text-emerald-500">
                        <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                    </div>
                )}

                {isLocked && (
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                        <Lock size={20} className="text-strawberry/20" />
                    </div>
                )}

                {isCurrent && (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute -top-2 -left-2 bg-amber-400 p-1.5 rounded-full text-white shadow-lg"
                    >
                        <Star size={14} fill="currentColor" />
                    </motion.div>
                )}
            </motion.div>

            <div className="mt-6 text-center">
                <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${isCurrent ? 'text-primary' : 'text-charcoal/20'}`}>
                    {t('dashboard.roadmap.missionLabel', { day })}
                </p>
                <p className={`text-sm font-black italic tracking-tighter ${isLocked ? 'text-charcoal/10' : 'text-charcoal/70'}`}>
                    {language === 'en' ? titleEn : titleZh}
                </p>
            </div>
        </div>
    );
}

export function MissionRoadmap({ currentDay }: { currentDay: number, language: 'en' | 'zh' }) {
    const { t } = useTranslation();
    const missions = [
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

    return (
        <div className="relative w-full overflow-x-auto pb-12 custom-scrollbar">
            <div className="flex items-start gap-16 px-12 min-w-max h-56 pt-8">
                {missions.map((m, i) => {
                    const day = i + 1;
                    const status = day < currentDay ? 'completed' : day === currentDay ? 'current' : 'locked';

                    return (
                        <div key={day} className="relative flex items-center gap-16">
                            <MissionNode
                                day={day}
                                status={status}
                                titleEn={m.en}
                                titleZh={m.zh}
                            />

                            {i < missions.length - 1 && (
                                <div className={`mt-12 w-16 h-1.5 rounded-full ${day < currentDay ? 'bg-mint/40' : 'bg-strawberry/5'}`} />
                            )}
                        </div>
                    );
                })}

                {/* Boss Battle Node */}
                <div className="relative flex flex-col items-center">
                    <div className="relative w-28 h-28 rounded-[40px] bg-charcoal text-white flex items-center justify-center shadow-2xl border-4 border-amber-400 group cursor-pointer hover:scale-105 transition-transform overflow-hidden">
                        <Trophy size={48} className="group-hover:rotate-12 transition-transform text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 italic">
                            {t('dashboard.roadmap.bossArena')}
                        </p>
                        <p className="text-sm font-black text-charcoal/30 italic">
                            {t('dashboard.roadmap.clearDay15')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
