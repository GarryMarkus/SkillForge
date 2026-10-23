import React from 'react';

const AssessmentHeader = ({
    examId = 'SF-2026-DISTRIBUTED-09',
    currentQuestion = 0,
    totalQuestions = 5,
    formattedTime = '[ 18:42 ]',
    onAbort
}) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-on-surface/20 select-none font-mono" id="AssessmentHeader">
            <div className="h-14 w-full px-4 lg:px-6 flex items-center justify-between gap-4 font-body-md">
                <div className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 bg-canvas-blueprint"></span>
                    <span className="font-label-md text-label-md text-ink-primary uppercase tracking-wider font-bold truncate">
                        SKILLFORGE // PROCTOR_RUNNER_v2.4
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold hidden md:inline-block">
                        [EXAM_ID: {examId}]
                    </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="px-2.5 py-1 bg-surface-container border border-on-surface/20 font-label-md text-label-md whitespace-nowrap">
                        <span className="text-on-surface-variant">QUESTION:</span>{' '}
                        <span className="text-canvas-blueprint font-bold">
                            [ {String(currentQuestion + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} ]
                        </span>
                    </div>
                    <div className="px-3 py-1 bg-ink-primary text-white border border-ink-primary font-label-md text-label-md flex items-center gap-1.5 shadow-[2px_2px_0px_#1D52B8] whitespace-nowrap">
                        <span className="inline-block w-1.5 h-1.5 bg-error animate-ping"></span>
                        <span className="hidden sm:inline">TIME_REMAINING:</span>
                        <span className="font-headline-sm text-headline-sm text-white tracking-tight">
                            {formattedTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 font-label-sm text-label-sm">
                    <div className="hidden md:flex items-center gap-1 px-2 py-0.5 border border-on-surface/25 bg-surface-container-low font-bold text-ink-primary">
                        <span>[FULLSCREEN_LOCK: ENFORCED]</span>
                    </div>
                    <div className="hidden xl:flex items-center gap-1 px-2 py-0.5 border border-on-surface/20 bg-surface-container-low text-on-surface-variant">
                        <span>[WINDOW_FOCUS: LOCKED]</span>
                    </div>
                    <button
                        onClick={onAbort}
                        className="px-2.5 py-1 border border-error bg-error-container text-on-error-container font-label-sm text-label-sm hover:bg-error hover:text-on-error uppercase transition-none font-bold cursor-pointer"
                        type="button"
                    >
                        [ TERMINATE_TEST_ABORT ]
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AssessmentHeader;
