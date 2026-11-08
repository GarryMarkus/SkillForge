import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientOnboardingHeader = ({ clientEmail = 'recruiter@enterprise.io' }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-[#050505] border-b border-white/[0.06] select-none font-mono text-[#ededed]" id="ClientOnboardingHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] text-xs font-mono">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono text-[#888888] bg-[#0b0b0c] border border-white/10">
                        [recruiter: onboarding]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden md:flex items-center gap-2 border-r border-white/[0.06] pr-4 text-xs text-[#737373]">
                        <span className="text-[#888888]">{clientEmail}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/client/dashboard')}
                        className="px-3 py-1.5 rounded-md border border-white/10 bg-[#0b0b0c] text-xs font-mono text-[#888888] hover:text-white hover:border-white/25 transition-colors cursor-pointer"
                    >
                        [ Dashboard ↗ ]
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ClientOnboardingHeader;
