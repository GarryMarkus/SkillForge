import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-sans select-none" id="PersonalityIntroCard">
            {/* Main Briefing Container */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm">
                <div className="border-b border-gray-100 pb-5 mb-6 text-center sm:text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                        Behavioral Assessment
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
                        Discover Your Ideal Learning Pace
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        Answer 7 quick situational questions to help us tailor learning recommendations and matching algorithms to how you solve problems best.
                    </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            1
                        </div>
                        <h4 className="font-semibold text-xs text-gray-900 mb-1">
                            Work Style
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            How you approach new engineering tasks, prioritize backlogs, and decompose complexity.
                        </p>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            2
                        </div>
                        <h4 className="font-semibold text-xs text-gray-900 mb-1">
                            Problem Solving
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            How you investigate bugs, experiment with solutions, and resolve technical blockers.
                        </p>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            3
                        </div>
                        <h4 className="font-semibold text-xs text-gray-900 mb-1">
                            Tailored Pacing
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Generates your recommended learning velocity: Accelerated, Balanced, or Foundational.
                        </p>
                    </div>
                </div>

                {/* What to Expect */}
                <div className="space-y-3 mb-8 text-xs sm:text-sm">
                    <div className="font-semibold text-xs text-gray-700 uppercase tracking-wider mb-2">
                        What to Expect:
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="text-gray-700">7 multiple-choice scenarios based on real engineering situations.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="text-gray-700">Takes approximately 3 to 5 minutes to complete.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="text-gray-700">There are no wrong answers — choose what reflects your true approach.</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Return to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Start Assessment →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
