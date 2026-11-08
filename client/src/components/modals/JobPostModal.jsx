import React, { useState } from 'react';
import client from '../../api/client';

const JobPostModal = ({ isOpen, onClose, onJobCreated }) => {
    const [loading, setLoading] = useState(false);
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
                alert(`Error: ${err.error || 'Failed to post new job opening.'}`);
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('A network error occurred while posting this job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none font-sans">
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] w-full max-w-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150">
                {/* Modal Header */}
                <div className="px-6 py-4 bg-[#181A22] border-b border-white/[0.08] flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-white">
                            Post New Job Opening
                        </h2>
                        <p className="text-xs text-zinc-400">
                            Create a role specification to find matched, verified candidates
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] text-sm font-semibold transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-zinc-300 text-sm">
                    <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                            Job Title <span className="text-rose-400">*</span>
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Senior Frontend Engineer"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors placeholder:text-zinc-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors cursor-pointer"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Backend Systems">Backend Systems</option>
                                <option value="Cloud Architecture">Cloud Architecture</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Security & DevOps">Security & DevOps</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                Annual Budget ($USD) <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="number"
                                name="budget_amount"
                                value={formData.budget_amount}
                                onChange={handleChange}
                                placeholder="120000"
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                Minimum Skill Score (0–100)
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
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors placeholder:text-zinc-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                Compensation Type
                            </label>
                            <select
                                name="budget_type"
                                value={formData.budget_type}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors cursor-pointer"
                            >
                                <option value="fixed">Full-Time Annual Salary</option>
                                <option value="hourly">Hourly Contract Rate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                            Required Skills (comma-separated) <span className="text-rose-400">*</span>
                        </label>
                        <input
                            name="skills_required"
                            value={formData.skills_required}
                            onChange={handleChange}
                            placeholder="Python, React, TypeScript, Docker, PostgreSQL"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors placeholder:text-zinc-500"
                        />
                        <span className="text-xs text-zinc-500 block mt-1">
                            Candidates with matching verified skills will be automatically recommended.
                        </span>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                            Role Description <span className="text-rose-400">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe the responsibilities, team structure, and qualifications needed..."
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A22] border border-white/[0.08] focus:border-blue-500 focus:outline-none text-white text-sm transition-colors resize-none placeholder:text-zinc-500"
                        />
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-white/[0.1] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-white hover:bg-zinc-200 text-zinc-950 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish Job Opening →'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostModal;
