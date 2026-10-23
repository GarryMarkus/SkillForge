import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';

const StudentOnboarding = () => {
    const { user, tokens, updateOnboardingStage } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // snake_case keys for backend compatibility
    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        education: '',
        experience_level: 'Beginner',
        github_url: '',
        portfolio_links: '',
        skills: ''
    });
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!tokens?.access) return;
            try {
                const response = await api.get('/accounts/profile/');
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        full_name: data.full_name || '',
                        bio: data.bio || '',
                        education: data.education || '',
                        experience_level: data.experience_level || 'Beginner',
                        github_url: data.github_url || '',
                        portfolio_links: data.portfolio_links || '',
                        skills: data.skills || ''
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, [tokens]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (resume) {
            data.append('resume', resume);
        }

        const isUpdate = user?.onboarding_stage && user.onboarding_stage >= 2;
        const path = isUpdate
            ? '/accounts/profile/update/'
            : '/accounts/onboarding/';

        try {
            const response = isUpdate
                ? await api.patch(path, data)
                : await api.put(path, data);

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                updateOnboardingStage(resData.onboarding_stage || 2);
                navigate('/student/dashboard');
            } else {
                const err = await response.json();
                console.error("Onboarding failed", err);
                alert("[VALIDATION_ERROR] Failed to save profile telemetry: " + JSON.stringify(err));
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("[NETWORK_FAULT] Failed to transmit candidate profile.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface font-mono text-on-surface p-4 sm:p-8 flex items-center justify-center selection:bg-primary-container selection:text-on-primary">
            <div className="max-w-4xl w-full">
                {/* Header Track */}
                <div className="border border-black/20 bg-surface-container-lowest p-space-md mb-space-md flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                    <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-primary">
                        <span>[+]</span>
                        <span>[ CANDIDATE_INGESTION_PIPELINE // SPEC_ONBOARD_01 ]</span>
                    </div>
                    <div className="font-label-sm text-label-sm text-outline">
                        COORD: ROOT &gt; CANDIDATE_ONBOARDING
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D]">
                    <div className="border-b border-black/15 pb-space-md mb-space-lg">
                        <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface font-bold">
                            CANDIDATE TELEMETRY INGESTION
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Establish your engineering baseline record. All skill tags and resume documents are parsed through deterministic AST and PyPDF2 verification pipelines.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-space-lg">
                        {/* Section 1: Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    FULL_LEGAL_NAME *
                                </label>
                                <input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Vance"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    ACADEMIC_CREDENTIAL / DEGREE *
                                </label>
                                <input
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="e.g. B.S. Computer Engineering"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>
                        </div>

                        {/* Section 2: Skills & Experience Level */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    EXPERIENCE_ARCHETYPE
                                </label>
                                <select
                                    name="experience_level"
                                    value={formData.experience_level}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md uppercase"
                                >
                                    <option value="Beginner">Beginner (0-1 yrs)</option>
                                    <option value="Intermediate">Intermediate (2-4 yrs)</option>
                                    <option value="Advanced">Advanced (5+ yrs)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    CORE_TECHNICAL_SKILLS (COMMA_SEPARATED) *
                                </label>
                                <input
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="Python, Django, React, PostgreSQL, Docker"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>
                        </div>

                        {/* Section 3: Summary */}
                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                ENGINEERING_BIOGRAPHY / CAPABILITIES_STATEMENT
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Summary of engineering competencies, distributed systems experience, and algorithmic strengths..."
                                className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md resize-none"
                            />
                        </div>

                        {/* Section 4: External Repos & PDF Upload */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    GITHUB_OR_PORTFOLIO_URL
                                </label>
                                <input
                                    name="github_url"
                                    value={formData.github_url}
                                    onChange={handleChange}
                                    placeholder="https://github.com/alexvance"
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    RESUME_PDF_INGESTION
                                </label>
                                <div className="border border-dashed border-black/40 bg-surface p-space-sm flex flex-col items-center justify-center relative cursor-pointer hover:bg-surface-container transition-colors">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    <span className="material-symbols-outlined text-[28px] text-primary mb-1">upload_file</span>
                                    <span className="font-label-sm text-label-sm font-bold uppercase text-on-surface">
                                        {resume ? `[ATTACHED: ${resume.name}]` : '[ SELECT_OR_DROP_RESUME.PDF ]'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form CTA Bar */}
                        <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                            <button
                                type="button"
                                onClick={() => navigate('/student/dashboard')}
                                className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer"
                            >
                                [ CANCEL_RETURN_TO_DASHBOARD ]
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary text-on-primary px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary hover:bg-surface hover:text-primary transition-none cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? '[ TRANSMITTING_TELEMETRY... ]' : '[ SUBMIT_CANDIDATE_RECORD -> ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentOnboarding;
