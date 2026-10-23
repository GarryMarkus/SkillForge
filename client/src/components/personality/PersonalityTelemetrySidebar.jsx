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
        <aside className="w-full lg:w-80 shrink-0 space-y-space-md font-mono select-none">
            {/* Cobalt Spec Summary Card */}
            <div className="bg-canvas-blueprint text-white border border-white/20 p-space-md shadow-[4px_4px_0px_#191C1D]">
                <div className="flex items-center justify-between border-b border-white/20 pb-space-xs mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/80 font-bold">
                        [ SYSTEM_SPEC // ARCHETYPE_INDEX ]
                    </span>
                    <span className="bg-white/10 px-space-xs py-0.5 text-label-sm font-label-sm border border-white/30 uppercase">
                        NODE: PSY-01
                    </span>
                </div>

                <div className="mb-space-md">
                    <div className="flex justify-between items-center text-label-sm mb-1">
                        <span className="text-white/70">COMPLETION_METRIC:</span>
                        <span className="font-bold text-white">
                            {answeredCount} / {totalQuestions} ({completionPercent}%)
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

                <div className="space-y-space-xs text-label-xs text-white/80 border-t border-white/20 pt-space-xs">
                    <div className="font-bold text-white uppercase">[ TARGET_PACING_TIERS ]:</div>
                    <div className="flex justify-between">
                        <span>PTS &gt;= 24:</span>
                        <span className="font-bold text-green-300">ACCELERATED_PACING</span>
                    </div>
                    <div className="flex justify-between">
                        <span>PTS 16-23:</span>
                        <span className="font-bold text-blue-200">STANDARD_CADENCE</span>
                    </div>
                    <div className="flex justify-between">
                        <span>PTS &lt; 16:</span>
                        <span className="font-bold text-amber-200">FOUNDATIONAL_DEPTH</span>
                    </div>
                </div>
            </div>

            {/* Matrix Question Navigator */}
            <div className="bg-surface-container-lowest border border-black/25 p-space-md shadow-[4px_4px_0px_#191C1D]">
                <div className="border-b border-black/15 pb-space-xs mb-space-sm flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface">
                        QUESTION_INDEX_MAP
                    </span>
                    <span className="text-label-xs text-outline">
                        CLICK_TO_NAVIGATE
                    </span>
                </div>

                <div className="grid grid-cols-4 gap-space-xs mb-space-md">
                    {questions.map((q, idx) => {
                        const isAnswered = Boolean(answers[q.id]);
                        const isCurrent = idx === currentIndex;

                        let styleClasses = 'bg-surface border-black/20 text-on-surface hover:border-black/50';
                        if (isCurrent) {
                            styleClasses = 'bg-primary-container text-white border-primary-container font-bold shadow-[2px_2px_0px_#191C1D]';
                        } else if (isAnswered) {
                            styleClasses = 'bg-primary-fixed/30 border-primary-container/40 text-primary-container font-bold';
                        }

                        return (
                            <button
                                type="button"
                                key={q.id || idx}
                                onClick={() => onJump(idx)}
                                className={`p-2 border text-center cursor-pointer transition-none ${styleClasses}`}
                            >
                                <div className="text-label-sm font-bold">
                                    0{idx + 1}
                                </div>
                                <div className="text-[9px] uppercase tracking-tighter">
                                    {isCurrent ? 'ACTIVE' : isAnswered ? 'RECORDED' : 'PENDING'}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Submit Action Block inside Sidebar */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="w-full bg-black text-white px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-black hover:bg-surface hover:text-black transition-none cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                >
                    {isSubmitting ? '[ SUBMITTING... ]' : '[ TRANSMIT_ALL_RESPONSES ]'}
                </button>
            </div>

            {/* Hardware & Environment Integrity Card */}
            <div className="border border-black/20 bg-surface-container-low p-space-sm text-label-xs space-y-1">
                <div className="font-bold text-on-surface uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-600 inline-block"></span>
                    <span>FOCUS_LOCK_TELEMETRY: ACTIVE</span>
                </div>
                <div className="text-on-surface-variant leading-relaxed">
                    Session integrity monitored. Responses are cryptographically bound to your candidate profile ID.
                </div>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
