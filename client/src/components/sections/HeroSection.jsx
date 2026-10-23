import React from 'react';

const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section className="w-full bg-canvas-light border border-black/20 font-mono p-6 sm:p-8 lg:p-12 relative mb-12 sm:mb-16 shadow-[4px_4px_0px_#0A0A0A]" id="HeroSection">
            <div className="flex flex-col gap-8 lg:gap-10">
                {/* Clean Top Specification Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                        <span className="bg-ink-primary text-white px-2 py-0.5">SPEC_01</span>
                        <span>EMPIRICAL TALENT VALIDATION ENGINE</span>
                    </div>
                    <span className="text-xs border border-primary-container/30 bg-primary-fixed/30 px-2 py-0.5 text-primary-container font-bold uppercase">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                </div>

                {/* Main Headline, Description & Focal Metric Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                    {/* Left 8 Cols: Display Headline & Action Buttons */}
                    <div className="lg:col-span-8 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary uppercase tracking-tight leading-[1.08]">
                                EMPIRICAL SKILL<br />
                                VERIFICATION ENGINEERING
                            </h1>
                            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                                From automated resume AST extraction and GitHub repository auditing to hardware-locked proctored exams, we engineer verifiable proof of technical competence that eliminates hiring guesswork.
                            </p>
                        </div>

                        {/* High-Contrast Action Block with Explanatory Subtext */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 pt-2">
                            <div>
                                <button
                                    onClick={onStartAssessment}
                                    className="w-full sm:w-auto bg-canvas-blueprint text-white border-2 border-canvas-blueprint py-4 px-8 font-bold text-sm sm:text-base tracking-wider hover:bg-black transition-none shadow-[4px_4px_0px_#0A0A0A] cursor-pointer"
                                >
                                    [ PROVE YOUR SKILLS → ]
                                </button>
                                <span className="text-xs text-outline mt-2 block font-medium">
                                    Free 20-min hardware-proctored technical benchmark.
                                </span>
                            </div>

                            <div>
                                <button
                                    onClick={onPostRequisition}
                                    className="w-full sm:w-auto bg-transparent text-ink-primary border-2 border-ink-primary py-4 px-8 font-bold text-sm sm:text-base tracking-wider hover:bg-ink-primary hover:text-white transition-none shadow-[4px_4px_0px_#1D52B8] cursor-pointer"
                                >
                                    [ HIRE VERIFIED TALENT ]
                                </button>
                                <span className="text-xs text-outline mt-2 block font-medium">
                                    Access pre-audited candidates with zero resume inflation.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right 4 Cols: Bold Proof Focal Metric Block */}
                    <div className="lg:col-span-4 border border-black/20 bg-surface-container-lowest p-6 sm:p-8 flex flex-col justify-between shadow-[4px_4px_0px_#1D52B8]">
                        <div className="border-b border-black/15 pb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-canvas-blueprint">
                                [ PROOF OF COMPETENCE ]
                            </span>
                            <span className="w-2.5 h-2.5 bg-canvas-blueprint animate-pulse"></span>
                        </div>

                        <div className="my-6">
                            <div className="text-4xl sm:text-5xl font-bold text-canvas-blueprint tracking-tight">
                                0%
                            </div>
                            <div className="text-sm font-bold uppercase text-ink-primary mt-1 tracking-wider">
                                RESUME INFLATION
                            </div>
                            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                                Candidate credentials are independently vetted against compiled source code and live optical proctor telemetry.
                            </p>
                        </div>

                        <div className="space-y-2.5 pt-4 border-t border-black/15 text-xs text-ink-primary font-bold">
                            <div className="flex items-center gap-2">
                                <span className="text-canvas-blueprint font-bold">[✓]</span>
                                <span>Hardware-supervised proctoring</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-canvas-blueprint font-bold">[✓]</span>
                                <span>Live GitHub commit &amp; AST analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-canvas-blueprint font-bold">[✓]</span>
                                <span>Cryptographic tamper-evident scores</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
