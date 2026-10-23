import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-surface-container-lowest border-b border-black/15 select-none font-mono" id="PersonalityHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm sm:text-base font-bold text-ink-primary uppercase tracking-tight truncate">
                        SKILLFORGE // PSYCHOMETRIC EVALUATION CONSOLE
                    </span>
                    <span className="border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs font-bold text-canvas-blueprint uppercase hidden md:inline-block">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 border-r border-black/15 pr-4 text-xs font-bold">
                        <span className="text-outline">PROGRESS:</span>
                        <span className="text-canvas-blueprint">
                            [ {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} ]
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 border border-black/15 px-2.5 py-1 text-xs font-bold">
                        <span className={`w-2 h-2 ${isFullscreen ? 'bg-green-600' : 'bg-amber-500'}`}></span>
                        <span className="text-outline uppercase">
                            {isFullscreen ? 'FULLSCREEN' : 'WINDOWED'}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="border border-red-300 text-red-700 bg-red-50/50 px-3 py-1.5 text-xs uppercase hover:bg-red-600 hover:text-white transition-none cursor-pointer font-bold"
                    >
                        [ ABORT ]
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
