'use client';

import { motion } from 'framer-motion';
import { Trophy, Download, Share2, ChevronLeft } from 'lucide-react';
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
                    <ShareButton icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>} label="Story" bg="bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
                    <ShareButton icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>} label="Feed" bg="bg-[#1877F2]" />
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
