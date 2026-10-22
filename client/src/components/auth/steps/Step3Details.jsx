import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Check } from 'lucide-react';

const Chip = ({ label, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2
            ${selected
                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:text-blue-500'
            }
        `}
    >
        {label}
    </button>
);

const Step3Details = () => {
    const { role, formData, updateFormData } = useAuthStore();

    const handleInterestToggle = (interest) => {
        const current = formData.interests || [];
        const updated = current.includes(interest)
            ? current.filter(i => i !== interest)
            : [...current, interest];
        updateFormData({ interests: updated });
    };

    const handleTrainingGoalToggle = (goal) => {
        const current = formData.trainingGoals || [];
        const updated = current.includes(goal)
            ? current.filter(g => g !== goal)
            : [...current, goal];
        updateFormData({ trainingGoals: updated });
    };

    if (role === 'student') {
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-black dark:text-white">Personalize Experience</h2>
                    <p className="text-gray-500">Help the AI tailor your path.</p>
                </div>

                {/* Learning Goal */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Primary Goal</label>
                    <select
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 outline-none transition-colors"
                        value={formData.learningGoal}
                        onChange={(e) => updateFormData({ learningGoal: e.target.value })}
                    >
                        <option value="">Select a goal...</option>
                        <option value="career_switch">Career Switch</option>
                        <option value="skill_upgrade">Skill Upgrade</option>
                        <option value="first_job">Landing First Job</option>
                        <option value="freelancing">Freelancing</option>
                    </select>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Level</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                            <button
                                key={level}
                                onClick={() => updateFormData({ experienceLevel: level })}
                                className={`p-3 rounded-xl border-2 font-bold transition-all
                                ${formData.experienceLevel === level
                                        ? 'border-blue-500 bg-blue-500 text-white'
                                        : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-300'
                                    }
                             `}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Interests (Select up to 5)</label>
                    <div className="flex flex-wrap gap-2">
                        {['AI/ML', 'Web Dev', 'Blockchain', 'Data Science', 'Product', 'Design', 'Marketing', 'Cybersec'].map(topic => (
                            <Chip
                                key={topic}
                                label={topic}
                                selected={formData.interests?.includes(topic)}
                                onClick={() => handleInterestToggle(topic)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Client Role
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-black text-black dark:text-white">Company Details</h2>
                <p className="text-gray-500">Tell us about your organization.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Company Size</label>
                    <select
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 outline-none transition-colors"
                        value={formData.companySize}
                        onChange={(e) => updateFormData({ companySize: e.target.value })}
                    >
                        <option value="">Select...</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Industry</label>
                    <select
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 outline-none transition-colors"
                        value={formData.industry}
                        onChange={(e) => updateFormData({ industry: e.target.value })}
                    >
                        <option value="">Select...</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="health">Healthcare</option>
                        <option value="edu">Education</option>
                        <option value="retail">Retail</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Number of Employees to Train</label>
                <input
                    type="number"
                    placeholder="e.g. 50"
                    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 outline-none transition-colors text-black dark:text-white"
                    value={formData.trainCount}
                    onChange={(e) => updateFormData({ trainCount: e.target.value })}
                />
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Training Goals</label>
                <div className="grid grid-cols-1 gap-2">
                    {['Upskilling Existing Team', 'New Hire Onboarding', 'Leadership Development', 'Compliance Training'].map(goal => (
                        <div
                            key={goal}
                            onClick={() => handleTrainingGoalToggle(goal)}
                            className={`p-4 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all
                            ${formData.trainingGoals?.includes(goal)
                                    ? 'border-blue-500 bg-blue-50/10'
                                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                                }
                        `}
                        >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                              ${formData.trainingGoals?.includes(goal)
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-gray-400'
                                }
                          `}>
                                {formData.trainingGoals?.includes(goal) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-black dark:text-white font-medium">{goal}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step3Details;
