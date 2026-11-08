import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityIntroCard">
            {/* Main Briefing Container */}
            <div className="bg-[#0b0b0c] rounded-md border border-white/10 p-6 sm:p-9 text-[#ededed]">
                <div className="border-b border-white/[0.06] pb-5 mb-6 text-center sm:text-left">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                        Psychometric Calibration
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-2">
                        Engineering Archetype &amp; Cadence
                    </h1>
                    <p className="text-xs text-[#888888] leading-relaxed">
                        Answer 7 situational scenarios to calibrate optimal learning velocity and architectural match heuristics.
                    </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="bg-[#050505] rounded-sm border border-white/10 p-3.5">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            01: Style
                        </div>
                        <h4 className="font-semibold text-xs text-[#f5f5f5] mb-1">
                            Execution Style
                        </h4>
                        <p className="text-[11px] text-[#737373] leading-relaxed">
                            Backlog decomposition, trade-off analysis, and feature scoping.
                        </p>
                    </div>

                    <div className="bg-[#050505] rounded-sm border border-white/10 p-3.5">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            02: Debug
                        </div>
                        <h4 className="font-semibold text-xs text-[#f5f5f5] mb-1">
                            Heuristic Analysis
                        </h4>
                        <p className="text-[11px] text-[#737373] leading-relaxed">
                            Root-cause isolation, telemetry inspection, and blocker resolution.
                        </p>
                    </div>

                    <div className="bg-[#050505] rounded-sm border border-white/10 p-3.5">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            03: Pace
                        </div>
                        <h4 className="font-semibold text-xs text-[#f5f5f5] mb-1">
                            Learning Velocity
                        </h4>
                        <p className="text-[11px] text-[#737373] leading-relaxed">
                            Derives recommended learning pace: Accelerated, Balanced, or Foundational.
                        </p>
                    </div>
                </div>

                {/* What to Expect */}
                <div className="space-y-2 mb-6 text-xs">
                    <div className="text-[11px] text-[#555555] uppercase tracking-wider mb-2">
                        Parameters:
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#050505] border border-white/10 text-[#888888]">
                        <span>-</span>
                        <span>7 situational scenarios based on engineering environments.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#050505] border border-white/10 text-[#888888]">
                        <span>-</span>
                        <span>Approximately 3 to 5 minutes duration.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#050505] border border-white/10 text-[#888888]">
                        <span>-</span>
                        <span>Zero trick questions — select your actual workflow preference.</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-4 py-2 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        &larr; Return to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-6 py-2 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer"
                    >
                        Start Assessment ↗
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
