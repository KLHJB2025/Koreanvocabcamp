'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { profile, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!profile || profile.role !== 'admin') {
                router.push('/dashboard');
            }
        }
    }, [profile, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!profile || profile.role !== 'admin') {
        return null;
    }

    const handleExit = () => {
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate text-white flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tight">TOPIK Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" active={pathname === '/admin'} />
                    <AdminNavLink href="/admin/dashboard" icon={<Users size={20} />} label="Student Approvals" active={pathname === '/admin/dashboard'} />
                    <AdminNavLink href="/admin/vocabulary" icon={<BookOpen size={20} />} label="Vocabulary Import" active={pathname === '/admin/vocabulary'} />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={handleExit}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span>Exit Portal</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function AdminNavLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}

