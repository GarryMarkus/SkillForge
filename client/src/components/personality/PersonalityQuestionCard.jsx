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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm font-sans select-none flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                        <span>Question {questionIndex + 1} of {totalQuestions}</span>
                    </div>

                    <span className="text-xs text-gray-400">
                        Select one option
                    </span>
                </div>

                {/* Problem Statement */}
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                        {question.question || question.text}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
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
                                className={`w-full p-4 sm:p-5 text-left rounded-xl border-2 flex items-center justify-between gap-4 cursor-pointer transition-all ${
                                    isSelected
                                        ? 'bg-blue-50/70 text-gray-900 border-blue-600 shadow-sm'
                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                                            isSelected
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {optionLetter}
                                    </span>
                                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                                        {optText}
                                    </span>
                                </div>

                                <div className={`shrink-0 text-xs font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {isSelected ? 'Selected ✓' : 'Select'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                    ← Previous
                </button>

                <div className="flex items-center gap-4">
                    {!isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                            Next Question →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canSubmit || isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
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
