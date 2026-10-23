import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSidebar = ({ sidebarCollapsed }) => {
    const navigate = useNavigate();

    return (
        <aside 
            className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-surface-container-low border-r border-black/15 z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex font-mono select-none`}
        >
            <div className="flex flex-col">
                <div className="h-16 px-4 border-b border-black/15 flex items-center justify-between bg-surface-container overflow-hidden">
                    {!sidebarCollapsed ? (
                        <div className="font-bold text-ink-primary tracking-tight">
                            CANDIDATE MODULES
                        </div>
                    ) : (
                        <div className="text-center w-full font-bold text-canvas-blueprint">SF</div>
                    )}
                </div>

                <nav className="flex flex-col p-2 gap-1.5">
                    <button 
                        className="flex items-center justify-between px-3 py-2.5 bg-canvas-blueprint text-white font-bold text-left cursor-default text-xs"
                    >
                        <span className="truncate">{sidebarCollapsed ? '01' : '01 // TELEMETRY DASHBOARD'}</span>
                        {!sidebarCollapsed && <span className="text-white/80 font-bold">[01]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/assessment')}
                        className="flex items-center justify-between px-3 py-2.5 text-xs text-on-surface-variant hover:bg-black hover:text-white border border-transparent text-left transition-none cursor-pointer font-bold"
                    >
                        <span className="truncate">{sidebarCollapsed ? '02' : '02 // ASSESSMENT ROOM'}</span>
                        {!sidebarCollapsed && <span className="text-outline">[02]</span>}
                    </button>
                    <button 
                        onClick={() => {
                            const el = document.getElementById('MatchedPositionsGrid');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center justify-between px-3 py-2.5 text-xs text-on-surface-variant hover:bg-black hover:text-white border border-transparent text-left transition-none cursor-pointer font-bold"
                    >
                        <span className="truncate">{sidebarCollapsed ? '03' : '03 // MATCH MATRIX'}</span>
                        {!sidebarCollapsed && <span className="text-outline">[03]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/upskill')}
                        className="flex items-center justify-between px-3 py-2.5 text-xs text-on-surface-variant hover:bg-black hover:text-white border border-transparent text-left transition-none cursor-pointer font-bold"
                    >
                        <span className="truncate">{sidebarCollapsed ? '04' : '04 // LEARNING PIPELINE'}</span>
                        {!sidebarCollapsed && <span className="text-outline">[04]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/personality-test')}
                        className="flex items-center justify-between px-3 py-2.5 text-xs text-on-surface-variant hover:bg-black hover:text-white border border-transparent text-left transition-none cursor-pointer font-bold"
                    >
                        <span className="truncate">{sidebarCollapsed ? '05' : '05 // BEHAVIORAL MATRIX'}</span>
                        {!sidebarCollapsed && <span className="text-outline">[05]</span>}
                    </button>
                </nav>
            </div>

            <div className="p-4 border-t border-black/15 bg-surface-container text-on-surface-variant text-xs space-y-1">
                {!sidebarCollapsed ? (
                    <>
                        <div className="flex justify-between">
                            <span>SESSION STATUS</span>
                            <span className="text-canvas-blueprint font-bold">VERIFIED</span>
                        </div>
                        <div className="text-[10px] text-outline pt-1 border-t border-black/10">
                            AUTONOMOUS TALENT ENGINE
                        </div>
                    </>
                ) : (
                    <div className="text-center font-bold text-canvas-blueprint">●</div>
                )}
            </div>
        </aside>
    );
};

export default StudentSidebar;
