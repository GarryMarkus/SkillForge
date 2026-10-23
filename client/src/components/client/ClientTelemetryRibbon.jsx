import React from 'react';

const ClientTelemetryRibbon = ({
    companyName = 'NEXUS_INFRASTRUCTURE_INC',
    jobsCount = 0,
    totalApplicantsCount = 0,
    verifiedTalentIndex = '96.2%',
    timeToShortlist = '1.4_DAYS'
}) => {
    return (
        <section className="w-full border-b border-black/15 bg-surface-container-lowest" id="ClientHeader">
            {/* Top Micro Telemetry Strip */}
            <div className="w-full px-margin py-space-xs flex flex-wrap items-center justify-between gap-y-1 text-label-sm font-label-sm text-on-surface-variant border-b border-black/10">
                <div className="flex items-center gap-space-sm flex-wrap">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="text-on-surface font-bold">LOC: ROOT &gt; ENTERPRISE_PIPELINE &gt; REQUISITION_MANAGER</span>
                    <span className="text-black/25">|</span>
                    <span className="bg-surface-container px-space-xs py-0.5 border border-black/10 text-on-surface font-bold">
                        [CLIENT: {companyName.toUpperCase()}]
                    </span>
                    <span className="text-black/25">|</span>
                    <span>ROLE: RECRUITER</span>
                </div>
                <div className="flex items-center gap-space-md">
                    <span className="text-primary-container flex items-center gap-1 font-bold">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-container animate-pulse"></span>
                        [SYNC: REALTIME // BUFFER_LATENCY: 18ms]
                    </span>
                    <span className="text-black/25">|</span>
                    <span className="text-on-surface font-bold">[NODE_ID: US-EAST-CL-04]</span>
                </div>
            </div>

            {/* Pipeline Metric Ribbon: 4-Cell CAD Modular Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15 border-b border-black/15">
                {/* Metric 01 */}
                <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_01]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        OPEN_REQUISITIONS
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {String(jobsCount).padStart(2, '0')} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-primary-container border border-primary-container/30 px-1 py-0.5 font-bold">
                            ACTIVE
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                        <span className="text-primary-container font-bold">▲</span> +1 Deployed this cycle
                    </div>
                </div>

                {/* Metric 02 */}
                <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_02]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        TOTAL_APPLICANTS_AUDITED
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {totalApplicantsCount} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant border border-black/15 px-1 py-0.5 font-bold">
                            100% PARSED
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                        <span className="text-secondary">■</span> Ingest rate: 12 dossiers/hr
                    </div>
                </div>

                {/* Metric 03 */}
                <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_03]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        VERIFIED_TALENT_INDEX
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-primary-container tracking-tighter font-bold">
                            [ {verifiedTalentIndex} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-primary-container bg-primary-fixed/30 border border-primary-container/20 px-1 py-0.5 font-bold">
                            PASS
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                        <span className="text-primary-container font-bold">✓</span> Proctor validation verified
                    </div>
                </div>

                {/* Metric 04 */}
                <div className="p-margin relative group bg-surface hover:bg-surface-container-low transition-colors">
                    <span className="absolute top-1 right-2 text-label-sm font-label-sm text-black/30">[MTRX_04]</span>
                    <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1 font-bold">
                        TIME_TO_SHORTLIST
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface tracking-tighter font-bold">
                            [ {timeToShortlist} ]
                        </span>
                        <span className="text-label-sm font-label-sm text-secondary border border-black/15 px-1 py-0.5 font-bold">
                            EST: 2.0D
                        </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex items-center gap-1">
                        <span className="text-primary-container font-bold">▼</span> -30% vs manual benchmark
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientTelemetryRibbon;
