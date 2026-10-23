import React from 'react';

const PersonalityTelemetrySidebar = ({
    questions = [],
    currentIndex = 0,
    answers = {},
    onJump,
    onSubmit,
    canSubmit = false,
    isSubmitting = false
}) => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const completionPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

    return (
        <aside className="w-full lg:w-80 shrink-0 space-y-4 font-mono select-none" id="PersonalityTelemetrySidebar">
            {/* Cobalt Spec Summary Card */}
            <div className="bg-canvas-blueprint text-white border border-primary p-5 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                    <span className="text-xs uppercase tracking-wider text-white font-bold">
                        [ ARCHETYPE INDEX ]
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 text-[11px] border border-white/30 uppercase font-bold text-green-300">
                        {completionPercent}%
                    </span>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                        <span className="text-white/80">COMPLETION:</span>
                        <span className="text-white">
                            {answeredCount} / {totalQuestions}
                        </span>
                    </div>
                    {/* Hairline Monospace Progress Bar */}
                    <div className="h-2 w-full border border-white/40 bg-white/10 p-[1px]">
                        <div
                            className="h-full bg-white transition-all duration-200"
                            style={{ width: `${completionPercent}%` }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-1.5 text-xs text-white/80 border-t border-white/20 pt-3">
                    <div className="font-bold text-white uppercase">[ PACING THRESHOLDS ]:</div>
                    <div className="flex justify-between">
                        <span>PTS &gt;= 24:</span>
                        <span className="font-bold text-green-300">ACCELERATED</span>
                    </div>
                    <div className="flex justify-between">
                        <span>PTS 16-23:</span>
                        <span className="font-bold text-blue-200">STANDARD</span>
                    </div>
                    <div className="flex justify-between">
                        <span>PTS &lt; 16:</span>
                        <span className="font-bold text-amber-200">FOUNDATIONAL</span>
                    </div>
                </div>
            </div>

            {/* Matrix Question Navigator */}
            <div className="bg-surface-container-lowest border border-black/20 p-5 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="border-b border-black/15 pb-2 mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-ink-primary">
                        QUESTION INDEX MAP
                    </span>
                    <span className="text-[11px] text-outline font-bold">
                        NAVIGATOR
                    </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                    {questions.map((q, idx) => {
                        const isAnswered = Boolean(answers[q.id]);
                        const isCurrent = idx === currentIndex;

                        let styleClasses = 'bg-surface border-black/20 text-ink-primary hover:border-black/50';
                        if (isCurrent) {
                            styleClasses = 'bg-canvas-blueprint text-white border-canvas-blueprint font-bold shadow-[2px_2px_0px_#0A0A0A]';
                        } else if (isAnswered) {
                            styleClasses = 'bg-blue-50 border-canvas-blueprint/40 text-canvas-blueprint font-bold';
                        }

                        return (
                            <button
                                type="button"
                                key={q.id || idx}
                                onClick={() => onJump(idx)}
                                className={`p-2 border text-center cursor-pointer transition-none ${styleClasses}`}
                            >
                                <div className="text-xs font-bold font-mono">
                                    0{idx + 1}
                                </div>
                                <div className="text-[9px] uppercase tracking-tighter">
                                    {isCurrent ? 'ACTIVE' : isAnswered ? 'SAVED' : 'OPEN'}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Direct Final Submission Trigger */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="w-full bg-canvas-blueprint text-white py-3 px-4 text-xs uppercase font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer disabled:opacity-40 shadow-[2px_2px_0px_#0A0A0A]"
                >
                    {isSubmitting ? '[ SUBMITTING... ]' : '[ SUBMIT EVALUATION → ]'}
                </button>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
