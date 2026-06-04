/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Download, Share2 } from 'lucide-react';

interface CertificateProps {
    userName: string;
    campTitle: string;
    date: string;
    score: number;
    tier: 'Gold' | 'Silver' | 'Bronze' | 'Legendary';
}

export function CertificateCard({ userName, campTitle, date, score, tier }: CertificateProps) {
    const [verificationId, setVerificationId] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVerificationId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    const tierColors = {
        Legendary: 'from-pink-50 via-amber-50 to-rose-100/50 text-charcoal border-rose-200/60 border-dashed border-4',
        Gold: 'from-amber-50 to-orange-50/70 text-charcoal border-amber-200/60 border-dashed border-4',
        Silver: 'from-sky-50 to-indigo-50/70 text-charcoal border-sky-200/60 border-dashed border-4',
        Bronze: 'from-emerald-50 to-teal-50/70 text-charcoal border-emerald-200/60 border-dashed border-4'
    };

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setIsDownloading(true);
        try {
            // Import html-to-image dynamically to prevent server-side compilation issues in Next.js
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(certificateRef.current, {
                pixelRatio: 2, // High resolution scale
                cacheBust: true,
            });

            const link = document.createElement('a');
            link.download = `TOPIK_Congratulations_${userName.replace(/\s+/g, '_')}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to download PNG certificate:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async () => {
        const shareText = `🎉 I completed the ${campTitle} final challenge on TOPIK BOOTCAMP with ${score}% accuracy! Join the next camp to improve your Korean vocabularies!`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'TOPIK BOOTCAMP Accomplishment',
                    text: shareText,
                    url: window.location.origin
                });
            } catch (err) {
                console.error('Sharing failed', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(`${shareText}\nCheck it out here: ${window.location.origin}`);
                alert('Share text copied to clipboard! You can paste and share it now.');
            } catch (err) {
                console.error('Failed to copy text:', err);
                alert('Failed to copy link. Please copy the URL manually.');
            }
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div 
                ref={certificateRef}
                className={`relative p-8 sm:p-12 rounded-[52px] bg-gradient-to-br ${tierColors[tier]} shadow-xl overflow-hidden`}
            >
                {/* Decorative background bubbles */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-strawberry/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-strawberry/3 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Cute Mascot Header */}
                    <div className="mb-6 transform hover:scale-105 transition-transform duration-300 select-none pointer-events-none">
                        <img 
                            src="/illustrations/mascot.png" 
                            alt="Mascot" 
                            className="w-24 h-24 object-contain animate-bounce" 
                            style={{ animationDuration: '3s' }}
                        />
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-primary">✦ MILESTONE ACCOMPLISHED ✦</p>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-1 text-primary drop-shadow-sm">CONGRATULATIONS!</h2>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-charcoal/60">TOPIK BOOTCAMP • {campTitle}</h3>

                    {/* Cute Dotted Divider */}
                    <div className="w-full border-t-2 border-dashed border-strawberry/20 mb-8" />

                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-charcoal/40">In recognition of the outstanding dedication of</p>
                    <h4 className="text-4xl font-noto-kr font-black italic mb-4 text-charcoal drop-shadow-sm select-all">{userName}</h4>
                    
                    {/* Bubbly Description with Accuracy Badge */}
                    <div className="max-w-md mx-auto text-sm sm:text-base font-bold text-charcoal/70 leading-relaxed mb-8 select-all">
                        Who has successfully completed the intensive 14-day vocabulary training program and demonstrated a strong command of core vocabulary with a final score of{' '}
                        <span className="inline-block bg-strawberry/15 border border-strawberry/25 text-primary font-black px-4 py-1 rounded-full scale-105 mx-1 shadow-sm select-none">
                            {score}%
                        </span>
                    </div>

                    {/* Sub labels in rounded pills */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full border-t border-strawberry/15 pt-8 mt-4 select-none">
                        <div className="flex flex-col gap-1 bg-white/60 backdrop-blur-sm border border-strawberry/5 p-3 rounded-2xl shadow-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">Date Issued</span>
                            <span className="text-xs font-black text-charcoal">{date}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 bg-white/60 backdrop-blur-sm border border-strawberry/5 p-3 rounded-2xl shadow-sm">
                            <div className="flex gap-0.5 text-amber-400">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-charcoal">{tier} GRADE</span>
                        </div>
                        <div className="flex flex-col gap-1 bg-white/60 backdrop-blur-sm border border-strawberry/5 p-3 rounded-2xl shadow-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">Verification ID</span>
                            <span className="text-[8px] font-mono font-bold text-charcoal/60 select-all">{verificationId}</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Soft Wax Seal */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-strawberry text-white rounded-full border-2 border-white/40 flex items-center justify-center rotate-12 shadow-md pointer-events-none select-none">
                    <ShieldCheck size={28} className="text-white" />
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-charcoal rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <Download size={16} className={isDownloading ? "animate-spin" : ""} />
                    {isDownloading ? "Downloading..." : "Download PNG"}
                </button>
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg cursor-pointer"
                >
                    <Share2 size={16} />
                    Share Result
                </button>
            </div>
        </motion.div>
    );
}
