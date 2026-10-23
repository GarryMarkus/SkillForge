import React from 'react';

const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between font-mono select-none text-on-primary">
            {/* Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-on-primary/40 text-[10px] pointer-events-none">+</div>
            <div className="absolute top-2 right-2 text-on-primary/40 text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 text-on-primary/40 text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 text-on-primary/40 text-[10px] pointer-events-none">+</div>

            {/* Top Brand & Node Strip */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-headline-sm font-bold tracking-tight uppercase">
                    <span className="text-white font-bold">+</span>
                    <span>SKILLFORGE // IDENTITY_GATEWAY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-label-sm font-label-sm border border-white/30 bg-white/10 px-space-xs py-0.5 w-fit uppercase font-bold">
                    <span>[NODE: AUTH_GATEWAY_V4 // 256-BIT_ENCRYPTION]</span>
                </div>
            </div>

            {/* Middle Architectural Schematic Box */}
            <div className="flex flex-col gap-space-md my-auto py-space-lg">
                <div className="border border-white/20 bg-primary/40 p-space-md flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                    <div className="text-label-sm font-label-sm uppercase text-on-primary/80 font-bold border-b border-white/20 pb-1 flex items-center justify-between">
                        <span>// ARCHITECTURAL_SUBSYSTEMS</span>
                        <span className="text-[9px] text-white/50">CAD_SPEC_09</span>
                    </div>

                    <div className="space-y-2 text-body-sm font-body-sm">
                        <div className="flex items-start gap-2">
                            <span className="text-primary-fixed font-bold">01.</span>
                            <div>
                                <strong className="text-white block uppercase">TF-IDF Vector Matching Engine</strong>
                                <span className="text-on-primary/80 text-[11px] leading-tight block">
                                    Cosine similarity ranking against enterprise technical requisitions.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <span className="text-primary-fixed font-bold">02.</span>
                            <div>
                                <strong className="text-white block uppercase">Hardware-Locked Proctoring</strong>
                                <span className="text-on-primary/80 text-[11px] leading-tight block">
                                    Real-time canvas pixel heuristics and multi-signal risk accumulator.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <span className="text-primary-fixed font-bold">03.</span>
                            <div>
                                <strong className="text-white block uppercase">Adaptive Curriculum Synthesizer</strong>
                                <span className="text-on-primary/80 text-[11px] leading-tight block">
                                    Automated personalized modules designed to resolve skill score deficits.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Parameters DL */}
                <div className="border border-white/20 bg-primary/30 p-space-sm text-label-sm font-label-sm">
                    <dl className="grid grid-cols-2 gap-y-1 text-on-primary/90">
                        <dt className="text-on-primary/60">CRYPTOGRAPHY:</dt>
                        <dd className="text-right font-bold">SHA256 + BLAKE3</dd>
                        <dt className="text-on-primary/60">TOKEN_STANDARD:</dt>
                        <dd className="text-right font-bold">JWT (BEARER_AUTH)</dd>
                        <dt className="text-on-primary/60">SECURITY_CLEARANCE:</dt>
                        <dd className="text-right font-bold text-primary-fixed">NIST_COMPLIANT</dd>
                    </dl>
                </div>
            </div>

            {/* Base Coordinate Ribbon */}
            <div className="border-t border-white/20 pt-space-xs flex items-center justify-between text-label-sm font-label-sm text-on-primary/70">
                <span>COORD: X00-Y00 // ORTHO</span>
                <span>REV: 2026.4 // WORM_LOCKED</span>
            </div>
        </div>
    );
};

export default LeftPanel;
