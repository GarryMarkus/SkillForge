import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    BookOpen,
    ShieldCheck,
    BrainCircuit,
    FileText,
    CheckCircle2,
    ScanSearch,
    X,
} from '../ui/Icons';

const navItems = [
    { label: 'Overview', path: '/student/dashboard', matchPaths: ['/student/dashboard'], icon: LayoutDashboard },
    { label: 'Matched Jobs', path: '/student/jobs', matchPaths: ['/student/jobs', '/student/job-matches'], icon: Briefcase },
    { label: 'AI Analysis', path: '/student/analysis', matchPaths: ['/student/analysis', '/student/ai-analysis'], icon: ScanSearch },
    { label: 'Learning Paths', path: '/student/upskill', matchPaths: ['/student/upskill'], icon: BookOpen },
    { label: 'Skill Assessment', path: '/student/assessment', matchPaths: ['/student/assessment'], icon: ShieldCheck },
    { label: 'Work Style', path: '/student/personality-test', matchPaths: ['/student/personality-test'], icon: BrainCircuit },
    { label: 'Resume & Profile', path: '/student/onboarding', matchPaths: ['/student/onboarding'], icon: FileText },
];

const StudentSidebar = ({ sidebarCollapsed, mobileOpen = false, onCloseMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(path);
        if (onCloseMobile) onCloseMobile();
    };

    const isItemActive = (item) => {
        if (item.path === '/student/dashboard') {
            return location.pathname === '/student/dashboard' && location.hash !== '#jobs' && location.hash !== '#learning';
        }
        if (item.path === '/student/jobs' && location.pathname === '/student/dashboard' && location.hash === '#jobs') {
            return true;
        }
        return item.matchPaths ? item.matchPaths.includes(location.pathname) : location.pathname === item.path;
    };

    const renderNavContent = (collapsed) => (
        <>
            <div className="flex flex-col">
                {/* Brand Header */}
                <div className="h-14 px-4 border-b border-white/[0.06] flex items-center justify-between gap-2.5 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => handleNavigate('/student/dashboard')}
                        className="flex items-center gap-2.5 cursor-pointer text-left min-w-0"
                    >
                        <div className="w-7 h-7 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] text-xs font-mono font-bold shrink-0">
                            SF
                        </div>
                        {!collapsed && (
                            <span className="font-display font-bold text-sm tracking-tight text-white truncate">
                                SkillForge
                            </span>
                        )}
                    </button>

                    {mobileOpen && (
                        <button
                            type="button"
                            onClick={onCloseMobile}
                            className="md:hidden p-1.5 rounded-sm text-[#888888] hover:text-white cursor-pointer"
                            aria-label="Close navigation menu"
                        >
                            <X className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                    )}
                </div>

                {/* Section Label */}
                {!collapsed && (
                    <div className="px-4 pt-4 pb-1 text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
                        Workspace
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="flex flex-col px-2.5 py-2 gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isItemActive(item);

                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleNavigate(item.path)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer text-left ${
                                    collapsed ? 'justify-center px-2' : ''
                                } ${
                                    active
                                        ? 'bg-[#181B22] text-white border border-white/15 font-medium'
                                        : 'text-[#888888] hover:text-white border border-transparent hover:bg-white/[0.03]'
                                }`}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon
                                    className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-[#71717A]'}`}
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Verification Badge */}
            <div className="p-3 border-t border-white/[0.06]">
                {!collapsed ? (
                    <div className="px-3 py-2 rounded-sm bg-[#0D0F14] border border-white/[0.08] flex items-center gap-2 text-[11px] text-zinc-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span className="truncate">Verification Active</span>
                    </div>
                ) : (
                    <div className="flex justify-center py-1" title="Verification Active">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                )}
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Fixed Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full ${
                    sidebarCollapsed ? 'w-16' : 'w-60'
                } bg-[#0A0B0F] border-r border-white/[0.08] z-50 flex-col justify-between transition-all duration-200 hidden md:flex font-mono select-none`}
            >
                {renderNavContent(sidebarCollapsed)}
            </aside>

            {/* Mobile Slide-Over Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={onCloseMobile}
                        aria-hidden="true"
                    />
                    <aside className="relative w-64 max-w-[80vw] h-full bg-[#0A0B0F] border-r border-white/[0.08] z-10 flex flex-col justify-between font-mono select-none shadow-2xl">
                        {renderNavContent(false)}
                    </aside>
                </div>
            )}
        </>
    );
};

export default StudentSidebar;
