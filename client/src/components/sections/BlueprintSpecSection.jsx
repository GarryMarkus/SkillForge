import React from 'react';

const workflowSteps = [
    {
        num: '1',
        title: 'Intake & Code Analysis',
        detail: 'Upload your resume or connect GitHub. We highlight real projects and actual code contributions.',
        badge: 'Minutes'
    },
    {
        num: '2',
        title: 'Practical Assessment',
        detail: 'Complete a brief 20-minute hands-on scenario tailored to real-world technical problems.',
        badge: '20 Mins'
    },
    {
        num: '3',
        title: 'Verified Skill Score',
        detail: 'Receive an authenticated skill certificate with clear feedback on your technical strengths.',
        badge: 'Instant'
    },
    {
        num: '4',
        title: 'Direct Team Introductions',
        detail: 'Connect with hiring managers looking for your exact abilities, skipping preliminary screening.',
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
        <section className="w-full font-sans py-16 mb-16" id="BlueprintSection">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 lg:p-16 shadow-sm flex flex-col gap-12">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                        Transparent Evaluation Flow
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                        How We Replace Resume Guesswork
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        A seamless, human-centric evaluation journey engineered to be fair, respectful, and crystal-clear.
                    </p>
                </div>

                {/* 4 Steps Horizontal Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {workflowSteps.map((s) => (
                        <div
                            key={s.num}
                            className="bg-gray-50/70 rounded-2xl p-6 sm:p-7 border border-gray-100 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                                    {s.num}
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                    {s.badge}
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {s.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Comparison Table */}
                <div className="mt-4 pt-8 border-t border-gray-100">
                    <div className="mb-6 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Traditional Hiring vs SkillForge
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                                    <th className="py-3 px-4 font-semibold">Evaluation Aspect</th>
                                    <th className="py-3 px-4 font-semibold text-gray-400">Traditional Job Boards</th>
                                    <th className="py-3 px-4 font-semibold text-blue-600">The SkillForge Way</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisons.map((c, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-4 font-semibold text-gray-900 whitespace-nowrap">
                                            {c.aspect}
                                        </td>
                                        <td className="py-4 px-4 text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-rose-500 text-[18px]">close</span>
                                                <span>{c.traditional}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-medium text-gray-900 bg-blue-50/30">
                                            <div className="flex items-center gap-2 text-blue-900">
                                                <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
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
