import React from 'react';

const PersonalityQuestionCard = ({
    question,
    questionIndex = 0,
    totalQuestions = 7,
    selectedAnswer = '',
    onSelectOption,
    onPrev,
    onNext,
    onSubmit,
    isLastQuestion = false,
    canSubmit = false,
    isSubmitting = false
}) => {
    if (!question) return null;

    const optionsList = question.options ? Object.keys(question.options) : [];

    return (
        <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-10 shadow-sm font-sans select-none flex flex-col justify-between text-white">
            <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                        <span>Question {questionIndex + 1} of {totalQuestions}</span>
                    </div>

                    <span className="text-xs text-zinc-500 font-mono">
                        Select one option
                    </span>
                </div>

                {/* Problem Statement */}
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                        {question.question || question.text}
                    </h2>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                        Choose the response that best describes your typical approach to this situation.
                    </p>
                </div>

                {/* Option Cards */}
                <div className="space-y-3 mb-8">
                    {optionsList.map((optText, idx) => {
                        const isSelected = selectedAnswer === optText;
                        const optionLetter = String.fromCharCode(65 + idx);

                        return (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => onSelectOption(question.id, optText)}
                                className={`w-full p-4 sm:p-5 text-left rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                                    isSelected
                                        ? 'bg-blue-500/10 text-white border-blue-500 shadow-sm'
                                        : 'bg-white/[0.02] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] text-zinc-300'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                                            isSelected
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white/[0.06] text-zinc-400 border border-white/[0.08]'
                                        }`}
                                    >
                                        {optionLetter}
                                    </span>
                                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                                        {optText}
                                    </span>
                                </div>

                                <div className={`shrink-0 text-xs font-medium ${isSelected ? 'text-blue-400' : 'text-zinc-500'}`}>
                                    {isSelected ? 'Selected ✓' : 'Select'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    className="px-6 py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                    ← Previous
                </button>

                <div className="flex items-center gap-4">
                    {!isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                            Next Question →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canSubmit || isSubmitting}
                            className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Assessment →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuestionCard;
