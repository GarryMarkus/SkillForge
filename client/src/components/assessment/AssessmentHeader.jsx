import React from 'react';

const AssessmentHeader = ({
    examId = 'SF-2026-09',
    currentQuestion = 0,
    totalQuestions = 5,
    formattedTime = '18:42',
    onAbort
}) => {
    const cleanTime = String(formattedTime).replace(/[[\]]/g, '').trim();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-white/[0.06] font-mono text-[#ededed] select-none" id="AssessmentHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono font-bold text-xs">
                        SF
                    </div>
                    <span className="text-sm font-display font-bold text-white tracking-tight truncate">
                        Skill Evaluation
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-[#0b0b0c] text-[#888888] border border-white/10 text-[11px] font-mono hidden md:inline-block">
                        Session {examId}
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="px-2.5 py-1 rounded-sm bg-[#0b0b0c] text-[#888888] border border-white/10 whitespace-nowrap">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </div>

                    <div className="px-2.5 py-1 rounded-sm bg-[#111113] border border-white/20 text-white flex items-center gap-2 whitespace-nowrap">
                        <span className="hidden sm:inline text-[#737373]">Remaining:</span>
                        <span className="font-semibold font-mono tracking-wider text-white">
                            {cleanTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0b0b0c] text-[#888888] border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
                        <span>Proctoring Active</span>
                    </div>

                    <button
                        onClick={onAbort}
                        className="px-3 py-1.5 rounded-md border border-white/10 hover:border-rose-500/30 text-[#888888] hover:text-rose-300 transition-colors cursor-pointer text-xs font-mono"
                        type="button"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AssessmentHeader;
