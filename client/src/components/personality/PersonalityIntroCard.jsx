import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-sans select-none" id="PersonalityIntroCard">
            {/* Main Briefing Container */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-10 shadow-sm text-white">
                <div className="border-b border-white/[0.08] pb-5 mb-6 text-center sm:text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                        Behavioral Assessment
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                        Discover Your Ideal Learning Pace
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        Answer 7 situational questions to help us tailor learning recommendations and matching algorithms to how you solve problems best.
                    </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            1
                        </div>
                        <h4 className="font-semibold text-xs text-white mb-1">
                            Work Style
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            How you approach new engineering tasks, prioritize backlogs, and decompose complexity.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            2
                        </div>
                        <h4 className="font-semibold text-xs text-white mb-1">
                            Problem Solving
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            How you investigate bugs, experiment with solutions, and resolve technical blockers.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-4">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                            3
                        </div>
                        <h4 className="font-semibold text-xs text-white mb-1">
                            Tailored Pacing
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Generates your recommended learning velocity: Accelerated, Balanced, or Foundational.
                        </p>
                    </div>
                </div>

                {/* What to Expect */}
                <div className="space-y-3 mb-8 text-xs sm:text-sm">
                    <div className="font-medium text-xs text-zinc-400 uppercase tracking-wider mb-2">
                        What to Expect:
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-blue-400 font-bold">•</span>
                        <span className="text-zinc-300">7 multiple-choice scenarios based on real engineering situations.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-blue-400 font-bold">•</span>
                        <span className="text-zinc-300">Takes approximately 3 to 5 minutes to complete.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-blue-400 font-bold">•</span>
                        <span className="text-zinc-300">There are no wrong answers — choose what reflects your true approach.</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-6 py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        Return to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Start Assessment →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
