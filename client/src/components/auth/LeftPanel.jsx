import React from 'react';

const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between font-mono select-none text-white">
            {/* Top Brand & Node Strip */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight uppercase">
                    <span className="text-white font-bold">+</span>
                    <span>SKILLFORGE // IDENTITY GATEWAY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs border border-white/30 bg-white/10 px-2.5 py-1 w-fit uppercase font-bold text-white">
                    <span>[ NODE: AUTH GATEWAY // VERIFIED ]</span>
                </div>
            </div>

            {/* Middle Architectural Schematic Box */}
            <div className="flex flex-col gap-4 my-auto py-8">
                <div className="border border-white/20 bg-white/10 p-5 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
                    <div className="text-xs uppercase text-white/90 font-bold border-b border-white/20 pb-2 flex items-center justify-between">
                        <span>// ARCHITECTURAL SUBSYSTEMS</span>
                        <span className="text-[10px] text-white/60 font-bold">CAD SPEC</span>
                    </div>

                    <div className="space-y-3 text-xs">
                        <div className="flex items-start gap-2.5">
                            <span className="text-white font-bold">01.</span>
                            <div>
                                <strong className="text-white block uppercase">TF-IDF Vector Match Engine</strong>
                                <span className="text-white/80 text-[11px] leading-relaxed block">
                                    Cosine similarity ranking against enterprise technical requisitions.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <span className="text-white font-bold">02.</span>
                            <div>
                                <strong className="text-white block uppercase">Hardware-Locked Proctoring</strong>
                                <span className="text-white/80 text-[11px] leading-relaxed block">
                                    Live optical face verification and multi-signal risk accumulator.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <span className="text-white font-bold">03.</span>
                            <div>
                                <strong className="text-white block uppercase">Adaptive Curriculum Synthesizer</strong>
                                <span className="text-white/80 text-[11px] leading-relaxed block">
                                    Automated personalized modules designed to resolve skill deficits.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Parameters */}
                <div className="border border-white/20 bg-white/10 p-3.5 text-xs">
                    <dl className="grid grid-cols-2 gap-y-1.5 text-white/90">
                        <dt className="text-white/70">CRYPTOGRAPHY:</dt>
                        <dd className="text-right font-bold">SHA-256 ENCLAVE</dd>
                        <dt className="text-white/70">TOKEN STANDARD:</dt>
                        <dd className="text-right font-bold">JWT BEARER</dd>
                        <dt className="text-white/70">SUPERVISION:</dt>
                        <dd className="text-right font-bold text-green-300">HARDWARE LOCKED</dd>
                    </dl>
                </div>
            </div>

            {/* Base Coordinate Ribbon */}
            <div className="border-t border-white/20 pt-2 flex items-center justify-between text-xs text-white/70">
                <span>IDENTITY SUBSYSTEM</span>
                <span>STATUS: NOMINAL</span>
            </div>
        </div>
    );
};

export default LeftPanel;
