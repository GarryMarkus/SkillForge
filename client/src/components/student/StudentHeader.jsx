import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHeader = ({ 
    candidateName = 'ALEX_V_092', 
    onLogout, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    verifiedBadge = 'EMITTED'
}) => {
    const navigate = useNavigate();

    return (
        <header 
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-64'} left-0 right-0 z-40 bg-canvas-light border-b border-cad select-none font-mono`} 
            id="AppHeader"
        >
            <div className="h-16 px-space-md flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:block p-1 border border-cad hover:bg-surface-container text-ink-primary cursor-pointer"
                        title="Toggle Navigation Rail"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {sidebarCollapsed ? 'menu_open' : 'menu'}
                        </span>
                    </button>
                    <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-ink-primary tracking-tight font-bold">
                            SKILLFORGE // CONSOLE
                        </span>
                        <span className="font-label-sm text-label-sm bg-surface-container-highest text-ink-primary px-space-xs py-0.5 border border-cad hidden sm:inline-block">
                            [NODE_STATUS: ONLINE // LATENCY: 22ms]
                        </span>
                    </div>
                    <div className="hidden xl:block font-label-md text-label-md text-outline border-l border-cad pl-space-md">
                        ROOT &gt; CANDIDATE_ENVIRONMENT &gt; TELEMETRY_DASHBOARD
                    </div>
                </div>

                <div className="flex items-center gap-space-md font-label-md text-label-md">
                    <div className="hidden sm:flex items-center gap-space-xs border border-cad px-space-sm py-1 bg-surface-container-low">
                        <span>[CANDIDATE: {candidateName.toUpperCase()}]</span>
                        <span className="text-outline">|</span>
                        <span>ROLE: STUDENT</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-space-sm py-1 border border-error text-error hover:bg-error hover:text-on-error transition-none uppercase font-label-md text-label-md cursor-pointer"
                    >
                        [ TERMINATE_SESSION ]
                    </button>
                    <button
                        onClick={() => navigate('/student/onboarding')}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold cursor-pointer hover:ring-2 hover:ring-primary-container"
                        title="Edit Candidate Telemetry"
                    >
                        <span className="material-symbols-outlined text-[18px]">person</span>
                    </button>
                </div>
            </div>

            <div className="h-8 px-space-md bg-surface-container-low border-t border-cad flex items-center justify-between font-label-sm text-label-sm text-ink-primary">
                <div className="flex items-center gap-space-md truncate">
                    <span>ACTIVE_EXAM_TOKEN: <strong className="text-primary font-bold">SF-88219-X</strong></span>
                    <span className="text-outline hidden sm:inline">|</span>
                    <span className="hidden sm:inline">TRUST_INDEX: <strong className="text-ink-primary font-bold">98.4%</strong></span>
                    <span className="text-outline hidden sm:inline">|</span>
                    <span className="hidden sm:inline">VERIFIED_BADGE: <strong className="text-primary font-bold">{verifiedBadge}</strong></span>
                </div>
                <div className="hidden md:flex items-center gap-space-md text-on-surface-variant">
                    <span>GRID: 12-COL FIXED</span>
                    <span>RENDER: DETERMINISTIC</span>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;
