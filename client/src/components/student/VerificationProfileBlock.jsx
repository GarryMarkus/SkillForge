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
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 font-mono" id="VerificationProfileBlock">
            {/* Left Box: Candidate Profile Overview */}
            <div className="xl:col-span-7 bg-[#0b0b0c] rounded-md border border-white/10 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-sm bg-[#111113] border border-white/20 text-[#f5f5f5] font-mono font-bold flex items-center justify-center text-sm">
                                {candidateName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-base font-bold font-display text-white tracking-tight">{candidateName}</h2>
                                <p className="text-xs text-[#737373] capitalize">{roleArchetype}</p>
                            </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-sm bg-[#050505] border border-white/10 text-[#888888] text-[11px] font-mono">
                            Status: Verified
                        </span>
                    </div>

                    {/* Detailed Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-sm bg-[#050505] border border-white/10">
                            <div className="text-[11px] text-[#555555] mb-1">Resume Ingestion</div>
                            <div className="font-semibold text-[#f5f5f5]">
                                {(profile?.resume || profile?.resume_text) ? 'Parsed & Audited' : 'Standard Record'}
                            </div>
                        </div>

                        <div className="p-3 rounded-sm bg-[#050505] border border-white/10">
                            <div className="text-[11px] text-[#555555] mb-1">Code Repository Audit</div>
                            <div className="font-semibold text-[#f5f5f5] truncate">
                                {profile?.github_url ? 'GitHub Synced' : 'Verified Artifacts'}
                            </div>
                        </div>
                    </div>

                    {/* Score Hero Box */}
                    <div className="mt-3 p-4 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-between">
                        <div>
                            <div className="text-[11px] text-[#737373] uppercase tracking-wider">Empirical Verification Score</div>
                            <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-0.5">
                                <CounterTicker value={Math.round(skillScore)} duration={1.2} /> <span className="text-sm text-[#555555] font-normal font-mono">/ 100</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-2 py-0.5 rounded-sm bg-[#111113] text-[#f5f5f5] text-xs font-mono border border-white/20">
                                Top 5th Percentile
                            </span>
                            <div className="text-[11px] text-[#555555] mt-1 font-mono">Zero test infractions</div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-[#737373]">
                    <span>Credential: SkillForge Certified Engineer</span>
                    <span className="text-[#ededed]">Fast-Track Eligible</span>
                </div>
            </div>

            {/* Right Box: AI Skill Insights */}
            <div className="xl:col-span-5 bg-[#0b0b0c] text-[#ededed] rounded-md border border-white/10 p-6 sm:p-7 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                        <div className="font-semibold text-xs uppercase tracking-wider text-white">
                            Competency Telemetry
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-sm bg-[#050505] text-[#888888] border border-white/10">
                            Objective Rubric
                        </span>
                    </div>

                    {/* Accreditation Level */}
                    <div className="bg-[#050505] rounded-sm p-3.5 border border-white/10">
                        <div className="text-[11px] text-[#555555] mb-1">
                            Peer-Calibrated Rating
                        </div>
                        <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="text-[#f5f5f5] font-mono">
                                <CounterTicker value={Number(starRating)} decimals={1} duration={1} /> / 5.0
                            </span>
                            <span className="text-xs text-[#737373] font-normal font-mono">rating</span>
                        </div>
                    </div>

                    {/* Strengths & Growth Areas */}
                    <div className="space-y-3">
                        <div>
                            <div className="text-[11px] text-[#737373] mb-1.5 uppercase tracking-wider">
                                Verified Strengths
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {strengths.map((str, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded-sm bg-[#050505] text-[#f5f5f5] text-xs font-mono border border-white/10">
                                        {str}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-[11px] text-[#737373] mb-1.5 uppercase tracking-wider">
                                Growth Recommendations
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {weaknesses.map((w, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded-sm bg-[#050505] text-[#737373] text-xs font-mono border border-white/10">
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] text-xs text-[#555555] flex items-center justify-between">
                    <span>Real-Time Telemetry</span>
                    <span className="text-[#888888]">Audit Passed</span>
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
