import React from 'react';

const CapabilitiesGrid = () => {
    return (
        <section className="w-full bg-canvas-light border-b border-cad font-mono pb-space-xl mb-space-xl" id="CapabilitiesRow">
            <div className="flex flex-col gap-space-md">
                {/* Section Header Indicator */}
                <div className="flex items-center justify-between text-label-sm font-label-sm text-outline border-b border-cad pb-space-xs uppercase">
                    <span>02 // ARCHITECTURAL PILLARS</span>
                    <span>GRID: 3-COL RIGID CAD BOUNDS</span>
                </div>

                {/* 3 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-cad bg-surface-container-lowest">
                    {/* Col 1 */}
                    <div className="border-b md:border-b-0 md:border-r border-cad p-space-lg flex flex-col justify-between gap-space-md relative">
                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_A:01]</div>
                        <div className="flex flex-col gap-space-sm">
                            <div className="flex items-center gap-space-xs">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="font-headline-sm text-headline-sm text-ink-primary uppercase font-bold">
                                    Multi-Modal Intake &amp; Audit
                                </h2>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Automated ingestion of candidate resume PDFs paired with live GitHub REST API repository scraping and LangChain Gemini code analysis.
                            </p>
                        </div>
                        <div className="pt-space-md border-t border-cad">
                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-cad text-ink-primary font-bold">
                                INPUTS: [PDF, GIT_COMMIT_LOGS, AST]
                            </span>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className="border-b md:border-b-0 md:border-r border-cad p-space-lg flex flex-col justify-between gap-space-md relative bg-surface-container-low/30">
                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_B:02]</div>
                        <div className="flex flex-col gap-space-sm">
                            <div className="flex items-center gap-space-xs">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="font-headline-sm text-headline-sm text-ink-primary uppercase font-bold">
                                    Hardware-Locked Proctoring
                                </h2>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Real-time browser webcam skin-tone heuristics, fullscreen lock enforcement, tab-focus monitoring, and a 50-point risk threshold engine.
                            </p>
                        </div>
                        <div className="pt-space-md border-t border-cad">
                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-cad text-ink-primary font-bold">
                                ENFORCEMENT: [KERNEL_WINDOW_LOCK, GAZE_TRACK]
                            </span>
                        </div>
                    </div>

                    {/* Col 3 */}
                    <div className="p-space-lg flex flex-col justify-between gap-space-md relative">
                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_C:03]</div>
                        <div className="flex flex-col gap-space-sm">
                            <div className="flex items-center gap-space-xs">
                                <span className="w-2.5 h-2.5 bg-canvas-blueprint inline-block"></span>
                                <h2 className="font-headline-sm text-headline-sm text-ink-primary uppercase font-bold">
                                    TF-IDF Cosine Matching
                                </h2>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Two-sided vector space candidate-to-job matching using scikit-learn cosine similarity to rank applicants by empirical skill alignment.
                            </p>
                        </div>
                        <div className="pt-space-md border-t border-cad">
                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-cad text-ink-primary font-bold">
                                METRIC: [COSINE_SIMILARITY_0.00-1.00]
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
