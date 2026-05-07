'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Trophy, Shield, Rocket } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export default function PricingPage() {
    const { t, language } = useTranslation();

    return (
        <div className="min-h-screen bg-background py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20"
                    >
                        <Rocket size={16} />
                        <span>Scale your Korean Skills</span>
                    </motion.div>
                    <h1 className="text-5xl font-extrabold mb-6">Choose Your Training Pass</h1>
                    <p className="text-xl text-foreground/40 max-w-2xl mx-auto">
                        From casual learners to TOPIK legends. Select the pass that fits your goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Free Tier */}
                    <PricingCard
                        title="Survivor"
                        price="0"
                        desc="Personal learning journey"
                        features={[
                            "5 Vocabulary words / day",
                            "Basic SRS tracking",
                            "Community Leaderboard",
                            "Mobile Access"
                        ]}
                        btnText="Start for Free"
                        href="/signup"
                    />

                    {/* Pro Tier (Recommended) */}
                    <PricingCard
                        title="Challenger"
                        price="19"
                        desc="Full 14-day bootcamp experience"
                        popular
                        features={[
                            "Unlimited daily vocabulary",
                            "Advanced SRS Analytics",
                            "Custom Study Missions",
                            "Official Completion Certificate",
                            "Streak Recovery (1 / week)",
                            "Priority Support"
                        ]}
                        btnText="Join the Bootcamp"
                        href="/signup?tier=pro"
                    />

                    {/* Enterprise Tier */}
                    <PricingCard
                        title="Legend"
                        price="49"
                        desc="Lifetime access & premium content"
                        features={[
                            "Lifetime Access to all Camps",
                            "AI Personalized Examples",
                            "Exclusive TOPIK Legend Badge",
                            "Private Discord Community",
                            "Direct Q&A with Tutors",
                            "Physical Sticker Pack (Optional)"
                        ]}
                        btnText="Become a Legend"
                        href="/signup?tier=legend"
                    />
                </div>

                <div className="mt-20 text-center">
                    <p className="text-foreground/40 text-sm mb-8 italic">All passes include lifetime access to your learned vocabulary.</p>
                    <div className="flex justify-center gap-12 opacity-30 grayscale">
                        <span className="font-bold text-2xl tracking-tighter uppercase italic">Korean Global</span>
                        <span className="font-bold text-2xl tracking-tighter uppercase italic">EduTech Inc</span>
                        <span className="font-bold text-2xl tracking-tighter uppercase italic">TOPIK Academy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, desc, features, btnText, href, popular = false }: any) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`relative p-10 rounded-[40px] border-2 transition-all flex flex-col h-full bg-white ${popular ? 'border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5' : 'border-border'
                }`}
        >
            {popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                    <Zap size={14} fill="currentColor" />
                    MOST POPULAR
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-foreground/40 font-medium text-sm">{desc}</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold">${price}</span>
                <span className="text-foreground/40 font-bold">/one-time</span>
            </div>

            <div className="space-y-4 mb-10 flex-1">
                {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground/40'}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-foreground/70 font-medium text-sm">{f}</span>
                    </div>
                ))}
            </div>

            <Link
                href={href}
                className={`w-full py-4 rounded-3xl font-bold text-center transition-all ${popular ? 'btn-premium shadow-lg shadow-primary/20' : 'bg-secondary hover:bg-border text-foreground'
                    }`}
            >
                {btnText}
            </Link>
        </motion.div>
    );
}
