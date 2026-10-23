import React from 'react';

const PersonaSplitSection = ({ onSelectCandidateRole, onSelectRecruiterRole }) => {
    return (
        <section className="w-full bg-canvas-light font-mono pb-12 sm:pb-16 mb-8 sm:mb-12" id="PersonaSplitSection">
            <div className="flex flex-col gap-6">
                {/* Section Tag */}
                <div className="flex items-center justify-between text-xs font-bold text-outline border-b border-black/15 pb-2 uppercase">
                    <span>03 // WORKFLOW SEGMENTATION</span>
                    <span className="text-canvas-blueprint">[ DUAL OPERATIONAL INTERFACE ]</span>
                </div>

                {/* 2-Column Comparison Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {/* SPEC_A // FOR_CANDIDATES */}
                    <div className="border border-black/20 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 shadow-[4px_4px_0px_#0A0A0A]">
                        <div className="flex flex-col gap-6">
                            {/* Header & Tag */}
                            <div className="border-b border-black/15 pb-4 flex flex-col gap-1.5">
                                <span className="text-xs text-outline uppercase font-bold tracking-widest">[ SPEC_A // FOR CANDIDATES ]</span>
                                <h3 className="text-xl sm:text-2xl text-ink-primary uppercase font-bold tracking-tight">
                                    PROVE COMPETENCE BEFORE THE INTERVIEW
                                </h3>
                            </div>

                            {/* Deliverables */}
                            <div className="flex flex-col gap-3.5 text-sm text-on-surface-variant leading-relaxed">
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>Verified empirical skill score published to your cryptographic candidate dossier.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>Adaptive upskilling curricula dynamically calibrated to address detected skill gaps.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>Direct algorithmic matching to engineering teams without recruiter keyword bias.</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="pt-6 border-t border-black/15">
                            <button
                                onClick={onSelectCandidateRole}
                                className="w-full inline-flex items-center justify-center font-bold text-sm sm:text-base bg-surface-container-lowest text-ink-primary border-2 border-ink-primary py-4 px-6 uppercase tracking-wider hover:bg-black hover:text-white transition-none shadow-[3px_3px_0px_#191C1D] cursor-pointer"
                            >
                                [ CREATE CANDIDATE PROFILE → ]
                            </button>
                        </div>
                    </div>

                    {/* SPEC_B // FOR_RECRUITERS */}
                    <div className="border border-black/20 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 shadow-[4px_4px_0px_#1D52B8]">
                        <div className="flex flex-col gap-6">
                            {/* Header & Tag */}
                            <div className="border-b border-black/15 pb-4 flex flex-col gap-1.5">
                                <span className="text-xs text-canvas-blueprint uppercase font-bold tracking-widest">[ SPEC_B // FOR RECRUITERS ]</span>
                                <h3 className="text-xl sm:text-2xl text-ink-primary uppercase font-bold tracking-tight">
                                    DEPLOY PRE-AUDITED ENGINEERING TALENT
                                </h3>
                            </div>

                            {/* Deliverables */}
                            <div className="flex flex-col gap-3.5 text-sm text-on-surface-variant leading-relaxed">
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>Ranked candidate lists filtered strictly by empirical cosine similarity (&gt;0.85).</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>50-point tamper-evident proctor risk audit logs with live webcam gaze telemetry.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">[✓]</span>
                                    <span>Automated technical screening replacing 30+ hours of first-round engineer interviews.</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="pt-6 border-t border-black/15">
                            <button
                                onClick={onSelectRecruiterRole}
                                className="w-full inline-flex items-center justify-center font-bold text-sm sm:text-base bg-canvas-blueprint text-white border-2 border-canvas-blueprint py-4 px-6 uppercase tracking-wider hover:bg-black transition-none shadow-[3px_3px_0px_#0A0A0A] cursor-pointer"
                            >
                                [ DEPLOY HIRING PIPELINE → ]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSplitSection;
