import React from 'react';

const pillars = [
    {
        icon: 'code',
        title: 'Real Project & Repository Analysis',
        summary: 'Automated evaluation of production experience, commit depth, and architectural quality.',
        points: [
            'Analyzes code depth and modularity rather than keyword scraping.',
            'Highlights genuine project contributions and engineering practices.',
            'Ensures candidates from any background receive fair evaluation.'
        ],
        tag: 'Ingestion'
    },
    {
        icon: 'verified_user',
        title: 'Standardized Technical Evaluations',
        summary: 'Practical 20-minute problem-solving scenarios modeled on real engineering systems.',
        points: [
            'Lightweight browser check ensures test integrity and focus.',
            'Clear, realistic challenges with objective automated scoring.',
            'Actionable feedback provided on technical strengths and growth areas.'
        ],
        tag: 'Verification'
    },
    {
        icon: 'hub',
        title: 'Direct, Merit-Based Job Matching',
        summary: 'Direct introductions to hiring teams seeking demonstrated technical competence.',
        points: [
            'Replaces keyword filtering with semantic alignment to team stacks.',
            'Employers review authenticated skill profiles and salary expectations.',
            'Fast-track directly to final interview stages without screening delays.'
        ],
        tag: 'Matching'
    }
];

const CapabilitiesGrid = () => {
    return (
        <section className="w-full font-sans pb-12 mb-12" id="CapabilitiesRow">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block font-medium">
                        Three Pillars of Verification
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                        How SkillForge Evaluates Real Ability
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
                        Every stage is engineered to be transparent, mathematically objective, and focused strictly on demonstrated competence.
                    </p>
                </div>

                {/* 3 Columns Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="p-6 sm:p-7 rounded-xl bg-[#121318] border border-white/[0.08] flex flex-col justify-between gap-5 shadow-sm hover:border-zinc-700 transition-colors"
                        >
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                    <span className="material-symbols-outlined text-[22px]">
                                        {pillar.icon}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-white tracking-tight">
                                    {pillar.title}
                                </h3>

                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {pillar.summary}
                                </p>

                                <ul className="text-xs sm:text-sm text-zinc-400 space-y-2.5 pt-1 leading-relaxed">
                                    {pillar.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0 mt-0.5">
                                                check
                                            </span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
                                <span className="font-medium uppercase tracking-wide">{pillar.tag}</span>
                                <span className="text-zinc-300 font-semibold">Pillar 0{idx + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
