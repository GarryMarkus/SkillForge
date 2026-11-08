import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import StudioNoise from '../components/ui/animations/StudioNoise';
import SpotlightCard from '../components/ui/animations/SpotlightCard';

const workflowSteps = [
    {
        num: '01',
        title: 'Profile & Code Intake',
        badge: 'Minutes',
        detail: 'Connect GitHub or upload project sources. Automated static analysis inspects commit history, repositories, test coverage, and architectural modularity without keyword scanning.',
        subtext: 'Ingests raw repository trees and converts commit logs into empirical engineering telemetry.'
    },
    {
        num: '02',
        title: 'Sandboxed Technical Evaluation',
        badge: '20 Mins',
        detail: 'Complete an isolated, 20-minute practical challenge modeled directly on production system debugging. Execution takes place within secure, ephemeral Linux sandboxes.',
        subtext: 'Evaluates real-time code execution, memory profiling, and edge-case handling under optical proctoring.'
    },
    {
        num: '03',
        title: 'Verified Skill Dossier',
        badge: 'Instant',
        detail: 'Receive an authenticated technical breakdown indexing verified competencies, transparent percentile rankings, and actionable growth rubrics.',
        subtext: 'Generates a permanent cryptographic verification hash authenticated by SkillForge Engine.'
    },
    {
        num: '04',
        title: 'Direct Engineering Dispatch',
        badge: 'Direct',
        detail: 'Bypass repetitive recruiter screenings and keyword filters. Advance directly to final technical fit and cultural alignment conversations with hiring partners.',
        subtext: 'Accelerates hiring cycles from 6 weeks down to 7 days with verified candidate evidence.'
    }
];

const technicalSpecs = [
    {
        attribute: 'Algorithmic Problem Solving',
        method: 'Sandboxed challenge execution & time complexity analysis',
        protocol: 'Deterministic test suites with memory & CPU quotas'
    },
    {
        attribute: 'System Architecture & Modularity',
        method: 'Static AST decomposition of submitted code & repositories',
        protocol: 'Cyclomatic complexity scoring, decoupling index, and dependency hygiene'
    },
    {
        attribute: 'Proctoring & Session Integrity',
        method: 'Optical face verification, window focus, and hardware telemetry',
        protocol: 'Cryptographic tamper-detection logs with zero false-positive tolerance'
    },
    {
        attribute: 'Authorship & Genuine Experience',
        method: 'Git commit signature verification & author cadence telemetry',
        protocol: 'Statistical historical footprint validation across public & private repos'
    },
    {
        attribute: 'Hiring Decision Velocity',
        method: 'Pre-computed semantic cosine similarity matching',
        protocol: 'Direct-to-final interview dispatch, cutting cycle times from 6 weeks to 7 days'
    }
];

/**
 * ProtocolPage
 * Dedicated technical specifications page detailing the 4-phase verification lifecycle
 * and the validation protocol data matrix.
 */
const ProtocolPage = () => {
    return (
        <StudioNoise opacity={0.09}>
            <div className="w-full text-[#ededed] font-mono min-h-screen selection:bg-white/20 selection:text-white flex flex-col justify-between">
                <Navbar />

                <main className="w-full flex-1 relative z-10 font-mono">
                    {/* Header Section */}
                    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-3">
                            System Architecture &amp; Workflow
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15] mb-6">
                            From First Commit to Verified Offer
                        </h1>
                        <p className="text-base md:text-lg font-mono text-[#888888] leading-relaxed max-w-2xl">
                            A four-phase operational protocol replacing subjective screening guesswork with deterministic engineering telemetry and cryptographic auditability.
                        </p>
                    </header>

                    {/* Section 1: The Four-Phase Workflow Timeline */}
                    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <div className="border-t border-white/[0.08] pt-12 md:pt-16 mb-8">
                            <span className="text-xs text-[#737373] uppercase tracking-wider block mb-2">
                                Execution Lifecycle
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                Four-Phase Verification Timeline
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {workflowSteps.map((step) => (
                                <SpotlightCard
                                    key={step.num}
                                    bgClassName="bg-[#0e0e11]"
                                    className="p-8 md:p-10 rounded-md border border-white/[0.08] flex flex-col justify-between gap-6"
                                >
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                                            <span className="text-base font-bold font-mono text-[#f5f5f5]">
                                                {step.num}
                                            </span>
                                            <span className="text-[11px] font-mono text-[#8a8a8e] px-2.5 py-0.5 rounded-sm bg-[#080809] border border-white/[0.06]">
                                                {step.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-tight">
                                            {step.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                                            {step.detail}
                                        </p>
                                    </div>

                                    <div className="text-[11px] font-mono text-[#555555] border-t border-white/[0.04] pt-4 relative z-10">
                                        {step.subtext}
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Technical Specifications Matrix */}
                    <section id="specifications" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-36 scroll-mt-24">
                        <div className="border-t border-white/[0.08] pt-12 md:pt-16 mb-8">
                            <span className="text-xs text-[#737373] uppercase tracking-wider block mb-2">
                                Technical Standards
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                Validation Specifications Matrix
                            </h2>
                            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-xl mt-2">
                                Deterministic parameters applied across every candidate evaluation session.
                            </p>
                        </div>

                        <div className="w-full overflow-x-auto rounded-md border border-white/[0.08] bg-[#080809]/60">
                            <table className="w-full text-left border-collapse text-xs font-mono">
                                <thead>
                                    <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-[#737373]">
                                        <th className="py-4 px-6 font-semibold uppercase tracking-wider">Candidate Attribute</th>
                                        <th className="py-4 px-6 font-semibold uppercase tracking-wider">Verification Method</th>
                                        <th className="py-4 px-6 font-semibold uppercase tracking-wider text-[#ededed]">Validation Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {technicalSpecs.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-6 font-bold text-[#f5f5f5] whitespace-nowrap align-top">
                                                {item.attribute}
                                            </td>
                                            <td className="py-4 px-6 text-[#888888] leading-relaxed align-top">
                                                {item.method}
                                            </td>
                                            <td className="py-4 px-6 text-[#cccccc] leading-relaxed align-top">
                                                {item.protocol}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Navigation Strip */}
                        <div className="border-t border-white/[0.08] pt-16 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <Link
                                to="/verification"
                                className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-white transition-colors font-mono"
                            >
                                <span>&larr; Verification Methodology</span>
                            </Link>

                            <Link
                                to="/talent"
                                className="inline-flex items-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 px-5 py-2.5 rounded-sm transition-colors text-xs font-mono shadow-sm"
                            >
                                <span>Explore Talent &amp; Teams</span>
                                <span className="text-[#888888]">↗</span>
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </StudioNoise>
    );
};

export default ProtocolPage;
