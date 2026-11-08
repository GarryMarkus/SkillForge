import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpskillHeader = ({
    moduleRef = 'Module 1',
    moduleTopic = 'System Architecture',
    isCompleted = false
}) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-white/[0.06] select-none font-mono text-[#ededed]" id="UpskillHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono text-[#888888] bg-[#0b0b0c] border border-white/10">
                        [learning : enclave]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="hidden lg:flex items-center gap-2 border-r border-white/[0.06] pr-4">
                        <span className="text-[#888888]">
                            {moduleRef} &bull; {moduleTopic}
                        </span>
                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-mono bg-[#0b0b0c] text-[#888888] border border-white/10 ml-1">
                            {isCompleted ? '[completed]' : '[in progress]'}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="px-3 py-1.5 rounded-md border border-white/10 bg-[#0b0b0c] text-xs font-mono text-[#888888] hover:text-white hover:border-white/25 transition-colors cursor-pointer flex items-center gap-1"
                    >
                        <span>&larr; return to dashboard</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UpskillHeader;
