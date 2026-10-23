import React from 'react';

const PersonalityResultCard = ({ result, onProceed }) => {
    const pace = result?.learning_level?.toLowerCase() || 'average';

    const paceDetails = {
        fast: {
            title: 'ACCELERATED PACING CADENCE',
            badge: 'VELOCITY: HIGH',
            desc: 'Your profile exhibits rapid concept ingestion and proactive problem decomposition. Curriculum modules will deploy compressed theoretical review intervals and high-complexity synthesis challenges.'
        },
        average: {
            title: 'BALANCED EXECUTION CADENCE',
            badge: 'VELOCITY: OPTIMAL',
            desc: 'Your profile demonstrates methodical execution, balanced between structured preparation and pragmatic delivery. Modules are calibrated for consistent theoretical reinforcement and applied sprints.'
        },
        slow: {
            title: 'FOUNDATIONAL DEPTH CADENCE',
            badge: 'VELOCITY: FOUNDATIONAL',
            desc: 'Your profile benefits from thorough concept grounding and detailed architectural walkthroughs. Curriculum modules will emphasize deep fundamentals and progressive milestones.'
        }
    };

    const activePace = paceDetails[pace] || paceDetails.average;

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityResultCard">
            {/* Top Specification Tracker Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-canvas-blueprint">
                    <span>[+]</span>
                    <span>[ SYNTHESIS COMPLETE // PSYCHOMETRIC CALIBRATION REPORT ]</span>
                </div>
                <div className="text-xs text-outline font-bold">
                    STAGE: CALIBRATION COMPLETED
                </div>
            </div>

            {/* Cobalt Blue Result Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-primary p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-5">
                    <span className="text-xs uppercase tracking-wider text-white font-bold">
                        [ SYSTEM SYNTHESIS REPORT // PSYCHOMETRIC CALIBRATION ]
                    </span>
                    <span className="bg-white/10 px-2.5 py-0.5 text-xs border border-white/30 uppercase font-bold text-green-300">
                        {activePace.badge}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="text-xs text-white/70 uppercase">AGGREGATE PSYCHOMETRIC SCORE</div>
                        <div className="text-3xl sm:text-4xl text-white font-bold mt-1 tracking-tight">
                            {result?.score ?? '--'} <span className="text-lg text-white/60 font-normal">/ 28 PTS</span>
                        </div>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="text-xs text-white/70 uppercase">CALIBRATED LEARNING VELOCITY</div>
                        <div className="text-3xl sm:text-4xl text-green-300 font-bold mt-1 uppercase tracking-tight">
                            {result?.learning_level || 'AVERAGE'}
                        </div>
                    </div>
                </div>

                <div className="border border-white/20 bg-white/5 p-4">
                    <div className="font-bold text-xs uppercase text-white mb-1">
                        {activePace.title}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-mono">
                        {activePace.desc}
                    </p>
                </div>
            </div>

            {/* Action Return Container */}
            <div className="bg-surface-container-lowest border border-black/20 p-6 shadow-[4px_4px_0px_#0A0A0A] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-on-surface-variant font-mono">
                    Diagnostic telemetry has been appended to your candidate verification report.
                </div>

                <button
                    type="button"
                    onClick={onProceed}
                    className="bg-canvas-blueprint text-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A]"
                >
                    [ PROCEED TO CANDIDATE CONSOLE → ]
                </button>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
