import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-surface-container-lowest border-b border-black/15 select-none font-mono">
            {/* Top Minimalist Console Rail */}
            <div className="h-16 w-full px-margin flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-space-md">
                    <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                        <span className="text-primary-container font-bold">+</span>
                        <span className="font-bold">SKILLFORGE // PSYCHOMETRIC_DIAGNOSTIC_CONSOLE</span>
                    </div>
                    <span className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-primary-container uppercase hidden md:inline-block font-bold">
                        [PHASE_01: ARCHETYPE_SYNTHESIS]
                    </span>
                </div>

                <div className="hidden xl:flex items-center gap-space-xs border border-black/15 bg-surface-container-lowest px-space-md py-space-xs text-label-md font-label-md text-on-surface-variant">
                    <span className="text-primary-container font-bold">LOC:</span>
                    <span>ROOT &gt; CANDIDATE_ENVIRONMENT &gt; BEHAVIORAL_DIAGNOSTIC</span>
                </div>

                <div className="flex items-center gap-space-md">
                    <div className="flex items-center gap-space-xs border-r border-black/15 pr-space-md text-label-sm font-label-sm text-on-surface">
                        <span className="text-outline">PROGRESS:</span>
                        <span className="font-bold text-primary-container">
                            [{String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}]
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-space-xs border border-black/15 px-space-xs py-0.5 text-label-sm font-label-sm">
                        <span className={`w-2 h-2 ${isFullscreen ? 'bg-green-600' : 'bg-amber-500'}`}></span>
                        <span className="text-outline uppercase">
                            {isFullscreen ? 'FULLSCREEN_LOCKED' : 'WINDOWED_MODE'}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="border border-red-300 text-red-700 bg-red-50/50 px-space-sm py-space-xs text-label-sm font-label-sm uppercase hover:bg-red-600 hover:text-white transition-none cursor-pointer font-bold"
                    >
                        [ ABORT_DIAGNOSTIC ]
                    </button>
                </div>
            </div>

            {/* Sub-Header Coordinates Ribbon */}
            <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant shrink-0">
                    <span className="text-primary-container font-bold">
                        [COORD: PSY-0{currentIndex + 1}]
                    </span>
                    <span className="text-on-surface font-bold">
                        DIAGNOSTIC: BEHAVIORAL_ARCHETYPE_&amp;_LEARNING_PACE_SYNTHESIS
                    </span>
                </div>

                <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                    <span className="bg-primary-fixed/40 border border-primary-container/30 px-space-xs py-0.5 text-primary-container font-bold uppercase">
                        ● STATUS: ACTIVE_DIAGNOSTIC
                    </span>
                    <div className="hidden lg:flex items-center gap-space-xs text-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
                        <span>GRID_SYNCHRONIZED</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
