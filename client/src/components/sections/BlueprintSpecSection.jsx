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
        skillforge: '100% merit-based evaluation accessible to all self-taught and traditional talent'
    }
];

const BlueprintSpecSection = () => {
    return (
        <section className="w-full font-sans py-4 mb-12" id="BlueprintSection">
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-lg flex flex-col gap-10 relative overflow-hidden">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block font-medium">
                        Transparent Evaluation Flow
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                        How We Replace Resume Guesswork
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        A seamless, human-centric evaluation journey engineered to be fair, respectful, and crystal-clear.
                    </p>
                </div>

                {/* 4 Steps Horizontal Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {workflowSteps.map((s) => (
                        <div
                            key={s.num}
                            className="bg-[#181A22] rounded-xl p-5 border border-white/[0.06] flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <span className="w-7 h-7 rounded-md bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center">
                                    {s.num}
                                </span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                                    {s.badge}
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-semibold text-white text-base">
                                    {s.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                    {s.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Comparison Table */}
                <div className="mt-2 pt-6 border-t border-white/[0.06]">
                    <div className="mb-5 text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                            Traditional Hiring vs SkillForge
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-white/[0.08] bg-[#181A22] text-xs uppercase tracking-wider text-zinc-400">
                                    <th className="py-3 px-4 font-semibold">Evaluation Aspect</th>
                                    <th className="py-3 px-4 font-semibold text-zinc-400">Traditional Job Boards</th>
                                    <th className="py-3 px-4 font-semibold text-blue-400">The SkillForge Way</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.06] bg-[#121318]">
                                {comparisons.map((c, i) => (
                                    <tr key={i} className="hover:bg-white/[0.015] transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-zinc-200 whitespace-nowrap">
                                            {c.aspect}
                                        </td>
                                        <td className="py-3.5 px-4 text-zinc-400">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-rose-400 text-[16px]">close</span>
                                                <span>{c.traditional}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-medium text-white bg-blue-500/[0.03] border-x border-blue-500/10">
                                            <div className="flex items-center gap-2 text-zinc-200">
                                                <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                                                <span>{c.skillforge}</span>
                                            </div>
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
