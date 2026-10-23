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
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Select the Best Solution
                    </span>
                    <span className="text-xs text-gray-400">Single Choice</span>
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
                                    ? 'border-2 border-blue-600 bg-blue-50/40 text-blue-950 shadow-sm'
                                    : 'border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 text-gray-800'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl font-bold text-sm shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-700'
                            }`}>
                                {letter}
                            </div>
                            <div className={`flex-1 text-sm sm:text-base leading-relaxed ${isSelected ? 'font-semibold text-blue-950' : 'font-medium text-gray-800'}`}>
                                {option}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="mt-2 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                    type="button"
                >
                    ← Previous Question
                </button>

                <div className="flex items-center gap-3">
                    {selectedOptionIdx !== null && selectedOptionIdx !== undefined && (
                        <button
                            onClick={onClearSelection}
                            className="px-4 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                            type="button"
                        >
                            Clear Selection
                        </button>
                    )}
                    <button
                        onClick={onNextQuestion}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
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
