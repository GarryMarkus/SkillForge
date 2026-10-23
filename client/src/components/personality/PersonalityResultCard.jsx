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
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
                <div className="text-center sm:text-left border-b border-gray-100 pb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-2">
                        Assessment Complete
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
                        Your Personalized Learning Profile
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Based on your responses, we have customized your learning curriculum and assessment cadence.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Assessment Score
                        </div>
                        <div className="text-3xl sm:text-4xl text-gray-900 font-bold mt-2 tracking-tight">
                            {result?.score ?? '--'} <span className="text-sm text-gray-400 font-normal">/ 28</span>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                            Recommended Pace
                        </div>
                        <div className="text-3xl sm:text-4xl text-blue-700 font-bold mt-2 uppercase tracking-tight">
                            {result?.learning_level || 'Balanced'}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-bold text-base text-gray-900 mb-2">
                        {activePace.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {activePace.desc}
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-gray-500">
                        Saved to your candidate profile
                    </span>

                    <button
                        type="button"
                        onClick={onProceed}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Go to Candidate Dashboard →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityResultCard;
