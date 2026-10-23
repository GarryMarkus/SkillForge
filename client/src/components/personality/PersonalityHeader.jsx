import React from 'react';

const PersonalityHeader = ({
    currentIndex = 0,
    totalQuestions = 7,
    isFullscreen = false,
    onAbort
}) => {
    return (
        <header className="w-full bg-white border-b border-gray-200 select-none font-sans" id="PersonalityHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        SF
                    </span>
                    <span className="text-base font-bold text-gray-900 tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        Learning Style Assessment
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-4 text-xs font-medium text-gray-500">
                        <span>Question</span>
                        <span className="font-semibold text-gray-900">
                            {currentIndex + 1} of {totalQuestions}
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <span className={`w-2 h-2 rounded-full ${isFullscreen ? 'bg-green-500' : 'bg-amber-400'}`}></span>
                        <span>{isFullscreen ? 'Fullscreen' : 'Windowed'}</span>
                    </div>

                    <button
                        type="button"
                        onClick={onAbort}
                        className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Exit Assessment
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PersonalityHeader;
