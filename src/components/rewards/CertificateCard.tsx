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

    // Fully opaque pastel colors to prevent dark background bleed-through
    const tierColors = {
        Legendary: 'from-[#FFF0F3] via-[#FFFDF5] to-[#FFE5EC] border-[#FFC2D1]',
        Gold: 'from-[#FFFDF0] via-[#FFFDF9] to-[#FFEFE5] border-[#FFE3A8]',
        Silver: 'from-[#F0F7FF] via-[#FFFDF9] to-[#EBF0FF] border-[#C3DAFF]',
        Bronze: 'from-[#F0FDF4] via-[#FFFDF9] to-[#ECFDF5] border-[#A7F3D0]'
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
            {/* Outer card shell with solid thick border & shadow */}
            <div 
                ref={certificateRef}
                className={`relative p-2 rounded-[48px] bg-white border-8 ${tier === 'Legendary' ? 'border-[#FFC2D1]' : 'border-white'} shadow-2xl overflow-hidden`}
            >
                {/* Inner card with gradient background and dashed line border */}
                <div className={`p-8 sm:p-12 rounded-[38px] bg-gradient-to-br ${tierColors[tier]} border-4 border-dashed flex flex-col items-center text-center relative`}>
                    
                    {/* Decorative background bubbles */}
                    <div className="absolute top-10 left-10 w-24 h-24 bg-strawberry/5 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/10 rounded-full blur-xl pointer-events-none" />

                    {/* Cute Mascot Circular Avatar Frame */}
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white mb-6 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                        <img 
                            src="/illustrations/mascot.png" 
                            alt="Mascot" 
                            className="w-full h-full object-cover scale-110"
                        />
                    </div>

                    {/* Header Wording */}
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-[#FF4E8D]">✦ MILESTONE ACCOMPLISHED ✦</p>
                    <h2 
                        className="text-4xl sm:text-5xl font-black italic tracking-tight uppercase mb-2 text-primary drop-shadow-[0_2px_4px_rgba(255,78,141,0.15)]"
                        style={{ textShadow: '1px 1px 0px #FFF' }}
                    >
                        CONGRATULATIONS!
                    </h2>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 text-charcoal/50">TOPIK BOOTCAMP • {campTitle}</h3>

                    {/* Dotted Divider */}
                    <div className="w-full border-t border-dashed border-[#FFC2D1] mb-6" />

                    {/* Recipient Section */}
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-charcoal/30">In recognition of the outstanding dedication of</p>
                    <h4 className="text-4xl sm:text-5xl font-serif font-black text-charcoal mb-4 tracking-tight select-all">
                        {userName}
                    </h4>
                    
                    {/* Bubbly Description with Accuracy Badge */}
                    <div className="max-w-md mx-auto text-xs sm:text-sm font-bold text-charcoal/60 leading-relaxed mb-6 select-all">
                        Who has successfully completed the intensive 14-day vocabulary training program and demonstrated a strong command of core vocabulary with a final score of{' '}
                        <span className="inline-block bg-[#FF4E8D] text-white font-black px-4 py-1 rounded-full scale-105 mx-1 shadow-md shadow-[#FF4E8D]/20 select-none">
                            {score}%
                        </span>
                    </div>

                    {/* Sub labels in rounded pills */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full border-t border-dashed border-[#FFC2D1] pt-6 mt-2 select-none">
                        <div className="flex flex-col gap-1 bg-white/70 backdrop-blur-sm border border-strawberry/10 p-2.5 rounded-2xl shadow-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">Date Issued</span>
                            <span className="text-xs font-black text-charcoal">{date}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 bg-white/70 backdrop-blur-sm border border-strawberry/10 p-2.5 rounded-2xl shadow-sm">
                            <div className="flex gap-0.5 text-amber-400">
                                <Star size={8} fill="currentColor" />
                                <Star size={8} fill="currentColor" />
                                <Star size={8} fill="currentColor" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-charcoal">{tier} GRADE</span>
                        </div>
                        <div className="flex flex-col gap-1 bg-white/70 backdrop-blur-sm border border-strawberry/10 p-2.5 rounded-2xl shadow-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/30">Verification ID</span>
                            <span className="text-[8px] font-mono font-bold text-charcoal/50 select-all">{verificationId}</span>
                        </div>
                    </div>

                    {/* Decorative Soft Wax Seal */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-[#FF8EA9] text-white rounded-full border-4 border-white flex items-center justify-center rotate-12 shadow-lg shadow-primary/20 pointer-events-none select-none">
                        <ShieldCheck size={28} className="text-white drop-shadow" />
                    </div>

                </div>
            </div>

            {/* Buttons */}
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
