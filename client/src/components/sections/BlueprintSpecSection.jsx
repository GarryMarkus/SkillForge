import React from 'react';

const workflowSteps = [
    {
        num: '01',
        title: 'Intake & Code Analysis',
        detail: 'Connect GitHub or upload project sources. AST parsers evaluate real repositories and actual commit depth.',
        badge: 'Minutes'
    },
    {
        num: '02',
        title: 'Practical Assessment',
        detail: 'Complete a focused 20-minute sandboxed engineering challenge modeled on production systems.',
        badge: '20 Mins'
    },
    {
        num: '03',
        title: 'Verified Skill Score',
        detail: 'Receive a cryptographically signed skill passport with granular percentile performance metrics.',
        badge: 'Instant'
    },
    {
        num: '04',
        title: 'Direct Team Dispatch',
        detail: 'Skip screening rounds and advance directly to final engineering interviews with hiring partners.',
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
        <section className="w-full font-sans py-8 mb-16" id="BlueprintSection">
            <div className="bg-[#090B10]/95 rounded-3xl border border-white/[0.08] p-8 sm:p-12 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col gap-12 relative overflow-hidden">
                {/* Subtle Radial Glow in Blueprint Card */}
                <div
                    className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-cyanAccent/[0.06] rounded-full blur-[100px]"
                    aria-hidden="true"
                />

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyanAccent bg-cyanAccent/10 border border-cyanAccent/30 px-3.5 py-1 rounded-full inline-block shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                        Transparent Evaluation Flow
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight">
                        How We Replace Resume Guesswork
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                        A seamless, human-centric evaluation journey engineered to be fair, respectful, and crystal-clear.
                    </p>
                </div>

                {/* 4 Steps Horizontal Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {workflowSteps.map((s) => (
                        <div
                            key={s.num}
                            className="bg-[#0F121B]/90 rounded-2xl p-6 sm:p-7 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-cyanAccent/40 hover:bg-[#131722] hover:shadow-[0_4px_24px_rgba(0,240,255,0.12)] transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="w-9 h-9 rounded-xl bg-cyanAccent/15 border border-cyanAccent/30 text-cyanAccent font-mono font-bold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                    {s.num}
                                </span>
                                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
                                    {s.badge}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-display font-bold text-white text-base sm:text-lg">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                    {s.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Comparison Table */}
                <div className="mt-4 pt-8 border-t border-white/[0.08] relative z-10">
                    <div className="mb-6 text-center">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                            Traditional Hiring vs SkillForge
                        </h3>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-white/[0.08] bg-[#0C0E14] text-xs font-mono uppercase tracking-wider text-slate-400">
                                    <th className="py-3.5 px-5 font-semibold">Evaluation Aspect</th>
                                    <th className="py-3.5 px-5 font-semibold text-slate-400">Traditional Job Boards</th>
                                    <th className="py-3.5 px-5 font-semibold text-cyanAccent">The SkillForge Way</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.06] bg-[#090B10]">
                                {comparisons.map((c, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-5 font-semibold text-slate-200 whitespace-nowrap">
                                            {c.aspect}
                                        </td>
                                        <td className="py-4 px-5 text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-rose-400 text-[18px]">close</span>
                                                <span>{c.traditional}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 font-medium text-slate-100 bg-cyanAccent/[0.03] border-x border-cyanAccent/15">
                                            <div className="flex items-center gap-2 text-cyan-200">
                                                <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
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
