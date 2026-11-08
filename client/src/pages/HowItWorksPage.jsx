import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import { useAuthStore } from '../store/authStore';

const candidateSteps = [
    {
        step: '01',
        title: 'Initialize Profile & Ingest Codebase Telemetry',
        tagline: '[ intake & artifact parsing ]',
        description: 'Upload your resume document or link your GitHub profile. SkillForge extracts demonstrated technical abilities, verified project footprints, and core systems strengths without keyword noise.',
        highlights: [
            'Zero manual questionnaire forms or repetitive profile fields',
            'Automatic extraction of demonstrated repositories and technologies',
            'All data encrypted and isolated under zero third-party leakage protocol'
        ]
    },
    {
        step: '02',
        title: 'Complete Timed Practical Evaluation',
        tagline: '[ empirical sandbox assessment ]',
        description: 'Demonstrate architectural reasoning and practical debugging under realistic, sandboxed conditions. Focused scenarios evaluate genuine problem-solving rather than academic trivia.',
        highlights: [
            '20-minute focused sandbox session available on-demand',
            'Standardized scoring rubrics benchmarked against real production systems',
            'Lightweight optical and environment proctoring to guarantee integrity'
        ]
    },
    {
        step: '03',
        title: 'Receive Cryptographic Verification Dossier',
        tagline: '[ authenticated competence report ]',
        description: 'Receive an authenticated candidate dossier indexing verified technical strengths, benchmark percentiles, and actionable growth rubrics.',
        highlights: [
            'Shareable verification dossier URL for recruiters and hiring managers',
            'Granular breakdown of architectural competencies and focus areas',
            'Permanent accreditation with on-demand reassessment options'
        ]
    },
    {
        step: '04',
        title: 'Direct Matching With Engineering Teams',
        tagline: '[ pipeline bypass & direct outreach ]',
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
        title: 'Publish Role Criteria & Verification Standards',
        tagline: '[ requisition specification ]',
        description: 'Define engineering requirements in minutes. Specify technical competencies, architectural depth, minimum benchmark thresholds, and compensation packages.',
        highlights: [
            'Pre-configured templates for backend, frontend, systems, and MLOps roles',
            'Customizable benchmark cutoffs tailored to your engineering stack',
            'Real-time webhook and export synchronization'
        ]
    },
    {
        step: '02',
        title: 'Access Pre-Evaluated Engineering Pipeline',
        tagline: '[ zero keyword fluff ]',
        description: 'SkillForge compares your role criteria directly against candidates who have proven competence in proctored technical evaluations.',
        highlights: [
            'Every candidate in the pipeline has verified code execution telemetry',
            'Zero time lost parsing through inflated resume claims',
            'Objective competency scores benchmarked against industry percentiles'
        ]
    },
    {
        step: '03',
        title: 'Inspect Technical Candidate Dossiers',
        tagline: '[ transparent evidence before interview ]',
        description: 'Review audited code snippets, evaluation rubrics, proctor integrity logs, and problem-solving benchmarks before committing senior engineering hours to interviews.',
        highlights: [
            'Direct access to evaluated code implementations and reasoning breakdowns',
            'Proctor integrity audits with zero cheating flags',
            'Holistic overview of system architecture and execution depth'
        ]
    },
    {
        step: '04',
        title: 'Hire With Calibrated Confidence',
        tagline: '[ 60% reduction in time-to-hire ]',
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

            <main className="flex-1 pt-24 pb-20 font-mono">
                {/* Hero Header Section */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#0b0b0c] text-[#888888] border border-white/10 text-xs font-mono mb-4">
                        [ protocol : workflow ]
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-[1.15] mb-4">
                        How SkillForge Operates
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-[#888888] max-w-2xl mx-auto leading-relaxed">
                        Connecting engineering talent and hiring teams through empirical skill verification — eliminating keyword guesswork and resume bias.
                    </p>

                    {/* Tab Switcher */}
                    <div className="inline-flex p-1 rounded-md bg-[#0b0b0c] border border-white/10 mt-8">
                        <button
                            onClick={() => setActiveTab('candidates')}
                            className={`px-4 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'candidates'
                                    ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            [01: For Candidates]
                        </button>
                        <button
                            onClick={() => setActiveTab('employers')}
                            className={`px-4 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                                activeTab === 'employers'
                                    ? 'bg-[#111113] text-white border border-white/20 shadow-sm'
                                    : 'text-[#737373] hover:text-white'
                            }`}
                        >
                            [02: For Hiring Teams]
                        </button>
                    </div>
                </div>

                {/* Steps Timeline Grid */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {steps.map((item) => (
                        <div
                            key={item.step}
                            className="bg-[#0b0b0c] rounded-md border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start text-[#ededed]"
                        >
                            {/* Step Badge */}
                            <div className="shrink-0 flex items-center md:flex-col gap-2">
                                <div className="w-10 h-10 rounded-sm bg-[#111113] text-[#ededed] border border-white/20 flex items-center justify-center font-bold text-sm font-mono">
                                    {item.step}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#555555]">
                                    stage
                                </span>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 space-y-2">
                                <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                                    {item.tagline}
                                </div>
                                <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-[#888888] leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Highlights List */}
                                <div className="pt-2 space-y-1.5 text-xs text-[#737373]">
                                    {item.highlights.map((h, hIdx) => (
                                        <div key={hIdx} className="flex items-start gap-2">
                                            <span className="text-white font-mono">-</span>
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action Card */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
                    <div className="bg-[#0b0b0c] rounded-md border border-white/10 text-white p-8 sm:p-10 text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                            {activeTab === 'candidates' 
                                ? 'Verify competence. Get discovered.'
                                : 'Source verified engineering talent.'}
                        </h2>
                        <p className="text-[#888888] text-xs max-w-xl mx-auto leading-relaxed">
                            {activeTab === 'candidates'
                                ? 'Join developers who have verified their ability and connected directly with hiring teams.'
                                : 'Eliminate resume screening bottlenecks. Connect with engineers benchmarked on real code today.'}
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                            {activeTab === 'candidates' ? (
                                <button
                                    onClick={handleCandidateStart}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-[#111113] hover:bg-[#1a1a1d] text-white font-mono text-xs font-semibold rounded-md border border-white/20 transition-colors shadow-sm cursor-pointer"
                                >
                                    [ Start Free Assessment ↗ ]
                                </button>
                            ) : (
                                <button
                                    onClick={handleEmployerStart}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-[#111113] hover:bg-[#1a1a1d] text-white font-mono text-xs font-semibold rounded-md border border-white/20 transition-colors shadow-sm cursor-pointer"
                                >
                                    [ Create Employer Account ↗ ]
                                </button>
                            )}
                            <Link
                                to="/"
                                className="w-full sm:w-auto px-5 py-2.5 bg-[#050505] hover:bg-[#111113] text-[#888888] hover:text-white text-xs font-mono rounded-md border border-white/10 transition-colors text-center"
                            >
                                &larr; Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HowItWorksPage;
