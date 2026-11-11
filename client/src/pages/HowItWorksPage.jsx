import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import StudioNoise from '../components/ui/animations/StudioNoise';
import SpotlightCard from '../components/ui/animations/SpotlightCard';
import { useAuthStore } from '../store/authStore';

const candidateSteps = [
    {
        step: '01',
        anchorId: 'intake',
        title: 'Initialize Profile & Ingest Codebase Telemetry',
        tagline: 'Intake & Codebase Parsing',
        description: 'Upload your resume document or link your GitHub profile. SkillForge extracts demonstrated technical abilities, verified project footprints, and core systems strengths without keyword noise.',
        highlights: [
            'Zero manual questionnaire forms or repetitive profile fields',
            'Automatic extraction of demonstrated repositories and technologies',
            'All data encrypted and isolated under zero third-party leakage protocol'
        ]
    },
    {
        step: '02',
        anchorId: 'proctoring',
        title: 'Complete Timed Practical Evaluation',
        tagline: 'Empirical Sandbox Assessment',
        description: 'Demonstrate architectural reasoning and practical debugging under realistic, sandboxed conditions. Focused scenarios evaluate genuine problem-solving rather than academic trivia.',
        highlights: [
            '20-minute focused sandbox session available on-demand',
            'Standardized scoring rubrics benchmarked against real production systems',
            'Lightweight optical and environment proctoring to guarantee integrity'
        ]
    },
    {
        step: '03',
        anchorId: 'dossier',
        aliasAnchor: 'scoring',
        title: 'Receive Cryptographic Verification Dossier',
        tagline: 'Authenticated Competence Report',
        description: 'Receive an authenticated candidate dossier indexing verified technical strengths, benchmark percentiles, and actionable growth rubrics.',
        highlights: [
            'Shareable verification dossier URL for recruiters and hiring managers',
            'Granular breakdown of architectural competencies and focus areas',
            'Permanent accreditation with on-demand reassessment options'
        ]
    },
    {
        step: '04',
        anchorId: 'audit',
        aliasAnchor: 'matching',
        title: 'Direct Matching With Engineering Teams',
        tagline: 'Pipeline Bypass & Direct Outreach',
        description: 'Verified candidates match directly to engineering requisitions seeking their verified abilities. Hiring managers reach out with interview invites based on verified ability.',
        highlights: [
            'Direct introductions to teams with active engineering requisitions',
            'Transparent compensation and stack specifications displayed upfront',
            'Zero resume screening bias or pedigree filters'
        ]
    }
];

const employerSteps = [
    {
        step: '01',
        anchorId: 'intake',
        title: 'Publish Role Criteria & Verification Standards',
        tagline: 'Requisition Specification',
        description: 'Define engineering requirements in minutes. Specify technical competencies, architectural depth, minimum benchmark thresholds, and compensation packages.',
        highlights: [
            'Pre-configured templates for backend, frontend, systems, and MLOps roles',
            'Customizable benchmark cutoffs tailored to your engineering stack',
            'Real-time webhook and export synchronization'
        ]
    },
    {
        step: '02',
        anchorId: 'proctoring',
        title: 'Access Pre-Evaluated Engineering Pipeline',
        tagline: 'Pre-Evaluated Candidates',
        description: 'SkillForge compares your role criteria directly against candidates who have proven competence in proctored technical evaluations.',
        highlights: [
            'Every candidate in the pipeline has verified code execution telemetry',
            'Zero time lost parsing through inflated resume claims',
            'Objective competency scores benchmarked against industry percentiles'
        ]
    },
    {
        step: '03',
        anchorId: 'dossier',
        aliasAnchor: 'scoring',
        title: 'Inspect Technical Candidate Dossiers',
        tagline: 'Transparent Evidence Before Interview',
        description: 'Review audited code snippets, evaluation rubrics, proctor integrity logs, and problem-solving benchmarks before committing senior engineering hours to interviews.',
        highlights: [
            'Direct access to evaluated code implementations and reasoning breakdowns',
            'Proctor integrity audits with zero cheating flags',
            'Holistic overview of system architecture and execution depth'
        ]
    },
    {
        step: '04',
        anchorId: 'audit',
        aliasAnchor: 'matching',
        title: 'Hire With Calibrated Confidence',
        tagline: '60% Reduction in Time-to-Hire',
        description: 'Bypass preliminary phone screens and move straight to team-fit conversations. Extend competitive offers knowing candidates have proven ability.',
        highlights: [
            'Eliminates repetitive screening loops across engineering staff',
            'Higher candidate engagement and offer acceptance rates',
            'Standardized empirical evaluation framework'
        ]
    }
];

