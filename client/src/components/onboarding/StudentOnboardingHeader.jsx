import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentOnboardingHeader = ({ candidateEmail = 'candidate@skillforge.io' }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] select-none font-mono text-[#ededed] relative z-20" id="StudentOnboardingHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] text-xs font-mono font-bold">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]">
                        Candidate Onboarding
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden md:flex items-center gap-2 border-r border-white/[0.06] pr-4 text-xs text-[#737373]">
                        <span className="text-[#888888]">{candidateEmail}</span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="px-3.5 py-1.5 rounded-sm border border-white/10 bg-[#121316] text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        Dashboard ↗
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentOnboardingHeader;
