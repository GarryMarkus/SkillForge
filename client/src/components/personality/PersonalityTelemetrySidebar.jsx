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
        <aside className="w-full lg:w-80 shrink-0 space-y-4 font-sans select-none" id="PersonalityTelemetrySidebar">
            {/* Progress Card */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-5 shadow-sm space-y-4 text-white">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                        Progress Overview
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                        {completionPercent}%
                    </span>
                </div>

                <div>
                    <div className="flex justify-between items-center text-xs mb-2 font-medium text-zinc-400">
                        <span>Answered:</span>
                        <span className="font-semibold text-white font-mono">
                            {answeredCount} of {totalQuestions}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercent}%` }}
                        />
                    </div>
                </div>

                <div className="border-t border-white/[0.08] pt-3">
                    <span className="text-xs font-medium text-zinc-300 block mb-2">
                        Question Navigator
                    </span>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {questions.map((q, idx) => {
                            const isAnswered = Boolean(answers[q.id]);
                            const isCurrent = idx === currentIndex;

                            return (
                                <button
                                    type="button"
                                    key={q.id || idx}
                                    onClick={() => onJump(idx)}
                                    className={`py-2 px-1 rounded-xl text-center text-xs font-medium font-mono transition-all cursor-pointer ${
                                        isCurrent
                                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/50'
                                            : isAnswered
                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            : 'bg-white/[0.02] text-zinc-400 border border-white/[0.08] hover:bg-white/[0.04]'
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
                    className="w-full bg-white hover:bg-zinc-200 text-zinc-950 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-40"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment →'}
                </button>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
