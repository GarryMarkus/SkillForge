import React from 'react';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full bg-canvas-light font-mono py-space-xl" id="PersonaSplitSection">
            <div className="flex flex-col gap-space-md">
                {/* Section Tag */}
                <div className="flex items-center justify-between text-label-sm font-label-sm text-outline border-b border-cad pb-space-xs uppercase">
                    <span>03 // WORKFLOW SEGMENTATION</span>
                    <span>PERSONA_ROUTING: DUAL_INTERFACE</span>
                </div>

                {/* 2-Column Comparison Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                    {/* SPEC_A // FOR_CANDIDATES */}
                    <div className="border border-cad bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg relative shadow-[3px_3px_0px_#191C1D]">
                        <div className="flex flex-col gap-space-md">
                            {/* Header & Tag */}
                            <div className="border-b border-cad pb-space-sm flex flex-col gap-1">
                                <span className="text-label-sm font-label-sm text-outline uppercase font-bold tracking-widest">[ SPEC_A // FOR_CANDIDATES ]</span>
                                <h3 className="font-headline-sm text-headline-sm text-ink-primary uppercase font-bold">
                                    PROVE_COMPETENCE_BEFORE_INTERVIEW
                                </h3>
                            </div>

                            {/* Deliverables */}
                            <div className="flex flex-col gap-space-sm text-body-md font-body-md text-on-surface-variant">
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>Verified empirical skill score published to cryptographic ledger</span>
                                </div>
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>Adaptive upskilling modules dynamically generated from code gap analysis</span>
                                </div>
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>Direct algorithmic matching to top tier engineering teams without recruiter bias</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="pt-space-md border-t border-cad">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full inline-flex items-center justify-center font-label-md text-label-md bg-surface-container-lowest text-ink-primary border border-ink-primary px-space-md py-space-sm uppercase tracking-wider hover:bg-ink-primary hover:text-white transition-colors duration-150 cursor-pointer"
                            >
                                [ CREATE_CANDIDATE_PROFILE -&gt; ]
                            </button>
                        </div>
                    </div>

                    {/* SPEC_B // FOR_RECRUITERS */}
                    <div className="border border-cad bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg relative shadow-[3px_3px_0px_#1D52B8]">
                        <div className="flex flex-col gap-space-md">
                            {/* Header & Tag */}
                            <div className="border-b border-cad pb-space-sm flex flex-col gap-1">
                                <span className="text-label-sm font-label-sm text-canvas-blueprint uppercase font-bold tracking-widest">[ SPEC_B // FOR_RECRUITERS ]</span>
                                <h3 className="font-headline-sm text-headline-sm text-ink-primary uppercase font-bold">
                                    DEPLOY_PRE_VETTED_ENGINEERS
                                </h3>
                            </div>

                            {/* Deliverables */}
                            <div className="flex flex-col gap-space-sm text-body-md font-body-md text-on-surface-variant">
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>Ranked candidate lists filtered strictly by empirical cosine similarity (&gt;0.88)</span>
                                </div>
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>50-point tamper-evident proctor risk audit logs with webcam gaze telemetry</span>
                                </div>
                                <div className="flex items-start gap-space-xs">
                                    <span className="text-canvas-blueprint font-bold">[✓]</span>
                                    <span>Automated technical screening replacing 30+ hours of first-round engineer interviews</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="pt-space-md border-t border-cad">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full inline-flex items-center justify-center font-label-md text-label-md bg-canvas-blueprint text-white border border-canvas-blueprint px-space-md py-space-sm uppercase tracking-wider hover:bg-primary transition-colors duration-150 cursor-pointer font-bold"
                            >
                                [ DEPLOY_HIRING_PIPELINE -&gt; ]
                            </button>
                        </div>
                    </div>
                </div>

                {/* Execution Terminal Footnote */}
                <div className="border border-cad bg-surface-container-high/40 p-space-sm flex flex-wrap items-center justify-between text-label-sm font-label-sm text-on-surface-variant mt-space-md">
                    <div>TERMINAL_SOCKET: READY // STREAM_DISPATCHER: ACTIVE</div>
                    <div className="font-bold text-ink-primary">[HASH_ALGO: SHA256_DETERMINISTIC_RUN]</div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
