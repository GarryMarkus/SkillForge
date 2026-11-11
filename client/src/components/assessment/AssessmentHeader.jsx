import React from 'react';
import { ShieldCheck, Clock, ListChecks, LogOut } from '../ui/Icons';
import BrandLogo from '../common/BrandLogo';

const AssessmentHeader = ({
    examId = 'SF-2026-09',
    currentQuestion = 0,
    totalQuestions = 5,
    formattedTime = '18:42',
    onAbort
}) => {
    const cleanTime = String(formattedTime).replace(/[[\]]/g, '').trim();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] font-mono text-[#ededed] select-none" id="AssessmentHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <BrandLogo className="w-7 h-7" />
                    <span className="text-sm font-display font-bold text-white tracking-tight truncate">
                        Skill Evaluation
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px] font-mono hidden md:inline-block">
                        {examId}
                    </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0D0F14] text-zinc-200 border border-white/[0.08] whitespace-nowrap">
                        <ListChecks className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                        <span>{currentQuestion + 1} / {totalQuestions}</span>
                    </div>

                    <div className="px-2.5 py-1 rounded-sm bg-[#111318] border border-white/15 text-white flex items-center gap-1.5 whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} aria-hidden="true" />
                        <span className="font-semibold font-mono tracking-wider text-white">
                            {cleanTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                        <span>Proctoring On</span>
                    </div>

                    <button
                        onClick={onAbort}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-rose-500/30 text-[#E4E4E7] hover:text-rose-300 transition-colors cursor-pointer text-xs font-mono"
                        type="button"
                    >
                        <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AssessmentHeader;
