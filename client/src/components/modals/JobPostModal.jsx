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
                alert(`[DEPLOYMENT ERROR] ${err.error || 'Failed to deploy requisition specification.'}`);
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('[DEPLOYMENT ERROR] Network fault encountered while emitting job specification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-mono select-none">
            <div className="bg-surface-container-lowest border border-black/30 w-full max-w-2xl shadow-[6px_6px_0px_#1D52B8] max-h-[92vh] flex flex-col overflow-hidden">
                {/* Modal Title Rail */}
                <div className="px-5 py-3.5 bg-surface-container border-b border-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-ink-primary">
                        <span className="text-canvas-blueprint font-bold">+</span>
                        <span>[ REQUISITION DEPLOYMENT // SPEC ENTRY ]</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-2.5 py-1 border border-black/20 hover:bg-black hover:text-white text-xs uppercase transition-none cursor-pointer font-bold"
                    >
                        [ESC]
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-ink-primary text-xs sm:text-sm">
                    <div>
                        <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                            TARGET DESIGNATION TITLE *
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. SR. SYSTEMS ENGINEER // DISTRIBUTED BACKEND"
                            required
                            className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                DOMAIN CATEGORY
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs uppercase font-bold font-mono"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Backend Systems">Backend Systems</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Cloud Architecture">Cloud Architecture</option>
                                <option value="Security / Forensic">Security / Forensic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                ANNUAL COMPENSATION BUDGET ($USD) *
                            </label>
                            <input
                                type="number"
                                name="budget_amount"
                                value={formData.budget_amount}
                                onChange={handleChange}
                                placeholder="120000"
                                required
                                className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                MINIMUM SKILL THRESHOLD (0-100)
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
                                className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                CONTRACT STRUCTURE
                            </label>
                            <select
                                name="budget_type"
                                value={formData.budget_type}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs uppercase font-bold font-mono"
                            >
                                <option value="fixed">Fixed Salary Specification</option>
                                <option value="hourly">Hourly Contract Rate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                            REQUIRED TECHNICAL STACK (COMMA SEPARATED) *
                        </label>
                        <input
                            name="skills_required"
                            value={formData.skills_required}
                            onChange={handleChange}
                            placeholder="Python, FastAPI, Redis, Docker, PostgreSQL"
                            required
                            className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                        />
                        <span className="text-[11px] text-outline block mt-1">
                            Used directly by TF-IDF vectorizer to calculate cosine similarity fit.
                        </span>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                            DETAILED REQUISITION SPECIFICATION *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Architectural mandates, concurrency requirements, expected protocol standards..."
                            required
                            className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono resize-none"
                        />
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 border border-black/25 text-xs font-bold uppercase hover:bg-black/5 transition-none cursor-pointer"
                        >
                            [ CANCEL ]
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-canvas-blueprint text-white px-6 py-3 text-xs uppercase font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none shadow-[3px_3px_0px_#0A0A0A] cursor-pointer disabled:opacity-50"
                        >
                            {loading ? '[ EMITTING SPEC... ]' : '[ DEPLOY REQUISITION TO INDEX → ]'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostModal;
