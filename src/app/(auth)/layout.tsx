'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-center px-12 bg-primary/5 border-r border-border">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md"
                >
                    <Link href="/" className="mb-12 block">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            T
                        </div>
                    </Link>
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate to-primary bg-clip-text text-transparent">
                        Your journey to Korean mastery starts here.
                    </h2>
                    <p className="text-lg text-foreground/60 mb-8">
                        Join thousands of students in the 14-day TOPIK Vocabulary Bootcamp.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-foreground/80">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">✓</div>
                            <span>Daily Missions & Challenges</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground/80">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">✓</div>
                            <span>AI-Powered SRS Learning</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground/80">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">✓</div>
                            <span>Certificates & Rewards</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-background">
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
