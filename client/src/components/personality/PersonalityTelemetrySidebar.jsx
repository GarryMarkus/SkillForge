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
        <aside className="w-full lg:w-72 shrink-0 space-y-3 font-mono select-none" id="PersonalityTelemetrySidebar">
            {/* Progress Card */}
            <div className="bg-[#0b0b0c] rounded-md border border-white/10 p-4 space-y-3 text-[#ededed]">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">
                        [ Progress ]
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.2 rounded-sm bg-[#050505] text-[#888888] border border-white/10 font-mono">
                        {completionPercent}%
                    </span>
                </div>

                <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 text-[#737373]">
                        <span>Answered:</span>
                        <span className="text-white font-mono font-semibold">
                            {answeredCount} / {totalQuestions}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-[#18181b] rounded-none overflow-hidden">
                        <div
                            className="h-full bg-[#ededed] transition-all duration-300"
                            style={{ width: `${completionPercent}%` }}
                        />
                    </div>
                </div>

                <div className="border-t border-white/[0.06] pt-3">
                    <span className="text-[11px] text-[#737373] block mb-2 uppercase tracking-wider">
                        Question Navigator:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                        {questions.map((q, idx) => {
                            const isAnswered = Boolean(answers[q.id]);
                            const isCurrent = idx === currentIndex;

                            return (
                                <button
                                    type="button"
                                    key={q.id || idx}
                                    onClick={() => onJump(idx)}
                                    className={`py-1.5 px-1 rounded-sm text-center text-xs font-mono transition-all cursor-pointer ${
                                        isCurrent
                                            ? 'bg-[#111113] text-white border border-white/30'
                                            : isAnswered
                                            ? 'bg-[#050505] text-[#888888] border border-white/10'
                                            : 'bg-[#050505] text-[#444444] border border-white/5 hover:border-white/10'
                                    }`}
                                >
                                    <div>[{idx + 1}]</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Direct Final Submission Trigger */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="w-full bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 py-2 px-3 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer disabled:opacity-40"
                >
                    {isSubmitting ? 'Submitting...' : '[ Submit Calibration ↗ ]'}
                </button>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
