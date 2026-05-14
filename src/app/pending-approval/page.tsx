'use client';

import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Mail, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function PendingApprovalPage() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-card p-12 rounded-[2.5rem] border border-border shadow-2xl text-center space-y-8 relative overflow-hidden"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-primary to-amber-400" />
                
                <div className="flex justify-center">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 bg-gradient-to-tr from-amber-100 to-primary/10 rounded-full blur-xl"
                        />
                        <div className="relative w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 shadow-inner">
                            <Clock size={48} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight text-slate">
                        Application <span className="text-primary">Under Review</span>
                    </h1>
                    <p className="text-lg text-foreground/50 font-medium leading-relaxed">
                        We've received your application to join the TOPIK Vocabulary Bootcamp. 
                        Our team is currently reviewing your profile to ensure the best learning environment.
                    </p>
                </div>

                <div className="grid gap-4 py-8">
                    {[
                        { icon: <ShieldCheck className="text-emerald-500" />, title: "Identity Verified", desc: "Your basic account info is secured." },
                        { icon: <Mail className="text-blue-500" />, title: "Email Notification", desc: "We'll email you once your status changes." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-secondary/20 rounded-2xl text-left border border-transparent hover:border-primary/10 transition-colors">
                            <div className="mt-1">{item.icon}</div>
                            <div>
                                <h3 className="font-bold text-slate">{item.title}</h3>
                                <p className="text-sm text-foreground/40 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 space-y-4">
                    <p className="text-sm text-foreground/30 font-bold uppercase tracking-widest">
                        Check back in 24-48 hours
                    </p>
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center justify-center gap-2 mx-auto text-foreground/40 hover:text-primary font-bold transition-colors group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Sign out and check later
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
