import React from 'react';

const AssessmentHeader = ({
    examId = 'SF-2026-DISTRIBUTED-09',
    currentQuestion = 0,
    totalQuestions = 5,
    formattedTime = '[ 18:42 ]',
    onAbort
}) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-black/15 select-none font-mono" id="AssessmentHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm font-bold text-ink-primary uppercase tracking-tight truncate">
                        SKILLFORGE // PROCTOR RUNNER
                    </span>
                    <span className="border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs text-outline font-bold hidden md:inline-block">
                        EXAM: {examId}
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="px-3 py-1 bg-surface-container border border-black/15 text-xs font-bold whitespace-nowrap">
                        <span className="text-on-surface-variant">QUESTION:</span>{' '}
                        <span className="text-canvas-blueprint font-bold">
                            [ {String(currentQuestion + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} ]
                        </span>
                    </div>

                    <div className="px-3.5 py-1 bg-ink-primary text-white border border-ink-primary text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_#1D52B8] whitespace-nowrap">
                        <span className="inline-block w-2 h-2 bg-red-500 animate-pulse"></span>
                        <span className="hidden sm:inline">REMAINING:</span>
                        <span className="font-bold text-sm tracking-wider">
                            {formattedTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-green-600/30 bg-green-50 text-green-800 font-bold">
                        <span className="w-1.5 h-1.5 bg-green-600 inline-block"></span>
                        <span>[ HARDWARE LOCK: ENGAGED ]</span>
                    </div>

                    <button
                        onClick={onAbort}
                        className="px-3 py-1.5 border border-red-300 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white uppercase transition-none font-bold cursor-pointer"
                        type="button"
                    >
                        [ ABORT EXAM ]
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AssessmentHeader;
