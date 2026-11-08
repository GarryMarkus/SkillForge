import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-[#050505] border-b border-white/[0.06] select-none font-mono text-[#ededed]" id="PersonalityHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono text-[#888888] bg-[#0b0b0c] border border-white/10">
                        Psychometric Archetype
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2 border-r border-white/[0.06] pr-4 text-[#888888]">
                        <span>Question</span>
                        <span className="font-semibold text-white">
                            {currentIndex + 1} of {totalQuestions}
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs bg-[#0b0b0c] border border-white/10 text-[#888888]">
                        <span>{isFullscreen ? 'Fullscreen' : 'Windowed'}</span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="px-3 py-1.5 rounded-md border border-white/10 hover:border-rose-500/30 text-[#888888] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
