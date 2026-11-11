import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] select-none font-mono text-[#ededed] relative z-20" id="PersonalityHeader">
            <div className="h-14 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold">
                        SF
                    </span>
                    <span className="text-sm font-display font-bold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]">
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

                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        <span>{isFullscreen ? 'Fullscreen' : 'Windowed'}</span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="px-3 py-1.5 rounded-sm bg-[#121316] border border-white/10 hover:border-rose-500/30 text-[#E4E4E7] hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
