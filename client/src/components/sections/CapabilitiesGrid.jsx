import React from 'react';

const pillars = [
    {
        icon: 'account_tree',
        title: 'Smart Resume & Project Analysis',
        summary: 'Automated evaluation of real experience, project history, and hands-on code contributions.',
        points: [
            'Analyzes actual code depth and architectural structure rather than resume buzzwords.',
            'Highlights genuine project contributions so quality work speaks for itself.',
            'Ensures non-traditional backgrounds get fair, objective consideration.'
        ],
        tag: 'Profile Ingestion'
    },
    {
        icon: 'verified_user',
        title: 'Fair & Secure Online Evaluations',
        summary: 'Practical 20-minute problem-solving scenarios modeled after real workplace engineering.',
        points: [
            'Lightweight browser check ensures fairness and integrity for all test takers.',
            'Clear, realistic questions with instant objective scoring rubrics.',
            'Detailed feedback provided so you understand where you shine and how to grow.'
        ],
        tag: 'Skill Verification'
    },
    {
        icon: 'hub',
        title: 'Direct, Bias-Free Job Matching',
        summary: 'Connect directly with hiring managers who value demonstrated ability over prestige pedigrees.',
        points: [
            'Replaces keyword filtering with genuine semantic alignment to active team needs.',
            'Employers view verified skill profiles with upfront salary benchmarks.',
            'Fast-track directly to final interviews with zero resume screening delays.'
        ],
        tag: 'Career Dispatch'
    }
];

const CapabilitiesGrid = () => {
    return (
        <section className="w-full font-sans pb-16 mb-16" id="CapabilitiesRow">
            <div className="flex flex-col gap-8">
                {/* Clean Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                        Three Pillars of Verification
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                        How SkillForge Evaluates Real Ability
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        Every step of our process is designed to be clear, respectful, and focused strictly on the skills that matter.
                    </p>
                </div>

                {/* 3 Columns Modern Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                    <span className="material-symbols-outlined text-[24px]">
                                        {pillar.icon}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                    {pillar.title}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                                    {pillar.summary}
                                </p>

                                <ul className="text-sm text-gray-600 space-y-2.5 pt-2 leading-relaxed">
                                    {pillar.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-1">
                                                check
                                            </span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                                <span>{pillar.tag}</span>
                                <span className="text-blue-600 font-bold">Step 0{idx + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