const HowItWorksPage = () => {
    const [activeTab, setActiveTab] = useState('candidates');
    const { isAuthenticated, setRole } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Smooth scroll to anchor hash on mount or route change
    useEffect(() => {
        if (location.hash) {
            const rawId = location.hash.replace('#', '');
            const targetEl = document.getElementById(rawId);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location.hash]);

    const handleCandidateStart = () => {
        if (isAuthenticated) {
            navigate('/student/assessment');
        } else {
            setRole('student');
            navigate('/auth');
        }
    };

    const handleEmployerStart = () => {
        if (isAuthenticated) {
            navigate('/client/dashboard');
        } else {
            setRole('client');
            navigate('/auth');
        }
    };

    const steps = activeTab === 'candidates' ? candidateSteps : employerSteps;

    return (
        <StudioNoise opacity={0.09}>
            <div className="w-full text-[#ededed] font-mono min-h-screen flex flex-col justify-between selection:bg-white/20 selection:text-white">
                <Navbar />

                <main className="w-full flex-1 relative z-10 font-mono">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Hero Header Section */}
                        <header className="pt-8 pb-12 md:pt-12 md:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.06]">
                            <div className="max-w-3xl">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8e] block mb-3">
                                    Protocol · Operational Workflow
                                </span>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-[1.15] mb-6">
                                    How SkillForge Operates
                                </h1>

                                <p className="text-sm sm:text-base md:text-lg text-[#888888] max-w-2xl leading-relaxed">
                                    Connecting engineering talent and hiring teams through empirical skill verification — eliminating keyword guesswork and resume bias.
                                </p>
                            </div>

                            {/* Tab Switcher */}
                            <div className="inline-flex self-start lg:self-end p-1 rounded-sm bg-[#0D0F14] border border-white/[0.08] border-t-white/15 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('candidates')}
                                    className={`px-4 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                        activeTab === 'candidates'
                                            ? 'bg-[#111318] text-white border border-white/15 font-semibold'
                                            : 'text-[#888888] hover:text-white border border-transparent'
                                    }`}
                                >
                                    For Candidates
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('employers')}
                                    className={`px-4 py-2 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                                        activeTab === 'employers'
                                            ? 'bg-[#111318] text-white border border-white/15 font-semibold'
                                            : 'text-[#888888] hover:text-white border border-transparent'
                                    }`}
                                >
                                    For Hiring Teams
                                </button>
                            </div>
                        </header>

                        {/* Steps Timeline Grid */}
                        <section className="pt-12 md:pt-16 pb-28 md:pb-36 space-y-6">
                            {steps.map((item) => (
                                <div key={item.step} id={item.anchorId} className="scroll-mt-24">
                                    {item.aliasAnchor && <div id={item.aliasAnchor} className="scroll-mt-24" />}
                                    <SpotlightCard
                                        bgClassName="bg-[#0D0F14]"
                                        className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start text-[#ededed] hover:border-white/20"
                                    >
                                        {/* Step Badge */}
                                        <div className="shrink-0 flex items-center md:flex-col gap-2.5 relative z-10">
                                            <div className="w-10 h-10 rounded-sm bg-[#111318] text-white border border-white/15 flex items-center justify-center font-bold text-sm font-display">
                                                {item.step}
                                            </div>
                                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                                                Phase
                                            </span>
                                        </div>

                                        {/* Content Body */}
                                        <div className="flex-1 space-y-3 relative z-10">
                                            <div className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                                                {item.tagline}
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-3xl">
                                                {item.description}
                                            </p>

                                            {/* Highlights List */}
                                            <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs text-[#cccccc]">
                                                {item.highlights.map((h, hIdx) => (
                                                    <div key={hIdx} className="flex items-start gap-2.5">
                                                        <span className="text-[#555555] font-mono font-bold">-</span>
                                                        <span>{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            ))}

                            {/* Bottom Call to Action Card */}
                            <div className="relative pt-10">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                                />
                                <SpotlightCard
                                    bgClassName="bg-[#111318]"
                                    className="relative text-white p-8 sm:p-10 md:p-12 text-center space-y-4 shadow-xl"
                                >
                                    <div className="relative z-10 space-y-4">
                                        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                                            {activeTab === 'candidates'
                                                ? 'Verify competence. Get discovered.'
                                                : 'Source verified engineering talent.'}
                                        </h2>
                                        <p className="text-[#888888] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                                            {activeTab === 'candidates'
                                                ? 'Join developers who have verified their ability and connected directly with hiring teams.'
                                                : 'Eliminate resume screening bottlenecks. Connect with engineers benchmarked on real code today.'}
                                        </p>
                                        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                            {activeTab === 'candidates' ? (
                                                <button
                                                    type="button"
                                                    onClick={handleCandidateStart}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-mono text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer"
                                                >
                                                    <span>Start Free Assessment</span>
                                                    <span aria-hidden="true">↗</span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleEmployerStart}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-mono text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer"
                                                >
                                                    <span>Create Employer Account</span>
                                                    <span aria-hidden="true">↗</span>
                                                </button>
                                            )}
                                            <Link
                                                to="/"
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 text-xs sm:text-sm font-mono rounded-sm transition-colors text-center"
                                            >
                                                <span>&larr; Return to Home</span>
                                            </Link>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </StudioNoise>
    );
};

export default HowItWorksPage;
