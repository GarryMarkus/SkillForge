import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Overview', path: '/student/dashboard', marker: '[01]' },
    { label: 'Take Assessment', path: '/student/assessment', marker: '[02]' },
    { label: 'Job Matches', path: '/student/dashboard#jobs', marker: '[03]' },
    { label: 'Learning Paths', path: '/student/upskill', marker: '[04]' },
    { label: 'Workplace Profile', path: '/student/personality-test', marker: '[05]' },
    { label: 'Resume & Details', path: '/student/onboarding', marker: '[06]' },
];

const StudentSidebar = ({ sidebarCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside 
            className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-60'} bg-[#0b0b0c] border-r border-white/10 z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex font-mono select-none`}
        >
            <div className="flex flex-col">
                {/* Brand Header */}
                <div className="h-14 px-4 border-b border-white/[0.06] flex items-center gap-2.5 overflow-hidden">
                    <div className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] text-xs font-mono font-bold shrink-0">
                        SF
                    </div>
                    {!sidebarCollapsed && (
                        <span className="font-display font-bold text-sm tracking-tight text-white">
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
                                className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-mono transition-colors cursor-pointer text-left ${
                                    isActive
                                        ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                        : 'text-[#737373] hover:text-[#f5f5f5] border border-transparent hover:border-white/10'
                                }`}
                                title={sidebarCollapsed ? item.label : undefined}
                            >
                                <span className={`text-[11px] shrink-0 ${isActive ? 'text-white' : 'text-[#555555]'}`}>
                                    {item.marker}
                                </span>
                                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Status Indicator */}
            <div className="p-3 border-t border-white/[0.06]">
                {!sidebarCollapsed ? (
                    <div className="p-2 rounded-md bg-[#050505] border border-white/10 text-[11px] text-[#737373] font-mono text-center">
                        [enclave : active]
                    </div>
                ) : (
                    <div className="flex justify-center text-[11px] text-[#737373]" title="Evaluation Enclave Active">
                        [•]
                    </div>
                )}
            </div>
        </aside>
    );
};

export default StudentSidebar;
