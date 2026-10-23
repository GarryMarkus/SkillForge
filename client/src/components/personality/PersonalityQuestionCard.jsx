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
        <div className="bg-surface-container-lowest border border-black/20 p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A] font-mono select-none flex flex-col justify-between">
            <div>
                {/* Question Coordinate Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-canvas-blueprint uppercase">
                        <span>[ QUESTION {String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} ]</span>
                        <span className="text-black/30">|</span>
                        <span>BEHAVIORAL AXIS</span>
                    </div>

                    <div className="border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs text-outline uppercase font-bold">
                        WEIGHT: STANDARD
                    </div>
                </div>

                {/* Problem / Diagnostic Statement */}
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl text-ink-primary uppercase font-bold tracking-tight leading-snug">
                        {question.question || question.text}
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-2 leading-relaxed font-mono">
                        Select the operational behavior that most accurately describes your standard engineering execution pattern.
                    </p>
                </div>

                {/* Likert / Multi-Choice Matrix */}
                <div className="space-y-3 mb-8">
                    {optionsList.map((optText, idx) => {
                        const isSelected = selectedAnswer === optText;
                        const optionNum = String(idx + 1).padStart(2, '0');

                        return (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => onSelectOption(question.id, optText)}
                                className={`w-full p-4 sm:p-5 text-left border flex items-center justify-between gap-4 cursor-pointer transition-none ${
                                    isSelected
                                        ? 'bg-blue-50/70 text-ink-primary border-canvas-blueprint shadow-[3px_3px_0px_#1D52B8] font-bold'
                                        : 'bg-surface border-black/20 hover:border-black/50 hover:bg-black/5 text-ink-primary'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-2.5 py-1 text-xs border uppercase font-mono font-bold ${
                                            isSelected
                                                ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                                : 'bg-surface-container border-black/20 text-outline'
                                        }`}
                                    >
                                        [ {optionNum} ]
                                    </span>
                                    <span className="text-xs sm:text-sm font-mono leading-relaxed">
                                        {optText}
                                    </span>
                                </div>

                                <div className={`shrink-0 text-xs uppercase font-bold font-mono ${isSelected ? 'text-canvas-blueprint' : 'text-outline'}`}>
                                    {isSelected ? '[ SELECTED ✓ ]' : '[ SELECT ]'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Navigation Action Rail */}
            <div className="pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    className="px-6 py-3.5 border border-black/25 text-xs sm:text-sm uppercase hover:bg-black/5 transition-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none font-bold"
                >
                    [ ← PREVIOUS QUESTION ]
                </button>

                <div className="flex items-center gap-4">
                    {!isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-canvas-blueprint text-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A]"
                        >
                            [ NEXT QUESTION → ]
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canSubmit || isSubmitting}
                            className="bg-canvas-blueprint text-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                        >
                            {isSubmitting ? '[ TRANSMITTING ANSWERS... ]' : '[ SUBMIT PSYCHOMETRIC EVALUATION → ]'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuestionCard;
