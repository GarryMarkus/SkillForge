import React, { useState } from 'react';
import { Briefcase, X, ArrowUpRight, AlertCircle } from '../ui/Icons';
import client from '../../api/client';

const JobPostModal = ({ isOpen, onClose, onJobCreated }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        description: '',
        budget_type: 'fixed',
        budget_amount: '',
        skills_required: '',
        min_skill_score: 80
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await client.post('/project/jobs/', formData);
            if (response.ok) {
                const newJob = await response.json();
                if (onJobCreated) {
                    onJobCreated(newJob);
                }
                onClose();
            } else {
                const err = await response.json().catch(() => ({}));
                setErrorMessage(err.error || 'Failed to publish role. Please check your inputs.');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            setErrorMessage('Network error while publishing this job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060709]/85 backdrop-blur-md select-none font-mono">
            <div className="relative w-full max-w-2xl">
                {/* Faint radial backlight behind modal panel */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]"
                />

                <div className="relative bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 w-full shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-[#ededed]">
                    {/* Modal Header */}
                    <div className="px-5 py-4 bg-[#0D0F14] border-b border-white/[0.06] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <Briefcase className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                                    Post New Role
                                </h2>
                                <p className="text-[11px] text-[#888888] mt-0.5">
                                    Define skills and minimum score for automatic candidate ranking
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-white/[0.08] text-xs text-[#888888] hover:text-white hover:border-white/20 font-mono cursor-pointer transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                            <span>Close</span>
                        </button>
                    </div>

                    {/* Modal Form Body */}
                    <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#888888] font-mono">
                        {errorMessage && (
                            <div className="p-3 rounded-sm bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                Job Title <span className="text-[#71717A]">*</span>
                            </label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Senior Distributed Systems Engineer"
                                required
                                className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#555555]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Category Domain
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors cursor-pointer"
                                >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Backend Systems">Backend Systems</option>
                                    <option value="Cloud Architecture">Cloud Architecture</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Security & DevOps">Security &amp; DevOps</option>
                                    <option value="Mobile App">Mobile App</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Annual Budget ($USD) <span className="text-[#71717A]">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="budget_amount"
                                    value={formData.budget_amount}
                                    onChange={handleChange}
                                    placeholder="140000"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#555555]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Minimum Score Threshold (0–100)
                                </label>
                                <input
                                    type="number"
                                    name="min_skill_score"
                                    min="1"
                                    max="100"
                                    value={formData.min_skill_score}
                                    onChange={handleChange}
                                    placeholder="80"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#555555]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Compensation Type
                                </label>
                                <select
                                    name="budget_type"
                                    value={formData.budget_type}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors cursor-pointer"
                                >
                                    <option value="fixed">Full-Time Annual Salary</option>
                                    <option value="hourly">Hourly Contract Rate</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                Required Competencies (comma-separated) <span className="text-[#71717A]">*</span>
                            </label>
                            <input
                                name="skills_required"
                                value={formData.skills_required}
                                onChange={handleChange}
                                placeholder="Python, React, TypeScript, Docker, PostgreSQL"
                                required
                                className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#555555]"
                            />
                            <span className="text-[11px] text-[#71717A] block mt-1">
                                Matching algorithm filters candidates meeting these specific tags.
                            </span>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                Role Description <span className="text-[#71717A]">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Specification details, architectural responsibilities, and team requirements..."
                                required
                                className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors resize-none placeholder-[#555555]"
                            />
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-sm bg-[#121316] border border-white/10 hover:border-white/20 text-xs font-mono text-[#E4E4E7] hover:text-white transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-5 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
                            >
                                <span>{loading ? 'Publishing...' : 'Publish Role'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobPostModal;
