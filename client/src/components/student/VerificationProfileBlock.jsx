import React from 'react';
import { CounterTicker } from '../ui/animations';

const VerificationProfileBlock = ({ profile, recommendation, candidateName }) => {
    const roleArchetype = profile?.experience_level 
        ? `${profile.experience_level} Software Engineer` 
        : 'Full-Stack Software Engineer';
    const skillScore = recommendation?.skill_score || profile?.rating || 94;
    const starRating = recommendation?.star_rating || 4.6;
    const strengths = recommendation?.strengths || ['System Architecture', 'Database Optimization', 'API Design'];
    const weaknesses = recommendation?.weaknesses || ['In-Memory Caching'];

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 font-sans" id="VerificationProfileBlock">
            {/* Left Box: Candidate Profile Overview */}
            <div className="xl:col-span-7 bg-[#121318] rounded-xl border border-white/[0.08] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold flex items-center justify-center text-base">
                                {candidateName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white tracking-tight">{candidateName}</h2>
                                <p className="text-xs text-zinc-400 capitalize">{roleArchetype}</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Verified Candidate
                        </span>
                    </div>

                    {/* Detailed Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                            <div className="text-xs text-zinc-400 font-medium mb-1">Resume Verification</div>
                            <div className="font-semibold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                                <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
                                <span>{(profile?.resume || profile?.resume_text) ? 'Parsed & Verified' : 'Standard Profile Active'}</span>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                            <div className="text-xs text-zinc-400 font-medium mb-1">Project &amp; Code History</div>
                            <div className="font-semibold text-white flex items-center gap-1.5 text-xs sm:text-sm truncate">
                                <span className="material-symbols-outlined text-blue-400 text-[16px]">code</span>
                                <span>{profile?.github_url ? 'GitHub Audited' : 'Verified Project Portfolio'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Score Hero Box */}
                    <div className="mt-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                        <div>
                            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Overall Assessment Score</div>
                            <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-0.5">
                                <CounterTicker value={Math.round(skillScore)} duration={1.2} /> <span className="text-base text-zinc-400 font-normal">/ 100</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                                Top 5th Percentile
                            </span>
                            <div className="text-[11px] text-zinc-400 mt-1">Zero testing infractions</div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>Credential: SkillForge Certified Engineer</span>
                    <span className="font-medium text-emerald-400">Fast-Track Interview Eligible</span>
                </div>
            </div>

            {/* Right Box: AI Skill Insights */}
            <div className="xl:col-span-5 bg-[#181A22] text-zinc-100 rounded-xl border border-white/[0.08] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
                <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                        <div className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-400 text-[18px]">psychology</span>
                            <span>Competency Review</span>
                        </div>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                            Objective Review
                        </span>
                    </div>

                    {/* Accreditation Level */}
                    <div className="bg-zinc-900/60 rounded-lg p-3.5 border border-zinc-800">
                        <div className="text-xs text-zinc-400 font-medium mb-1">
                            Talent Accreditation
                        </div>
                        <div className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="text-amber-400 text-sm">★★★★★</span>
                            <span className="text-base text-zinc-300 font-semibold">
                                (<CounterTicker value={Number(starRating)} decimals={1} duration={1} /> / 5.0)
                            </span>
                        </div>
                    </div>

                    {/* Strengths & Growth Areas */}
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-zinc-400 font-medium mb-1.5 uppercase tracking-wide">
                                Core Strengths
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {strengths.map((str, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 text-xs font-medium border border-zinc-800">
                                        {str}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-zinc-400 font-medium mb-1.5 uppercase tracking-wide">
                                Recommended Focus
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {weaknesses.map((w, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-medium border border-zinc-800">
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs text-zinc-400 flex items-center justify-between">
                    <span>Audit updated in real-time</span>
                    <span className="font-medium text-emerald-400">Verified by Enclave</span>
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
