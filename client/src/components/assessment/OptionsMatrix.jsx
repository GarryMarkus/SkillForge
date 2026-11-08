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
        <div className="font-mono flex flex-col gap-4 select-none" id="OptionsMatrix">
            {/* Multiple-Choice Answer Selector Panel */}
            <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-1">
                    <span className="text-xs text-[#737373] font-medium uppercase tracking-wider">
                        [ Candidate Solutions ]
                    </span>
                    <span className="text-xs text-[#555555] font-mono">single choice</span>
                </div>

                {options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectOption(idx)}
                            className={`w-full text-left cursor-pointer p-4 rounded-md flex items-start gap-3.5 transition-all font-mono ${
                                isSelected
                                    ? 'border border-white/40 bg-[#121214] text-white shadow-sm'
                                    : 'border border-white/10 bg-[#0b0b0c] hover:border-white/20 text-[#888888] hover:text-[#ededed]'
                            }`}
                        >
                            <div className={`w-7 h-7 rounded-sm font-mono text-xs font-semibold shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                    ? 'bg-[#111113] text-white border border-white/30'
                                    : 'bg-[#050505] text-[#737373] border border-white/10'
                            }`}>
                                [{letter}]
                            </div>
                            <div className={`flex-1 text-xs sm:text-sm leading-relaxed ${isSelected ? 'font-medium text-white' : 'font-normal'}`}>
                                {option}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="mt-2 pt-4 border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="px-4 py-2 rounded-md border border-white/10 hover:border-white/20 text-[#888888] hover:text-white text-xs font-mono disabled:opacity-30 transition-colors cursor-pointer"
                    type="button"
                >
                    &larr; Previous Question
                </button>

                <div className="flex items-center gap-3">
                    {selectedOptionIdx !== null && selectedOptionIdx !== undefined && (
                        <button
                            onClick={onClearSelection}
                            className="px-3 py-2 text-[#737373] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                            type="button"
                        >
                            [Clear Selection]
                        </button>
                    )}
                    <button
                        onClick={onNextQuestion}
                        className="px-5 py-2 rounded-md bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 text-xs font-mono shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                        type="button"
                    >
                        <span>{isLastQuestion ? '[ Submit Assessment ↗ ]' : '[ Next Question &rarr; ]'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OptionsMatrix;
