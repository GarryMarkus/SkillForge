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
            <div className="bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-4 space-y-3 text-[#ededed]">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#8a8a8e] font-medium">
                        Progress
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] font-mono">
                        {completionPercent}%
                    </span>
                </div>

                <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 text-[#888888]">
                        <span>Answered:</span>
                        <span className="text-white font-mono font-semibold">
                            {answeredCount} / {totalQuestions}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-[#060709] border border-white/[0.08] rounded-none overflow-hidden">
                        <div
                            className="h-full bg-[#F5F5F5] transition-all duration-300"
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
                                    className={`py-1.5 px-1 rounded-sm text-center text-xs font-mono transition-colors cursor-pointer ${
                                        isCurrent
                                            ? 'bg-[#F5F5F5] text-[#050505] font-semibold border border-[#F5F5F5]'
                                            : isAnswered
                                            ? 'bg-[#060709] text-zinc-300 border border-white/15'
                                            : 'bg-[#060709] text-[#555555] border border-white/[0.06] hover:border-white/20'
                                    }`}
                                >
                                    <div>{idx + 1}</div>
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
                    className="w-full bg-[#121316] hover:bg-[#1a1d24] text-[#E4E4E7] hover:text-white border border-white/15 hover:border-white/25 py-2 px-3 rounded-sm text-xs font-mono transition-colors cursor-pointer disabled:opacity-40"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Calibration ↗'}
                </button>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
