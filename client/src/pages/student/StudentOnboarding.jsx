import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Github, FileText, CheckCircle2, ArrowUpRight, Layers, Sparkles } from '../../components/ui/Icons';
import { useAuthStore } from '../../store/authStore';
import client, { extractApiErrorMessage } from '../../api/client';

import StudioNoise from '../../components/ui/animations/StudioNoise';
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
                setError(extractApiErrorMessage(err, 'Failed to submit candidate profile.'));
            }
        } catch (err) {
            console.error('Error submitting onboarding profile:', err);
            setError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const hasDetails = Boolean(formData.full_name.trim() && formData.education.trim());
    const hasResume = Boolean(resumeFile);
    const hasSkills = Boolean(formData.skills.trim());

    return (
        <StudioNoise opacity={0.07}>
            <div className="min-h-screen font-mono text-[#ededed] flex flex-col select-none">
                {/* Top Navigation */}
                <StudentOnboardingHeader candidateEmail={user?.email || 'candidate@skillforge.io'} />

                {/* Main Content */}
                <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col gap-6 relative z-10">
                    {/* Visual 3-Step Progress Header */}
                    <section className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-5 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8a8e] block mb-1">
                                    Profile Setup
                                </span>
                                <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                                    Build Your Verified Profile
                                </h1>
                            </div>
                            <span className="text-xs text-[#888888] bg-[#060709] border border-white/[0.08] px-3 py-1.5 rounded-sm self-start sm:self-auto">
                                Takes ~2 mins
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/[0.06]">
                            {[
                                { label: '1. Basic Details', done: hasDetails, icon: User, hint: 'Name & degree' },
                                { label: '2. Resume PDF', done: hasResume, icon: FileText, hint: 'Optional auto-scan' },
                                { label: '3. Target Skills', done: hasSkills, icon: Sparkles, hint: 'Match tags' },
                            ].map((step) => {
                                const StepIcon = step.icon;
                                return (
                                    <div
                                        key={step.label}
                                        className={`flex items-center gap-2.5 p-2.5 rounded-sm border transition-colors ${
                                            step.done
                                                ? 'bg-[#111318] border-white/20 text-white'
                                                : 'bg-[#060709] border-white/[0.06] text-[#888888]'
                                        }`}
                                    >
                                        <span className={`w-7 h-7 rounded-sm border flex items-center justify-center shrink-0 ${
                                            step.done
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                : 'bg-white/[0.03] border-white/[0.08] text-zinc-400'
                                        }`}>
                                            {step.done ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                            ) : (
                                                <StepIcon className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                            )}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-xs font-semibold truncate">{step.label}</div>
                                            <div className="text-[10px] text-[#71717A] truncate">{step.hint}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-6 sm:p-8 text-[#ededed]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Education */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                        <User className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Full Legal Name</span>
                                        <span className="text-[#737373]">*</span>
                                    </label>
                                    <input
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Alex Vance"
                                        required
                                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Highest Degree</span>
                                        <span className="text-[#737373]">*</span>
                                    </label>
                                    <input
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="B.S. in Computer Science"
                                        required
                                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Experience Level & GitHub */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                        <Layers className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                        <span>Experience Level</span>
                                    </label>
                                    <select
                                        name="experience_level"
                                        value={formData.experience_level}
                                        onChange={handleChange}
                                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] transition-colors cursor-pointer"
                                    >
                                        <option value="Beginner">Beginner (0–1 years)</option>
                                        <option value="Intermediate">Intermediate (2–4 years)</option>
                                        <option value="Advanced">Advanced (5+ years)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                        <Github className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                        <span>GitHub URL</span>
                                    </label>
                                    <input
                                        name="github_url"
                                        value={formData.github_url}
                                        onChange={handleChange}
                                        placeholder="https://github.com/alexvance"
                                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                                    Short Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Share key systems you've built and your strongest technical areas..."
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors resize-none"
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
                                _githubUrl={formData.github_url}
                            />

                            {error && (
                                <div className="rounded-sm border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300 text-xs">
                                    {error}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/student/dashboard')}
                                    className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                                >
                                    Skip for Now
                                </button>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    <span>{isLoading ? 'Saving Profile...' : 'Save & Continue'}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </StudioNoise>
    );
};

export default StudentOnboarding;
