import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityIntroCard">
            {/* Top Specification Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-canvas-blueprint">
                    <span>[+]</span>
                    <span>[ PSYCHOMETRIC ARCHETYPE SPECIFICATION // EVALUATION BRIEFING ]</span>
                </div>
                <div className="text-xs text-outline font-bold">
                    STAGE: CANDIDATE VERIFICATION
                </div>
            </div>

            {/* Cobalt Blue System Spec Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-primary p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-5">
                    <span className="text-xs uppercase tracking-wider text-white font-bold">
                        [ SYSTEM SPECIFICATION // PSYCHOMETRIC PACING PROTOCOL ]
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 text-[11px] border border-white/30 uppercase font-bold">
                        ACTIVE
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [01] WORK PATTERNS
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Evaluates approach to new technical tasks, backlog prioritization, and problem decomposition.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [02] RESILIENCE VECTORS
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Measures autonomous debugging persistence, inquiry velocity, and handling of technical ambiguity.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [03] ADAPTIVE ROUTING
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Synthesis generates calibrated learning module cadence: Accelerated, Standard, or Foundational.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Briefing Container */}
            <div className="bg-surface-container-lowest border border-black/20 p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A]">
                <div className="border-b border-black/15 pb-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl uppercase tracking-tight text-ink-primary font-bold mb-2">
                        BEHAVIORAL ARCHETYPE SYNTHESIS
                    </h1>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        Complete this 7-question behavioral diagnostic to calibrate your learning velocity and configure tailored curriculum paths.
                    </p>
                </div>

                {/* Protocol Checklist */}
                <div className="space-y-3 mb-8 text-xs sm:text-sm font-mono">
                    <div className="font-bold text-xs uppercase text-outline mb-2">
                        EXAMINATION ENVIRONMENT DIRECTIVES:
                    </div>
                    <div className="flex items-start gap-3 p-3.5 border border-black/15 bg-surface">
                        <span className="text-canvas-blueprint font-bold">[01]</span>
                        <span>Fullscreen mode will be engaged to provide focused, uninterrupted telemetry capture.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 border border-black/15 bg-surface">
                        <span className="text-canvas-blueprint font-bold">[02]</span>
                        <span>All 7 questions must be completed in a single continuous session.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 border border-black/15 bg-surface">
                        <span className="text-canvas-blueprint font-bold">[03]</span>
                        <span>There are no trick scenarios; select the operational pattern reflecting your natural workflow.</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-6 py-3.5 border border-black/25 text-xs sm:text-sm font-bold uppercase hover:bg-black/5 transition-none cursor-pointer"
                    >
                        [ ← RETURN TO DASHBOARD ]
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-canvas-blueprint text-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A]"
                    >
                        [ INITIALIZE PSYCHOMETRIC EVALUATION → ]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
