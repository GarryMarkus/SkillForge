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
                console.error('Failed to pre-fill profile data:', err);
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

        // Simulate multi-step parsing
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
            setError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090B] font-sans text-zinc-100 flex flex-col select-none">
            {/* Top Navigation */}
            <StudentOnboardingHeader candidateEmail={user?.email || 'candidate@skillforge.io'} />

            {/* Main Content */}
            <main className="w-full max-w-4xl mx-auto p-4 sm:p-8 flex-1 flex flex-col gap-6">
                <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-6 sm:p-10 shadow-sm text-white">
                    {/* Section Header */}
                    <div className="border-b border-white/[0.08] pb-5 mb-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                            Candidate Profile Setup
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                            Build Your Verified Profile
                        </h1>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Share your background and upload your resume. We'll automatically identify your core skills to match you with top job opportunities.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Education */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Full Name <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Vance"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Highest Degree / Credential <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="e.g. B.S. in Computer Science"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Experience Level & GitHub */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Experience Level
                                </label>
                                <select
                                    name="experience_level"
                                    value={formData.experience_level}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white transition-colors cursor-pointer"
                                >
                                    <option value="Beginner">Beginner (0–1 years)</option>
                                    <option value="Intermediate">Intermediate (2–4 years)</option>
                                    <option value="Advanced">Advanced (5+ years)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    GitHub or Portfolio URL
                                </label>
                                <input
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/alexvance"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                Short Biography / Summary
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Tell us about your technical focus, projects you've worked on, and what you enjoy building..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 transition-colors resize-none"
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
                            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-400 text-xs font-medium">
                                {error}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/student/dashboard')}
                                className="px-6 py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                            >
                                Skip for Now
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? 'Saving Profile...' : 'Save Profile & Continue →'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default StudentOnboarding;
