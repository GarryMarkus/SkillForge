import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import StudioNoise from '../components/ui/animations/StudioNoise';
import SpotlightCard from '../components/ui/animations/SpotlightCard';
import { useAuthStore } from '../store/authStore';

/**
 * VerificationPage
 * Dedicated deep-dive page detailing the Three Pillars of SkillForge Evaluation.
 * Highlights empirical AST codebase inspection, sandboxed runtime environments,
 * and semantic merit-based placement.
 */
const VerificationPage = () => {
    const { isAuthenticated, setRole } = useAuthStore();
    const navigate = useNavigate();

    const handleStartAssessment = () => {
        if (isAuthenticated) {
            navigate('/student/assessment');
        } else {
            setRole('student');
            navigate('/auth');
        }
    };

    return (
        <StudioNoise opacity={0.09}>
            <div className="w-full text-[#ededed] font-mono min-h-screen selection:bg-white/20 selection:text-white flex flex-col justify-between">
                <Navbar />

                <main className="w-full flex-1 relative z-10 font-mono">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header Section */}
                        <header className="pt-8 pb-12 md:pt-12 md:pb-16 max-w-3xl">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8e] block mb-3">
                                Evaluation Methodology
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15] mb-6">
                                How SkillForge Evaluates Real Ability
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg font-mono text-[#888888] leading-relaxed max-w-2xl">
                                Traditional recruitment measures pedigree, keyword density, and interview charisma. SkillForge measures verified technical execution through automated code analysis, isolated sandboxes, and objective rubrics.
                            </p>
                        </header>

                        {/* Three Deep-Dive Evaluation Pillars */}
                        <section id="pillars" className="pb-28 md:pb-36 space-y-16 md:space-y-24">
                            {/* Pillar 1: Codebase Ingestion & AST Inspection */}
                            <div className="border-t border-white/[0.06] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                            Pillar 01 · Ingestion &amp; Static Analysis
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                            Project &amp; Repository Analysis
                                        </h2>
                                    </div>

                                    <p className="text-sm md:text-base text-[#888888] leading-relaxed">
                                        Rather than scanning resumes for acronyms, our ingestion engine parses actual code commits, project modularity, and structural complexity. We evaluate genuine engineering practices rather than claims.
                                    </p>

                                    <ul className="space-y-3.5 text-xs sm:text-sm text-[#cccccc] pt-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>AST syntax tree decomposition across Python, TypeScript, Go, and SQL codebases.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Git authorship verification and commit cadence analysis to identify authentic contributions.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Complete insulation against pedigree bias, university filters, and resume embellishments.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-5 relative">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                                    />
                                    <SpotlightCard
                                        bgClassName="bg-[#111318]"
                                        className="relative p-6 space-y-4 shadow-xl"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                            <span className="font-bold font-display text-white">Telemetry Specs</span>
                                            <span className="text-[11px] text-zinc-300 px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08]">Engine Module 01</span>
                                        </div>
                                        <div className="space-y-2.5 text-xs font-mono text-[#8a8a8e]">
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Parser Engine</span>
                                                <span className="text-white font-bold">Tree-sitter AST</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Commit Auditing</span>
                                                <span className="text-white font-bold">Cryptographic Authorship</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Modularity Metric</span>
                                                <span className="text-white font-bold">Cyclomatic &amp; Depth</span>
                                            </div>
                                            <div className="flex justify-between py-1.5">
                                                <span>Keyword Dependency</span>
                                                <span className="text-[#f5f5f5] font-bold">0% (Pure Code)</span>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </div>

                            {/* Pillar 2: Standardized Sandboxed Evaluations */}
                            <div className="border-t border-white/[0.06] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                            Pillar 02 · Dynamic Verification
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                            Standardized Technical Evaluations
                                        </h2>
                                    </div>

                                    <p className="text-sm md:text-base text-[#888888] leading-relaxed">
                                        Candidates complete focused, 20-minute sandboxed engineering challenges modeled directly after real production systems. Every scenario focuses on architectural reasoning, memory profiling, and robust edge-case handling.
                                    </p>

                                    <ul className="space-y-3.5 text-xs sm:text-sm text-[#cccccc] pt-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Ephemeral Docker sandboxes preventing runtime tampering or network-based shortcuts.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Lightweight browser and optical telemetry guaranteeing uncompromised session integrity.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Automated test-suite execution measuring correctness, latency, and resource footprints.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-5 relative">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                                    />
                                    <SpotlightCard
                                        bgClassName="bg-[#111318]"
                                        className="relative p-6 space-y-4 shadow-xl"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                            <span className="font-bold font-display text-white">Sandbox Specs</span>
                                            <span className="text-[11px] text-zinc-300 px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08]">Engine Module 02</span>
                                        </div>
                                        <div className="space-y-2.5 text-xs font-mono text-[#8a8a8e]">
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Isolation Tier</span>
                                                <span className="text-white font-bold">Ephemeral Linux Sandbox</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Standard Duration</span>
                                                <span className="text-white font-bold">20 Minutes</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Integrity Record</span>
                                                <span className="text-white font-bold">Zero-Tamper Verified</span>
                                            </div>
                                            <div className="flex justify-between py-1.5">
                                                <span>Benchmark Scenarios</span>
                                                <span className="text-[#f5f5f5] font-bold">Production Systems</span>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </div>

                            {/* Pillar 3: Algorithmic Placement & Skill Dossiers */}
                            <div className="border-t border-white/[0.06] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                            Pillar 03 · Dispatch &amp; Matching
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                            Direct, Merit-Based Job Matching
                                        </h2>
                                    </div>

                                    <p className="text-sm md:text-base text-[#888888] leading-relaxed">
                                        Evaluated competencies are synthesized into a verified Candidate Dossier. Hiring managers match candidates via semantic cosine similarity to their actual technical criteria, skipping preliminary screenings entirely.
                                    </p>

                                    <ul className="space-y-3.5 text-xs sm:text-sm text-[#cccccc] pt-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Cosine similarity alignment connecting candidates directly to high-compatibility roles.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Permanent, shareable technical dossiers detailing percentile strengths and audited code.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#555555] select-none font-bold">-</span>
                                            <span>Direct progression to final team culture and architectural fit interviews.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="lg:col-span-5 relative">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                                    />
                                    <SpotlightCard
                                        bgClassName="bg-[#111318]"
                                        className="relative p-6 space-y-4 shadow-xl"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                            <span className="font-bold font-display text-white">Matching Specs</span>
                                            <span className="text-[11px] text-zinc-300 px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08]">Engine Module 03</span>
                                        </div>
                                        <div className="space-y-2.5 text-xs font-mono text-[#8a8a8e]">
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Matching Model</span>
                                                <span className="text-white font-bold">Cosine Embedding Vector</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Screening Bypass</span>
                                                <span className="text-white font-bold">Direct to Final Round</span>
                                            </div>
                                            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                                                <span>Data Privacy</span>
                                                <span className="text-white font-bold">Zero Third-Party Leakage</span>
                                            </div>
                                            <div className="flex justify-between py-1.5">
                                                <span>Dossier Validity</span>
                                                <span className="text-[#f5f5f5] font-bold">Cryptographically Audited</span>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </div>

                            {/* Bottom Navigation Strip */}
                            <div className="border-t border-white/[0.06] pt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="space-y-1 text-center sm:text-left">
                                    <h3 className="text-base font-bold font-display text-white">
                                        Ready to verify your engineering competence?
                                    </h3>
                                    <p className="text-xs text-[#737373]">
                                        Take the standard 20-minute sandbox evaluation and receive an empirical skill dossier.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={handleStartAssessment}
                                        className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white px-5 py-2.5 rounded-sm transition-colors text-xs sm:text-sm cursor-pointer"
                                    >
                                        <span>Start Free Assessment</span>
                                        <span aria-hidden="true">↗</span>
                                    </button>
                                    <Link
                                        to="/protocol"
                                        className="inline-flex items-center gap-1.5 text-sm text-[#888888] hover:text-white hover:underline underline-offset-4 px-2 py-2 transition-colors font-mono"
                                    >
                                        <span>Inspect Protocol</span>
                                        <span aria-hidden="true">↗</span>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </StudioNoise>
    );
};

export default VerificationPage;
