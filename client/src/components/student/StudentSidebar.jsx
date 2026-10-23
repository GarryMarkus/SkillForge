import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSidebar = ({ sidebarCollapsed }) => {
    const navigate = useNavigate();

    return (
        <aside 
            className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-surface-container-low border-r border-cad z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex font-mono select-none`}
        >
            <div className="flex flex-col">
                <div className="h-16 px-space-md border-b border-cad flex flex-col justify-center bg-surface-container overflow-hidden">
                    {!sidebarCollapsed ? (
                        <>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">[SUBSYSTEM: CAD_NAV_01]</div>
                            <div className="font-headline-sm text-headline-sm tracking-tight text-ink-primary font-bold">SYSTEM MODULES</div>
                        </>
                    ) : (
                        <div className="text-center font-bold text-canvas-blueprint">SF</div>
                    )}
                </div>
                <div className="p-space-xs font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high border-b border-cad flex justify-between">
                    {!sidebarCollapsed && <span>COORD_X: 00</span>}
                    <span>ORTHO</span>
                </div>

                <nav className="flex flex-col p-space-xs gap-space-xs">
                    <button 
                        className="flex items-center justify-between px-space-md py-space-sm border border-transparent bg-canvas-blueprint text-white font-bold text-left cursor-default"
                    >
                        <span className="truncate">{sidebarCollapsed ? '01' : '01 // TELEMETRY_DASH'}</span>
                        {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-white/80">[01]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/assessment')}
                        className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-ink-primary border border-transparent hover:border-cad text-left transition-none cursor-pointer"
                    >
                        <span className="truncate">{sidebarCollapsed ? '02' : '02 // LIVE_PROCTOR'}</span>
                        {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[02]</span>}
                    </button>
                    <button 
                        onClick={() => {
                            const el = document.getElementById('MatchedPositionsGrid');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-ink-primary border border-transparent hover:border-cad text-left transition-none cursor-pointer"
                    >
                        <span className="truncate">{sidebarCollapsed ? '03' : '03 // ALGO_MATRIX'}</span>
                        {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[03]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/upskill')}
                        className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-ink-primary border border-transparent hover:border-cad text-left transition-none cursor-pointer"
                    >
                        <span className="truncate">{sidebarCollapsed ? '04' : '04 // LEARNING_PIPELINE'}</span>
                        {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[04]</span>}
                    </button>
                    <button 
                        onClick={() => navigate('/student/personality-test')}
                        className="flex items-center justify-between px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-ink-primary border border-transparent hover:border-cad text-left transition-none cursor-pointer"
                    >
                        <span className="truncate">{sidebarCollapsed ? '05' : '05 // SOFT_METRICS'}</span>
                        {!sidebarCollapsed && <span className="font-label-sm text-label-sm text-outline">[05]</span>}
                    </button>
                </nav>
            </div>

            <div className="p-space-md border-t border-cad bg-surface-container text-on-surface-variant font-label-sm text-label-sm space-y-space-xs">
                {!sidebarCollapsed ? (
                    <>
                        <div className="flex justify-between">
                            <span>SYS_INTEGRITY</span>
                            <span className="text-canvas-blueprint font-bold">SECURE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>CAD_LAYER</span>
                            <span>L_SHELL_V2</span>
                        </div>
                        <div className="border-t border-cad/40 pt-space-xs text-outline">
                            AUTONOMOUS VERIFIER
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
