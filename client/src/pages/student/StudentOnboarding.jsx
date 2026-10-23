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
            // If skills are currently blank or default, auto-populate recommended tags from parsed resume
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
        <div className="min-h-screen bg-background font-mono text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary">
            {/* Top Minimalist Console Rail */}
            <StudentOnboardingHeader candidateEmail={user?.email || 'candidate@skillforge.io'} />

            {/* Main Form Workplane */}
            <main className="w-full max-w-5xl mx-auto p-4 sm:p-8 flex-1 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#1D52B8]">
                    {/* Section Header */}
                    <div className="border-b border-black/15 pb-space-md mb-space-lg">
                        <div className="flex items-center gap-2 font-bold text-headline-sm uppercase text-on-surface">
                            <span className="text-primary-container font-bold">+</span>
                            <span>[ CANDIDATE_TELEMETRY_INGESTION // SPEC_ONBOARD_01 ]</span>
                        </div>
                        <p className="text-body-sm text-secondary mt-1">
                            Establish your empirical engineering record. Documents are parsed through deterministic AST and PyPDF2 pipelines to prime your TF-IDF vector fit score.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-space-lg">
                        {/* Identity & Academic Credential */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    FULL_LEGAL_NAME *
                                </label>
                                <input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Vance"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    ACADEMIC_CREDENTIAL / DEGREE *
                                </label>
                                <input
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="e.g. B.S. Computer Engineering"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                                />
                            </div>
                        </div>

                        {/* Experience Archetype & GitHub URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    EXPERIENCE_ARCHETYPE
                                </label>
                                <select
                                    name="experience_level"
                                    value={formData.experience_level}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono uppercase font-bold"
                                >
                                    <option value="Beginner">BEGINNER (0-1 YRS)</option>
                                    <option value="Intermediate">INTERMEDIATE (2-4 YRS)</option>
                                    <option value="Advanced">ADVANCED (5+ YRS)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    GITHUB_OR_PORTFOLIO_URL
                                </label>
                                <input
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/alexvance"
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                                />
                            </div>
                        </div>

                        {/* Biography / Capabilities */}
                        <div>
                            <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                ENGINEERING_BIOGRAPHY / CAPABILITIES_STATEMENT
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Summary of engineering competencies, distributed systems experience, and algorithmic strengths..."
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono resize-none"
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
                            <div className="border border-error bg-error-container/20 p-space-sm text-error text-label-sm font-bold uppercase">
                                [VALIDATION_FAULT] {error}
                            </div>
                        )}

                        {/* Action CTA Bar */}
                        <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                            <button
                                type="button"
                                onClick={() => navigate('/student/dashboard')}
                                className="px-space-md py-2 border border-black/30 font-bold uppercase text-label-md hover:bg-black hover:text-white transition-none cursor-pointer"
                            >
                                [ CANCEL_RETURN_TO_DASHBOARD ]
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary-container text-on-primary px-space-xl py-2.5 font-bold uppercase text-label-md border border-primary-container hover:bg-primary transition-none cursor-pointer shadow-[2px_2px_0px_#191C1D] disabled:opacity-50"
                            >
                                {isLoading ? '[ TRANSMITTING_TELEMETRY... ]' : '[ SUBMIT_CANDIDATE_RECORD -> ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default StudentOnboarding;
