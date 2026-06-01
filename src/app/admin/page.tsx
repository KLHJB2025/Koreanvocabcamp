'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Users, BookCheck, Clock, Target, Award, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        pendingStudents: 0,
        approvedStudents: 0,
        avgXp: 0,
    });
    const [recentStudents, setRecentStudents] = useState<any[]>([]);
    const [topStudents, setTopStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allStudents = snapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            })) as any[];

            const pending = allStudents.filter(s => s.status === 'pending');
            const approved = allStudents.filter(s => s.status === 'approved');
            const totalXp = allStudents.reduce((sum, s) => sum + (s.totalXp || 0), 0);
            const avgXp = allStudents.length > 0 ? Math.round(totalXp / allStudents.length) : 0;

            setStats({
                totalStudents: allStudents.length,
                pendingStudents: pending.length,
                approvedStudents: approved.length,
                avgXp,
            });

            // Recent Registrations
            const sortedByDate = [...allStudents].sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            setRecentStudents(sortedByDate.slice(0, 5));

            // Top Students by XP
            const sortedByXp = [...approved].sort((a, b) => (b.totalXp || 0) - (a.totalXp || 0));
            setTopStudents(sortedByXp.slice(0, 5));

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2 uppercase tracking-widest italic text-slate">Bootcamp Admin Overview</h1>
                    <p className="text-foreground/40">Real-time statistics from the student database.</p>
                </div>
                <Link href="/admin/dashboard" className="btn-premium px-6 py-3 flex items-center gap-2">
                    <span>Manage Approvals</span>
                    <ArrowUpRight size={16} />
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Registered"
                    value={stats.totalStudents.toString()}
                    change="All student applications"
                    icon={<Users className="text-blue-500" />}
                />
                <StatCard
                    title="Active Students"
                    value={stats.approvedStudents.toString()}
                    change="Approved and learning"
                    icon={<BookCheck className="text-emerald-500" />}
                />
                <StatCard
                    title="Pending Approvals"
                    value={stats.pendingStudents.toString()}
                    change="Awaiting command sign-off"
                    icon={<Clock className="text-amber-500" />}
                    highlight={stats.pendingStudents > 0}
                />
                <StatCard
                    title="Average Student XP"
                    value={stats.avgXp.toLocaleString()}
                    change="Overall database average"
                    icon={<Target className="text-primary" />}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Top Performers Chart / List */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Award className="text-amber-500" />
                            <span>Top Student Leaderboard (XP)</span>
                        </h3>
                        <div className="space-y-5">
                            {topStudents.map((student, i) => {
                                const maxXP = Math.max(...topStudents.map(s => s.totalXp || 1), 100);
                                const percentage = Math.min(100, Math.round(((student.totalXp || 0) / maxXP) * 100));
                                return (
                                    <div key={student.uid} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-slate">
                                                #{i + 1} {student.displayName}
                                            </span>
                                            <span className="font-mono font-bold text-primary">
                                                {student.totalXp || 0} XP
                                            </span>
                                        </div>
                                        <div className="w-full bg-secondary/30 h-3.5 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-primary h-full rounded-full transition-all duration-500" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {topStudents.length === 0 && (
                                <p className="text-sm text-foreground/30 italic text-center py-12">No active students with XP record yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Registrations */}
                <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Recent Registrations</h3>
                    <div className="space-y-6">
                        {recentStudents.map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs text-primary shrink-0">
                                        {item.displayName ? item.displayName[0].toUpperCase() : '?'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm truncate">{item.displayName || 'Unknown Student'}</p>
                                        <p className="text-[10px] text-foreground/40 font-bold truncate">
                                            {item.email || 'No Email'}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                                    item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                    item.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                    'bg-secondary text-foreground/40'
                                }`}>
                                    {item.status || 'pending'}
                                </span>
                            </div>
                        ))}
                        {recentStudents.length === 0 && (
                            <p className="text-sm text-foreground/30 italic text-center py-4">No students registered yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon, highlight = false }: { title: string, value: string, change: string, icon: React.ReactNode, highlight?: boolean }) {
    return (
        <div className={`bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all ${
            highlight ? 'border-amber-400 bg-amber-50/10' : 'border-border'
        }`}>
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <h4 className="text-foreground/40 text-sm font-bold uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-3xl font-bold mb-2">{value}</p>
            <p className="text-xs font-medium text-foreground/50">{change}</p>
        </div>
    );
}
