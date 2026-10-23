import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHeader = ({ 
    candidateName = 'Candidate', 
    onLogout, 
    sidebarCollapsed, 
    setSidebarCollapsed
}) => {
    const navigate = useNavigate();

    return (
        <header 
            className={`fixed top-0 ${sidebarCollapsed ? 'md:left-16' : 'md:left-64'} left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans shadow-sm transition-all`} 
            id="AppHeader"
        >
            <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
                        title="Toggle Navigation Menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {sidebarCollapsed ? 'menu_open' : 'menu'}
                        </span>
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-gray-900 tracking-tight">
                            Candidate Dashboard
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium hidden sm:inline-flex">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Verified
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium">
                        <span className="font-semibold text-gray-900">{candidateName}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500">Candidate</span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-red-200 text-gray-600 hover:text-red-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>

                    <button
                        onClick={() => navigate('/student/onboarding')}
                        className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors shadow-sm"
                        title="Update Resume &amp; Profile"
                    >
                        {candidateName.charAt(0).toUpperCase()}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;
