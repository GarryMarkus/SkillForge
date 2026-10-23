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
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Progress Overview
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {completionPercent}%
                    </span>
                </div>

                <div>
                    <div className="flex justify-between items-center text-xs mb-2 font-medium text-gray-600">
                        <span>Answered:</span>
                        <span className="font-semibold text-gray-900">
                            {answeredCount} of {totalQuestions}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercent}%` }}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">
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
                                    className={`py-2 px-1 rounded-xl text-center text-xs font-semibold transition-all cursor-pointer ${
                                        isCurrent
                                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1'
                                            : isAnswered
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-40"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment →'}
                </button>
            </div>
        </aside>
    );
};

export default PersonalityTelemetrySidebar;
