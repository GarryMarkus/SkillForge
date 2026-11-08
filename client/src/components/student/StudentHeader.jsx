import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHeader = ({ 
    candidateName = 'Candidate', 
    onLogout, 
    sidebarCollapsed, 
    setSidebarCollapsed
}) => {
    const navigate = useNavigate();

    return (
        <header 
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-60'} left-0 right-0 z-40 bg-[#050505] border-b border-white/[0.06] font-mono select-none transition-all`} 
            id="AppHeader"
        >
            <div className="h-14 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-1.5 rounded-sm border border-white/10 text-[#737373] hover:text-white hover:border-white/20 cursor-pointer transition-colors text-xs font-mono"
                        title="Toggle Navigation Menu"
                    >
                        <span>{sidebarCollapsed ? '+' : '−'}</span>
                    </button>
                    <div className="flex items-center gap-2.5">
                        <span className="font-display font-bold text-sm text-white tracking-tight">
                            Candidate Portal
                        </span>
                        <span className="px-2 py-0.5 rounded-sm bg-[#0b0b0c] border border-white/10 text-[#888888] text-[11px] font-mono hidden sm:inline-block">
                            Profile Verified
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0b0b0c] border border-white/10 text-[#888888] text-[11px]">
                        <span className="text-[#f5f5f5] font-semibold">{candidateName}</span>
                        <span className="text-[#444444]">&bull;</span>
                        <span className="text-[#737373]">Software Engineer</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3 py-1.5 rounded-md border border-white/10 hover:border-rose-500/30 text-[#888888] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        Sign Out
                    </button>

                    <button
                        onClick={() => navigate('/student/onboarding')}
                        className="w-7 h-7 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono text-xs cursor-pointer hover:border-white/40 transition-colors shadow-sm"
                        title="Update Resume &amp; Profile"
                    >
                        {candidateName.charAt(0).toUpperCase()}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;
