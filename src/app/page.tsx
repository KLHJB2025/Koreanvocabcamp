'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { Sparkles, Trophy, Rocket, Brain, Languages } from 'lucide-react';

export default function LandingPage() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            T
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            TOPIK Bootcamp
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-secondary/50 p-1 rounded-full border border-border">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${language === 'zh' ? 'bg-white shadow-sm text-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${language === 'en' ? 'bg-white shadow-sm text-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              English
            </button>
          </div>
          <Link href="/login" className="font-semibold text-foreground/80 hover:text-primary transition-colors">
            {t('common.login')}
          </Link>
          <Link href="/signup" className="btn-premium">
            {t('common.signup')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
              <Sparkles size={16} />
              <span>{t('learning.ranks.1')}</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-slate to-primary bg-clip-text text-transparent">
              {t('common.welcome')}
            </h1>
            <p className="text-xl text-foreground/60 mb-10 max-w-xl leading-relaxed">
              Master 500+ TOPIK vocabulary words in just 14 days. Gamified lessons, spaced repetition, and real rewards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="btn-premium text-lg px-8 py-4">
                {t('common.getStarted')}
              </Link>
              <Link href="/demo" className="btn-outline text-lg px-8 py-4 flex items-center gap-2">
                <Rocket size={20} />
                Try Live Demo
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold italic text-primary">14 Days</span>
                <span className="text-sm text-foreground/40 font-medium">To Mastery</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold italic text-primary">500+</span>
                <span className="text-sm text-foreground/40 font-medium">Core Words</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold italic text-primary">10k+</span>
                <span className="text-sm text-foreground/40 font-medium">Active Learners</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="hidden lg:block relative"
          >
            {/* Visual Representation of a Card */}
            <div className="relative w-[450px] h-[600px] glass-card rounded-[40px] p-8 flex flex-col items-center justify-center text-center">
              <div className="absolute top-8 left-8 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              <div className="w-48 h-48 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 animate-float">
                <Brain size={120} className="text-primary/40" />
              </div>

              <h2 className="text-5xl font-bold mb-2 font-noto-kr">울다</h2>
              <span className="text-lg text-foreground/40 mb-6">[ul-da]</span>

              <div className="w-full h-[1px] bg-border mb-8" />

              <p className="text-2xl font-medium text-foreground/80 mb-4">
                {language === 'en' ? 'To cry / weep' : '哭 / 哭泣'}
              </p>
              <p className="text-sm text-foreground/40 italic">
                "그는 슬픈 영화를 보고 울었다."
              </p>

              <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-white shadow-2xl rounded-3xl p-6 flex flex-col justify-between border border-border rotate-6">
                <div className="flex items-center justify-between">
                  <Trophy className="text-amber-500" />
                  <span className="text-xs font-bold text-foreground/40">ACHIEVEMENT</span>
                </div>
                <div className="text-sm font-bold">First Word Mastered!</div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-primary" />
                </div>
              </div>

              <div className="absolute top-20 left-[-60px] w-40 h-16 bg-white shadow-xl rounded-full p-4 flex items-center gap-3 border border-border -rotate-12">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Languages size={18} />
                </div>
                <span className="text-sm font-bold">Multi-lang UI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer / Features teaser */}
      <footer className="relative z-10 py-20 px-8 bg-white/50 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="text-primary" />}
            title="SRS Engine"
            desc="Our algorithm predicts when you're about to forget."
          />
          <FeatureCard
            icon={<Trophy className="text-amber-500" />}
            title="Gamified Rank"
            desc="Climb from Survivor to TOPIK Legend."
          />
          <FeatureCard
            icon={<Rocket className="text-emerald-500" />}
            title="14-Day Camp"
            desc="Structured daily missions to keep you focused."
          />
          <FeatureCard
            icon={<Sparkles className="text-purple-500" />}
            title="Visual-First"
            desc="Animated cards make learning memorable."
          />
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl hover:bg-white transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-foreground/50">{desc}</p>
    </div>
  );
}
