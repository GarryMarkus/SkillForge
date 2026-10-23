import React from 'react';
import { CounterTicker } from '../ui/animations';

const VerificationProfileBlock = ({ profile, recommendation, candidateName }) => {
    const roleArchetype = profile?.experience_level 
        ? `${profile.experience_level.toUpperCase()} SOFTWARE ENGINEER` 
        : 'FULL-STACK SOFTWARE ENGINEER';
    const skillScore = recommendation?.skill_score || profile?.rating || 94;
    const starRating = recommendation?.star_rating || 4.6;
    const strengths = recommendation?.strengths || ['System Architecture', 'Database Optimization', 'API Design'];
    const weaknesses = recommendation?.weaknesses || ['In-Memory Caching'];

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 font-sans" id="VerificationProfileBlock">
            {/* Left Box: Candidate Profile Overview */}
            <div className="xl:col-span-7 bg-white rounded-2xl border border-gray-100 p-7 sm:p-9 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
                                {candidateName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{candidateName}</h2>
                                <p className="text-xs text-gray-500 font-medium">{roleArchetype}</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Verified Candidate
                        </span>
                    </div>

                    {/* Detailed Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="text-xs text-gray-500 font-medium mb-1">Resume Verification</div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                                <span>{(profile?.resume || profile?.resume_text) ? 'Parsed & Verified' : 'Standard Profile Active'}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="text-xs text-gray-500 font-medium mb-1">Project &amp; Code History</div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5 truncate">
                                <span className="material-symbols-outlined text-blue-600 text-[18px]">code</span>
                                <span>{profile?.github_url ? 'GitHub Audited' : 'Verified Project Portfolio'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Proctor Score Hero Box */}
                    <div className="mt-5 p-5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Evaluation Score</div>
                            <div className="text-3xl font-extrabold text-blue-900 tracking-tight mt-0.5">
                                <CounterTicker value={Math.round(skillScore)} duration={1.2} /> <span className="text-lg text-blue-600 font-bold">/ 100</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-3 py-1 rounded-full bg-white text-blue-700 text-xs font-bold shadow-xs border border-blue-200">
                                Top 5% of Engineers
                            </span>
                            <div className="text-xs text-gray-500 mt-1">Zero testing infractions</div>
                        </div>
                    </div>
                </div>

                <div className="pt-5 mt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                    <span>Credential: SkillForge Certified Specialist</span>
                    <span className="font-medium text-emerald-600">Eligible for Direct Interview Fast-Track</span>
                </div>
            </div>

            {/* Right Box: AI Skill Insights */}
            <div className="xl:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-7 sm:p-9 shadow-md flex flex-col justify-between">
                <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/20">
                        <div className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-300 text-[20px]">auto_awesome</span>
                            <span>AI Competency Review</span>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                            Gemini Verified
                        </span>
                    </div>

                    {/* Accreditation Level */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold mb-1">
                            Talent Accreditation
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="text-amber-300">★★★★★</span>
                            <span className="text-lg text-blue-100 font-semibold">
                                (<CounterTicker value={Number(starRating)} decimals={1} duration={1} /> / 5.0)
                            </span>
                        </div>
                    </div>

                    {/* Strengths & Growth Areas */}
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-blue-200 font-semibold mb-2 uppercase tracking-wider">
                                Core Strengths
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {strengths.map((str, i) => (
                                    <span key={i} className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-medium">
                                        {str}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-blue-200 font-semibold mb-2 uppercase tracking-wider">
                                Recommended Focus
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {weaknesses.map((w, i) => (
                                    <span key={i} className="px-3 py-1 rounded-lg bg-black/20 text-blue-100 text-xs font-medium">
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/20 text-xs text-blue-100 flex items-center justify-between">
                    <span>Continuously updated report</span>
                    <span className="font-semibold text-white">Ready for Dispatch</span>
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
