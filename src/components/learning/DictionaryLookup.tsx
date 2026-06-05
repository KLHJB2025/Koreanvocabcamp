'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, X, Search, ExternalLink, Sparkles, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';

export function DictionaryLookup() {
    const { profile, loading: authLoading } = useAuth();
    const { language } = useTranslation();
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [aiExplanation, setAiExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                // If target is the floating button itself, let button toggle it
                const target = event.target as HTMLElement;
                if (target.closest('.dict-toggle-btn')) return;
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Listen to custom global events
    useEffect(() => {
        const handleOpenEvent = (event: any) => {
            setIsOpen(true);
            const queryVal = event.detail?.query || '';
            if (queryVal) {
                setSearchTerm(queryVal);
                handleLookup(queryVal);
            }
        };

        window.addEventListener('open-dictionary-lookup', handleOpenEvent);
        return () => window.removeEventListener('open-dictionary-lookup', handleOpenEvent);
    }, []);

    if (authLoading || !profile || profile.status !== 'approved') {
        return null; // Only show for logged in and approved users
    }

    const handleLookup = async (queryVal: string) => {
        const term = queryVal.trim();
        if (!term) return;

        setIsLoading(true);
        setError('');
        setAiExplanation('');

        try {
            const prompt = language === 'zh'
                ? `请深入解释韩语单词 "${term}" 的含义、发音、词性、常见用法和例句。如果该词有相似的近义词（例如 값 和 가격，或 것 和 거，或 검정 和 검은색），请用表格形式做深度对比辨析，并举例说明如何使用它们。`
                : `Please deeply explain the meaning, pronunciation, part of speech, common usage, and examples of the Korean word "${term}". If it has common synonyms (like 값 vs 가격, 것 vs 거, or 검정 vs 검은색), please provide a detailed comparative table and explanation of the differences between them.`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch explanation from AI');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setAiExplanation(data.content || '');
        } catch (e: any) {
            console.error(e);
            setError(language === 'zh' ? '获取 AI 解析失败，请重试。' : 'Failed to get AI explanation. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLookup(searchTerm);
    };

    // Helper to parse simple markdown to JSX
    const renderMarkdown = (text: string) => {
        if (!text) return null;
        
        const lines = text.split('\n');
        let inList = false;
        let inTable = false;
        const elements: React.ReactNode[] = [];
        let listItems: string[] = [];
        let tableRows: string[][] = [];
        
        const flushList = (key: string) => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`ul-${key}`} className="list-disc pl-5 my-2 space-y-1">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="text-sm font-medium text-charcoal/80 leading-relaxed">
                                {parseInlineStyles(item)}
                            </li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
        };
        
        const flushTable = (key: string) => {
            if (tableRows.length > 0) {
                let headers = tableRows[0];
                let dataRows = tableRows.slice(1);
                if (dataRows[0] && dataRows[0].every(cell => cell.trim().startsWith('-') || cell.trim() === '')) {
                    dataRows = dataRows.slice(1);
                }
                elements.push(
                    <div key={`table-${key}`} className="my-4 overflow-x-auto border border-strawberry/20 rounded-2xl shadow-sm">
                        <table className="w-full text-left border-collapse bg-white">
                            <thead>
                                <tr className="bg-strawberry/5 border-b border-strawberry/15">
                                    {headers.map((h, i) => (
                                        <th key={i} className="p-3 text-xs font-black uppercase text-primary tracking-wider whitespace-nowrap">
                                            {parseInlineStyles(h.trim())}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-strawberry/10">
                                {dataRows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-strawberry/5/20 transition-colors">
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="p-3 text-xs sm:text-sm font-medium text-charcoal leading-normal">
                                                {parseInlineStyles(cell.trim())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableRows = [];
            }
        };
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('|')) {
                flushList(`table-flush-${i}`);
                inTable = true;
                const cells = line.split('|').slice(1, -1);
                tableRows.push(cells);
                continue;
            } else if (inTable) {
                flushTable(`table-flush-${i}`);
                inTable = false;
            }
            
            if (line.startsWith('###')) {
                flushList(`h3-${i}`);
                elements.push(
                    <h4 key={i} className="text-sm sm:text-base font-black text-primary uppercase mt-5 mb-2 flex items-center gap-1.5">
                        {parseInlineStyles(line.slice(3).trim())}
                    </h4>
                );
            } else if (line.startsWith('##')) {
                flushList(`h2-${i}`);
                elements.push(
                    <h3 key={i} className="text-base sm:text-lg font-black text-charcoal uppercase mt-6 mb-3 border-b-2 border-strawberry/10 pb-1">
                        {parseInlineStyles(line.slice(2).trim())}
                    </h3>
                );
            } else if (line.startsWith('#')) {
                flushList(`h1-${i}`);
                elements.push(
                    <h2 key={i} className="text-lg sm:text-xl font-black text-charcoal mt-8 mb-4">
                        {parseInlineStyles(line.slice(1).trim())}
                    </h2>
                );
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                inList = true;
                listItems.push(line.slice(2));
            } else {
                if (line === '') {
                    flushList(`empty-${i}`);
                } else {
                    if (inList) {
                        flushList(`list-end-${i}`);
                        inList = false;
                    }
                    elements.push(
                        <p key={i} className="text-xs sm:text-sm leading-relaxed text-charcoal/80 my-2 font-medium">
                            {parseInlineStyles(line)}
                        </p>
                    );
                }
            }
        }
        
        flushList('final');
        flushTable('final');
        
        return elements;
    };

    const parseInlineStyles = (text: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        const regex = /(\*\*.*?\*\*|`.*?`)/g;
        const splitText = text.split(regex);
        
        splitText.forEach((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                parts.push(<strong key={idx} className="font-black text-primary">{part.slice(2, -2)}</strong>);
            } else if (part.startsWith('`') && part.endsWith('`')) {
                parts.push(<code key={idx} className="bg-strawberry/5 border border-strawberry/10 text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded text-primary">{part.slice(1, -1)}</code>);
            } else {
                parts.push(part);
            }
        });
        
        return parts;
    };

    // Helper to extract individual words if search query contains multiple words
    const getWords = (term: string) => {
        return term
            .split(/[\s,/\&]+/)
            .map(w => w.trim())
            .filter(w => w.length > 0);
    };

    // Dictionary links generator
    const getNaverDictUrl = (term: string) => {
        return `https://dict.naver.com/kozhdict/#/search?query=${encodeURIComponent(term)}`;
    };

    const getKrDictUrl = (term: string) => {
        return `https://krdict.korean.go.kr/dicSearch/search?nation=cns&query=${encodeURIComponent(term)}`;
    };

    return (
        <>
            {/* Cute Floating Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                className="dict-toggle-btn fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-b-4 border-black/10 hover:bg-rose-600 transition-colors"
                title={language === 'zh' ? '查找字典' : 'Dictionary Lookup'}
            >
                <BookMarked size={24} />
            </motion.button>

            {/* Slide-over Drawer Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-50 pointer-events-auto"
                        />

                        {/* Drawer body */}
                        <motion.div
                            ref={drawerRef}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white/95 backdrop-blur-md border-l border-strawberry/10 shadow-2xl z-50 flex flex-col pointer-events-auto"
                        >
                            {/* Drawer Header */}
                            <div className="p-5 border-b border-strawberry/10 flex items-center justify-between bg-white relative">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-strawberry/10 rounded-2xl flex items-center justify-center text-primary">
                                        <BookMarked size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg italic text-charcoal">
                                            {language === 'zh' ? '查找字典' : 'Dictionary Lookup'}
                                        </h3>
                                        <p className="text-[10px] font-black uppercase tracking-wider text-charcoal/30">
                                            {language === 'zh' ? '中韩权威字典与 AI 深度解析' : 'NIKL, NAVER & AI Explanation'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-strawberry/5 text-charcoal/40 hover:text-primary transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                                {/* Search input form */}
                                <form onSubmit={handleSearchSubmit} className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder={language === 'zh' ? '输入韩语单词，例如: 가격, 값...' : 'Enter Korean word, e.g. 가격, 값...'}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-secondary/50 border-2 border-strawberry/10 focus:border-primary rounded-[20px] py-4 pl-5 pr-12 text-sm font-bold text-charcoal outline-none shadow-inner transition-all placeholder:text-charcoal/35"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !searchTerm.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-rose-600 disabled:bg-charcoal/10 disabled:text-charcoal/30 rounded-xl flex items-center justify-center text-white cursor-pointer transition-colors shadow-md shadow-primary/20"
                                    >
                                        <Search size={16} />
                                    </button>
                                </form>

                                {searchTerm.trim() ? (
                                    <div className="space-y-6 animate-fade-in">
                                        {/* External Dictionaries */}
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 flex items-center gap-1.5">
                                                <ExternalLink size={12} />
                                                {language === 'zh' ? '官方权威词典直达' : 'Authoritative Reference Links'}
                                            </h4>
                                            {(() => {
                                                const wordsList = getWords(searchTerm);
                                                if (wordsList.length <= 1) {
                                                    const queryWord = wordsList[0] || searchTerm;
                                                    return (
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <a
                                                                href={getNaverDictUrl(queryWord)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between p-3.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 rounded-2xl font-black text-xs text-emerald-700 shadow-sm transition-all group"
                                                            >
                                                                <span>Naver 词典</span>
                                                                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                            </a>
                                                            <a
                                                                href={getKrDictUrl(queryWord)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between p-3.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-100 rounded-2xl font-black text-xs text-blue-700 shadow-sm transition-all group"
                                                            >
                                                                <span>国立国语院</span>
                                                                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                            </a>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="space-y-3">
                                                        {wordsList.map((word, idx) => (
                                                            <div key={idx} className="bg-strawberry/5/20 border border-strawberry/10 rounded-2xl p-3">
                                                                <p className="text-[10px] font-black text-charcoal/40 uppercase mb-2">
                                                                    {language === 'zh' ? `查询单词: ${word}` : `Word: ${word}`}
                                                                </p>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <a
                                                                        href={getNaverDictUrl(word)}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 rounded-xl font-black text-xs text-emerald-700 shadow-sm transition-all group"
                                                                    >
                                                                        <span>Naver ({word})</span>
                                                                        <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                                    </a>
                                                                    <a
                                                                        href={getKrDictUrl(word)}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center justify-between p-2.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-100 rounded-xl font-black text-xs text-blue-700 shadow-sm transition-all group"
                                                                    >
                                                                        <span>国立国语院 ({word})</span>
                                                                        <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        {/* AI Deep Explanation Section */}
                                        <div className="border-t border-strawberry/5 pt-6 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 flex items-center gap-1.5">
                                                    <Sparkles size={12} className="text-primary animate-pulse" />
                                                    {language === 'zh' ? 'AI 智能辨析与释义' : 'Smart AI Analysis'}
                                                </h4>
                                                {!isLoading && !aiExplanation && (
                                                    <button
                                                        onClick={() => handleLookup(searchTerm)}
                                                        className="text-[10px] font-black text-primary hover:text-rose-600 underline flex items-center gap-1 cursor-pointer"
                                                    >
                                                        {language === 'zh' ? '生成 AI 深度解析' : 'Generate AI Analysis'}
                                                    </button>
                                                )}
                                            </div>

                                            {isLoading && (
                                                <div className="p-6 bg-cloud/20 rounded-[24px] border border-strawberry/5 flex flex-col items-center justify-center text-center gap-3">
                                                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                                    <p className="text-[10px] font-black uppercase tracking-wider text-charcoal/40 animate-pulse">
                                                        {language === 'zh' ? 'AI 正在解析单词用法与区别...' : 'AI is analyzing word differences...'}
                                                    </p>
                                                </div>
                                            )}

                                            {error && (
                                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-500">
                                                    {error}
                                                </div>
                                            )}

                                            {aiExplanation && (
                                                <div className="p-5 bg-cloud/10 border border-strawberry/5 rounded-[24px] shadow-inner text-charcoal overflow-hidden animate-fade-in max-w-full">
                                                    {renderMarkdown(aiExplanation)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* Welcome / Suggestions state */
                                    <div className="space-y-6 py-6 text-center sm:text-left">
                                        <div className="flex flex-col items-center text-center max-w-xs mx-auto gap-3">
                                            <img
                                                src="/illustrations/mascot.png"
                                                alt="Mascot"
                                                className="w-20 h-20 object-contain animate-bounce"
                                                style={{ animationDuration: '3s' }}
                                            />
                                            <p className="text-xs font-bold text-charcoal/50 leading-relaxed">
                                                {language === 'zh'
                                                    ? '查找任何韩语词汇！可以直接直达 Naver 或韩国国立国语院查询，也可以获取 AI 深度释义和近义词对比。'
                                                    : 'Lookup any Korean words! View official definitions on Naver or NIKL, and query AI for deep synonym comparisons.'}
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 text-left">
                                                {language === 'zh' ? '快捷检索示例' : 'Quick Lookup Examples'}
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { title: '가격 & 값', query: '가격 값', desc: language === 'zh' ? '“价格”与“价钱”的区别' : 'Difference between Price & Value' },
                                                    { title: '거 & 것', query: '거 것', desc: language === 'zh' ? '“东西/事物”口语与书面语' : 'Spoken vs Written "Thing"' },
                                                    { title: '검정 & 검은색', query: '검정 검은색', desc: language === 'zh' ? '“黑色”名词与形容词的区别' : 'Noun vs Adjective variants of "Black"' },
                                                    { title: '고맙다 & 감사하다', query: '고맙다 감사하다', desc: language === 'zh' ? '敬语与固有词的区别' : 'Honorific vs Native gratitude words' },
                                                ].map((example, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setSearchTerm(example.query);
                                                            handleLookup(example.query);
                                                        }}
                                                        className="w-full p-4 bg-white hover:bg-strawberry/5/10 border border-strawberry/10 rounded-2xl flex flex-col text-left transition-colors cursor-pointer group shadow-sm hover:border-primary/30"
                                                    >
                                                        <span className="text-xs font-black text-primary group-hover:text-rose-600 transition-colors flex items-center gap-1.5">
                                                            <Sparkles size={12} className="animate-pulse" />
                                                            {example.title}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-charcoal/40 mt-1 uppercase tracking-wide">
                                                            {example.desc}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
