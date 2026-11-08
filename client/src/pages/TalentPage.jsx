import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import StudioNoise from '../components/ui/animations/StudioNoise';
import SpotlightCard from '../components/ui/animations/SpotlightCard';
import { useAuthStore } from '../store/authStore';

/**
 * TalentPage
 * Dedicated dual-track presentation for Software Engineers and Hiring Teams.
 * Articulates value propositions, empirical verification guarantees,
 * and direct action gateways.
 */
const TalentPage = () => {
    const { isAuthenticated, user, setRole } = useAuthStore();
    const navigate = useNavigate();

    const handleCandidateAction = () => {
        if (isAuthenticated) {
            navigate('/student/assessment');
        } else {
            setRole('student');
            navigate('/auth?role=student');
        }
    };

    const handleEmployerAction = () => {
        if (isAuthenticated && user?.role === 'client') {
            navigate('/client/dashboard');
        } else {
            setRole('client');
            navigate('/auth?role=client');
        }
    };

    return (
        <StudioNoise opacity={0.09}>
            <div className="w-full text-[#ededed] font-mono min-h-screen selection:bg-white/20 selection:text-white flex flex-col justify-between">
                <Navbar />

                <main className="w-full flex-1 relative z-10 font-mono">
                    {/* Header Section */}
                    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-3">
                            Talent &amp; Solutions
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15] mb-6">
                            Built for Engineers and Hiring Teams
                        </h1>
                        <p className="text-base md:text-lg font-mono text-[#888888] leading-relaxed max-w-2xl">
                            Eliminating resume inflation for companies. Providing undeniable proof of ability for engineers.
                        </p>
                    </header>

                    {/* Dual-Track Presentation */}
                    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-36 space-y-12 md:space-y-16">
                        {/* Track 1: For Software Engineers */}
                        <div id="engineers" className="scroll-mt-24">
                            <SpotlightCard
                                bgClassName="bg-[#0e0e11]"
                                className="p-8 sm:p-10 md:p-12 rounded-md border border-white/[0.08] space-y-8"
                            >
                                <div className="space-y-3 relative z-10">
                                    <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                        Track 01 · For Software Engineers
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                        Showcase Your True Ability
                                    </h2>
                                    <p className="text-sm sm:text-base text-[#888888] leading-relaxed max-w-2xl">
                                        Never let an automated resume keyword filter block your career. Prove your systems knowledge, algorithmic depth, and production problem-solving through verifiable empirical evaluations.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-white/[0.06] relative z-10">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            Authenticated Skill Dossier
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            A permanent, cryptographically audited candidate credential showcasing verified challenge code, AST depth, and percentile benchmarks.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            Privacy-First Proctoring
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            Lightweight optical face verification and focus checks with zero keystroke logging, zero third-party tracking, and encrypted telemetry.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            Direct Pipeline Bypass
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            Skip preliminary recruiter screens. Advance directly into final culture-fit and architectural interviews with top engineering teams.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-4 relative z-10">
                                    <button
                                        type="button"
                                        onClick={handleCandidateAction}
                                        className="inline-flex items-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 px-6 py-2.5 rounded-sm transition-colors text-xs font-mono cursor-pointer shadow-sm"
                                    >
                                        <span>Start Free Assessment</span>
                                        <span className="text-[#888888]">↗</span>
                                    </button>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Track 2: For Hiring Teams */}
                        <div id="employers" className="scroll-mt-24">
                            <SpotlightCard
                                bgClassName="bg-[#0e0e11]"
                                className="p-8 sm:p-10 md:p-12 rounded-md border border-white/[0.08] space-y-8"
                            >
                                <div className="space-y-3 relative z-10">
                                    <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                        Track 02 · For Hiring Teams &amp; Engineering Leads
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                                        Hire with Empirical Confidence
                                    </h2>
                                    <p className="text-sm sm:text-base text-[#888888] leading-relaxed max-w-2xl">
                                        Eliminate screening fatigue, candidate exaggeration, and months of engineering interview loops. Review pre-evaluated candidate dossiers verified on real production challenges.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-white/[0.06] relative z-10">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            Pre-Evaluated Engineering Pipeline
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            Access candidates who have already solved sandboxed problems with audited runtime performance and verified commit telemetry.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            Semantic Matching Engine
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            Compare requisition criteria directly against candidate competency vectors via cosine similarity, eliminating keyword fluff.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold font-display text-white">
                                            60% Shorter Time-to-Hire
                                        </h3>
                                        <p className="text-xs text-[#888888] leading-relaxed">
                                            Fast-track pre-verified talent directly to team architectural conversations, reducing hiring cycle delays from 6 weeks to 7 days.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-4 relative z-10">
                                    <button
                                        type="button"
                                        onClick={handleEmployerAction}
                                        className="inline-flex items-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 px-6 py-2.5 rounded-sm transition-colors text-xs font-mono cursor-pointer shadow-sm"
                                    >
                                        <span>Post Requisition</span>
                                        <span className="text-[#888888]">↗</span>
                                    </button>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Bottom Navigation Strip */}
                        <div className="border-t border-white/[0.08] pt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <Link
                                to="/protocol"
                                className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-white transition-colors font-mono"
                            >
                                <span>&larr; The Protocol &amp; Specifications</span>
                            </Link>

                            <Link
                                to="/"
                                className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-white transition-colors font-mono"
                            >
                                <span>Return to Overview &rarr;</span>
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </StudioNoise>
    );
};

export default TalentPage;
