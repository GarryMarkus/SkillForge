import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentOnboardingHeader = ({ candidateEmail = 'candidate@skillforge.io' }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] select-none font-sans text-white" id="StudentOnboardingHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        SF
                    </span>
                    <span className="text-base font-semibold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Profile Setup
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden md:flex items-center gap-2 border-r border-white/[0.08] pr-4 text-xs text-zinc-400">
                        <span className="font-medium text-zinc-300">{candidateEmail}</span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="px-3.5 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-xs text-zinc-300 font-medium hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentOnboardingHeader;
