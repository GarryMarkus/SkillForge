import React from 'react';

const pillars = [
    {
        num: '01',
        title: 'Project & Repository Analysis',
        summary: 'Automated evaluation of production experience, commit depth, and architectural quality.',
        points: [
            'Analyzes code depth and modularity rather than keyword scraping.',
            'Highlights genuine project contributions and engineering practices.',
            'Ensures candidates from any background receive fair evaluation.'
        ],
        tag: 'Ingestion'
    },
    {
        num: '02',
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
        num: '03',
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
        <section className="w-full font-mono pb-12 mb-12 select-none" id="CapabilitiesRow">
            <div className="flex flex-col gap-8">
                {/* Section Header */}
                <div className="max-w-2xl space-y-2">
                    <span className="text-xs text-[#888888] font-display uppercase tracking-wider block">
                        Three Pillars of Verification
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        How SkillForge Evaluates Real Ability
                    </h2>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        Every stage is engineered to be transparent, mathematically objective, and focused strictly on demonstrated competence.
                    </p>
                </div>

                {/* 3 Columns Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-md bg-[#0b0b0c] border border-white/10 flex flex-col justify-between gap-6"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                    <span className="font-bold text-white">
                                        {pillar.num}
                                    </span>
                                    <span className="text-[#666666] uppercase text-[11px]">
                                        {pillar.tag}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-white tracking-tight">
                                    {pillar.title}
                                </h3>

                                <p className="text-xs text-[#888888] leading-relaxed">
                                    {pillar.summary}
                                </p>
                            </div>

                            <ul className="space-y-2 border-t border-white/[0.06] pt-4 text-xs text-[#737373]">
                                {pillar.points.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2">
                                        <span className="text-[#555555] select-none">-</span>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
