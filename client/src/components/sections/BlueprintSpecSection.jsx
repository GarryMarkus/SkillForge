import React from 'react';

const BlueprintSpecSection = () => {
    return (
        <section className="w-full bg-canvas-blueprint text-on-primary font-mono py-space-xl px-margin border border-cad-blue my-space-md shadow-[4px_4px_0px_#0A0A0A]" id="BlueprintSection">
            <div className="flex flex-col gap-space-md">
                {/* Blueprint Header Strip */}
                <div className="border border-border-cad-blue bg-primary p-space-sm flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm">
                    <div className="flex items-center gap-space-sm">
                        <span className="bg-white text-canvas-blueprint font-bold px-1.5 py-0.5">CAD_SCHEMATIC</span>
                        <span className="tracking-widest uppercase text-white font-bold">ENGINEERING_BLUEPRINT: SF-V4-VERIFY-CORE</span>
                    </div>
                    <div className="text-white/80 uppercase">
                        SCALE: 1:1 // COORDINATE_MATRIX: ORTHOGONAL // INK: TITANIUM_WHITE
                    </div>
                </div>

                {/* Main Blueprint Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border border-border-cad-blue divide-y lg:divide-y-0 lg:divide-x divide-border-cad-blue bg-primary/40">
                    {/* Left Panel: CAD Wireframe / Isometric Pipeline SVG */}
                    <div className="lg:col-span-6 p-space-md flex flex-col justify-between gap-space-md">
                        <div className="flex items-center justify-between border-b border-white/30 pb-space-xs text-label-sm font-label-sm">
                            <span className="font-bold tracking-wider">[FIG 1.0: ISOMETRIC FLOW PIPELINE]</span>
                            <span className="text-white/70">PROJECTION: AXONOMETRIC 30°</span>
                        </div>

                        {/* Inline Technical SVG Blueprint Schematic */}
                        <div className="w-full py-space-sm overflow-hidden flex items-center justify-center">
                            <svg className="w-full h-auto max-w-[500px] text-white" fill="none" viewBox="0 0 540 380" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern height="20" id="cadGrid" patternUnits="userSpaceOnUse" width="20">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"></path>
                                    </pattern>
                                </defs>
                                <rect fill="url(#cadGrid)" height="380" width="540"></rect>

                                {/* Perimeter Registration Markers */}
                                <path d="M 10 20 L 10 10 L 20 10" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 530 20 L 530 10 L 520 10" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 10 360 L 10 370 L 20 370" stroke="white" strokeWidth="1.5"></path>
                                <path d="M 530 360 L 530 370 L 520 370" stroke="white" strokeWidth="1.5"></path>

                                {/* Coordinates */}
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.6" x="25" y="24">(X:020, Y:010, Z:00)</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.6" x="420" y="365">(X:520, Y:370, Z:01)</text>

                                {/* Node 1: Ingestion Sources */}
                                <rect fill="rgba(0,59,148,0.7)" height="60" stroke="white" strokeWidth="1.2" width="200" x="30" y="55"></rect>
                                <text fill="white" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="42" y="75">[NODE 01: RAW INTAKE]</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="42" y="93">&gt; RESUME PDF (STRUCT)</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.85" x="42" y="105">&gt; GITHUB REPO REST API</text>
                                <circle cx="230" cy="85" fill="white" r="3"></circle>

                                {/* Connector 1 -> 2 */}
                                <path d="M 230 85 L 290 85 L 290 140 L 320 140" stroke="white" strokeDasharray="3 3" strokeWidth="1.5"></path>
                                <polygon fill="white" points="320,137 326,140 320,143"></polygon>
                                <text fill="white" fontFamily="Courier Prime" fontSize="8" opacity="0.7" x="240" y="78">STREAM_JSON</text>

                                {/* Node 2: AI Diagnostic Node / AST */}
                                <rect fill="rgba(0,59,148,0.9)" height="60" stroke="white" strokeWidth="1.5" width="190" x="320" y="115"></rect>
                                <text fill="white" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="330" y="135">[NODE 02: AST &amp; LLM EVAL]</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.9" x="330" y="152">&gt; GEMINI PARSER ENGINE</text>
                                <text fill="white" fontFamily="Courier Prime" fontSize="9" opacity="0.9" x="330" y="164">&gt; CODE HEURISTIC VERIFY</text>
                                <circle cx="415" cy="175" fill="white" r="3"></circle>

                                {/* Connector 2 -> 3 */}
                                <path d="M 415 175 L 415 220 L 260 220 L 260 245" stroke="white" strokeWidth="1.5"></path>
                                <polygon fill="white" points="257,245 260,251 263,245"></polygon>
                                <text fill="white" fontFamily="Courier Prime" fontSize="8" opacity="0.7" x="280" y="214">AST_GRAPH_EMBED</text>

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
                                <text fill="#003b94" fontFamily="Courier Prime" fontSize="10" fontWeight="bold" x="135" y="342">[NODE 04: VERIFIED CREDENTIAL HASH]</text>
                                <text fill="#003b94" fontFamily="Courier Prime" fontSize="8.5" x="135" y="356">HASH: 0x9F4A2B // TALENT_COSINE_VECTOR_EMBED</text>
                            </svg>
                        </div>

                        <div className="border-t border-white/30 pt-space-xs flex items-center justify-between text-label-sm font-label-sm text-white/80">
                            <span>ISOMETRIC AXIS: X:120, Y:340, Z:01</span>
                            <span className="bg-white/20 px-1 font-bold text-white">[ACTIVE_VERIFY]</span>
                        </div>
                    </div>

                    {/* Right Panel: Structured Specification Table */}
                    <div className="lg:col-span-6 p-space-md flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between border-b border-white/30 pb-space-xs text-label-sm font-label-sm mb-space-sm">
                                <span className="font-bold tracking-wider">[SPEC_MATRIX: FORMAL DEFINITIONS]</span>
                                <span className="text-white/70">DOC_SECTION: §4.2</span>
                            </div>

                            {/* Spec Rows Table */}
                            <table className="w-full border-collapse border border-white/40 text-left text-body-md font-body-md">
                                <tbody>
                                    <tr className="border-b border-white/30 bg-white/10">
                                        <td className="p-space-sm font-bold border-r border-white/30 w-12 text-center text-label-md font-label-md">01</td>
                                        <td className="p-space-sm">
                                            <div className="font-bold text-label-md font-label-md text-white">Multi-Modal Code &amp; Resume Ingestion</div>
                                            <div className="text-label-sm font-label-sm text-white/80 mt-0.5">Detail: Dual-stream semantic tokenization</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/30">
                                        <td className="p-space-sm font-bold border-r border-white/30 w-12 text-center text-label-md font-label-md">02</td>
                                        <td className="p-space-sm">
                                            <div className="font-bold text-label-md font-label-md text-white">Zero-Trust Browser Proctor Telemetry</div>
                                            <div className="text-label-sm font-label-sm text-white/80 mt-0.5">Detail: Multi-sensor behavioral risk scoring</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/30 bg-white/10">
                                        <td className="p-space-sm font-bold border-r border-white/30 w-12 text-center text-label-md font-label-md">03</td>
                                        <td className="p-space-sm">
                                            <div className="font-bold text-label-md font-label-md text-white">Vector-Space Candidate Ranking</div>
                                            <div className="text-label-sm font-label-sm text-white/80 mt-0.5">Detail: N-dimensional cosine fit calculation</div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/30">
                                        <td className="p-space-sm font-bold border-r border-white/30 w-12 text-center text-label-md font-label-md">04</td>
                                        <td className="p-space-sm">
                                            <div className="font-bold text-label-md font-label-md text-white">Adaptive AI Upskilling Curricula</div>
                                            <div className="text-label-sm font-label-sm text-white/80 mt-0.5">Detail: Dynamic weakness remediation loops</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Mid-Table Tagline */}
                            <div className="py-space-md text-center italic text-body-md font-body-md text-white/90 border-b border-white/30">
                                &ldquo;Engineered for Integrity. Built for High-Growth Teams.&rdquo;
                            </div>

                            {/* Large Compliance Statement Block */}
                            <div className="p-space-md border border-white/40 bg-white/10 my-space-md text-label-md font-label-md leading-relaxed tracking-wider uppercase font-bold text-white">
                                ALL CANDIDATE EVALUATIONS ARE ALIGNED WITH ZERO-INFLATION, ANTI-CHEAT, AND ROLE-SPECIFIC TECHNICAL BENCHMARKS.
                            </div>
                        </div>

                        {/* Bottom Spec Hash & Revision Strip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/40 divide-y md:divide-y-0 md:divide-x divide-white/40 text-label-sm font-label-sm bg-primary/60">
                            <div className="p-2 text-center truncate">SkillForge Verification Systems</div>
                            <div className="p-2 text-center font-bold">REV_2026.1</div>
                            <div className="p-2 text-center truncate font-bold text-white">SPEC_HASH: 0x9F4A...B12</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlueprintSpecSection;
