import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import { useAuthStore } from '../store/authStore';

const LandingPage = () => {
    const { isAuthenticated, user, setRole } = useAuthStore();
    const navigate = useNavigate();

    const handleStartAssessment = () => {
        if (isAuthenticated) {
            navigate('/student/assessment');
        } else {
            setRole('student');
            navigate('/auth');
        }
    };

    const handleRecruiterAction = () => {
        if (isAuthenticated && user?.role === 'client') {
            navigate('/client/dashboard');
        } else {
            setRole('client');
            navigate('/auth');
        }
    };

    return (
        <div className="w-full bg-surface text-on-surface font-mono min-h-screen selection:bg-primary-container selection:text-on-primary">
            <Navbar />

            <main className="w-full pt-[84px] bg-surface min-h-[calc(100vh-48px)]">
                <div className="max-w-7xl mx-auto px-margin py-margin">
                    <div className="flex flex-col w-full">

                        {/* SECONDARY COORDINATE SUB-NAV BAR (#Navbar) */}
                        <section className="w-full border-b border-black/15 bg-surface-container-lowest font-mono py-space-sm px-margin mb-space-md" id="SubNav">
                            <div className="flex flex-wrap items-center justify-between gap-space-sm text-label-md font-label-md">
                                <div className="flex items-center gap-space-sm">
                                    <span className="w-2 h-2 bg-primary-container inline-block"></span>
                                    <span className="text-primary-container font-bold tracking-wider">[SYS_TARGET: TALENT_ENGINE_DEPLOY]</span>
                                    <span className="text-outline">::</span>
                                    <span className="text-on-surface-variant">LOC: 0x48.213 / PROTOCOL: HTTPS-TLS1.3</span>
                                </div>
                                <div className="flex items-center gap-space-md">
                                    <span className="bg-surface-container-high px-space-xs py-0.5 border border-black/10 text-label-sm font-label-sm text-on-surface">
                                        NODE: REGIONAL_US_EAST
                                    </span>
                                    <span className="text-label-sm font-label-sm text-primary-container font-bold">
                                        [ENGINE_STATUS: SYNCHRONIZED]
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* HERO SECTION (#HeroSection) */}
                        <section className="w-full bg-surface border border-black/15 font-mono p-space-lg md:p-space-xl relative mb-space-xl" id="HeroSection">
                            <div className="absolute top-0 left-0 text-label-sm font-label-sm text-outline/60 select-none p-1 pointer-events-none">+ 00.00 / 01.00</div>
                            <div className="absolute top-0 right-0 text-label-sm font-label-sm text-outline/60 select-none p-1 pointer-events-none">+ 12.00 / 01.00</div>
                            
                            <div className="flex flex-col gap-space-lg">
                                {/* Coordinate Track & Status Badge */}
                                <div className="flex flex-wrap items-center justify-between gap-space-xs border-b border-black/10 pb-space-sm">
                                    <div className="flex items-center gap-space-xs text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant">
                                        <span className="bg-black text-white px-1.5 py-0.5 font-bold">SPEC_01</span>
                                        <span>EMPIRICAL TALENT VALIDATION SPECIFICATION</span>
                                    </div>
                                    <div className="text-label-sm font-label-sm text-outline uppercase">
                                        DOC_REF: SF-DOC-7729 // SEC_CLEARANCE: L3
                                    </div>
                                </div>

                                {/* Main Headline & Description */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                                    <div className="lg:col-span-8 flex flex-col gap-space-md">
                                        <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight leading-tight">
                                            EMPIRICAL SKILL<br />VERIFICATION ENGINEERING
                                        </h1>
                                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[650px] leading-relaxed">
                                            From automated resume PDF extraction and GitHub repository auditing to hardware-locked proctored exams, we engineer verifiable proof of technical competence that eliminates hiring guesswork.
                                        </p>

                                        {/* Action Row */}
                                        <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                                            <button
                                                onClick={handleStartAssessment}
                                                className="inline-flex items-center justify-center font-label-md text-label-md bg-primary-container text-on-primary border border-primary-container px-space-lg py-space-sm uppercase tracking-wider hover:bg-primary transition-all duration-150"
                                            >
                                                [ INITIALIZE_DIAGNOSTIC_EXAM ]
                                            </button>
                                            <button
                                                onClick={handleRecruiterAction}
                                                className="inline-flex items-center justify-center font-label-md text-label-md bg-transparent text-on-surface border border-black px-space-lg py-space-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-150"
                                            >
                                                [ POST_REQUISITION_SPEC ]
                                            </button>
                                        </div>
                                    </div>

                                    {/* Telemetry Inset Box */}
                                    <div className="lg:col-span-4 border border-black/20 bg-surface-container-lowest p-space-md flex flex-col gap-space-sm shadow-[3px_3px_0px_#1D52B8]">
                                        <div className="border-b border-black/10 pb-space-xs flex items-center justify-between">
                                            <span className="text-label-sm font-label-sm font-bold uppercase text-primary-container">[REALTIME_CALIBRATION]</span>
                                            <span className="w-2 h-2 rounded-none bg-primary animate-pulse"></span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-label-sm font-label-sm text-on-surface">
                                            <div className="flex justify-between py-0.5 border-b border-black/5">
                                                <span className="text-outline">INGESTION_LATENCY:</span>
                                                <span className="font-bold">42ms [NOMINAL]</span>
                                            </div>
                                            <div className="flex justify-between py-0.5 border-b border-black/5">
                                                <span className="text-outline">AUDIT_STANDARD:</span>
                                                <span className="font-bold">IEEE-241-REV4</span>
                                            </div>
                                            <div className="flex justify-between py-0.5 border-b border-black/5">
                                                <span className="text-outline">PROCTOR_INTEGRITY:</span>
                                                <span className="font-bold text-primary-container">99.982%</span>
                                            </div>
                                            <div className="flex justify-between py-0.5">
                                                <span className="text-outline">HASH_CONSENSUS:</span>
                                                <span className="font-bold">BLAKE3-256</span>
                                            </div>
                                        </div>
                                        <div className="mt-space-xs bg-surface-container p-space-xs text-label-sm font-label-sm border border-black/10 text-on-surface-variant font-mono">
                                            &gt; SYSTEM READY FOR CANDIDATE_BATCH_2026.4
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Specs Bar */}
                                <div className="border border-black/15 bg-surface-container-low px-space-md py-space-xs flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm uppercase">
                                    <div className="flex flex-wrap items-center gap-space-md">
                                        <span className="text-on-surface font-bold">LATENCY: 42ms</span>
                                        <span className="text-outline">//</span>
                                        <span className="text-on-surface font-bold">AUDIT_STANDARD: IEEE-241</span>
                                        <span className="text-outline">//</span>
                                        <span className="text-on-surface font-bold">INTEGRITY: 99.98%</span>
                                    </div>
                                    <div className="text-outline">
                                        GEO_DISTRIBUTION: 14_REGIONS // ACTIVE_SESSIONS: 1,492
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* THREE-COLUMN CAPABILITIES ROW (#CapabilitiesRow) */}
                        <section className="w-full bg-surface border-b border-black/15 font-mono pb-space-xl mb-space-xl" id="CapabilitiesRow">
                            <div className="flex flex-col gap-space-md">
                                {/* Section Header Indicator */}
                                <div className="flex items-center justify-between text-label-sm font-label-sm text-outline border-b border-black/10 pb-space-xs uppercase">
                                    <span>02 // ARCHITECTURAL PILLARS</span>
                                    <span>GRID: 3-COL RIGID CAD BOUNDS</span>
                                </div>

                                {/* 3 Columns */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/20 bg-surface-container-lowest">
                                    {/* Col 1 */}
                                    <div className="border-b md:border-b-0 md:border-r border-black/20 p-space-lg flex flex-col justify-between gap-space-md relative">
                                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_A:01]</div>
                                        <div className="flex flex-col gap-space-sm">
                                            <div className="flex items-center gap-space-xs">
                                                <span className="w-2.5 h-2.5 bg-primary-container inline-block"></span>
                                                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                                                    Multi-Modal Intake &amp; Audit
                                                </h2>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                                Automated ingestion of candidate resume PDFs paired with live GitHub REST API repository scraping and LangChain Gemini code analysis.
                                            </p>
                                        </div>
                                        <div className="pt-space-md border-t border-black/10">
                                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-black/10 text-on-surface font-bold">
                                                INPUTS: [PDF, GIT_COMMIT_LOGS, AST]
                                            </span>
                                        </div>
                                    </div>

                                    {/* Col 2 */}
                                    <div className="border-b md:border-b-0 md:border-r border-black/20 p-space-lg flex flex-col justify-between gap-space-md relative bg-surface-container-low/30">
                                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_B:02]</div>
                                        <div className="flex flex-col gap-space-sm">
                                            <div className="flex items-center gap-space-xs">
                                                <span className="w-2.5 h-2.5 bg-primary-container inline-block"></span>
                                                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                                                    Hardware-Locked Proctoring
                                                </h2>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                                Real-time browser webcam skin-tone heuristics, fullscreen lock enforcement, tab-focus monitoring, and a 50-point risk threshold engine.
                                            </p>
                                        </div>
                                        <div className="pt-space-md border-t border-black/10">
                                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-black/10 text-on-surface font-bold">
                                                ENFORCEMENT: [KERNEL_WINDOW_LOCK, GAZE_TRACK]
                                            </span>
                                        </div>
                                    </div>

                                    {/* Col 3 */}
                                    <div className="p-space-lg flex flex-col justify-between gap-space-md relative">
                                        <div className="absolute top-1 right-2 text-label-sm font-label-sm text-outline/50">[COL_C:03]</div>
                                        <div className="flex flex-col gap-space-sm">
                                            <div className="flex items-center gap-space-xs">
                                                <span className="w-2.5 h-2.5 bg-primary-container inline-block"></span>
                                                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                                                    TF-IDF Cosine Matching
                                                </h2>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                                Two-sided vector space candidate-to-job matching using scikit-learn cosine similarity to rank applicants by empirical skill alignment.
                                            </p>
                                        </div>
                                        <div className="pt-space-md border-t border-black/10">
                                            <span className="inline-block text-label-sm font-label-sm bg-surface-container px-space-xs py-1 border border-black/10 text-on-surface font-bold">
                                                METRIC: [COSINE_SIMILARITY_0.00-1.00]
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FULL-BLEED BLUEPRINT SPECIFICATION GRID (#BlueprintSection) */}
                        <section className="w-full bg-primary-container text-on-primary font-mono py-space-xl px-margin border border-black/20 my-space-md shadow-[4px_4px_0px_#0A0A0A]" id="BlueprintSection">
                            <div className="flex flex-col gap-space-md">
                                {/* Blueprint Header Strip */}
                                <div className="border border-white/40 bg-primary p-space-sm flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="bg-white text-primary-container font-bold px-1.5 py-0.5">CAD_SCHEMATIC</span>
                                        <span className="tracking-widest uppercase text-white font-bold">ENGINEERING_BLUEPRINT: SF-V4-VERIFY-CORE</span>
                                    </div>
                                    <div className="text-white/80 uppercase">
                                        SCALE: 1:1 // COORDINATE_MATRIX: ORTHOGONAL // INK: TITANIUM_WHITE
                                    </div>
                                </div>

                                {/* Main Blueprint Split Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/40 divide-y lg:divide-y-0 lg:divide-x divide-white/40 bg-primary/40">
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

                        {/* DUAL PERSONA SPECIFICATION TABLE (#PersonaSplitSection) */}
                        <section className="w-full bg-surface font-mono py-space-xl" id="PersonaSplitSection">
                            <div className="flex flex-col gap-space-md">
                                {/* Section Tag */}
                                <div className="flex items-center justify-between text-label-sm font-label-sm text-outline border-b border-black/10 pb-space-xs uppercase">
                                    <span>03 // WORKFLOW SEGMENTATION</span>
                                    <span>PERSONA_ROUTING: DUAL_INTERFACE</span>
                                </div>

                                {/* 2-Column Comparison Block */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                                    {/* SPEC_A // FOR_CANDIDATES */}
                                    <div className="border border-black/20 bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg relative shadow-[3px_3px_0px_#191C1D]">
                                        <div className="flex flex-col gap-space-md">
                                            {/* Header & Tag */}
                                            <div className="border-b border-black/15 pb-space-sm flex flex-col gap-1">
                                                <span className="text-label-sm font-label-sm text-outline uppercase font-bold tracking-widest">[ SPEC_A // FOR_CANDIDATES ]</span>
                                                <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                                                    PROVE_COMPETENCE_BEFORE_INTERVIEW
                                                </h3>
                                            </div>

                                            {/* Deliverables */}
                                            <div className="flex flex-col gap-space-sm text-body-md font-body-md text-on-surface-variant">
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>Verified empirical skill score published to cryptographic ledger</span>
                                                </div>
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>Adaptive upskilling modules dynamically generated from code gap analysis</span>
                                                </div>
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>Direct algorithmic matching to top tier engineering teams without recruiter bias</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom CTA */}
                                        <div className="pt-space-md border-t border-black/10">
                                            <button
                                                onClick={() => {
                                                    setRole('student');
                                                    navigate('/auth');
                                                }}
                                                className="w-full inline-flex items-center justify-center font-label-md text-label-md bg-surface-container-lowest text-on-surface border border-black px-space-md py-space-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-150"
                                            >
                                                [ CREATE_CANDIDATE_PROFILE -&gt; ]
                                            </button>
                                        </div>
                                    </div>

                                    {/* SPEC_B // FOR_RECRUITERS */}
                                    <div className="border border-black/20 bg-surface-container-lowest p-space-lg flex flex-col justify-between gap-space-lg relative shadow-[3px_3px_0px_#1D52B8]">
                                        <div className="flex flex-col gap-space-md">
                                            {/* Header & Tag */}
                                            <div className="border-b border-black/15 pb-space-sm flex flex-col gap-1">
                                                <span className="text-label-sm font-label-sm text-primary-container uppercase font-bold tracking-widest">[ SPEC_B // FOR_RECRUITERS ]</span>
                                                <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                                                    DEPLOY_PRE_VETTED_ENGINEERS
                                                </h3>
                                            </div>

                                            {/* Deliverables */}
                                            <div className="flex flex-col gap-space-sm text-body-md font-body-md text-on-surface-variant">
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>Ranked candidate lists filtered strictly by empirical cosine similarity (&gt;0.88)</span>
                                                </div>
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>50-point tamper-evident proctor risk audit logs with webcam gaze telemetry</span>
                                                </div>
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="text-primary-container font-bold">[✓]</span>
                                                    <span>Automated technical screening replacing 30+ hours of first-round engineer interviews</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom CTA */}
                                        <div className="pt-space-md border-t border-black/10">
                                            <button
                                                onClick={() => {
                                                    setRole('client');
                                                    navigate('/auth');
                                                }}
                                                className="w-full inline-flex items-center justify-center font-label-md text-label-md bg-primary-container text-on-primary border border-primary-container px-space-md py-space-sm uppercase tracking-wider hover:bg-primary transition-colors duration-150"
                                            >
                                                [ DEPLOY_HIRING_PIPELINE -&gt; ]
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Execution Terminal Footnote */}
                                <div className="border border-black/15 bg-surface-container-high/40 p-space-sm flex flex-wrap items-center justify-between text-label-sm font-label-sm text-on-surface-variant mt-space-md">
                                    <div>TERMINAL_SOCKET: READY // STREAM_DISPATCHER: ACTIVE</div>
                                    <div className="font-bold text-on-surface">[HASH_ALGO: SHA256_DETERMINISTIC_RUN]</div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
