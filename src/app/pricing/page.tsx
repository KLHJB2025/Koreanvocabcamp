'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Crown, Zap, Shield, Loader2, Home, Package, Layers, Gift, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
    const { profile } = useAuth();
    const { language } = useTranslation();
    const [loading, setLoading] = useState<string | null>(null);
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isVoucherApplied, setIsVoucherApplied] = useState(false);
    const router = useRouter();

    const handleApplyVoucher = () => {
        // Basic simulation of RM10 discount for testing
        if (voucherCode.toUpperCase() === 'TOPIK100' || voucherCode.toUpperCase() === 'BOSS10') {
            setDiscount(10);
            setIsVoucherApplied(true);
        } else {
            alert(language === 'zh' ? '无效的代码' : 'Invalid Voucher Code');
        }
    };

    const handlePurchase = async (credits: number, id: string, basePrice: number) => {
        if (!profile?.uid) return;
        setLoading(id);
        try {
            const userRef = doc(db, 'users', profile.uid);
            await updateDoc(userRef, {
                campCredits: increment(credits)
            });
            router.push('/camps');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(null);
        }
    };

    const bundles = [
        {
            id: 'single',
            name: 'Single Camp',
            credits: 1,
            price: 99,
            desc: '14 Days of intensive training. Perfect for testing your limits.',
            icon: <Zap size={24} className="text-strawberry" />,
            color: 'border-strawberry/10'
        },
        {
            id: 'squad',
            name: '3-Camp Bundle',
            credits: 3,
            price: 270,
            desc: 'Master 300 words. (RM 90 per camp)',
            icon: <Package size={24} className="text-emerald-500" />,
            color: 'border-emerald-100',
            tag: 'Save RM 27'
        },
        {
            id: 'platoon',
            name: '5-Camp Bundle',
            credits: 5,
            price: 400,
            desc: 'Master 500 words. (RM 80 per camp)',
            icon: <Layers size={24} className="text-primary" />,
            color: 'border-primary/20',
            tag: 'Best Value'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FEF9FA] pb-20">
            <header className="max-w-6xl mx-auto px-10 py-10 flex justify-between items-center">
                <Link href="/dashboard" className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-strawberry/10 flex items-center justify-center hover:scale-105 transition-all">
                    <Home size={20} />
                </Link>
                <div className="px-6 py-2 bg-charcoal text-white rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                    <Shield size={14} className="text-primary" />
                    Voucher Enabled Terminal
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-10 py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 rounded-full text-rose-600 font-black text-[10px] uppercase tracking-widest mb-6">
                        100% Score Reward: RM 10 Voucher
                    </div>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">Prepare for Deployment</h1>
                    <p className="text-xl text-charcoal/40 font-medium max-w-2xl mx-auto italic leading-relaxed">
                        Choose your mission scale. Earn vouchers in the **BOSS BATTLE** to save on your next deployment.
                    </p>
                </motion.div>

                {/* Voucher Section */}
                <div className="max-w-md mx-auto mb-16 p-6 puffy-card bg-white border-2 border-dashed border-strawberry/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Ticket size={20} className="text-primary" />
                        <h4 className="font-black italic uppercase text-sm">Have a Voucher?</h4>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder="PRO100..."
                            className="flex-1 px-4 py-3 bg-secondary rounded-2xl font-bold uppercase placeholder:text-charcoal/20 outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                            onClick={handleApplyVoucher}
                            className="px-6 py-3 bg-charcoal text-white rounded-2xl font-black text-xs uppercase"
                        >
                            Apply
                        </button>
                    </div>
                    {isVoucherApplied && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1 justify-center"
                        >
                            <Check size={14} /> Voucher Applied: -RM {discount}
                        </motion.p>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {bundles.map((bundle) => {
                        const finalPrice = Math.max(0, bundle.price - discount);

                        return (
                            <motion.div
                                key={bundle.id}
                                whileHover={{ y: -5 }}
                                className={`puffy-card p-10 flex flex-col text-left border-2 ${bundle.color} relative overflow-hidden`}
                            >
                                {bundle.tag && (
                                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-charcoal text-white font-black uppercase text-[9px] rounded-bl-2xl italic tracking-widest">
                                        {bundle.tag}
                                    </div>
                                )}

                                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    {bundle.icon}
                                </div>

                                <h3 className="text-2xl font-black mb-1 uppercase italic tracking-tight">{bundle.name}</h3>
                                <p className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest mb-6">Master {bundle.credits * 100} Words Total</p>

                                <div className="flex items-baseline gap-2 mb-8">
                                    <div className="text-4xl font-black italic tracking-tighter">
                                        RM {finalPrice}
                                    </div>
                                    {isVoucherApplied && (
                                        <div className="text-lg font-bold text-charcoal/20 line-through">RM {bundle.price}</div>
                                    )}
                                </div>

                                <p className="text-sm font-bold text-charcoal/40 mb-12 italic leading-relaxed">{bundle.desc}</p>

                                <button
                                    onClick={() => handlePurchase(bundle.credits, bundle.id, bundle.price)}
                                    disabled={loading !== null}
                                    className={`btn-primary-cute w-full flex items-center justify-center gap-2 ${bundle.id === 'platoon' ? 'bg-primary' : 'btn-secondary-cute bg-white text-charcoal'}`}
                                >
                                    {loading === bundle.id ? <Loader2 className="animate-spin" /> : <CreditCard size={18} />}
                                    {loading === bundle.id ? 'Loading...' : `Deploy ${bundle.credits} ${bundle.credits === 1 ? 'Camp' : 'Camps'}`}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-20 p-10 bg-white rounded-[40px] border border-strawberry/10 shadow-sm max-w-2xl mx-auto flex items-center gap-8 text-left">
                    <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center text-rose-500 shadow-inner rotate-3 shrink-0">
                        <Zap size={48} fill="currentColor" strokeWidth={3} />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tight">The Final Breath Challenge</h4>
                        <p className="text-charcoal/40 font-medium italic">
                            Day 15 is not a test—it&apos;s a battle. Answer 30 random words correctly.
                            Score <span className="text-rose-500 font-bold underline">100%</span> to receive your **RM 10 Voucher** via encrypted signal instantly.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CreditCard({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="4" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    );
}
