'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VocabCard } from '@/components/learning/VocabCard';
import { X, Heart, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const MOCK_WORDS = [
    { word: "가다", pronunciation: "ga-da", meaning_en: "To go", meaning_zh: "去", example: "학교에 가요.", example_en: "I go to school.", example_zh: "我去学校。" },
    { word: "오다", pronunciation: "o-da", meaning_en: "To come", meaning_zh: "来", example: "집에 왔어요.", example_en: "I came home.", example_zh: "我回到了家。" },
    { word: "먹다", pronunciation: "meok-da", meaning_en: "To eat", meaning_zh: "吃", example: "밥을 먹어요.", example_en: "I eat rice.", example_zh: "我吃饭。" },
    { word: "마시다", pronunciation: "ma-si-da", meaning_en: "To drink", meaning_zh: "喝", example: "물을 마셔요.", example_en: "I drink water.", example_zh: "我喝水。" },
    { word: "자다", pronunciation: "ja-da", meaning_en: "To sleep", meaning_zh: "睡", example: "일찍 자요.", example_en: "I sleep early.", example_zh: "我睡得很早。" },
];

export default function MissionPage() {
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const router = useRouter();

    const currentWord = MOCK_WORDS[index];
    const progress = ((index) / MOCK_WORDS.length) * 100;

    const handleNext = () => {
        if (index < MOCK_WORDS.length - 1) {
            setIndex(index + 1);
        } else {
            setIsFinished(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8B5CF6', '#10B981', '#F59E0B']
            });
        }
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                        <Trophy size={48} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Mission Cleared!</h1>
                    <p className="text-xl text-foreground/60 mb-12">
                        You've mastered 5 new verbs today. Keep it up!
                    </p>

                    <div className="bg-white border border-border rounded-3xl p-8 mb-12 flex justify-around">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">+100</p>
                            <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">XP Earned</p>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="text-center">
                            <p className="text-3xl font-bold text-amber-500">4</p>
                            <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Day Streak</p>
                        </div>
                    </div>

                    <Link href="/dashboard" className="btn-premium w-full py-5 text-xl flex items-center justify-center gap-3">
                        Return to Basecamp
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* HUD */}
            <header className="px-8 py-6 flex items-center justify-between">
                <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <X size={24} className="text-foreground/40" />
                </button>

                <div className="flex-1 max-w-xl mx-8">
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border/50">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-rose-500 font-bold">
                    <Heart size={20} fill="currentColor" />
                    <span>5</span>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <AnimatePresence mode="wait">
                    <VocabCard
                        key={currentWord.word}
                        word={currentWord.word}
                        pronunciation={currentWord.pronunciation}
                        meaning={currentWord.meaning_en} // Should adapt based on language
                        exampleKr={currentWord.example}
                        exampleTrans={currentWord.example_en}
                        onNext={handleNext}
                    />
                </AnimatePresence>
            </main>

            <footer className="p-8 text-center text-foreground/30 font-medium text-sm">
                Level: 초급 정복자 • Mission 4/14
            </footer>
        </div>
    );
}
