'use client';

import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F0F2F5] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate text-white flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tight">TOPIK Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <AdminNavLink href="/admin/users" icon={<Users size={20} />} label="User Progress" />
                    <AdminNavLink href="/admin/camps" icon={<BookOpen size={20} />} label="Manage Camps" />
                    <AdminNavLink href="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <AdminNavLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all mt-2">
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
