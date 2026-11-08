import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Overview', path: '/student/dashboard', icon: 'grid_view' },
    { label: 'Take Assessment', path: '/student/assessment', icon: 'assignment' },
    { label: 'Job Matches', path: '/student/dashboard#jobs', icon: 'work' },
    { label: 'Learning Paths', path: '/student/upskill', icon: 'school' },
    { label: 'Workplace Profile', path: '/student/personality-test', icon: 'psychology' },
    { label: 'Resume & Details', path: '/student/onboarding', icon: 'description' },
];

const StudentSidebar = ({ sidebarCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside 
            className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-60'} bg-[#121318] border-r border-white/[0.08] z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex font-sans select-none shadow-lg`}
        >
            <div className="flex flex-col">
                {/* Brand Header */}
                <div className="h-16 px-4 border-b border-white/[0.08] flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-sm">
                        SF
                    </div>
                    {!sidebarCollapsed && (
                        <span className="font-semibold text-sm tracking-tight text-white">
                            SkillForge
                        </span>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-2.5 gap-1 mt-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/student/dashboard' && location.pathname === '/student/dashboard' && !location.hash);
                        
                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                                    isActive
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-white'
                                }`}
                                title={sidebarCollapsed ? item.label : undefined}
                            >
                                <span className={`material-symbols-outlined text-[18px] shrink-0 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`}>
                                    {item.icon}
                                </span>
                                {!sidebarCollapsed && <span>{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Status Indicator */}
            <div className="p-3 border-t border-white/[0.08]">
                {!sidebarCollapsed ? (
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="truncate">Evaluation Enclave Active</span>
                    </div>
                ) : (
                    <div className="flex justify-center" title="Evaluation Enclave Active">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default StudentSidebar;
