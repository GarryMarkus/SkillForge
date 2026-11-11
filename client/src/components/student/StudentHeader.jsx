import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, PanelLeftClose, PanelLeftOpen, ShieldCheck, LogOut, User } from 'lucide-react';

const StudentHeader = ({
    candidateName = 'Candidate',
    onLogout,
    sidebarCollapsed,
    setSidebarCollapsed,
    onOpenMobileMenu
}) => {
    const navigate = useNavigate();

    return (
        <header
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-60'} left-0 right-0 z-40 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] font-mono select-none transition-all`}
            id="AppHeader"
        >
            <div className="h-14 px-4 sm:px-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        className="md:hidden p-1.5 rounded-sm bg-[#0D0F14] border border-white/[0.08] text-[#888888] hover:text-white cursor-pointer transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-4 h-4" strokeWidth={1.75} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-1.5 rounded-sm bg-[#0D0F14] border border-white/[0.08] text-[#888888] hover:text-white hover:border-white/20 cursor-pointer transition-colors"
                        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {sidebarCollapsed ? (
                            <PanelLeftOpen className="w-4 h-4" strokeWidth={1.75} />
                        ) : (
                            <PanelLeftClose className="w-4 h-4" strokeWidth={1.75} />
                        )}
                    </button>

                    <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-display font-bold text-sm text-white tracking-tight truncate">
                            Candidate Hub
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-[11px] font-mono shrink-0">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                            <span>Verified</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono shrink-0">
                    <button
                        type="button"
                        onClick={() => navigate('/student/onboarding')}
                        className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0D0F14] border border-white/[0.08] hover:border-white/20 text-[#888888] hover:text-white text-[11px] transition-colors cursor-pointer"
                        title="Edit Profile & Resume"
                    >
                        <User className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.75} aria-hidden="true" />
                        <span className="text-[#f5f5f5] font-semibold max-w-[140px] truncate">{candidateName}</span>
                    </button>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-rose-500/30 text-[#E4E4E7] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;
