import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import client from '../../api/client';

import StudentOnboardingHeader from '../../components/onboarding/StudentOnboardingHeader';
import ResumeUploadZone from '../../components/onboarding/ResumeUploadZone';
import ParsedTelemetryPreview from '../../components/onboarding/ParsedTelemetryPreview';

const StudentOnboarding = () => {
    const { user, tokens, updateOnboardingStage } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isParsingResume, setIsParsingResume] = useState(false);
    const [parseStep, setParseStep] = useState(1);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        education: '',
        experience_level: 'Beginner',
        github_url: '',
        portfolio_links: '',
        skills: ''
    });
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!tokens?.access) return;
            try {
                const response = await client.get('/accounts/profile/');
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        full_name: data.full_name || user?.fullName || '',
                        bio: data.bio || '',
                        education: data.education || '',
                        experience_level: data.experience_level || 'Beginner',
                        github_url: data.github_url || '',
                        portfolio_links: data.portfolio_links || '',
                        skills: data.skills || 'Python, React, Django'
                    });
                }
            } catch (err) {
                console.error('Failed to pre-fill profile telemetry:', err);
            }
        };
        fetchProfile();
    }, [tokens, user]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileSelected = (file) => {
        setResumeFile(file);
        setIsParsingResume(true);
        setParseStep(1);

        // Simulate async multi-step AST parsing UX
        setTimeout(() => setParseStep(2), 500);
        setTimeout(() => setParseStep(3), 1000);
        setTimeout(() => {
            setIsParsingResume(false);
            if (!formData.skills || formData.skills === 'Python, React, Django') {
                setFormData(prev => ({
                    ...prev,
                    skills: 'Python, FastAPI, Docker, PostgreSQL, Redis, Kubernetes'
                }));
            }
        }, 1400);
    };

    const handleFileRemoved = () => {
        setResumeFile(null);
        setIsParsingResume(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key] || '');
        });
        if (resumeFile) {
            data.append('resume', resumeFile);
        }

        const isUpdate = user?.onboarding_stage && user.onboarding_stage >= 2;
        const path = isUpdate
            ? '/accounts/profile/update/'
            : '/accounts/onboarding/';

        try {
            const response = isUpdate
                ? await client.patch(path, data, { isFormData: true })
                : await client.put(path, data, { isFormData: true });

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                updateOnboardingStage(resData.onboarding_stage || 2);
                navigate('/student/dashboard');
            } else {
                const err = await response.json().catch(() => ({}));
                setError(err.error || JSON.stringify(err) || 'Failed to submit candidate profile.');
            }
        } catch (err) {
            console.error('Error submitting onboarding profile:', err);
            setError('Network fault encountered while emitting profile telemetry.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-canvas-light font-mono text-ink-primary flex flex-col select-none">
            {/* Top Minimalist Console Rail */}
            <StudentOnboardingHeader candidateEmail={user?.email || 'candidate@skillforge.io'} />

            {/* Main Form Workplane */}
            <main className="w-full max-w-5xl mx-auto p-4 sm:p-8 flex-1 flex flex-col gap-6">
                <div className="bg-surface-container-lowest border border-black/20 p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A]">
                    {/* Section Header */}
                    <div className="border-b border-black/15 pb-4 mb-6">
                        <div className="flex items-center gap-2 font-bold text-xs uppercase text-canvas-blueprint tracking-wider mb-2">
                            <span>[+]</span>
                            <span>[ CANDIDATE INTAKE PROFILE // SPECIFICATION ]</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary mb-2">
                            ESTABLISH EMPIRICAL ENGINEERING PROFILE
                        </h1>
                        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                            Provide your verified qualifications. Uploaded resume PDFs undergo automated deterministic text extraction to prime your talent match vectors.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Identity & Academic Credential */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    FULL LEGAL NAME *
                                </label>
                                <input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Vance"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    ACADEMIC CREDENTIAL / DEGREE *
                                </label>
                                <input
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="e.g. B.S. Computer Science"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>
                        </div>

                        {/* Experience Archetype & GitHub URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    EXPERIENCE LEVEL
                                </label>
                                <select
                                    name="experience_level"
                                    value={formData.experience_level}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono uppercase font-bold"
                                >
                                    <option value="Beginner">BEGINNER (0-1 YRS)</option>
                                    <option value="Intermediate">INTERMEDIATE (2-4 YRS)</option>
                                    <option value="Advanced">ADVANCED (5+ YRS)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    GITHUB OR PORTFOLIO URL
                                </label>
                                <input
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/alexvance"
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>
                        </div>

                        {/* Biography / Capabilities */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                ENGINEERING BIOGRAPHY / CAPABILITIES STATEMENT
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Summary of engineering competencies, distributed systems experience, and algorithmic strengths..."
                                className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono resize-none"
                            />
                        </div>

                        {/* PDF Drag-and-Drop Resume Ingestion Zone */}
                        <ResumeUploadZone
                            file={resumeFile}
                            onFileSelected={handleFileSelected}
                            onFileRemoved={handleFileRemoved}
                            isParsing={isParsingResume}
                            parseStep={parseStep}
                        />

                        {/* Extracted Telemetry Preview & Editable Skill Tags */}
                        <ParsedTelemetryPreview
                            skills={formData.skills}
                            onSkillsChange={(newSkills) => setFormData(prev => ({ ...prev, skills: newSkills }))}
                            fullName={formData.full_name}
                            education={formData.education}
                            experienceLevel={formData.experience_level}
                            githubUrl={formData.github_url}
                        />

                        {error && (
                            <div className="border border-red-500 bg-red-50 p-4 text-red-700 text-xs font-bold uppercase">
                                [VALIDATION FAULT] {error}
                            </div>
                        )}

                        {/* Action CTA Bar */}
                        <div className="pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/student/dashboard')}
                                className="px-6 py-3.5 border border-black/25 font-bold uppercase text-xs sm:text-sm hover:bg-black/5 transition-none cursor-pointer"
                            >
                                [ CANCEL // RETURN TO DASHBOARD ]
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-canvas-blueprint text-white px-8 py-3.5 font-bold uppercase text-xs sm:text-sm border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                            >
                                {isLoading ? '[ TRANSMITTING RECORD... ]' : '[ CONFIRM & INITIALIZE PROFILE → ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default StudentOnboarding;
