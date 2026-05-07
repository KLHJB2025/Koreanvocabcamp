'use client';

import { motion } from 'framer-motion';
import { Trophy, Download, Share2, Instagram, Facebook, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export default function CertificatePage() {
    const { t, language } = useTranslation();

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-8 flex flex-col items-center">
            <nav className="w-full max-w-4xl flex items-center justify-between mb-12">
                <Link href="/dashboard" className="flex items-center gap-2 text-foreground/40 hover:text-primary font-bold transition-colors">
                    <ChevronLeft size={20} />
                    Back to Basecamp
                </Link>
                <div className="flex gap-4">
                    <button className="p-3 bg-white rounded-2xl shadow-sm border border-border text-foreground/60 hover:text-primary">
                        <Download size={20} />
                    </button>
                    <button className="p-3 bg-white rounded-2xl shadow-sm border border-border text-foreground/60 hover:text-primary">
                        <Share2 size={20} />
                    </button>
                </div>
            </nav>

            {/* The Certificate - Designed to be shared */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl bg-white aspect-[4/5] md:aspect-[5/7] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col p-12 border-8 border-primary/5"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center h-full">
                    <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mb-12 shadow-xl shadow-primary/20 transform -rotate-6">
                        <Trophy size={40} />
                    </div>

                    <span className="text-secondary-foreground font-bold tracking-[0.2em] uppercase text-sm mb-4">
                        {language === 'zh' ? '结业证书' : 'Certificate of Completion'}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-br from-slate to-primary bg-clip-text text-transparent">
                        TOPIK Vocabulary Bootcamp
                    </h1>

                    <div className="w-16 h-1 bg-primary/20 rounded-full mb-12" />

                    <p className="text-foreground/40 font-medium mb-2 uppercase tracking-widest text-xs">This is to certify that</p>
                    <h2 className="text-3xl font-bold font-noto-kr mb-12 italic border-b-2 border-border/50 px-8 pb-2">
                        Alex J. Kim
                    </h2>

                    <p className="max-w-md text-center text-lg text-foreground/60 leading-relaxed mb-12">
                        Successfully cleared the 14-day intensive Korean vocabulary camp and achieved the rank of
                        <span className="text-primary font-bold block mt-2 text-2xl">
                            {t('learning.ranks.8')}
                        </span>
                    </p>

                    <div className="mt-auto flex justify-between w-full items-end">
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest mb-1">Date</p>
                            <p className="font-bold text-slate">May 7, 2026</p>
                        </div>

                        {/* QR Code Placeholder */}
                        <div className="w-20 h-20 bg-slate/5 rounded-2xl border border-slate/10 p-2 opacity-50">
                            <div className="w-full h-full bg-slate/10 rounded-lg" />
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest mb-1">Verify at</p>
                            <p className="font-bold text-primary">topik.bootcamp</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="mt-12 w-full max-w-2xl">
                <h3 className="text-center font-bold text-foreground/40 uppercase tracking-widest text-xs mb-6">Instantly Share Your Success</h3>
                <div className="flex justify-center gap-6">
                    <ShareButton icon={<Instagram />} label="Story" bg="bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
                    <ShareButton icon={<Facebook />} label="Feed" bg="bg-[#1877F2]" />
                </div>
            </div>
        </div>
    );
}

function ShareButton({ icon, label, bg }: { icon: React.ReactNode, label: string, bg: string }) {
    return (
        <button className="flex items-center gap-3 bg-white px-6 py-4 rounded-[24px] shadow-sm border border-border hover:shadow-md transition-all group">
            <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white p-1.5`}>
                {icon}
            </div>
            <span className="font-bold text-foreground/70 group-hover:text-primary transition-colors">{label}</span>
        </button>
    );
}
