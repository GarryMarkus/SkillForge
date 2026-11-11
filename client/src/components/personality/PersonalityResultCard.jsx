import React from 'react';

const PersonalityResultCard = ({ result, onProceed }) => {
    const pace = result?.learning_level?.toLowerCase() || 'average';

    const paceDetails = {
        fast: {
            title: 'Accelerated Learning Cadence',
            badge: 'Fast Pace',
            desc: 'High velocity pattern comprehension. The enclave prioritizes advanced engineering scenarios with condensed theoretical models.'
        },
        average: {
            title: 'Balanced Learning Cadence',
            badge: 'Optimal Pace',
            desc: 'Balanced synthesis of systems theory and practical implementation. The enclave pairs architectural deep-dives with guided debugging milestones.'
        },
        slow: {
            title: 'Foundational Depth Cadence',
            badge: 'In-Depth Pace',
            desc: 'Thorough first-principles breakdown before encountering distributed complexity. The enclave focuses on progressive isolation of core components.'
        }
    };

    const activePace = paceDetails[pace] || paceDetails.average;

    return (
        <div className="relative w-full max-w-3xl mx-auto space-y-6 font-mono select-none" id="PersonalityResultCard">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />
            {/* Main Result Card */}
            <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-9 space-y-5 text-[#ededed] shadow-2xl">
                <div className="text-center sm:text-left border-b border-white/[0.06] pb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08] mb-3">
                        Calibration Complete
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-1.5">
                        Engineering Learning Profile
                    </h1>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        Telemetry computed. Curriculum recommendations and candidate matching parameters have been calibrated.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4">
                        <div className="text-[11px] text-[#737373] uppercase tracking-wider">
                            Assessment Score
                        </div>
                        <div className="text-2xl sm:text-3xl text-white font-bold mt-1 font-display">
                            {result?.score ?? '--'} <span className="text-xs text-[#737373] font-mono font-normal">/ 28</span>
                        </div>
                    </div>

                    <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4">
                        <div className="text-[11px] text-[#737373] uppercase tracking-wider">
                            Recommended Pace
                        </div>
                        <div className="text-xl sm:text-2xl text-white font-bold mt-1 uppercase font-display">
                            {result?.learning_level || 'Balanced'}
                        </div>
                    </div>
                </div>

                <div className="bg-[#060709] rounded-sm border border-white/[0.08] p-4 text-xs">
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-white mb-1.5">
                        {activePace.title}
                    </h3>
                    <p className="text-xs text-[#888888] leading-relaxed">
                        {activePace.desc}
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                    <span className="text-[#71717A]">
                        Indexed in candidate verification profile
                    </span>

                    <button
                        type="button"
                        onClick={onProceed}
                        className="bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                    >
                        Dashboard ↗
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
