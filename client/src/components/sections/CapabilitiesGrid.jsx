import React from 'react';
import SpotlightCard from '../ui/animations/SpotlightCard';

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
            <div className="flex flex-col gap-10">
                {/* Architectural Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyanAccent bg-cyanAccent/10 border border-cyanAccent/30 px-3.5 py-1 rounded-full inline-block shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                        Three Pillars of Verification
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight">
                        How SkillForge Evaluates Real Ability
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                        Every stage is engineered to be transparent, mathematically objective, and focused strictly on empirical competence.
                    </p>
                </div>

                {/* 3 Columns SpotlightCard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {pillars.map((pillar, idx) => (
                        <SpotlightCard
                            key={idx}
                            spotlightColor="rgba(0, 240, 255, 0.15)"
                            borderColor="rgba(0, 240, 255, 0.4)"
                            bgClassName="bg-[#0C0E14]/90"
                            className="p-8 sm:p-10 flex flex-col justify-between gap-6 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="space-y-5">
                                <div className="w-12 h-12 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 text-cyanAccent flex items-center justify-center font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                                    <span className="material-symbols-outlined text-[26px]">
                                        {pillar.icon}
                                    </span>
                                </div>

                                <h3 className="text-xl font-display font-bold text-white tracking-tight">
                                    {pillar.title}
                                </h3>

                                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                                    {pillar.summary}
                                </p>

                                <ul className="text-xs sm:text-sm text-slate-400 space-y-3 pt-2 leading-relaxed">
                                    {pillar.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2.5">
                                            <span className="material-symbols-outlined text-cyanAccent text-[18px] shrink-0 mt-0.5">
                                                check
                                            </span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                                <span className="uppercase tracking-wider">{pillar.tag}</span>
                                <span className="text-cyanAccent font-bold">STAGE 0{idx + 1}</span>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
