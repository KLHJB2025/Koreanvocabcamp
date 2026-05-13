'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Users, BookCheck, TrendingUp, Target } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest italic">Bootcamp HQ Admin&apos;s Sanctuary</h1>
                    <p className="text-foreground/40">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
                </div>
                <button className="btn-premium px-6 py-3">Generate Report</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Active Users"
                    value="1,284"
                    change="+12% from last week"
                    icon={<Users className="text-blue-500" />}
                />
                <StatCard
                    title="Camp Completion"
                    value="74.2%"
                    change="+3% from last week"
                    icon={<BookCheck className="text-emerald-500" />}
                />
                <StatCard
                    title="Retention Rate"
                    value="88%"
                    change="Stable"
                    icon={<TrendingUp className="text-primary" />}
                />
                <StatCard
                    title="Avg. Accuracy"
                    value="91.5%"
                    change="-0.5% from last week"
                    icon={<Target className="text-amber-500" />}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="font-bold text-lg mb-6">User Activity (Last 7 Days)</h3>
                    <div className="h-64 w-full bg-secondary/30 rounded-2xl flex items-center justify-center text-foreground/20 italic">
                        [Chart Visualization Placeholder]
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Recent Completions</h3>
                    <div className="space-y-6">
                        {[
                            { name: "Zhang Wei", lang: "ZH", score: "Gold", time: "2m ago" },
                            { name: "Sarah J.", lang: "EN", score: "Legendary", time: "15m ago" },
                            { name: "Li Na", lang: "ZH", score: "Cleared", time: "32m ago" },
                            { name: "Tom Holland", lang: "EN", score: "Silver", time: "1h ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{item.name}</p>
                                        <p className="text-[10px] text-foreground/40 font-bold uppercase">{item.lang} • {item.time}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.score === 'Legendary' ? 'bg-amber-100 text-amber-700' :
                                        item.score === 'Gold' ? 'bg-slate/10 text-slate' : 'bg-secondary text-foreground/40'
                                    }`}>
                                    {item.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <h4 className="text-foreground/40 text-sm font-bold uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-3xl font-bold mb-2">{value}</p>
            <p className="text-xs font-medium text-emerald-600">{change}</p>
        </div>
    );
}
