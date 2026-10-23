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
            // Dispatches to /api/project/jobs/ using client/src/api/client.js
            const response = await client.post('/project/jobs/', formData);
            if (response.ok) {
                const newJob = await response.json();
                if (onJobCreated) {
                    onJobCreated(newJob);
                }
                onClose();
            } else {
                const err = await response.json().catch(() => ({}));
                alert(`[DEPLOYMENT_ERROR] ${err.error || 'Failed to deploy requisition specification.'}`);
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('[DEPLOYMENT_ERROR] Network fault encountered while emitting job specification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none font-mono select-none">
            <div className="bg-surface-container-lowest border border-black/30 w-full max-w-2xl shadow-[6px_6px_0px_#1D52B8] max-h-[92vh] flex flex-col overflow-hidden">
                {/* Modal Title Rail */}
                <div className="px-space-md py-space-sm bg-surface-container border-b border-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-on-surface">
                        <span className="text-primary-container font-bold">+</span>
                        <span>[ REQUISITION_DEPLOYMENT_CONSOLE // SPEC_ENTRY ]</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-2 py-0.5 border border-black/20 hover:bg-black hover:text-white text-label-sm font-label-sm uppercase transition-none cursor-pointer font-bold"
                    >
                        [ESC]
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-space-lg overflow-y-auto space-y-space-md flex-1">
                    <div>
                        <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                            TARGET_DESIGNATION_TITLE *
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. SR. SYSTEMS ENGINEER // DISTRIBUTED_BACKEND"
                            required
                            className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                DOMAIN_CATEGORY
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md uppercase font-bold"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Backend Systems">Backend Systems</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Cloud Architecture">Cloud Architecture</option>
                                <option value="Security / Forensic">Security / Forensic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                ANNUAL_COMPENSATION_BUDGET ($USD) *
                            </label>
                            <input
                                type="number"
                                name="budget_amount"
                                value={formData.budget_amount}
                                onChange={handleChange}
                                placeholder="120000"
                                required
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                MINIMUM_EMPIRICAL_THRESHOLD (0-100)
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
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md"
                            />
                        </div>

                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                BUDGET_CONTRACT_STRUCTURE
                            </label>
                            <select
                                name="budget_type"
                                value={formData.budget_type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md uppercase font-bold"
                            >
                                <option value="fixed">Fixed Salary Specification</option>
                                <option value="hourly">Hourly Contract Rate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                            REQUIRED_TECHNICAL_STACK (COMMA_SEPARATED) *
                        </label>
                        <input
                            name="skills_required"
                            value={formData.skills_required}
                            onChange={handleChange}
                            placeholder="Python, FastAPI, Redis, Docker, PostgreSQL"
                            required
                            className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md"
                        />
                        <span className="text-[10px] text-on-surface-variant block mt-1">
                            Used directly by Scikit-Learn TF-IDF vectorizer to calculate cosine similarity fit.
                        </span>
                    </div>

                    <div>
                        <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                            DETAILED_ENGINEERING_REQUISITION_SPECIFICATION *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Architectural mandates, concurrency requirements, expected protocol standards (IEEE, NIST)..."
                            required
                            className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none font-body-md text-body-md resize-none"
                        />
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="pt-space-md border-t border-black/15 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold"
                        >
                            [ CANCEL ]
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-on-primary px-space-lg py-2 font-label-md text-label-md uppercase font-bold border border-primary hover:bg-surface hover:text-primary transition-none shadow-[2px_2px_0px_#191C1D] cursor-pointer disabled:opacity-50"
                        >
                            {loading ? '[ EMITTING_SPEC... ]' : '[ DEPLOY_REQUISITION_TO_INDEX -> ]'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostModal;
