'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Database, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, Search } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';

export default function AdminVocabularyPage() {
    const [importData, setImportData] = useState('');
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [log, setLog] = useState<string[]>([]);
    const [cycleId, setCycleId] = useState('beginner_cycle_1');

    const handleImport = async () => {
        if (!importData.trim()) return;
        setStatus('processing');
        setLog(['Starting import...']);

        try {
            const lines = importData.split('\n').filter(l => l.trim());
            const batch = writeBatch(db);
            let count = 0;

            for (const line of lines) {
                // Expected format: Korean | PartOfSpeech | Chinese | English | SentenceKR | SentenceMeaning
                const [kr, pos, zh, en, skr, sm] = line.split('\t').map(s => s.trim());

                if (kr && pos) {
                    const vocabRef = doc(collection(db, 'vocabulary'));
                    batch.set(vocabRef, {
                        kr,
                        pos,
                        zh: zh || '',
                        en: en || '',
                        sentenceKr: skr || '',
                        sentenceMeaning: sm || '',
                        cycleId,
                        createdAt: new Date().toISOString()
                    });
                    count++;
                }

                // Firestore batch limit is 500
                if (count % 400 === 0) {
                    await batch.commit();
                }
            }

            await batch.commit();
            setStatus('success');
            setLog(prev => [...prev, `Successfully imported ${count} words to ${cycleId}`]);
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setLog(prev => [...prev, `Error: ${error.message}`]);
        }
    };

    return (
        <div className="min-h-screen bg-cloud p-12">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase text-charcoal mb-2">Vanguard Command</h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">Vocabulary Intelligence & Deployment</p>
                </div>
                <div className="flex gap-4">
                    <div className="p-4 bg-white rounded-3xl shadow-sm border border-charcoal/5 flex items-center gap-4">
                        <Database className="text-primary" />
                        <div>
                            <p className="text-[10px] font-black uppercase text-charcoal/20 tracking-widest">Active Database</p>
                            <p className="font-bold text-charcoal">Firestore Production</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Deployment Area */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="puffy-card p-10 bg-white shadow-xl border border-charcoal/5">
                        <div className="flex items-center gap-3 mb-8">
                            <Upload className="text-primary" />
                            <h2 className="text-xl font-black italic uppercase tracking-tight">Mass Deployment (TSV)</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-3">Target Cycle ID</label>
                                <input
                                    value={cycleId}
                                    onChange={(e) => setCycleId(e.target.value)}
                                    placeholder="e.g., beginner_cycle_1"
                                    className="w-full p-4 bg-cloud rounded-2xl border-2 border-transparent focus:border-primary outline-none transition-all font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-3">Data Stream (Paste from Excel/TSV)</label>
                                <textarea
                                    value={importData}
                                    onChange={(e) => setImportData(e.target.value)}
                                    placeholder="Korean [Tab] POS [Tab] Chinese [Tab] English [Tab] Sentence [Tab] Meaning"
                                    rows={15}
                                    className="w-full p-6 bg-cloud rounded-[32px] border-2 border-transparent focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed"
                                />
                                <p className="mt-4 text-[10px] font-bold text-charcoal/30 flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    Each line should be: Word \t POS \t MeanZH \t MeanEN \t ExampleKR \t ExampleEN
                                </p>
                            </div>

                            <button
                                onClick={handleImport}
                                disabled={status === 'processing'}
                                className="btn-primary-cute w-full py-6 text-xl flex items-center justify-center gap-4"
                            >
                                {status === 'processing' ? <Loader2 className="animate-spin" /> : <Database />}
                                {status === 'processing' ? 'COMMITTING TO LEDGER...' : 'EXECUTE PROTOCOL'}
                            </button>
                        </div>
                    </div>

                    <div className="p-8 bg-charcoal rounded-[40px] text-white">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6">Execution Logs</h3>
                        <div className="space-y-2 font-mono text-xs opacity-80 h-40 overflow-y-auto">
                            {log.map((l, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-primary shrink-0">&gt;</span>
                                    <span>{l}</span>
                                </div>
                            ))}
                            {log.length === 0 && <span className="opacity-20 italic">Waiting for connection...</span>}
                        </div>
                    </div>
                </div>

                {/* Intelligence Area */}
                <div className="space-y-8">
                    <div className="puffy-card p-8 bg-white border border-charcoal/5 shadow-lg">
                        <h3 className="text-sm font-black italic uppercase mb-6 tracking-tight">Intelligence Dashboard</h3>
                        <div className="space-y-4">
                            <div className="p-6 bg-cloud rounded-2xl flex justify-between items-center">
                                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-widest">Total Lexicon</span>
                                <span className="text-2xl font-black italic">1,847</span>
                            </div>
                            <div className="p-6 bg-cloud rounded-2xl flex justify-between items-center">
                                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-widest">Active Agents</span>
                                <span className="text-2xl font-black italic text-strawberry">124</span>
                            </div>
                            <div className="p-6 bg-cloud rounded-2xl flex justify-between items-center">
                                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-widest">Avg Mastery</span>
                                <span className="text-2xl font-black italic text-secondary">84.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-strawberry/10 rounded-[40px] border border-strawberry/20">
                        <CheckCircle2 size={32} className="text-primary mb-4" />
                        <h3 className="text-lg font-black italic uppercase mb-2">Vanguard Access</h3>
                        <p className="text-xs font-bold text-charcoal/40 leading-relaxed uppercase tracking-widest">
                            Authorized personnel only. All interactions are logged and cryptographically signed.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .puffy-card {
                    border-radius: 48px;
                }
            `}</style>
        </div>
    );
}
