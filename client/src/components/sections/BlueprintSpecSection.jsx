import React from 'react';

const workflowSteps = [
    {
        num: '01',
        title: 'Profile & Code Intake',
        detail: 'Connect GitHub or upload project sources. Automated analysis inspects commit history, repositories, and architecture.',
        badge: 'Minutes'
    },
    {
        num: '02',
        title: 'Technical Assessment',
        detail: 'Complete a focused 20-minute sandboxed evaluation modeled on real-world engineering challenges.',
        badge: '20 Mins'
    },
    {
        num: '03',
        title: 'Verified Skill Score',
        detail: 'Receive an authenticated technical score breakdown with transparent percentile rankings and feedback.',
        badge: 'Instant'
    },
    {
        num: '04',
        title: 'Direct Dispatch',
        detail: 'Skip repetitive screening rounds and advance directly to final team interviews with hiring partners.',
        badge: 'Direct'
    }
];

const comparisons = [
    {
        aspect: 'Candidate Evaluation',
        traditional: 'Keywords filtered through automated resume scrapers',
        skillforge: 'Objective evaluation of actual problem-solving and code quality'
    },
    {
        aspect: 'Hiring Decision Speed',
        traditional: '4 to 8 weeks across multiple repetitive interview rounds',
        skillforge: 'Fast-tracked directly to final cultural & team-fit conversations'
    },
    {
        aspect: 'Candidate Feedback',
        traditional: 'Generic automated rejection emails with zero insight',
        skillforge: 'Comprehensive skill breakdown and actionable career recommendations'
    },
    {
        aspect: 'Fairness & Bias',
        traditional: 'Heavily biased toward elite university names and pedigree',
        skillforge: '100% merit-based evaluation accessible to all engineering talent'
    }
];

const BlueprintSpecSection = () => {
    return (
        <section className="w-full font-mono py-4 mb-12 select-none" id="BlueprintSection">
            <div className="bg-[#0b0b0c] rounded-md border border-white/10 p-6 sm:p-10 lg:p-12 flex flex-col gap-10">
                {/* Header */}
                <div className="max-w-2xl space-y-2">
                    <span className="text-xs text-[#888888] font-display uppercase tracking-wider block">
                        Transparent Evaluation Flow
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                        From First Commit to Verified Offer
                    </h2>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                        A rigorous 4-step pipeline that replaces resume screening guesswork with verifiable engineering evidence.
                    </p>
                </div>

                {/* 4 Workflow Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {workflowSteps.map((step) => (
                        <div
                            key={step.num}
                            className="p-5 rounded-md bg-[#050505] border border-white/10 flex flex-col justify-between gap-4"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs">
                                    <span className="font-bold text-white">[{step.num}]</span>
                                    <span className="text-[#666666] text-[11px]">{step.badge}</span>
                                </div>
                                <h3 className="text-sm font-bold text-white">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-[#888888] leading-relaxed">
                                    {step.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* High-Contrast Comparison Matrix */}
                <div className="border-t border-white/[0.06] pt-8 space-y-4">
                    <div className="text-xs uppercase text-[#888888] font-bold tracking-wider">
                        Methodology Comparison
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-white/10 text-[#666666]">
                                    <th className="py-2.5 pr-4 font-normal">Evaluation Dimension</th>
                                    <th className="py-2.5 pr-4 font-normal">Traditional Hiring</th>
                                    <th className="py-2.5 font-bold text-white">SkillForge Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {comparisons.map((c, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02]">
                                        <td className="py-3 pr-4 font-bold text-white whitespace-nowrap">
                                            {c.aspect}
                                        </td>
                                        <td className="py-3 pr-4 text-[#737373]">
                                            {c.traditional}
                                        </td>
                                        <td className="py-3 text-[#cccccc] font-medium">
                                            {c.skillforge}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlueprintSpecSection;
