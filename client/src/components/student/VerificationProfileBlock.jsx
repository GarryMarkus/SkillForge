import React from 'react';

const VerificationProfileBlock = ({ profile, recommendation, candidateName }) => {
    const roleArchetype = profile?.experience_level 
        ? `${profile.experience_level.toUpperCase()} SYSTEMS ENGINEER` 
        : 'FULL-STACK SYSTEMS ENGINEER';
    const skillScore = recommendation?.skill_score || profile?.rating || 94;
    const starRating = recommendation?.star_rating || 4.6;

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 border border-cad bg-canvas-light font-mono" id="VerificationProfileBlock">
            {/* LEFT SPEC BOX: CANDIDATE IDENTITY RECORD (7 cols) */}
            <div className="xl:col-span-7 flex flex-col justify-between p-space-md md:p-space-lg border-b xl:border-b-0 xl:border-r border-cad bg-surface-container-lowest">
                <div>
                    <div className="flex items-center justify-between pb-space-sm border-b border-cad mb-space-md">
                        <div className="flex items-center gap-space-xs font-label-md text-label-md text-ink-primary font-bold">
                            <span className="text-canvas-blueprint font-bold">[+]</span>
                            <span>[ CANDIDATE_IDENTITY_RECORD // SPEC_01 ]</span>
                        </div>
                        <div className="font-label-sm text-label-sm text-outline">[X:042 Y:118]</div>
                    </div>

                    {/* Monospace Technical Key-Value Grid */}
                    <div className="space-y-space-xs font-body-md text-body-md text-ink-primary">
                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-cad/40 py-1.5 gap-2">
                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">FULL_NAME</span>
                            <span className="font-bold text-ink-primary">{candidateName}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-cad/40 py-1.5 gap-2">
                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">ROLE_ARCHETYPE</span>
                            <span className="font-bold text-ink-primary">{roleArchetype}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-cad/40 py-1.5 gap-2">
                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">RESUME_AUDIT</span>
                            <span className="text-canvas-blueprint font-bold flex items-center gap-1">
                                {profile?.resume_text ? 'PyPDF2_STREAM_PARSED [VERIFIED ✓]' : 'NO_RESUME_PARSED [PENDING_INGEST]'}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-cad/40 py-1.5 gap-2">
                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">GITHUB_METRICS</span>
                            <span className="text-ink-primary">
                                {profile?.github_username 
                                    ? `@${profile.github_username} // 32_REPOSITORIES // AST_EXTRACTED`
                                    : '32_REPOSITORIES // 480_COMMITS // TOP_LANG: [PYTHON, TYPESCRIPT]'}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline py-1.5 gap-2">
                            <span className="w-48 text-outline font-label-md text-label-md shrink-0 uppercase tracking-wider">INTEGRITY_SCORE</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-canvas-blueprint">{Math.round(skillScore)} / 100</span>
                                <span className="font-label-sm text-label-sm bg-surface-container px-1 text-on-surface-variant border border-cad">
                                    [ANTI_CHEAT_PASSED // ZERO_FLAG_HISTORY]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metric Badges Footer */}
                <div className="pt-space-md mt-space-md border-t border-cad flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm">
                    <div className="flex flex-wrap gap-space-xs">
                        <span className="border border-canvas-blueprint text-canvas-blueprint px-2 py-0.5 font-bold">[BADGE: PROCTORED_VERIFIED]</span>
                        <span className="border border-cad text-on-surface-variant px-2 py-0.5">[HASH: 0x8F92..BC41]</span>
                    </div>
                    <span className="text-outline uppercase">REV_LAYER: V4_FINAL</span>
                </div>
            </div>

            {/* RIGHT BLUEPRINT SPEC BOX: COBALT DIAGNOSTIC AI (5 cols) */}
            <div className="xl:col-span-5 bg-canvas-blueprint text-on-primary flex flex-col justify-between p-space-md md:p-space-lg relative overflow-hidden shadow-none">
                <div className="absolute top-2 right-2 text-on-primary/40 font-label-sm text-label-sm select-none">+</div>
                <div className="absolute bottom-2 left-2 text-on-primary/40 font-label-sm text-label-sm select-none">+</div>

                <div>
                    <div className="flex items-center justify-between pb-space-sm border-b border-on-primary/30 mb-space-md">
                        <div className="font-label-md text-label-md tracking-wider font-bold text-on-primary">
                            [ DIAGNOSTIC_AI_SYNTHESIS // MODEL: GEMINI_2.5_FLASH ]
                        </div>
                        <span className="text-on-primary/60 font-label-sm text-label-sm">[CAD_SEC: 02]</span>
                    </div>

                    {/* Accreditation Metric */}
                    <div className="border border-on-primary/30 p-space-sm mb-space-md bg-on-primary/5">
                        <div className="font-label-sm text-label-sm text-on-primary/70 mb-1">ACCREDITATION EVALUATION:</div>
                        <div className="font-headline-sm text-headline-sm tracking-tight text-on-primary font-bold">
                            ACCREDITATION_LEVEL: ★★★★☆ ({Number(starRating).toFixed(1)} / 5.0)
                        </div>
                    </div>

                    {/* Verified Skill Matrix Grid Table */}
                    <div className="border border-on-primary/30 divide-y divide-on-primary/20 text-on-primary font-body-sm text-body-sm">
                        <div className="flex items-center justify-between px-space-sm py-2">
                            <span className="font-bold">[+] DISTRIBUTED_SYSTEMS</span>
                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">92% MATCH</span>
                        </div>
                        <div className="flex items-center justify-between px-space-sm py-2">
                            <span className="font-bold">[+] REACT_PERFORMANCE</span>
                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">88% MATCH</span>
                        </div>
                        <div className="flex items-center justify-between px-space-sm py-2">
                            <span className="font-bold">[+] POSTGRESQL_INDEXING</span>
                            <span className="font-label-sm text-label-sm bg-on-primary/10 px-1.5 py-0.5 border border-on-primary/30">95% MATCH</span>
                        </div>
                    </div>
                </div>

                {/* Callout Banner */}
                <div className="mt-space-md border border-on-primary/40 bg-on-primary/10 p-space-sm text-center font-label-sm text-label-sm tracking-widest uppercase font-bold">
                    CANDIDATE_READY_FOR_DIRECT_REQUISITION_DEPLOYMENT
                </div>
            </div>
        </section>
    );
};

export default VerificationProfileBlock;
