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

    // Color theme mappings to align strictly with the approved mockup design
    const themes = {
        Legendary: {
            outerBg: 'bg-[#FFF2F4]',
            cardBg: 'from-[#FFFDFD] via-[#FFF9FA] to-[#FFF0F2]',
            borderPink: 'border-[#FFB3C6]',
            dashedBorder: 'border-[#FFC2D1]',
            accentText: 'text-[#FF4E8D]',
            accentBg: 'bg-[#FF4E8D]',
            accentBorder: 'border-[#FFB3C6]',
            stampBg: 'bg-[#FFF0F2]',
            ribbonBg: 'bg-[#FF4E8D]'
        },
        Gold: {
            outerBg: 'bg-[#FFFDF3]',
            cardBg: 'from-[#FFFDF9] via-[#FFFBF0] to-[#FFF8E7]',
            borderPink: 'border-[#FFE3A8]',
            dashedBorder: 'border-[#FFE8B7]',
            accentText: 'text-[#E28A00]',
            accentBg: 'bg-[#FF9F00]',
            accentBorder: 'border-[#FFE3A8]',
            stampBg: 'bg-[#FFFDF0]',
            ribbonBg: 'bg-[#E28A00]'
        },
        Silver: {
            outerBg: 'bg-[#F5F8FF]',
            cardBg: 'from-[#FCFDFF] via-[#F6F9FF] to-[#EDF2FF]',
            borderPink: 'border-[#C3DAFF]',
            dashedBorder: 'border-[#D2E4FF]',
            accentText: 'text-[#3B82F6]',
            accentBg: 'bg-[#3B82F6]',
            accentBorder: 'border-[#C3DAFF]',
            stampBg: 'bg-[#F5F8FF]',
            ribbonBg: 'bg-[#3B82F6]'
        },
        Bronze: {
            outerBg: 'bg-[#F6FDF9]',
            cardBg: 'from-[#FDFEFF] via-[#F7FDFB] to-[#EEFBF4]',
            borderPink: 'border-[#A7F3D0]',
            dashedBorder: 'border-[#BDF7DC]',
            accentText: 'text-[#10B981]',
            accentBg: 'bg-[#10B981]',
            accentBorder: 'border-[#A7F3D0]',
            stampBg: 'bg-[#F6FDF9]',
            ribbonBg: 'bg-[#10B981]'
        }
    };

    const currentTheme = themes[tier] || themes.Legendary;

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setIsDownloading(true);
        try {
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
            className="w-full max-w-2xl mx-auto overflow-visible"
        >
            {/* The wrapper that will be captured as PNG. Padding ensures popping elements are NOT cut off. */}
            <div 
                ref={certificateRef}
                className={`relative pt-16 pb-12 px-8 ${currentTheme.outerBg} rounded-[56px] border-4 ${currentTheme.borderPink} max-w-2xl mx-auto overflow-visible select-none`}
            >
                {/* Main Card Frame with Solid Outline Border */}
                <div className={`relative p-2 bg-white rounded-[40px] border-8 ${currentTheme.borderPink} shadow-lg overflow-visible`}>
                    
                    {/* Cute Mascot popping from top-left */}
                    <div className="absolute -top-16 left-6 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white z-20 flex items-center justify-center animate-bounce-subtle">
                        <img 
                            src="/illustrations/mascot.png" 
                            alt="Mascot" 
                            className="w-full h-full object-cover scale-110"
                        />
                    </div>

                    {/* Serial/Verification badge on top right */}
                    <span className="absolute top-5 right-8 text-[10px] font-mono font-bold text-charcoal/40 tracking-wider">
                        Certificate #{verificationId}
                    </span>

                    {/* Inner Card Background with Gradient and Dashed Border */}
                    <div className={`p-8 sm:p-12 rounded-[30px] bg-gradient-to-br ${currentTheme.cardBg} border-4 ${currentTheme.dashedBorder} border-dashed flex flex-col items-center text-center relative overflow-hidden`}>
                        
                        {/* Inner frame helper outline */}
                        <div className={`absolute inset-1.5 border border-dashed ${currentTheme.dashedBorder} rounded-[22px] pointer-events-none opacity-40`} />

                        {/* Floating Sparkles & Cute Decals */}
                        <span className="absolute top-4 left-4 text-amber-400 animate-pulse text-lg">✦</span>
                        <span className="absolute top-4 right-4 text-amber-400 animate-pulse text-lg">✦</span>
                        <span className="absolute left-6 top-[28%] text-2xl text-amber-300 opacity-60">🌙</span>
                        <span className="absolute right-6 top-[28%] text-2xl text-rose-300 opacity-60">💖</span>
                        <span className="absolute left-6 bottom-[28%] text-lg text-amber-400 opacity-50">✦</span>
                        <span className="absolute right-6 bottom-[28%] text-lg text-amber-400 opacity-50">✦</span>

                        {/* Milestones label */}
                        <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-1.5 ${currentTheme.accentText}`}>
                            ✦ MILESTONE ACCOMPLISHED ✦
                        </p>
                        
                        {/* Major Congrats Header (Outlined bubbly text shadow) */}
                        <h2 
                            className="text-4xl sm:text-5xl font-black italic tracking-tight text-[#FF4E8D] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(255,78,141,0.15)]"
                            style={{ textShadow: '2.5px 2.5px 0px #FFF, -2.5px -2.5px 0px #FFF, 2.5px -2.5px 0px #FFF, -2.5px 2.5px 0px #FFF, 3.5px 3.5px 0px #FFCCD5' }}
                        >
                            CONGRATULATIONS!
                        </h2>

                        {/* Korean styled bubble sub-heading */}
                        <h3 
                            className={`text-xl sm:text-2xl font-black ${currentTheme.accentText} tracking-wide mb-6`}
                            style={{ textShadow: '1.5px 1.5px 0px #FFF, -1.5px -1.5px 0px #FFF, 1.5px -1.5px 0px #FFF, -1.5px 1.5px 0px #FFF, 2.5px 2.5px 0px #E5E7EB' }}
                        >
                            토픽 부트캠프
                        </h3>

                        {/* Cloud Container for Recipient Name */}
                        <div className="relative w-full max-w-md my-4 px-8 py-6 bg-white/95 border-4 border-dashed border-[#FFC2D1] rounded-[32px] shadow-sm flex flex-col items-center justify-center">
                            
                            {/* Floating hearts on borders */}
                            <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-2xl animate-pulse">❤️</span>
                            <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>❤️</span>

                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 mb-2">
                                In recognition of the outstanding dedication of
                            </span>

                            <h4 
                                className="text-3xl sm:text-4xl font-serif font-black text-charcoal tracking-wide select-all"
                                style={{ textShadow: '1.5px 1.5px 0px #FFF, -1.5px -1.5px 0px #FFF, 1.5px -1.5px 0px #FFF, -1.5px 1.5px 0px #FFF' }}
                            >
                                {userName}
                            </h4>
                        </div>

                        {/* Descriptive narrative */}
                        <p className="text-xs sm:text-sm font-bold text-charcoal/60 leading-relaxed max-w-md mx-auto my-4 select-all">
                            🎉 Who has successfully completed the intensive 14-day vocabulary training program on <span className="text-charcoal font-black">{campTitle}</span> and demonstrated a strong command of core vocabulary! 🎉
                        </p>

                        {/* Signatures, Grade Stars, and Stamp */}
                        <div className="grid grid-cols-3 gap-4 w-full border-t border-dashed border-[#FFC2D1] pt-6 mt-4 items-center">
                            
                            {/* Left Signature column */}
                            <div className="flex flex-col items-center">
                                <span className="font-serif italic text-base text-charcoal/80">TOPIK Bootcamp</span>
                                <div className="w-20 border-b border-charcoal/20 my-1" />
                                <span className="text-[9px] uppercase font-black text-charcoal/30 tracking-wider">Date: {date}</span>
                            </div>

                            {/* Middle Grade Stars column */}
                            <div className="flex flex-col items-center justify-center gap-1">
                                <div className="flex items-center justify-center gap-1">
                                    <Star size={14} fill="#FBBF24" className="text-amber-400 drop-shadow-sm animate-pulse" />
                                    <Star size={18} fill="#FBBF24" className="text-amber-400 drop-shadow-sm animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <Star size={14} fill="#FBBF24" className="text-amber-400 drop-shadow-sm animate-pulse" style={{ animationDelay: '0.4s' }} />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#FF4E8D]">{tier} Grade</span>
                            </div>

                            {/* Right Stamp column */}
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full border-4 border-double border-[#FF8EA9] bg-[#FFFDF2] flex flex-col items-center justify-center text-[#FF4E8D] rotate-12 shadow-md relative scale-105">
                                    {/* Inner dashed circle */}
                                    <div className="absolute inset-1 rounded-full border border-dashed border-[#FFC2D1]" />
                                    <span className="text-[7px] font-black tracking-widest uppercase text-charcoal/40 z-10">BOOTCAMP</span>
                                    <span className="text-xs font-black tracking-wide text-[#FF4E8D] z-10" style={{ textShadow: '1px 1px 0px #FFF' }}>AMAZING!</span>
                                    <span className="text-[6px] font-mono font-bold text-charcoal/50 z-10">{verificationId}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Score Badge (overlapping inner frame) */}
                        <div className="relative mt-8 -mb-4 bg-gradient-to-br from-[#FF8EA9] to-[#FF4E8D] text-white rounded-[24px] px-8 py-3 shadow-lg flex flex-col items-center justify-center border-4 border-white select-none z-10">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#FFF0F3] mb-0.5">FINAL ACCURACY SCORE</span>
                            <span className="text-2xl font-black italic tracking-wide text-white drop-shadow-sm">{score}%</span>
                        </div>

                    </div>

                    {/* Ribbon tags at bottom corners */}
                    <div className="absolute -bottom-3.5 left-6 sm:left-12 bg-[#FF4E8D] text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md rotate-[-3deg] border border-white z-10">
                        CONGRATULATIONS!
                    </div>
                    <div className="absolute -bottom-3.5 right-6 sm:right-12 bg-[#FF4E8D] text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md rotate-[3deg] border border-white z-10">
                        수고하셨습니다!
                    </div>

                </div>
            </div>

            {/* User Interaction Action Buttons */}
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
