import React from 'react';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section
            className="w-full relative font-sans p-6 sm:p-10 lg:p-12 rounded-2xl bg-[#121318] border border-white/[0.08] border-t-white/[0.15] shadow-xl overflow-hidden mb-12"
            id="HeroSection"
        >
            <div className="flex flex-col gap-8 lg:gap-10 relative z-10">
                {/* Clean Enterprise Category Tag */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>Empirical Skill Verification Platform</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Verified Hiring Active</span>
                    </div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Left Column (7 Cols): Executive Value Proposition */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.12]">
                                Hire Verified Talent.{' '}
                                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                                    Prove Your Actual Skills.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
                                SkillForge replaces resume embellishment with standardized, sandboxed technical assessments. Candidates demonstrate real problem-solving ability, and engineering teams hire with empirical confidence.
                            </p>
                        </div>

                        {/* Solid Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 pt-1">
                            <button
                                onClick={onStartAssessment}
                                className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-colors cursor-pointer active:scale-[0.99]"
                            >
                                <span>Start Technical Assessment</span>
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </button>

                            <button
                                onClick={onPostRequisition}
                                className="inline-flex items-center justify-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
                            >
                                <span>For Hiring Teams</span>
                            </button>
                        </div>

                        {/* Clean Benchmark Indicators */}
                        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/[0.06] text-xs">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[11px] uppercase tracking-wide font-medium">Evaluation Time</span>
                                <span className="text-zinc-200 font-semibold text-sm">20 Minutes</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[11px] uppercase tracking-wide font-medium">Anti-Tamper Rate</span>
                                <span className="text-emerald-400 font-semibold text-sm">99.9% Verified</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-zinc-500 text-[11px] uppercase tracking-wide font-medium">Skill Matching</span>
                                <span className="text-blue-400 font-semibold text-sm">Semantic Alignment</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (5 Cols): Sleek Executive Credential Card */}
                    <div className="lg:col-span-5">
                        <div className="rounded-xl bg-[#181A22] border border-white/[0.08] border-t-white/[0.18] p-6 shadow-xl relative">
                            <div className="flex flex-col gap-5">
                                {/* Card Header: Candidate Identity & Verification Badge */}
                                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold text-sm">
                                            AR
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                                                <span>Alex Rivera</span>
                                                <span className="material-symbols-outlined text-blue-400 text-[15px]">
                                                    verified
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-400 font-normal">
                                                Full-Stack Software Engineer
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                                        Verified
                                    </span>
                                </div>

                                {/* Score Showcase */}
                                <div className="my-1">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-4xl font-display font-bold text-white tracking-tight">
                                            98.6<span className="text-xl font-normal text-zinc-400">th</span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-400">
                                            Percentile Rank
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1">
                                        Evaluated across runtime efficiency, problem solving, and architecture design.
                                    </p>
                                </div>

                                {/* Skill Breakdown Meters */}
                                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                                    {/* Metric 1 */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-zinc-300 font-medium">Algorithmic Problem Solving</span>
                                            <span className="text-white font-semibold">98/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '98%' }} />
                                        </div>
                                    </div>

                                    {/* Metric 2 */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-zinc-300 font-medium">System Architecture &amp; Design</span>
                                            <span className="text-white font-semibold">95/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '95%' }} />
                                        </div>
                                    </div>

                                    {/* Metric 3 */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-zinc-300 font-medium">Code Quality &amp; Maintainability</span>
                                            <span className="text-white font-semibold">99/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99%' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer: Proctoring Audit */}
                                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                                    <div className="flex items-center gap-1.5 text-zinc-300">
                                        <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                                            check_circle
                                        </span>
                                        <span>Proctor Integrity: Clean</span>
                                    </div>
                                    <span className="text-[11px] text-zinc-500 font-mono">
                                        ID #SF-9842
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
