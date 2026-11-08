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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-mono">
            <div className="bg-[#0b0b0c] rounded-md border border-white/10 w-full max-w-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-[#ededed]">
                {/* Modal Header */}
                <div className="px-5 py-3.5 bg-[#050505] border-b border-white/[0.06] flex items-center justify-between">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                            [ Post New Requisition ]
                        </h2>
                        <p className="text-xs text-[#737373] mt-0.5">
                            Define role specification to evaluate against candidate telemetry
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-xs text-[#737373] hover:text-white font-mono cursor-pointer"
                        aria-label="Close"
                    >
                        [close ✕]
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#888888] font-mono">
                    <div>
                        <label className="block text-xs font-mono text-[#888888] mb-1.5">
                            Job Title <span className="text-[#737373]">*</span>
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Senior Distributed Systems Engineer"
                            required
                            className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#444444]"
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
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors cursor-pointer"
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
                            <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                Annual Budget ($USD) <span className="text-[#737373]">*</span>
                            </label>
                            <input
                                type="number"
                                name="budget_amount"
                                value={formData.budget_amount}
                                onChange={handleChange}
                                placeholder="140000"
                                required
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#444444]"
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
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#444444]"
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
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors cursor-pointer"
                            >
                                <option value="fixed">Full-Time Annual Salary</option>
                                <option value="hourly">Hourly Contract Rate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-[#888888] mb-1.5">
                            Required Competencies (comma-separated) <span className="text-[#737373]">*</span>
                        </label>
                        <input
                            name="skills_required"
                            value={formData.skills_required}
                            onChange={handleChange}
                            placeholder="Python, React, TypeScript, Docker, PostgreSQL"
                            required
                            className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors placeholder-[#444444]"
                        />
                        <span className="text-[11px] text-[#555555] block mt-1">
                            Matching algorithm filters candidates meeting these specific tags.
                        </span>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-[#888888] mb-1.5">
                            Role Description <span className="text-[#737373]">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Specification details, architectural responsibilities, and team requirements..."
                            required
                            className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-[#f5f5f5] text-xs font-mono transition-colors resize-none placeholder-[#444444]"
                        />
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
                        >
                            [Cancel]
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-5 py-2 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : '[ Publish Requisition ↗ ]'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostModal;
