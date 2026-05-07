'use client';

import { motion } from 'framer-motion';
import { Award, Star, ShieldCheck, Download, Share2 } from 'lucide-react';

interface CertificateProps {
    userName: string;
    campTitle: string;
    date: string;
    score: number;
    tier: 'Gold' | 'Silver' | 'Bronze' | 'Legendary';
}

export function CertificateCard({ userName, campTitle, date, score, tier }: CertificateProps) {
    const tierColors = {
        Legendary: 'from-amber-400 to-orange-500 text-white border-amber-200',
        Gold: 'from-slate to-charcoal text-white border-slate/20',
        Silver: 'from-blue-400 to-blue-600 text-white border-blue-200',
        Bronze: 'from-emerald-400 to-emerald-600 text-white border-emerald-200'
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className={`relative p-12 rounded-[60px] bg-gradient-to-br ${tierColors[tier]} shadow-2xl overflow-hidden border-8 border-white/20`}>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-white/30">
                        <Award size={48} className="text-white" />
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-60">Completion Excellence</p>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">TOPIK BOOTCAMP</h2>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-12 opacity-80">{campTitle}</h3>

                    <div className="w-full h-[1px] bg-white/20 mb-12" />

                    <p className="text-sm font-medium uppercase tracking-[0.2em] mb-4 opacity-60">This certifies that</p>
                    <h4 className="text-5xl font-noto-kr font-black italic mb-4 drop-shadow-lg">{userName}</h4>
                    <p className="text-lg font-medium opacity-80 mb-12">Has successfully triumphed in the Day 15 Boss Battle<br />with a combat accuracy of <span className="font-black underline">{score}%</span></p>

                    <div className="grid grid-cols-3 gap-8 w-full border-t border-white/10 pt-12">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Date Issued</span>
                            <span className="text-xs font-bold">{date}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex gap-1 text-amber-300">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">{tier} GRADE</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Verification ID</span>
                            <span className="text-[8px] font-mono opacity-60">{Math.random().toString(36).substring(7).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                {/* Seal */}
                <div className="absolute top-12 right-12 w-20 h-20 bg-white/10 rounded-full border border-white/20 flex items-center justify-center rotate-12 backdrop-blur-sm">
                    <ShieldCheck size={32} className="text-white opacity-40" />
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-charcoal rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    <Download size={16} />
                    Download PNG
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    <Share2 size={16} />
                    Share Result
                </button>
            </div>
        </motion.div>
    );
}
