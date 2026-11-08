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
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-60'} left-0 right-0 z-40 bg-[#09090B] border-b border-white/[0.08] font-sans shadow-sm transition-all`} 
            id="AppHeader"
        >
            <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                        title="Toggle Navigation Menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {sidebarCollapsed ? 'menu_open' : 'menu'}
                        </span>
                    </button>
                    <div className="flex items-center gap-2.5">
                        <span className="font-semibold text-base text-white tracking-tight">
                            Candidate Portal
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hidden sm:inline-flex">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Verified Profile
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-sm">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
                        <span className="font-semibold text-white">{candidateName}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400">Software Engineer</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3 py-1.5 rounded-lg border border-zinc-700/80 hover:border-rose-500/40 text-zinc-300 hover:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>

                    <button
                        onClick={() => navigate('/student/onboarding')}
                        className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs cursor-pointer hover:bg-blue-500 transition-colors shadow-sm"
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
