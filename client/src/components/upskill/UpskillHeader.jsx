import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpskillHeader = ({
    moduleRef = 'Module 1',
    moduleTopic = 'System Architecture',
    isCompleted = false,
    statusLabel = null
}) => {
    const navigate = useNavigate();
    const resolvedStatus = statusLabel || (isCompleted ? 'Completed' : 'In Progress');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] select-none font-mono text-[#ededed]" id="UpskillHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 shrink-0 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight shrink-0">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] shrink-0">
                        Learning Platform
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono shrink-0">
                    <div className="hidden lg:flex items-center gap-2 border-r border-white/[0.06] pr-4 max-w-md truncate">
                        <span className="text-[#888888] truncate">
                            {moduleRef} &bull; {moduleTopic}
                        </span>
                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08] ml-1 shrink-0">
                            {resolvedStatus}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="px-3.5 py-1.5 rounded-sm border border-white/10 bg-[#121316] text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
                    >
                        <span>&larr; Return to Dashboard</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UpskillHeader;
