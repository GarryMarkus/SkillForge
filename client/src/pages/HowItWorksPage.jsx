import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
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
        <div className="min-h-screen bg-[#050505] text-[#ededed] font-mono flex flex-col selection:bg-white/20 selection:text-white">
            <Navbar />

            <main className="flex-1 pt-12 pb-20 font-mono">
                {/* Hero Header Section */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#0e0e11] text-[#8a8a8e] border border-white/[0.08] text-xs font-mono mb-4">
                        Protocol · Workflow
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-[1.15] mb-4">
                        How SkillForge Operates
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-[#8a8a8e] max-w-2xl mx-auto leading-relaxed">
                        Connecting engineering talent and hiring teams through empirical skill verification — eliminating keyword guesswork and resume bias.
                    </p>

                    {/* Tab Switcher */}
                    <div className="inline-flex p-1 rounded-md bg-[#0e0e11] border border-white/[0.08] mt-8">
                        <button
                            type="button"
                            onClick={() => setActiveTab('candidates')}
                            className={`px-4 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'candidates'
                                    ? 'bg-[#18181b] text-white border border-white/20 shadow-sm'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            For Candidates
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('employers')}
                            className={`px-4 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'employers'
                                    ? 'bg-[#18181b] text-white border border-white/20 shadow-sm'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            For Hiring Teams
                        </button>
                    </div>
                </div>

                {/* Steps Timeline Grid */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {steps.map((item) => (
                        <div key={item.step} id={item.anchorId} className="scroll-mt-24">
                            {item.aliasAnchor && <div id={item.aliasAnchor} className="scroll-mt-24" />}
                            <SpotlightCard
                                bgClassName="bg-[#0e0e11]"
                                className="rounded-md border border-white/[0.08] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start text-[#ededed]"
                            >
                                {/* Step Badge */}
                                <div className="shrink-0 flex items-center md:flex-col gap-2 relative z-10">
                                    <div className="w-10 h-10 rounded-sm bg-[#121215] text-[#ededed] border border-white/20 flex items-center justify-center font-bold text-sm font-mono">
                                        {item.step}
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">
                                        Stage
                                    </span>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 space-y-2 relative z-10">
                                    <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                                        {item.tagline}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[#8a8a8e] leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Highlights List */}
                                    <div className="pt-2 space-y-1.5 text-xs text-[#8a8a8e]">
                                        {item.highlights.map((h, hIdx) => (
                                            <div key={hIdx} className="flex items-start gap-2">
                                                <span className="text-[#555555] font-mono">-</span>
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action Card */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                    <SpotlightCard
                        bgClassName="bg-[#0e0e11]"
                        className="rounded-md border border-white/[0.08] text-white p-8 sm:p-10 text-center space-y-4"
                    >
                        <div className="relative z-10 space-y-4">
                            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                                {activeTab === 'candidates' 
                                    ? 'Verify competence. Get discovered.'
                                    : 'Source verified engineering talent.'}
                            </h2>
                            <p className="text-[#8a8a8e] text-xs max-w-xl mx-auto leading-relaxed">
                                {activeTab === 'candidates'
                                    ? 'Join developers who have verified their ability and connected directly with hiring teams.'
                                    : 'Eliminate resume screening bottlenecks. Connect with engineers benchmarked on real code today.'}
                            </p>
                            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                                {activeTab === 'candidates' ? (
                                    <button
                                        type="button"
                                        onClick={handleCandidateStart}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-[#121215] hover:bg-[#1a1a1e] text-white font-mono text-xs font-semibold rounded-sm border border-white/20 transition-colors shadow-sm cursor-pointer"
                                    >
                                        Start Free Assessment ↗
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleEmployerStart}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-[#121215] hover:bg-[#1a1a1e] text-white font-mono text-xs font-semibold rounded-sm border border-white/20 transition-colors shadow-sm cursor-pointer"
                                    >
                                        Create Employer Account ↗
                                    </button>
                                )}
                                <Link
                                    to="/"
                                    className="w-full sm:w-auto px-5 py-2.5 bg-transparent hover:bg-white/[0.04] text-[#8a8a8e] hover:text-white text-xs font-mono rounded-sm border border-white/10 transition-colors text-center"
                                >
                                    &larr; Return to Home
                                </Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HowItWorksPage;
