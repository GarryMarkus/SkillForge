import React from 'react';

const CapabilitiesGrid = () => {
    return (
        <section className="w-full bg-canvas-light font-mono pb-12 sm:pb-16 mb-12 sm:mb-16" id="CapabilitiesRow">
            <div className="flex flex-col gap-6">
                {/* Section Header Indicator */}
                <div className="flex items-center justify-between text-xs font-bold text-outline border-b border-black/15 pb-2 uppercase">
                    <span>02 // ARCHITECTURAL PILLARS</span>
                    <span className="text-canvas-blueprint">[ THREE-TIER VERIFICATION ]</span>
                </div>

                {/* 3 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A]">
                    {/* Col 1: Multi-Modal Intake & Audit */}
                    <div className="border-b md:border-b-0 md:border-r border-black/20 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="text-lg sm:text-xl font-bold text-ink-primary uppercase tracking-tight">
                                    Multi-Modal Intake &amp; Audit
                                </h2>
                            </div>

                            <p className="text-sm font-bold text-ink-primary leading-snug">
                                Automated resume AST extraction paired with live GitHub codebase verification.
                            </p>

                            <ul className="text-xs sm:text-sm text-on-surface-variant space-y-2 leading-relaxed">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Analyzes commit density, code complexity, and architectural depth.</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Flags LLM-generated snippets and inflated repository claims.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-black/10">
                            <span className="inline-block text-xs bg-surface-container px-2.5 py-1 border border-black/15 text-ink-primary font-bold">
                                INPUTS: [RESUME_PDF, GIT_AST]
                            </span>
                        </div>
                    </div>

                    {/* Col 2: Hardware-Locked Proctoring */}
                    <div className="border-b md:border-b-0 md:border-r border-black/20 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 bg-surface-container-low/30">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="text-lg sm:text-xl font-bold text-ink-primary uppercase tracking-tight">
                                    Hardware-Locked Proctoring
                                </h2>
                            </div>

                            <p className="text-sm font-bold text-ink-primary leading-snug">
                                Real-time biometric and browser environment integrity verification.
                            </p>

                            <ul className="text-xs sm:text-sm text-on-surface-variant space-y-2 leading-relaxed">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Webcam optical face tracking and active gaze heuristic monitoring.</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Enforced fullscreen lock with zero-clipboard and focus tracking.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-black/10">
                            <span className="inline-block text-xs bg-surface-container px-2.5 py-1 border border-black/15 text-ink-primary font-bold">
                                INTEGRITY: [50-PT RISK ENGINE]
                            </span>
                        </div>
                    </div>

                    {/* Col 3: TF-IDF Cosine Matching */}
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="text-lg sm:text-xl font-bold text-ink-primary uppercase tracking-tight">
                                    TF-IDF Cosine Matching
                                </h2>
                            </div>

                            <p className="text-sm font-bold text-ink-primary leading-snug">
                                Direct vector-space ranking between verified skills and open requisitions.
                            </p>

                            <ul className="text-xs sm:text-sm text-on-surface-variant space-y-2 leading-relaxed">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Replaces keyword filtering with empirical semantic skill alignment.</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-canvas-blueprint font-bold shrink-0">•</span>
                                    <span>Generates instant, unbiased talent rankings for engineering teams.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-black/10">
                            <span className="inline-block text-xs bg-surface-container px-2.5 py-1 border border-black/15 text-ink-primary font-bold">
                                RANKING: [COSINE_SIMILARITY]
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
