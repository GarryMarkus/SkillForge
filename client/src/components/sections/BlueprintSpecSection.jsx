import React from 'react';

const BlueprintSpecSection = () => {
    return (
        <section className="w-full bg-canvas-blueprint text-on-primary font-mono py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border border-white/20 mb-12 sm:mb-16 shadow-[6px_6px_0px_#0A0A0A]" id="BlueprintSection">
            <div className="flex flex-col gap-6">
                {/* Blueprint Header Strip */}
                <div className="border border-white/20 bg-primary/80 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="bg-white text-canvas-blueprint font-bold px-2 py-0.5">SCHEMATIC</span>
                        <span className="tracking-wider uppercase text-white font-bold">
                            ENGINEERING BLUEPRINT: MULTI-STAGE VERIFICATION PIPELINE
                        </span>
                    </div>
                    <span className="bg-white/20 text-white px-2 py-0.5 font-bold uppercase border border-white/30">
                        [ STATUS: ACTIVE SPECIFICATION ]
                    </span>
                </div>

                {/* Main Blueprint Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/20 divide-y lg:divide-y-0 lg:divide-x divide-white/20 bg-primary/40">
                    {/* Left Panel: CAD Flow Pipeline Graphic */}
                    <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
                        <div className="flex items-center justify-between border-b border-white/20 pb-2 text-xs">
                            <span className="font-bold tracking-wider text-white">[ PIPELINE STAGES: 01 THROUGH 04 ]</span>
                            <span className="text-white/70">END-TO-END VERIFICATION</span>
                        </div>

                        {/* Inline Technical SVG Blueprint Schematic */}
                        <div className="w-full py-2 overflow-hidden flex items-center justify-center">
                            <svg className="w-full h-auto max-w-[500px] text-white" fill="none" viewBox="0 0 540 380" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern height="20" id="cadGridClean" patternUnits="userSpaceOnUse" width="20">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"></path>
                                    </pattern>
                                </defs>
                                <rect fill="url(#cadGridClean)" height="380" width="540"></rect>

                                {/* Perimeter Registration Markers */}
                                <path d="M 10 20 L 10 10 L 20 10" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 530 20 L 530 10 L 520 10" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 10 360 L 10 370 L 20 370" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 530 360 L 530 370 L 520 370" stroke="white" strokeWidth="1.5"></path>

                                {/* Node 1: Ingestion Sources */}
                                <rect fill="rgba(0,59,148,0.7)" height="60" stroke="white" strokeWidth="1.2" width="200" x="30" y="55"></rect>
                                <text fill="white" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="42" y="75">[NODE 01: RAW INTAKE]</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="42" y="93">&gt; RESUME PDF (STRUCT)</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="42" y="105">&gt; GITHUB REPO REST API</text>
                                <circle cx="230" cy="85" fill="white" r="3"></circle>

                                {/* Connector 1 -> 2 */}
                                <path d="M 230 85 L 290 85 L 290 140 L 320 140" stroke="white" strokeDasharray="3 3" strokeWidth="1.5"></path>
                                <polygon fill="white" points="320,137 326,140 320,143"></polygon>
                                <text fill="white" fontFamily="Courier Prime" fontSize="8" opacity="0.7" x="240" y="78">JSON_AST</text>

                                {/* Node 2: AI Diagnostic Node / AST */}
                                <rect fill="rgba(0,59,148,0.9)" height="60" stroke="white" strokeWidth="1.5" width="190" x="320" y="115"></rect>
                                <text fill="white" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="330" y="135">[NODE 02: AST &amp; CODE EVAL]</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.9" x="330" y="152">&gt; GEMINI PARSER ENGINE</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.9" x="330" y="164">&gt; CODE HEURISTIC VERIFY</text>
                                <circle cx="415" cy="175" fill="white" r="3"></circle>

                                {/* Connector 2 -> 3 */}
                                <path d="M 415 175 L 415 220 L 260 220 L 260 245" stroke="white" strokeWidth="1.5"></path>
                                <polygon fill="white" points="257,245 260,251 263,245"></polygon>
                                <text fill="white" fontFamily="Courier Prime" fontSize="8" opacity="0.7" x="280" y="214">EMBED_GRAPH</text>

                                {/* Node 3: Proctor Telemetry Engine */}
                                <rect fill="rgba(0,59,148,0.7)" height="55" stroke="white" strokeWidth="1.2" width="240" x="140" y="245"></rect>
                                <text fill="white" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="152" y="265">[NODE 03: PROCTOR_TELEMETRY]</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="152" y="282">&gt; GAZE &amp; HARDWARE FOCUS LOCK</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="152" y="293">&gt; 50-PT RISK HEURISTIC MONITOR</text>
                                <circle cx="380" cy="272" fill="white" r="3"></circle>

                                {/* Connector 3 -> 4 */}
                                <path d="M 260 300 L 260 325" stroke="white" strokeWidth="1.5"></path>
                                <polygon fill="white" points="257,325 260,331 263,325"></polygon>

                                {/* Node 4: Final Output Hash */}
                                <rect fill="white" height="40" stroke="white" strokeWidth="1.5" width="280" x="120" y="325"></rect>
                                <text fill="#003b94" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="135" y="342">[NODE 04: VERIFIED CREDENTIAL]</text>
                                <text fill="#003b94" fontFamily="Courier Prime" fontSize="8.5" x="135" y="356">SCORE DOSSIER // DIRECT EMPLOYER SHORTLIST</text>
                            </svg>
                        </div>

                        <div className="border-t border-white/20 pt-2 flex items-center justify-between text-xs text-white/80">
                            <span>CRYPTOGRAPHIC INTEGRITY: CONFIRMED</span>
                            <span className="bg-white/20 px-2 py-0.5 font-bold text-white">[PIPELINE READY]</span>
                        </div>
                    </div>

                    {/* Right Panel: Structured Specification Definitions */}
                    <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
                        <div>
                            <div className="flex items-center justify-between border-b border-white/20 pb-2 text-xs mb-4">
                                <span className="font-bold tracking-wider text-white">[ SPEC_MATRIX: SYSTEM CAPABILITIES ]</span>
                                <span className="text-white/70">ARCHITECTURAL GUARANTEES</span>
                            </div>

                            {/* Spec Rows Table */}
                            <table className="w-full border-collapse border border-white/30 text-left text-sm">
                                <tbody>
                                    <tr className="border-b border-white/20 bg-white/10">
                                        <td className="p-3 font-bold border-r border-white/20 w-12 text-center text-xs text-white">01</td>
                                        <td className="p-3">
                                            <div className="font-bold text-white">Multi-Modal Code &amp; Resume Ingestion</div>
                                            <div className="text-xs text-white/80 mt-0.5">Dual-stream AST code and resume tokenization</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/20">
                                        <td className="p-3 font-bold border-r border-white/20 w-12 text-center text-xs text-white">02</td>
                                        <td className="p-3">
                                            <div className="font-bold text-white">Zero-Trust Browser Proctor Telemetry</div>
                                            <div className="text-xs text-white/80 mt-0.5">Real-time webcam face-lock and tab focus monitoring</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/20 bg-white/10">
                                        <td className="p-3 font-bold border-r border-white/20 w-12 text-center text-xs text-white">03</td>
                                        <td className="p-3">
                                            <div className="font-bold text-white">Vector-Space Candidate Ranking</div>
                                            <div className="text-xs text-white/80 mt-0.5">Cosine similarity fit against production job requisitions</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/20">
                                        <td className="p-3 font-bold border-r border-white/20 w-12 text-center text-xs text-white">04</td>
                                        <td className="p-3">
                                            <div className="font-bold text-white">Adaptive Upskilling Curricula</div>
                                            <div className="text-xs text-white/80 mt-0.5">Personalized modules automatically targeting identified skill gaps</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Mid-Table Tagline */}
                            <div className="py-4 text-center italic text-sm text-white/90 border-b border-white/20">
                                &ldquo;Engineered for empirical proof. Built to eliminate hiring guesswork.&rdquo;
                            </div>
                        </div>

                        {/* Bottom Status Strip */}
                        <div className="border border-white/30 p-2.5 text-xs text-center text-white/90 bg-primary/60 flex items-center justify-between">
                            <span>SKILLFORGE VERIFICATION CORE</span>
                            <span className="font-bold text-white">VERIFIED // ANTI-CHEAT COMPLIANT</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlueprintSpecSection;
