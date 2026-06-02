'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot, deleteDoc, arrayUnion } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    UserCheck, 
    UserX, 
    Search, 
    Shield, 
    Phone, 
    MessageSquare, 
    Clock,
    Mail,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Layers,
    Lock,
    RotateCcw
} from 'lucide-react';

interface Student {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    purpose: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    unlockedCycles?: string[];
    challengeAttempts?: { [cycleId: string]: number };
}

export default function AdminDashboard() {
    const [pendingStudents, setPendingStudents] = useState<Student[]>([]);
    const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

    useEffect(() => {
        // Listen for all students
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allStudents = snapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            })) as Student[];

            setPendingStudents(allStudents.filter(s => s.status === 'pending'));
            setApprovedStudents(allStudents.filter(s => s.status === 'approved'));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleApprove = async (uid: string) => {
        try {
            await updateDoc(doc(db, 'users', uid), {
                status: 'approved',
                approvedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error approving student:", error);
            alert("Failed to approve student");
        }
    };

    const handleReject = async (uid: string) => {
        if (!confirm('Are you sure you want to reject and delete this application?')) return;
        try {
            await deleteDoc(doc(db, 'users', uid));
        } catch (err) {
            console.error('Error rejecting user:', err);
            alert("Failed to reject student");
        }
    };

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isManagingCycles, setIsManagingCycles] = useState(false);

    const toggleCycle = async (studentId: string, cycleId: string, currentlyUnlocked: boolean) => {
        const studentRef = doc(db, 'users', studentId);
        try {
            await updateDoc(studentRef, {
                unlockedCycles: currentlyUnlocked 
                    ? approvedStudents.find(s => s.uid === studentId)?.unlockedCycles?.filter(c => c !== cycleId) || []
                    : arrayUnion(cycleId)
            });
            // Update local state is handled by onSnapshot
        } catch (err) {
            console.error('Error toggling cycle:', err);
        }
    };

    const resetAttempts = async (studentId: string, cycleId: string) => {
        if (!confirm('Are you sure you want to reset attempts for this cycle?')) return;
        const studentRef = doc(db, 'users', studentId);
        try {
            await updateDoc(studentRef, {
                [`challengeAttempts.${cycleId}`]: 0
            });
            // Update selected student local state so modal updates instantly
            setSelectedStudent(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    challengeAttempts: {
                        ...(prev.challengeAttempts || {}),
                        [cycleId]: 0
                    }
                };
            });
            alert('Attempts reset successfully!');
        } catch (err) {
            console.error('Error resetting attempts:', err);
            alert('Failed to reset attempts.');
        }
    };

    const filteredPending = pendingStudents.filter(s => 
        s.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredApproved = approvedStudents.filter(s => 
        s.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar / Header */}
            <header className="bg-white border-b border-border sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate">Admin Command Center</h1>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Bootcamp Management</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                        <input 
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-secondary/30 rounded-xl border border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm w-64"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
                        <Shield size={14} />
                        Systems Online
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Pending Approval', value: pendingStudents.length, icon: <Clock className="text-amber-500" />, color: 'bg-amber-50' },
                        { label: 'Active Students', value: approvedStudents.length, icon: <UserCheck className="text-emerald-500" />, color: 'bg-emerald-50' },
                        { label: 'Total Registrations', value: pendingStudents.length + approvedStudents.length, icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-border flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-sm text-foreground/40 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-slate">{stat.value}</p>
                            </div>
                            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setActiveTab('pending')}
                        className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'pending' ? 'bg-slate text-white shadow-lg' : 'bg-white text-foreground/40 hover:bg-secondary/20'}`}
                    >
                        Pending Requests
                        {pendingStudents.length > 0 && (
                            <span className="w-5 h-5 bg-amber-500 text-white text-[10px] flex items-center justify-center rounded-full">
                                {pendingStudents.length}
                            </span>
                        )}
                    </button>
                    <button 
                        onClick={() => setActiveTab('approved')}
                        className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'approved' ? 'bg-slate text-white shadow-lg' : 'bg-white text-foreground/40 hover:bg-secondary/20'}`}
                    >
                        Approved Students
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {(activeTab === 'pending' ? filteredPending : filteredApproved).length === 0 ? (
                                <div className="bg-white rounded-[2rem] border border-dashed border-border p-24 text-center">
                                    <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-foreground/20">
                                        <Users size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate mb-2">No students found</h3>
                                    <p className="text-foreground/40 font-medium">All clear! No pending applications at the moment.</p>
                                </div>
                            ) : (
                                (activeTab === 'pending' ? filteredPending : filteredApproved).map((student) => (
                                    <motion.div 
                                        layout
                                        key={student.uid}
                                        className="bg-white p-6 rounded-[2rem] border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center text-primary font-bold text-xl uppercase">
                                                {student.displayName?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate group-hover:text-primary transition-colors">{student.displayName}</h3>
                                                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1">
                                                    <span className="flex items-center gap-1.5 text-sm text-foreground/40 font-medium">
                                                        <Mail size={14} /> {student.email}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-sm text-foreground/40 font-medium">
                                                        <Phone size={14} /> {student.phoneNumber}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-sm text-foreground/40 font-medium">
                                                        <Clock size={14} /> Registered {new Date(student.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 max-w-md bg-secondary/20 p-4 rounded-2xl border border-transparent group-hover:border-primary/5 transition-all">
                                            <div className="flex items-center gap-2 mb-1">
                                                <MessageSquare size={14} className="text-primary" />
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Purpose of Joining</span>
                                            </div>
                                            <p className="text-sm text-slate/70 font-medium line-clamp-2 italic">
                                                "{student.purpose || 'No purpose provided'}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {activeTab === 'pending' ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleReject(student.uid)}
                                                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                        title="Reject Application"
                                                    >
                                                        <UserX size={20} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleApprove(student.uid)}
                                                        className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-slate transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                                    >
                                                        <UserCheck size={20} />
                                                        Approve Student
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => { setSelectedStudent(student); setIsManagingCycles(true); }}
                                                        className="px-4 py-2 bg-secondary text-slate rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                                                    >
                                                        <Layers size={14} />
                                                        Manage Cycles
                                                    </button>
                                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                                        <CheckCircle2 size={16} />
                                                        Active
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Cycle Management Modal */}
            <AnimatePresence>
                {isManagingCycles && selectedStudent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate/40 backdrop-blur-sm"
                            onClick={() => setIsManagingCycles(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[80vh]"
                        >
                            <div className="p-8 border-b border-border bg-secondary/10">
                                <h3 className="text-2xl font-black text-slate italic tracking-tight mb-1 uppercase">Cycle Authorization</h3>
                                <p className="text-foreground/40 font-bold uppercase text-[10px] tracking-[0.2em]">User: {selectedStudent.displayName}</p>
                            </div>
                            <div className="p-8 overflow-y-auto grid grid-cols-2 gap-4">
                                {Array.from({ length: 19 }, (_, i) => {
                                    const cycleId = `beginner_cycle_${i + 1}`;
                                    const isUnlocked = selectedStudent.unlockedCycles?.includes(cycleId);
                                    const attempts = selectedStudent.challengeAttempts?.[cycleId] || 0;
                                    return (
                                        <div key={cycleId} className="flex gap-2">
                                            <button 
                                                onClick={() => toggleCycle(selectedStudent.uid, cycleId, !!isUnlocked)}
                                                className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${isUnlocked ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-white text-foreground/40 hover:border-primary/20'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {isUnlocked ? <UserCheck size={18} /> : <Lock size={18} />}
                                                    <span className="font-bold text-sm uppercase italic">Cycle #{i + 1}</span>
                                                </div>
                                                {isUnlocked && <CheckCircle2 size={16} />}
                                            </button>
                                            {attempts > 0 && (
                                                <button 
                                                    onClick={() => resetAttempts(selectedStudent.uid, cycleId)}
                                                    className="px-4 py-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 hover:bg-amber-600 hover:text-white transition-all flex flex-col items-center justify-center gap-0.5 shrink-0 min-w-[70px]"
                                                    title={`Reset Attempts (${attempts} used)`}
                                                >
                                                    <RotateCcw size={14} />
                                                    <span className="text-[8px] font-bold uppercase">{attempts} / 2</span>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-8 border-t border-border bg-white flex justify-end">
                                <button 
                                    onClick={() => setIsManagingCycles(false)}
                                    className="px-8 py-3 bg-slate text-white rounded-xl font-bold"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
