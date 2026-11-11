import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Check, RotateCcw } from 'lucide-react';

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
                    <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">
                        Choose Answer
                    </span>
                    <span className="text-[11px] text-[#71717A] font-mono">Single choice</span>
                </div>

                {options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectOption(idx)}
                            className={`w-full text-left cursor-pointer p-4 rounded-md flex items-center gap-3.5 transition-colors font-mono ${
                                isSelected
                                    ? 'border border-white/30 border-t-white/40 bg-[#181B22] text-white'
                                    : 'border border-white/[0.08] border-t-white/15 bg-[#0D0F14] hover:border-white/20 text-[#888888] hover:text-[#ededed]'
                            }`}
                        >
                            <div className={`w-7 h-7 rounded-sm font-mono text-xs font-semibold shrink-0 flex items-center justify-center transition-colors ${
                                isSelected
                                    ? 'bg-[#F5F5F5] text-[#050505] border border-[#F5F5F5]'
                                    : 'bg-[#060709] text-[#888888] border border-white/[0.08]'
                            }`}>
                                {letter}
                            </div>
                            <div className={`flex-1 text-xs sm:text-sm leading-relaxed ${isSelected ? 'font-medium text-white' : 'font-normal'}`}>
                                {option}
                            </div>
                            {isSelected && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="mt-2 pt-4 border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-[#E4E4E7] hover:text-white text-xs font-mono disabled:opacity-30 transition-colors cursor-pointer"
                    type="button"
                >
                    <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Previous</span>
                </button>

                <div className="flex items-center gap-3">
                    {selectedOptionIdx !== null && selectedOptionIdx !== undefined && (
                        <button
                            onClick={onClearSelection}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-[#888888] hover:text-white text-xs font-mono transition-colors cursor-pointer"
                            type="button"
                        >
                            <RotateCcw className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                            <span>Clear</span>
                        </button>
                    )}
                    <button
                        onClick={onNextQuestion}
                        className="px-5 py-2.5 rounded-sm bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        type="button"
                    >
                        <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
                        {isLastQuestion ? (
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        ) : (
                            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OptionsMatrix;
