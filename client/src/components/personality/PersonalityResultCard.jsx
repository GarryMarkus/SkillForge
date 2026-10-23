import React from 'react';

const PersonalityResultCard = ({ result, onProceed }) => {
    const pace = result?.learning_level?.toLowerCase() || 'average';

    const paceDetails = {
        fast: {
            title: 'ACCELERATED_PACING_CADENCE',
            badge: 'VELOCITY: HIGH',
            desc: 'Your profile exhibits rapid concept ingestion and proactive problem decomposition. Curriculum modules will deploy compressed theoretical review intervals and high-complexity synthesis challenges.'
        },
        average: {
            title: 'BALANCED_EXECUTION_CADENCE',
            badge: 'VELOCITY: OPTIMAL',
            desc: 'Your profile demonstrates methodical execution, balanced between structured preparation and pragmatic delivery. Modules are calibrated for consistent theoretical reinforcement and applied sprints.'
        },
        slow: {
            title: 'FOUNDATIONAL_DEPTH_CADENCE',
            badge: 'VELOCITY: FOUNDATIONAL',
            desc: 'Your profile benefits from thorough concept grounding and detailed architectural walkthroughs. Curriculum modules will emphasize deep fundamentals and progressive milestones.'
        }
    };

    const activePace = paceDetails[pace] || paceDetails.average;

    return (
        <div className="w-full max-w-3xl mx-auto space-y-space-lg font-mono">
            {/* Top Specification Tracker Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-space-md flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-primary-container">
                    <span>[+]</span>
                    <span>[ SYNTHESIS_COMPLETE // CAD_SPEC_PSY_RESULT ]</span>
                </div>
                <div className="font-label-sm text-label-sm text-outline">
                    STAGE: PACING_CALIBRATION_COMPLETED
                </div>
            </div>

            {/* Cobalt Blue Result Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-white/20 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D]">
                <div className="flex items-center justify-between border-b border-white/20 pb-space-sm mb-space-md">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/80 font-bold">
                        [ SYSTEM_SYNTHESIS_REPORT // PSYCHOMETRIC_CALIBRATION ]
                    </span>
                    <span className="bg-white/10 px-space-xs py-0.5 text-label-sm font-label-sm border border-white/30 uppercase font-bold text-green-300">
                        {activePace.badge}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-lg">
                    <div className="border border-white/20 bg-white/5 p-space-md">
                        <div className="text-label-sm text-white/70 uppercase">AGGREGATE_PSYCHOMETRIC_SCORE</div>
                        <div className="font-headline-lg text-4xl text-white font-bold mt-1">
                            {result?.score ?? '--'} <span className="text-xl text-white/60 font-normal">/ 28 PTS</span>
                        </div>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-space-md">
                        <div className="text-label-sm text-white/70 uppercase">CALIBRATED_LEARNING_PACE</div>
                        <div className="font-headline-lg text-4xl text-green-300 font-bold mt-1 uppercase">
                            {result?.learning_level || 'AVERAGE'}
                        </div>
                    </div>
                </div>

                <div className="border border-white/20 bg-white/5 p-space-md">
                    <div className="font-bold text-label-sm uppercase text-white/90 mb-1">
                        {activePace.title}
                    </div>
                    <p className="text-body-sm text-white/80 leading-relaxed">
                        {activePace.desc}
                    </p>
                </div>
            </div>

            {/* Action Return Container */}
            <div className="bg-surface-container-lowest border border-black/25 p-space-lg shadow-[4px_4px_0px_#191C1D] flex flex-wrap items-center justify-between gap-space-md">
                <div className="text-body-sm text-on-surface-variant">
                    Diagnostic telemetry has been appended to your candidate verification report.
                </div>

                <button
                    type="button"
                    onClick={onProceed}
                    className="bg-primary-container text-white px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-black transition-none cursor-pointer"
                >
                    [ PROCEED_TO_TELEMETRY_DASHBOARD -&gt; ]
                </button>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
