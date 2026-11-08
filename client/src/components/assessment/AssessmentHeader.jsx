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
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] font-sans text-white shadow-xs" id="AssessmentHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                        SF
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-white tracking-tight truncate">
                        Practical Skill Evaluation
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.08] text-xs font-medium hidden md:inline-block">
                        Session: {examId}
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium whitespace-nowrap">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-[#181A22] border border-white/[0.08] text-white text-xs font-medium flex items-center gap-2 whitespace-nowrap shadow-xs">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="hidden sm:inline text-zinc-400">Time Remaining:</span>
                        <span className="font-semibold font-mono tracking-wider text-white">
                            {cleanTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Proctoring Active</span>
                    </div>

                    <button
                        onClick={onAbort}
                        className="px-3.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 font-medium transition-colors cursor-pointer text-xs"
                        type="button"
                    >
                        Exit Assessment
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AssessmentHeader;
