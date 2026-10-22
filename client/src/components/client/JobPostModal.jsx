import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, DollarSign, Target, Sparkles, Check } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';

const JobPostModal = ({ isOpen, onClose, onJobCreated }) => {
    const { tokens } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        description: '',
        budget_type: 'fixed',
        budget_amount: '',
        skills_required: '',
        min_skill_score: 500 // Default score
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/project/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newJob = await response.json();
                onJobCreated(newJob);
                onClose();
            } else {
                console.error('Failed to post job');
                alert('Failed to post job. Please try again.');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">
                            {/* Header */}
                            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-light-canvas dark:bg-dark-canvas">
                                <div>
                                    <h2 className="text-3xl font-black text-black dark:text-white flex items-center gap-2">
                                        Post a New Project <Sparkles className="w-6 h-6 text-orange-500" />
                                    </h2>
                                    <p className="font-script text-gray-500 mt-1">Found the perfect talent yet?</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form - Scrollable */}
                            <div className="overflow-y-auto p-8 space-y-6 bg-white dark:bg-dark-card">
                                <form id="jobForm" onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        label="Project Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Build a Fintech Dashboard"
                                        required
                                    />

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2 ml-1">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-black dark:focus:border-white focus:ring-0 transition-all font-bold appearance-none"
                                            >
                                                <option>Web Development</option>
                                                <option>Mobile App</option>
                                                <option>AI/ML</option>
                                                <option>Design</option>
                                                <option>Data Science</option>
                                            </select>
                                        </div>
                                        <Input
                                            label="Skills Required"
                                            name="skills_required"
                                            value={formData.skills_required}
                                            onChange={handleChange}
                                            placeholder="React, Node.js, Python"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 ml-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-black dark:focus:border-white focus:ring-0 transition-all resize-none font-medium"
                                            placeholder="Describe the project scope..."
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2 ml-1">Budget Type</label>
                                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                                                {['fixed', 'hourly'].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, budget_type: type })}
                                                        className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${formData.budget_type === type
                                                                ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                                                                : 'text-gray-500'
                                                            }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                label="Amount ($)"
                                                name="budget_amount"
                                                type="number"
                                                value={formData.budget_amount}
                                                onChange={handleChange}
                                                placeholder="1000"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Skill Score Slider */}
                                    <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border-2 border-orange-100 dark:border-orange-900/20">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="flex items-center gap-2 font-bold text-orange-900 dark:text-orange-100">
                                                <Target className="w-5 h-5" /> Minimum Skill Score
                                            </label>
                                            <span className="text-2xl font-black text-orange-500">{formData.min_skill_score}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            step="10"
                                            value={formData.min_skill_score}
                                            onChange={(e) => setFormData({ ...formData, min_skill_score: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <p className="text-xs text-orange-700 dark:text-orange-300 mt-2 font-mono">
                                            Only students with a verified SkillForge score above {formData.min_skill_score} can apply.
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end gap-4">
                                <button
                                    onClick={onClose}
                                    className="font-bold text-gray-500 hover:text-black dark:hover:text-white px-4"
                                >
                                    Cancel
                                </button>
                                <Button
                                    onClick={() => document.getElementById('jobForm').requestSubmit()}
                                    className="px-8 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    disabled={loading}
                                >
                                    {loading ? 'Publishing...' : 'Post Project'}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default JobPostModal;
