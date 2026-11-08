import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import HeroSection from '../components/sections/hero/HeroSection';
import StudioNoise from '../components/ui/animations/StudioNoise';
import { useAuthStore } from '../store/authStore';

/**
 * LandingPage
 * Streamlined, airy editorial entry point for SkillForge.
 * Features a high-impact two-beat composition:
 * - Beat 1: Spacious Hero with empirical candidate dossier card.
 * - Beat 2: Curated 3-column architectural navigation strip targeting dedicated pages.
 */
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
        <StudioNoise opacity={0.09}>
            <div className="w-full text-[#ededed] font-mono min-h-screen selection:bg-white/20 selection:text-white flex flex-col justify-between">
                <Navbar />

                <main className="w-full pt-4 sm:pt-6 md:pt-8 flex-1 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col w-full">
                            {/* Beat 1: Spacious Empirical Skill Verification Hero */}
                            <HeroSection
                                onStartAssessment={handleStartAssessment}
                                onPostRequisition={handleRecruiterAction}
                            />

                            {/* Beat 2: Curated Architectural Overview Strip */}
                            <section className="w-full border-t border-white/[0.06] pt-16 pb-28 md:pb-36 font-mono">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                                    {/* Column 1: Evaluation Engine */}
                                    <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-md bg-[#080809]/60 border border-white/[0.06] hover:border-white/15 transition-colors">
                                        <div className="space-y-3">
                                            <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                                01 · Engine
                                            </span>
                                            <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight">
                                                Evaluation Engine
                                            </h3>
                                            <p className="text-xs md:text-sm text-[#888888] leading-relaxed">
                                                Automated AST repository inspection and standardized sandboxed problem solving with zero resume bias.
                                            </p>
                                        </div>
                                        <Link
                                            to="/verification"
                                            className="inline-flex items-center gap-1.5 text-xs text-[#f5f5f5] hover:text-white transition-colors group pt-2"
                                        >
                                            <span>Explore Verification Methodology</span>
                                            <span className="text-[#888888] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                                        </Link>
                                    </div>

                                    {/* Column 2: The Protocol */}
                                    <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-md bg-[#080809]/60 border border-white/[0.06] hover:border-white/15 transition-colors">
                                        <div className="space-y-3">
                                            <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                                02 · Architecture
                                            </span>
                                            <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight">
                                                The Protocol
                                            </h3>
                                            <p className="text-xs md:text-sm text-[#888888] leading-relaxed">
                                                Four-phase verification lifecycle from initial intake to direct offer dispatch, backed by a cryptographic audit trail.
                                            </p>
                                        </div>
                                        <Link
                                            to="/protocol"
                                            className="inline-flex items-center gap-1.5 text-xs text-[#f5f5f5] hover:text-white transition-colors group pt-2"
                                        >
                                            <span>Inspect Pipeline &amp; Data Matrix</span>
                                            <span className="text-[#888888] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                                        </Link>
                                    </div>

                                    {/* Column 3: For Teams & Engineers */}
                                    <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-md bg-[#080809]/60 border border-white/[0.06] hover:border-white/15 transition-colors">
                                        <div className="space-y-3">
                                            <span className="text-xs text-[#737373] uppercase tracking-wider block">
                                                03 · Solutions
                                            </span>
                                            <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight">
                                                For Teams &amp; Engineers
                                            </h3>
                                            <p className="text-xs md:text-sm text-[#888888] leading-relaxed">
                                                Empirical competence dossiers for engineers seeking merit-based offers, and high-signal pipelines for engineering leads.
                                            </p>
                                        </div>
                                        <Link
                                            to="/talent"
                                            className="inline-flex items-center gap-1.5 text-xs text-[#f5f5f5] hover:text-white transition-colors group pt-2"
                                        >
                                            <span>View Candidate &amp; Recruiter Solutions</span>
                                            <span className="text-[#888888] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </StudioNoise>
    );
};

export default LandingPage;
