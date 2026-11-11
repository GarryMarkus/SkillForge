import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck } from '../ui/Icons';
import BrandLogo from '../common/BrandLogo';

const StudentOnboardingHeader = ({ candidateEmail = 'candidate@skillforge.io' }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] select-none font-mono text-[#ededed] relative z-20" id="StudentOnboardingHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        type="button"
                        onClick={() => navigate('/student/dashboard')}
                        className="flex items-center gap-2.5 cursor-pointer shrink-0"
                    >
                        <BrandLogo className="w-7 h-7" />
                        <span className="text-sm font-display font-bold text-white tracking-tight">
                            SkillForge
                        </span>
                    </button>
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]">
                        <UserCheck className="w-3 h-3 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                        <span>Profile Setup</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="hidden md:flex items-center gap-2 border-r border-white/[0.06] pr-4 text-xs text-[#737373]">
                        <span className="text-[#888888] truncate max-w-[200px]">{candidateEmail}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/student/dashboard')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm border border-white/10 bg-[#121316] text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Dashboard</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentOnboardingHeader;
