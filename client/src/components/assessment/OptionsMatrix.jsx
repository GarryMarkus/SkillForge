import React from 'react';
import { MagneticButton } from '../ui/animations';

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
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between pb-1 border-b border-black/10">
                    <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                        [ PROPOSED RESOLUTION VECTORS (SELECT ONE) ]
                    </span>
                    <span className="text-xs text-outline font-bold">DETERMINISTIC EVALUATION</span>
                </div>

                {options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectOption(idx)}
                            className={`w-full text-left cursor-pointer transition-none p-4 sm:p-5 flex items-start gap-4 select-none ${
                                isSelected
                                    ? 'border-2 border-canvas-blueprint bg-canvas-blueprint text-white shadow-[4px_4px_0px_#001847]'
                                    : 'border border-black/20 bg-surface-container-low hover:border-black/50 hover:bg-surface-container text-ink-primary'
                            }`}
                        >
                            <div className={`font-bold px-2 py-0.5 text-xs sm:text-sm shrink-0 uppercase border ${
                                isSelected
                                    ? 'bg-white text-canvas-blueprint border-white'
                                    : 'bg-surface-container-lowest border-black/20 text-ink-primary'
                            }`}>
                                [ {letter} ]
                            </div>
                            <div className={`flex-1 text-sm sm:text-base leading-relaxed ${isSelected ? 'text-white font-bold' : 'text-ink-primary font-medium'}`}>
                                {option}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Navigation & Submission Rail */}
            <div className="mt-2 pt-4 border-t border-black/15 flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="px-5 py-3 border border-black/30 bg-surface-container-lowest text-ink-primary text-xs uppercase hover:bg-black hover:text-white disabled:opacity-30 transition-none font-bold cursor-pointer"
                    type="button"
                >
                    [ &lt;- PREV QUESTION ]
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onClearSelection}
                        className="px-4 py-3 border border-black/20 bg-surface-container text-on-surface-variant text-xs hover:text-ink-primary hover:bg-black/10 transition-none uppercase cursor-pointer font-bold"
                        type="button"
                    >
                        [ CLEAR ]
                    </button>
                    <MagneticButton strength={0.2} maxDisplacement={6}>
                        <button
                            onClick={onNextQuestion}
                            className="px-6 py-3 bg-canvas-blueprint text-white border-2 border-canvas-blueprint text-xs sm:text-sm hover:bg-black shadow-[3px_3px_0px_#0A0A0A] transition-none font-bold uppercase tracking-wider cursor-pointer"
                            type="button"
                        >
                            {isLastQuestion ? '[ SUBMIT EVALUATION → ]' : '[ COMMIT & NEXT → ]'}
                        </button>
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
};

export default OptionsMatrix;
