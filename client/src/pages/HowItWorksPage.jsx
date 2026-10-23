import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/sections/Footer';
import { useAuthStore } from '../store/authStore';

const candidateSteps = [
    {
        step: '01',
        title: 'Create Your Profile & Share Your Work',
        tagline: 'Simple, fast setup in under two minutes',
        description: 'Upload your existing resume or connect your GitHub profile. SkillForge automatically highlights your actual projects, real experience, and key strengths without any buzzwords.',
        highlights: [
            'No lengthy questionnaires or repetitive form fields',
            'Automatic extraction of your real projects and technologies',
            'Your data remains private and securely controlled by you'
        ],
        icon: 'person_add'
    },
    {
        step: '02',
        title: 'Take a Short, Practical Evaluation',
        tagline: 'Friendly 20-minute real-world assessment',
        description: 'Demonstrate how you think and solve problems through hands-on technical scenarios. No trick questions or algorithmic puzzles that have nothing to do with everyday work.',
        highlights: [
            'Convenient online session you can take anytime from home',
            'Fair, unbiased grading powered by objective skill rubrics',
            'Respectful, lightweight camera verification to ensure fairness'
        ],
        icon: 'task_alt'
    },
    {
        step: '03',
        title: 'Earn Your Verified Skill Profile',
        tagline: 'Transparent proof of what you can build',
        description: 'Receive an authenticated Skill Report showing your real technical strengths, verified percentiles, and personalized insights for continuous career growth.',
        highlights: [
            'Shareable verification link you can showcase on LinkedIn or your portfolio',
            'Clear breakdown of your strengths and areas to grow',
            'Never expires, with free options to re-test anytime'
        ],
        icon: 'verified'
    },
    {
        step: '04',
        title: 'Get Discovered by Great Teams',
        tagline: 'Skip the endless resume screening queue',
        description: 'Verified candidates are matched directly to hiring managers looking for their exact abilities. Employers reach out with direct interview invitations based on real competence.',
        highlights: [
            'Direct introductions to companies hiring right now',
            'Transparent compensation ranges posted upfront',
            'Zero bias based on background, school name, or resume formatting'
        ],
        icon: 'handshake'
    }
];

const employerSteps = [
    {
        step: '01',
        title: 'Define Your Role Requirements',
        tagline: 'Specify the skills your team actually needs',
        description: 'Create a role specification in minutes. Highlight the technologies, technical depth, and compensation packages your team provides.',
        highlights: [
            'Pre-configured templates for engineering, data, and design roles',
            'Customizable skill benchmarks tailored to your engineering stack',
            'Instant synchronization with your existing ATS if needed'
        ],
        icon: 'post_add'
    },
    {
        step: '02',
        title: 'Receive Pre-Evaluated Candidates',
        tagline: 'Zero resume fluff, pure verified competence',
        description: 'SkillForge compares your role requirements directly against candidates who have demonstrated proven mastery in proctored technical evaluations.',
        highlights: [
            'Every candidate in your pipeline has proven hands-on abilities',
            'No time wasted filtering through hundreds of inflated resumes',
            'Objective competency scores benchmarked across industry peers'
        ],
        icon: 'group'
    },
    {
        step: '03',
        title: 'Review Comprehensive Skill Dossiers',
        tagline: 'Full visibility before the first conversation',
        description: 'Examine detailed reports including code quality reviews, proctor integrity confirmation, and past problem-solving benchmarks before spending engineering hours on interviews.',
        highlights: [
            'Direct access to evaluated code snippets and logic breakdowns',
            'Proctor integrity audit with zero cheating tolerance',
            'Holistic overview of technical depth and communication clarity'
        ],
        icon: 'description'
    },
    {
        step: '04',
        title: 'Hire Faster with Total Confidence',
        tagline: 'Cut your time-to-hire by over 60%',
        description: 'Move straight to final-stage cultural and team-fit conversations. Make competitive offers knowing candidates have already proven their ability to deliver.',
        highlights: [
            'Reduce interviewing fatigue across your engineering staff',
            'Significantly higher offer acceptance and retention rates',
            'Backed by SkillForge quality and satisfaction guarantee'
        ],
        icon: 'rocket_launch'
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
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main className="flex-1 pt-28 pb-20">
                {/* Hero Header Section */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        Simple, Fair &amp; Transparent
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.15] mb-6">
                        How SkillForge Works
                    </h1>
                    
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We connect talented people with forward-thinking companies through fair, practical skill verification instead of resume screening guesswork.
                    </p>

                    {/* Clean Pill Tab Switcher */}
                    <div className="inline-flex p-1.5 rounded-full bg-gray-100 border border-gray-200 mt-10 shadow-sm">
                        <button
                            onClick={() => setActiveTab('candidates')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                                activeTab === 'candidates'
                                    ? 'bg-white text-gray-950 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab('employers')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                                activeTab === 'employers'
                                    ? 'bg-white text-gray-950 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            For Hiring Teams
                        </button>
                    </div>
                </div>

                {/* Steps Timeline Grid */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
                    {steps.map((item) => (
                        <div
                            key={item.step}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-10 flex flex-col md:flex-row gap-6 sm:gap-10 items-start"
                        >
                            {/* Step Badge & Icon */}
                            <div className="shrink-0 flex items-center md:flex-col gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shadow-inner">
                                    <span className="material-symbols-outlined text-2xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                    Step {item.step}
                                </span>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 space-y-3">
                                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                    {item.tagline}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Highlights List */}
                                <div className="pt-3 space-y-2">
                                    {item.highlights.map((h, hIdx) => (
                                        <div key={hIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                            <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                                                check_circle
                                            </span>
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action Card */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-14 text-center shadow-xl space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            {activeTab === 'candidates' 
                                ? 'Ready to prove your skills and get hired?'
                                : 'Ready to build a verified engineering team?'}
                        </h2>
                        <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                            {activeTab === 'candidates'
                                ? 'Join thousands of developers and professionals who have proven their ability and connected with top tech companies.'
                                : 'Stop reading through hundreds of exaggerated resumes. Start meeting candidates with proven, verified competence today.'}
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                            {activeTab === 'candidates' ? (
                                <button
                                    onClick={handleCandidateStart}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-md cursor-pointer"
                                >
                                    Start Free Assessment
                                </button>
                            ) : (
                                <button
                                    onClick={handleEmployerStart}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-md cursor-pointer"
                                >
                                    Create Employer Account
                                </button>
                            )}
                            <Link
                                to="/"
                                className="w-full sm:w-auto px-6 py-3.5 bg-blue-700/60 hover:bg-blue-700 text-white font-semibold rounded-xl border border-white/20 transition-colors text-center"
                            >
                                Back to Homepage
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
