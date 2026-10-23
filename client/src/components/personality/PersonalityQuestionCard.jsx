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
        <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D] font-mono flex flex-col justify-between">
            <div>
                {/* Question Coordinate Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-space-sm mb-space-lg">
                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm font-bold text-primary-container uppercase">
                        <span>[ QUESTION_REF: PSY-0{question.id || questionIndex + 1} / 0{totalQuestions} ]</span>
                        <span className="text-black/30">|</span>
                        <span>BEHAVIORAL_METRIC_AXIS</span>
                    </div>

                    <div className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-outline uppercase font-bold">
                        WEIGHT: STANDARD_SCALAR
                    </div>
                </div>

                {/* Problem / Diagnostic Statement */}
                <div className="mb-space-xl">
                    <h2 className="font-headline-md text-headline-md text-on-surface uppercase font-bold tracking-tight leading-snug">
                        {question.question || question.text}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        Select the operational behavior that most accurately describes your standard execution pattern.
                    </p>
                </div>

                {/* Likert / Multi-Choice Matrix */}
                <div className="space-y-space-sm mb-space-xl">
                    {optionsList.map((optText, idx) => {
                        const isSelected = selectedAnswer === optText;
                        const optionNum = String(idx + 1).padStart(2, '0');

                        return (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => onSelectOption(question.id, optText)}
                                className={`w-full p-space-md text-left border flex items-center justify-between gap-space-md cursor-pointer transition-none ${
                                    isSelected
                                        ? 'bg-primary-container text-white border-primary-container shadow-[2px_2px_0px_#191C1D] font-bold'
                                        : 'bg-surface border-black/20 hover:border-black/50 hover:bg-black/5 text-on-surface'
                                }`}
                            >
                                <div className="flex items-center gap-space-md">
                                    <span
                                        className={`px-2 py-0.5 text-label-sm font-label-sm border uppercase ${
                                            isSelected
                                                ? 'bg-white text-primary-container border-white font-bold'
                                                : 'bg-surface-container-low border-black/20 text-outline'
                                        }`}
                                    >
                                        [ {optionNum} ]
                                    </span>
                                    <span className="font-body-md text-body-md">
                                        {optText}
                                    </span>
                                </div>

                                <div className="shrink-0 text-label-sm font-label-sm uppercase">
                                    {isSelected ? '[ SELECTED ]' : '[ SELECT ]'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stepper Navigation Action Rail */}
            <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={questionIndex === 0}
                    className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none font-bold"
                >
                    [ &lt;- PREV_QUESTION ]
                </button>

                <div className="flex items-center gap-space-md">
                    {!isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-primary-container text-white px-space-xl py-2 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-black transition-none cursor-pointer"
                        >
                            [ NEXT_QUESTION -&gt; ]
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canSubmit || isSubmitting}
                            className="bg-primary-container text-white px-space-xl py-2 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-black transition-none cursor-pointer disabled:opacity-50"
                        >
                            {isSubmitting ? '[ TRANSMITTING_TELEMETRY... ]' : '[ SUBMIT_PSYCHOMETRIC_EVALUATION -> ]'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalityQuestionCard;
