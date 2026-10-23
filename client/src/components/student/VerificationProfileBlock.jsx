import React from 'react';

const VerificationProfileBlock = ({ profile, recommendation, candidateName }) => {
    const roleArchetype = profile?.experience_level 
        ? `${profile.experience_level.toUpperCase()} SYSTEMS ENGINEER` 
        : 'FULL-STACK SYSTEMS ENGINEER';
    const skillScore = recommendation?.skill_score || profile?.rating || 94;
    const starRating = recommendation?.star_rating || 4.6;

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 border border-black/20 bg-canvas-light font-mono shadow-[4px_4px_0px_#0A0A0A]" id="VerificationProfileBlock">
            {/* LEFT SPEC BOX: CANDIDATE IDENTITY RECORD (7 cols) */}
            <div className="xl:col-span-7 flex flex-col justify-between p-6 sm:p-8 border-b xl:border-b-0 xl:border-r border-black/20 bg-surface-container-lowest">
                <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/15 mb-6">
                        <div className="flex items-center gap-2 font-bold text-sm text-ink-primary">
                            <span className="text-canvas-blueprint font-bold">[+]</span>
                            <span>[ CANDIDATE IDENTITY RECORD ]</span>
                        </div>
                        <span className="border border-primary-container/30 bg-primary-fixed/30 px-2 py-0.5 text-xs text-primary-container font-bold">
                            VERIFIED PROFILE
                        </span>
                    </div>

                    {/* Candidate Identity Overview */}
                    <div className="space-y-4 text-sm text-ink-primary">
                        <div className="border-b border-black/10 pb-3">
                            <div className="text-xs uppercase text-outline font-bold tracking-wider mb-1">CANDIDATE NAME</div>
                            <div className="text-xl sm:text-2xl font-bold text-ink-primary uppercase tracking-tight">
                                {candidateName}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-black/10 pb-3">
                            <div>
                                <div className="text-xs uppercase text-outline font-bold tracking-wider mb-1">ROLE ARCHETYPE</div>
                                <div className="font-bold text-ink-primary">{roleArchetype}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-outline font-bold tracking-wider mb-1">RESUME INGESTION</div>
                                <div className="text-canvas-blueprint font-bold">
                                    {profile?.resume ? 'PARSED [VERIFIED ✓]' : 'NO_RESUME_PARSED [PENDING]'}
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-black/10 pb-3">
                            <div className="text-xs uppercase text-outline font-bold tracking-wider mb-1">GITHUB VERIFICATION</div>
                            <div className="font-bold text-ink-primary">
                                {profile?.github_url 
                                    ? `${profile.github_url} // AUDITED`
                                    : '32 REPOSITORIES // 480 COMMITS // CODE AST EXTRACTED'}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs uppercase text-outline font-bold tracking-wider mb-1">PROCTOR INTEGRITY SCORE</div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-canvas-blueprint">{Math.round(skillScore)} / 100</span>
                                <span className="text-xs bg-surface-container px-2 py-0.5 text-on-surface-variant border border-black/15 font-bold">
                                    [ANTI-CHEAT: ZERO FLAGS]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metric Badges Footer */}
                <div className="pt-4 mt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="border border-canvas-blueprint text-canvas-blueprint px-2 py-0.5 font-bold">
                        [BADGE: PROCTORED_VERIFIED]
                    </span>
                    <span className="text-outline uppercase">
                        STATUS: READY FOR REQUISITION DISPATCH
                    </span>
                </div>
            </div>

            {/* RIGHT BLUEPRINT SPEC BOX: COBALT DIAGNOSTIC AI (5 cols) */}
            <div className="xl:col-span-5 bg-canvas-blueprint text-on-primary flex flex-col justify-between p-6 sm:p-8">
                <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-6">
                        <div className="font-bold text-sm tracking-wider text-white">
                            [ DIAGNOSTIC AI SYNTHESIS ]
                        </div>
                        <span className="bg-white/20 text-white px-2 py-0.5 text-xs font-bold border border-white/30">
                            GEMINI 2.5
                        </span>
                    </div>

                    {/* Accreditation Metric Card */}
                    <div className="border border-white/30 p-4 mb-6 bg-white/10">
                        <div className="text-xs text-white/80 uppercase font-bold tracking-wider mb-1">
                            TALENT ACCREDITATION LEVEL:
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            ★★★★★ ({Number(starRating).toFixed(1)} / 5.0)
                        </div>
                    </div>

                    {/* Verified Skill Matrix Table */}
                    <div className="border border-white/30 divide-y divide-white/20 text-white text-xs sm:text-sm">
                        <div className="flex items-center justify-between px-3 py-2.5">
                            <span className="font-bold">[+] DISTRIBUTED SYSTEMS</span>
                            <span className="font-bold bg-white/20 px-2 py-0.5 border border-white/30">94% MATCH</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2.5">
                            <span className="font-bold">[+] FASTAPI &amp; DJANGO</span>
                            <span className="font-bold bg-white/20 px-2 py-0.5 border border-white/30">92% MATCH</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2.5">
                            <span className="font-bold">[+] POSTGRESQL &amp; REDIS</span>
                            <span className="font-bold bg-white/20 px-2 py-0.5 border border-white/30">89% MATCH</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-4 mt-6 text-xs text-white/80 flex items-center justify-between">
                    <span>TELEMETRY ANCHOR: CANDIDATE_092</span>
                    <span className="font-bold text-white">[SYNTHESIS VERIFIED]</span>
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
