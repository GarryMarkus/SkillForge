import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHeader = ({ 
    candidateName = 'ENGINEER_01', 
    onLogout, 
    sidebarCollapsed, 
    setSidebarCollapsed
}) => {
    const navigate = useNavigate();

    return (
        <header 
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-64'} left-0 right-0 z-40 bg-surface border-b border-black/15 select-none font-mono`} 
            id="AppHeader"
        >
            <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:block p-1.5 border border-black/20 hover:bg-black hover:text-white text-ink-primary cursor-pointer transition-none"
                        title="Toggle Navigation Rail"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {sidebarCollapsed ? 'menu_open' : 'menu'}
                        </span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-headline-sm text-ink-primary tracking-tight">
                            SKILLFORGE // CANDIDATE CONSOLE
                        </span>
                        <span className="border border-primary-container/30 bg-primary-fixed/30 px-2 py-0.5 text-xs text-primary-container font-bold hidden sm:inline-block">
                            [ SYSTEM STATUS: ACTIVE ]
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs">
                    <div className="hidden sm:flex items-center gap-2 border border-black/15 px-3 py-1 bg-surface-container-low">
                        <span className="font-bold text-ink-primary">[{candidateName.toUpperCase()}]</span>
                        <span className="text-black/30">|</span>
                        <span className="text-outline">ROLE: STUDENT</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-none uppercase font-bold cursor-pointer"
                    >
                        [ LOGOUT ]
                    </button>

                    <button
                        onClick={() => navigate('/student/onboarding')}
                        className="w-8 h-8 rounded-none bg-primary-container flex items-center justify-center text-white font-bold cursor-pointer hover:bg-black transition-none text-xs"
                        title="Edit Candidate Telemetry"
                    >
                        CD
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;
