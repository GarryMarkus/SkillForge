import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="relative w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityIntroCard">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />
            {/* Main Briefing Container */}
            <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-9 text-[#ededed] shadow-2xl">
                <div className="border-b border-white/[0.06] pb-5 mb-6 text-center sm:text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8e] block mb-2">
                        Psychometric Calibration
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-2">
                        Engineering Archetype &amp; Cadence
                    </h1>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        Answer 7 situational scenarios to calibrate optimal learning velocity and architectural match heuristics.
                    </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            01 · Style
                        </div>
                        <h4 className="font-semibold text-xs text-[#f5f5f5] mb-1">
                            Execution Style
                        </h4>
                        <p className="text-[11px] text-[#737373] leading-relaxed">
                            Backlog decomposition, trade-off analysis, and feature scoping.
                        </p>
                    </div>

                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            02 · Debug
                        </div>
                        <h4 className="font-semibold text-xs text-[#f5f5f5] mb-1">
                            Heuristic Analysis
                        </h4>
                        <p className="text-[11px] text-[#737373] leading-relaxed">
                            Root-cause isolation, telemetry inspection, and blocker resolution.
                        </p>
                    </div>

                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4">
                        <div className="text-xs font-mono font-bold text-white mb-1">
                            03 · Pace
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
                    <div className="text-[11px] text-[#71717A] uppercase tracking-wider mb-2">
                        Parameters
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[#888888]">
                        <span className="text-[#555555] font-bold">-</span>
                        <span>7 situational scenarios based on engineering environments.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[#888888]">
                        <span className="text-[#555555] font-bold">-</span>
                        <span>Approximately 3 to 5 minutes duration.</span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-sm bg-[#060709] border border-white/[0.08] text-[#888888]">
                        <span className="text-[#555555] font-bold">-</span>
                        <span>Zero trick questions — select your actual workflow preference.</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                    >
                        &larr; Return to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs sm:text-sm font-mono transition-colors cursor-pointer"
                    >
                        Start Assessment ↗
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
