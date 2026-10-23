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
        <div className="font-mono flex flex-col gap-4 select-none">
            {/* Multiple-Choice Answer Selector Panel */}
            <div className="flex flex-col gap-3" id="OptionsMatrix">
                <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                        [ PROPOSED_ARCHITECTURAL_CORRECTIONS (SELECT EXACTLY ONE) ]
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">DETERMINISTIC_EVAL: ON</span>
                </div>

                {options.map((option, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                        <label
                            key={idx}
                            onClick={() => onSelectOption(idx)}
                            className={`cursor-pointer transition-none p-3.5 flex items-start gap-3 select-none ${
                                isSelected
                                    ? 'border border-canvas-blueprint bg-canvas-blueprint text-white shadow-[3px_3px_0px_#001847]'
                                    : 'border border-on-surface/25 bg-surface-container-low hover:bg-surface-container text-ink-primary'
                            }`}
                        >
                            <div className={`font-label-md text-label-md font-bold px-1.5 py-0.5 ${
                                isSelected
                                    ? 'bg-surface-container-lowest text-canvas-blueprint'
                                    : 'bg-surface-container-lowest border border-on-surface/40 text-ink-primary'
                            }`}>
                                {isSelected ? '[X]' : '[   ]'}
                            </div>
                            <div className={`flex-1 font-body-md text-body-md ${isSelected ? 'text-white font-bold' : 'text-ink-primary'}`}>
                                <span className="font-bold">{letter} //</span> {option}
                            </div>
                        </label>
                    );
                })}
            </div>

            {/* Bottom Navigation & Submission Rail */}
            <div className="mt-2 pt-4 border-t border-on-surface/20 flex flex-wrap justify-between items-center gap-3">
                <button
                    onClick={onPrevQuestion}
                    disabled={isFirstQuestion}
                    className="px-4 py-2 border border-on-surface/40 bg-surface-container-lowest text-ink-primary font-label-md text-label-md hover:bg-surface-container disabled:opacity-30 transition-none font-bold uppercase cursor-pointer"
                    type="button"
                >
                    [ &lt;- PREVIOUS_QUESTION ]
                </button>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={onClearSelection}
                        className="px-3.5 py-2 border border-on-surface/30 bg-surface-container text-on-surface-variant font-label-md text-label-md hover:text-ink-primary hover:bg-surface-container-high transition-none uppercase cursor-pointer"
                        type="button"
                    >
                        [ CLEAR_SELECTION ]
                    </button>
                    <button
                        onClick={onNextQuestion}
                        className="px-5 py-2.5 bg-canvas-blueprint text-white border border-canvas-blueprint font-label-md text-label-md hover:bg-primary shadow-[3px_3px_0px_#191C1D] transition-none font-bold uppercase tracking-wider cursor-pointer"
                        type="button"
                    >
                        {isLastQuestion ? '[ SUBMIT_EXAMINATION -> ]' : '[ COMMIT_ANSWER_&_NEXT -> ]'}
                    </button>
                </div>
            </div>

            {/* Diagnostic Footer Notelet */}
            <div className="p-3 bg-surface-container border border-on-surface/15 flex flex-wrap items-center justify-between font-label-sm text-label-sm text-on-surface-variant gap-2 mt-2">
                <div>NODE_HASH: SHA256:d8c3b17e4 // SCRATCHPAD_SLOT: SECURE_VOLATILE_RAM</div>
                <div className="font-bold text-ink-primary">ACTIVE_INPUT_CARRIER: MOUSE_EVENT_V1</div>
            </div>
        </div>
    );
};

export default OptionsMatrix;
