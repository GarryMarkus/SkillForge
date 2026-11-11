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
        <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-8 font-mono select-none flex flex-col justify-between text-[#ededed]">
            <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-5">
                    <div className="text-xs font-semibold text-[#8a8a8e]">
                        <span>Question {questionIndex + 1} of {totalQuestions}</span>
                    </div>

                    <span className="text-xs text-[#71717A] font-mono">
                        Single Selection
                    </span>
                </div>

                {/* Problem Statement */}
                <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-tight leading-snug">
                        {question.question || question.text}
                    </h2>
                    <p className="text-xs text-[#888888] mt-1.5 leading-relaxed">
                        Select the approach that matches your operational workflow.
                    </p>
                </div>

                {/* Option Cards */}
                <div className="space-y-2.5 mb-6">
                    {optionsList.map((optText, idx) => {
                        const isSelected = selectedAnswer === optText;
                        const optionLetter = String.fromCharCode(65 + idx);

                        return (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => onSelectOption(question.id, optText)}
                                className={`w-full p-3.5 text-left rounded-md border flex items-center justify-between gap-3 cursor-pointer transition-colors font-mono text-xs ${
                                    isSelected
                                        ? 'bg-[#181B22] text-white border-white/30 border-t-white/40'
                                        : 'bg-[#060709] border-white/[0.08] hover:border-white/20 text-[#888888] hover:text-[#ededed]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                                            isSelected
                                                ? 'bg-[#F5F5F5] text-[#050505] border border-[#F5F5F5]'
                                                : 'bg-[#0D0F14] text-[#888888] border border-white/[0.08]'
                                        }`}
                                    >
                                        {optionLetter}
                                    </span>
                                    <span className="text-xs sm:text-sm leading-relaxed">
                                        {optText}
                                    </span>
                                </div>

                                <div className={`shrink-0 text-xs font-mono ${isSelected ? 'text-white' : 'text-[#444444]'}`}>
                                    {isSelected ? '✓' : ''}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                    &larr; Previous
                </button>

                <div className="flex items-center gap-3">
                    {!isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canSubmit || isSubmitting}
                            className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer disabled:opacity-40"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Calibration ↗'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuestionCard;
