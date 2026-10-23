import React from 'react';

const PersonalityIntroCard = ({ onStart, onReturn }) => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-space-lg font-mono">
            {/* Top Specification Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-space-md flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-primary-container">
                    <span>[+]</span>
                    <span>[ PSYCHOMETRIC_ARCHETYPE_SPECIFICATION // CAD_SPEC_PSY_01 ]</span>
                </div>
                <div className="font-label-sm text-label-sm text-outline">
                    STAGE: CANDIDATE_VERIFICATION_01
                </div>
            </div>

            {/* Cobalt Blue System Spec Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-white/20 p-space-lg shadow-[4px_4px_0px_#191C1D]">
                <div className="flex items-center justify-between border-b border-white/20 pb-space-sm mb-space-md">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/80 font-bold">
                        [ SYSTEM_SPEC // PSYCHOMETRIC_PACING_PROTOCOL ]
                    </span>
                    <span className="bg-white/10 px-space-xs py-0.5 text-label-sm font-label-sm border border-white/30 uppercase">
                        NODE: PSY-INIT-01
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [01] WORK PATTERNS
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Evaluates approach to new technical tasks, backlog prioritization, and problem decomposition.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [02] RESILIENCE VECTORS
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Measures autonomous debugging persistence, inquiry velocity, and handling of technical ambiguity.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [03] ADAPTIVE ROUTING
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Synthesis generates calibrated learning module cadence: Accelerated, Standard, or Foundational.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Briefing Container */}
            <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D]">
                <div className="border-b border-black/15 pb-space-md mb-space-lg">
                    <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface font-bold">
                        BEHAVIORAL ARCHETYPE SYNTHESIS
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        Complete this 7-question behavioral diagnostic to calibrate your learning velocity and configure tailored curriculum paths.
                    </p>
                </div>

                {/* Protocol Checklist */}
                <div className="space-y-space-sm mb-space-xl text-body-md">
                    <div className="font-bold text-label-sm uppercase text-outline">
                        EXAMINATION_ENVIRONMENT_DIRECTIVES:
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm border border-black/15 bg-surface">
                        <span className="text-primary-container font-bold">[01]</span>
                        <span>Fullscreen mode will be engaged to provide focused, uninterrupted telemetry capture.</span>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm border border-black/15 bg-surface">
                        <span className="text-primary-container font-bold">[02]</span>
                        <span>All 7 questions must be completed in a single continuous session.</span>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm border border-black/15 bg-surface">
                        <span className="text-primary-container font-bold">[03]</span>
                        <span>There are no trick scenarios; select the operational pattern reflecting your natural workflow.</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                    <button
                        type="button"
                        onClick={onReturn}
                        className="px-space-md py-2.5 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold"
                    >
                        [ &lt;- RETURN_TO_DASHBOARD ]
                    </button>

                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-primary-container text-white px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-black transition-none cursor-pointer"
                    >
                        [ INITIALIZE_PSYCHOMETRIC_DIAGNOSTIC -&gt; ]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityIntroCard;
