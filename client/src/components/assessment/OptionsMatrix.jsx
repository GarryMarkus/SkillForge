import React from 'react';

const OptionsMatrix = ({
    options = [],
    selectedOptionIdx,
    onSelectOption,
    onPrevQuestion,
    onNextQuestion,
    onClearSelection,
    isFirstQuestion,
    isLastQuestion
}) => {
    return (
        <div className="font-sans flex flex-col gap-5 select-none" id="OptionsMatrix">
            {/* Multiple-Choice Answer Selector Panel */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between pb-1">
                    <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        Select the Best Solution
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Single Choice</span>
                </div>

                {options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectOption(idx)}
                            className={`w-full text-left cursor-pointer p-4 sm:p-5 rounded-2xl flex items-start gap-4 transition-all ${
                                isSelected
                                    ? 'border border-blue-500 bg-blue-500/10 text-white shadow-sm'
                                    : 'border border-white/[0.08] bg-[#121318] hover:border-white/[0.15] hover:bg-white/[0.02] text-zinc-300'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl font-semibold text-sm shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white/[0.06] text-zinc-300 border border-white/[0.08]'
                            }`}>
                                {letter}
                            </div>
                            <div className={`flex-1 text-sm sm:text-base leading-relaxed ${isSelected ? 'font-medium text-white' : 'font-normal text-zinc-300'}`}>
                                {option}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="mt-2 pt-4 border-t border-white/[0.08] flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="px-5 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-zinc-300 text-xs sm:text-sm font-medium disabled:opacity-30 transition-colors cursor-pointer"
                    type="button"
                >
                    ← Previous Question
                </button>

                <div className="flex items-center gap-3">
                    {selectedOptionIdx !== null && selectedOptionIdx !== undefined && (
                        <button
                            onClick={onClearSelection}
                            className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.04] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                            type="button"
                        >
                            Clear Selection
                        </button>
                    )}
                    <button
                        onClick={onNextQuestion}
                        className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                        type="button"
                    >
                        <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OptionsMatrix;
