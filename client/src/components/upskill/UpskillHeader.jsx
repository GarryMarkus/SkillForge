import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpskillHeader = ({
    moduleRef = 'Module 1',
    moduleTopic = 'System Architecture',
    isCompleted = false
}) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 select-none font-sans" id="UpskillHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        SF
                    </span>
                    <span className="text-base font-bold text-gray-900 tracking-tight">
                        SkillForge
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        Learning Center
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden lg:flex items-center gap-2 border-r border-gray-200 pr-4 text-xs">
                        <span className="font-semibold text-gray-900">
                            {moduleRef} • {moduleTopic}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ml-1 ${
                            isCompleted
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                            {isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="px-3.5 py-1.5 rounded-lg border border-gray-300 bg-white text-xs text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1"
                    >
                        <span>← Return to Dashboard</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UpskillHeader;
