import React from 'react';

const PersonalityResultCard = ({ result, onProceed }) => {
    const pace = result?.learning_level?.toLowerCase() || 'average';

    const paceDetails = {
        fast: {
            title: 'Accelerated Learning Cadence',
            badge: 'Fast Pace',
            desc: 'You quickly grasp new technical concepts and prefer diving straight into hands-on implementation. We will recommend advanced challenge problems with concise, high-density theoretical summaries.'
        },
        average: {
            title: 'Balanced Learning Cadence',
            badge: 'Optimal Pace',
            desc: 'You balance theoretical understanding with practical application. We will recommend learning modules that combine clear architectural explanations with targeted coding exercises.'
        },
        slow: {
            title: 'Foundational Depth Cadence',
            badge: 'In-Depth Pace',
            desc: 'You prefer a thorough, step-by-step breakdown of fundamental concepts before tackling complex implementations. We will recommend foundational guides and progressive milestones.'
        }
    };

    const activePace = paceDetails[pace] || paceDetails.average;

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 font-sans select-none" id="PersonalityResultCard">
            {/* Main Result Card */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-10 shadow-sm space-y-6 text-white">
                <div className="text-center sm:text-left border-b border-white/[0.08] pb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                        Assessment Complete
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                        Your Personalized Learning Profile
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Based on your responses, we have customized your learning curriculum and assessment cadence.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#181A22] rounded-2xl border border-white/[0.08] p-5">
                        <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            Assessment Score
                        </div>
                        <div className="text-3xl sm:text-4xl text-white font-bold mt-2 tracking-tight font-mono">
                            {result?.score ?? '--'} <span className="text-sm text-zinc-500 font-normal">/ 28</span>
                        </div>
                    </div>

                    <div className="bg-[#181A22] rounded-2xl border border-white/[0.08] p-5">
                        <div className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                            Recommended Pace
                        </div>
                        <div className="text-3xl sm:text-4xl text-blue-400 font-bold mt-2 uppercase tracking-tight">
                            {result?.learning_level || 'Balanced'}
                        </div>
                    </div>
                </div>

                <div className="bg-[#181A22] rounded-2xl border border-white/[0.08] p-6">
                    <h3 className="font-semibold text-base text-white mb-2">
                        {activePace.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        {activePace.desc}
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500">
                        Saved to your candidate profile
                    </span>

                    <button
                        type="button"
                        onClick={onProceed}
                        className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Go to Candidate Dashboard →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
