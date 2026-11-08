import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] select-none font-sans text-white" id="PersonalityHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        SF
                    </span>
                    <span className="text-base font-semibold text-white tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Learning Style Assessment
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 border-r border-white/[0.08] pr-4 text-xs font-medium text-zinc-400">
                        <span>Question</span>
                        <span className="font-semibold text-white font-mono">
                            {currentIndex + 1} of {totalQuestions}
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        <span className={`w-2 h-2 rounded-full ${isFullscreen ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                        <span>{isFullscreen ? 'Fullscreen' : 'Windowed'}</span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="px-3.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                    >
                        Exit Assessment
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
