import React from 'react';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section className="w-full bg-canvas-light border border-cad font-mono p-space-lg md:p-space-xl relative mb-space-xl" id="HeroSection">
            {/* Corner Coordinate Registration Markers */}
            <div className="absolute top-0 left-0 text-label-sm font-label-sm text-outline/60 select-none p-1 pointer-events-none">+ 00.00 / 01.00</div>
            <div className="absolute top-0 right-0 text-label-sm font-label-sm text-outline/60 select-none p-1 pointer-events-none">+ 12.00 / 01.00</div>

            <div className="flex flex-col gap-space-lg">
                {/* Coordinate Track & Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-space-xs border-b border-cad pb-space-sm">
                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant">
                        <span className="bg-ink-primary text-white px-1.5 py-0.5 font-bold">SPEC_01</span>
                        <span>EMPIRICAL TALENT VALIDATION SPECIFICATION</span>
                    </div>
                    <div className="text-label-sm font-label-sm text-outline uppercase">
                        DOC_REF: SF-DOC-7729 // SEC_CLEARANCE: L3
                    </div>
                </div>

                {/* Main Headline & Description */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                    <div className="lg:col-span-8 flex flex-col gap-space-md">
                        <h1 className="font-headline-xl text-headline-xl text-ink-primary uppercase tracking-tight leading-tight">
                            EMPIRICAL SKILL<br />VERIFICATION ENGINEERING
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[650px] leading-relaxed">
                            From automated resume PDF extraction and GitHub repository auditing to hardware-locked proctored exams, we engineer verifiable proof of technical competence that eliminates hiring guesswork.
                        </p>

                        {/* Action Row */}
                        <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                            <button
                                onClick={onStartAssessment}
                                className="inline-flex items-center justify-center font-label-md text-label-md bg-canvas-blueprint text-white border border-canvas-blueprint px-space-lg py-space-sm uppercase tracking-wider hover:bg-primary transition-all duration-150 cursor-pointer"
                            >
                                [ INITIALIZE_DIAGNOSTIC_EXAM ]
                            </button>
                            <button
                                onClick={onPostRequisition}
                                className="inline-flex items-center justify-center font-label-md text-label-md bg-transparent text-ink-primary border border-ink-primary px-space-lg py-space-sm uppercase tracking-wider hover:bg-ink-primary hover:text-white transition-all duration-150 cursor-pointer"
                            >
                                [ POST_REQUISITION_SPEC ]
                            </button>
                        </div>
                    </div>

                    {/* Telemetry Inset Box */}
                    <div className="lg:col-span-4 border border-cad bg-surface-container-lowest p-space-md flex flex-col gap-space-sm shadow-[3px_3px_0px_#1D52B8]">
                        <div className="border-b border-cad pb-space-xs flex items-center justify-between">
                            <span className="text-label-sm font-label-sm font-bold uppercase text-canvas-blueprint">[REALTIME_CALIBRATION]</span>
                            <span className="w-2 h-2 rounded-none bg-canvas-blueprint animate-pulse"></span>
                        </div>
                        <div className="flex flex-col gap-1 text-label-sm font-label-sm text-ink-primary">
                            <div className="flex justify-between py-0.5 border-b border-cad/40">
                                <span className="text-outline">INGESTION_LATENCY:</span>
                                <span className="font-bold">42ms [NOMINAL]</span>
                            </div>
                            <div className="flex justify-between py-0.5 border-b border-cad/40">
                                <span className="text-outline">AUDIT_STANDARD:</span>
                                <span className="font-bold">IEEE-241-REV4</span>
                            </div>
                            <div className="flex justify-between py-0.5 border-b border-cad/40">
                                <span className="text-outline">PROCTOR_INTEGRITY:</span>
                                <span className="font-bold text-canvas-blueprint">99.982%</span>
                            </div>
                            <div className="flex justify-between py-0.5">
                                <span className="text-outline">HASH_CONSENSUS:</span>
                                <span className="font-bold">BLAKE3-256</span>
                            </div>
                        </div>
                        <div className="mt-space-xs bg-surface-container p-space-xs text-label-sm font-label-sm border border-cad text-on-surface-variant font-mono">
                            &gt; SYSTEM READY FOR CANDIDATE_BATCH_2026.4
                        </div>
                    </div>
                </div>

                {/* Bottom Specs Bar */}
                <div className="border border-cad bg-surface-container-low px-space-md py-space-xs flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm uppercase">
                    <div className="flex flex-wrap items-center gap-space-md">
                        <span className="text-ink-primary font-bold">LATENCY: 42ms</span>
                        <span className="text-outline">//</span>
                        <span className="text-ink-primary font-bold">AUDIT_STANDARD: IEEE-241</span>
                        <span className="text-outline">//</span>
                        <span className="text-ink-primary font-bold">INTEGRITY: 99.98%</span>
                    </div>
                    <div className="text-outline">
                        GEO_DISTRIBUTION: 14_REGIONS // ACTIVE_SESSIONS: 1,492
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
