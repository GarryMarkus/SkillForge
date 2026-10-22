import React from 'react';
import { motion } from 'framer-motion';

import { useAuthStore } from '../../../store/authStore';
import { User, Briefcase, CheckCircle } from 'lucide-react';

const RoleCard = ({ role, title, icon: Icon, description, benefits, selectRole, selected }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectRole(role)}
            className={`relative cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden group
        ${selected
                    ? 'border-blue-500 bg-blue-50/10 shadow-[0px_4px_20px_rgba(59,130,246,0.15)] dark:bg-blue-900/10'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
                }
      `}
        >
            {/* Selected Checkmark */}
            {selected && (
                <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-blue-500 fill-current" />
                </div>
            )}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors
        ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500'}
      `}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-black dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{description}</p>

            <ul className="space-y-2">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {benefit}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const Step1Role = () => {
    const { role, setRole } = useAuthStore();

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-black text-black dark:text-white">Choose Your Path</h2>
                <p className="text-gray-500">How would you like to use SkillForge?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoleCard
                    role="student"
                    title="Student / Individual"
                    icon={User}
                    description="I want to verify my skills and get hired by top startups."
                    benefits={["AI Skill Verification", "Portfolio Builder", "Direct Job Access"]}
                    selectRole={setRole}
                    selected={role === 'student'}
                />
                <RoleCard
                    role="client"
                    title="Client / Startup"
                    icon={Briefcase}
                    description="I want to hire verified talent or train my team."
                    benefits={["Access Top 1% Talent", "Custom Skill assessments", "Team Training Dashboard"]}
                    selectRole={setRole}
                    selected={role === 'client'}
                />
            </div>
        </div>
    );
};

export default Step1Role;
