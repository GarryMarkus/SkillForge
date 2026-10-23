import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Overview', path: '/student/dashboard', icon: 'grid_view' },
    { label: 'Take Assessment', path: '/student/assessment', icon: 'assignment' },
    { label: 'Job Matches', path: '/student/dashboard#jobs', icon: 'work' },
    { label: 'Learning Paths', path: '/student/upskill', icon: 'school' },
    { label: 'Workplace Profile', path: '/student/personality-test', icon: 'psychology' },
    { label: 'Resume & Details', path: '/student/onboarding', icon: 'description' },
];

const StudentSidebar = ({ sidebarCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside 
            className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-18' : 'w-64'} bg-white border-r border-gray-100 z-50 flex flex-col justify-between transition-all duration-200 hidden md:flex font-sans select-none shadow-sm`}
        >
            <div className="flex flex-col">
                {/* Brand Header */}
                <div className="h-16 px-5 border-b border-gray-100 flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                        S
                    </div>
                    {!sidebarCollapsed && (
                        <span className="font-extrabold text-base tracking-tight text-gray-900">
                            SkillForge
                        </span>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-3 gap-1.5 mt-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/student/dashboard' && location.pathname === '/student/dashboard' && !location.hash);
                        
                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 shadow-xs'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                title={sidebarCollapsed ? item.label : undefined}
                            >
                                <span className={`material-symbols-outlined text-[20px] shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {item.icon}
                                </span>
                                {!sidebarCollapsed && (
                                    <span className="truncate">{item.label}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Support / Help Box */}
            {!sidebarCollapsed && (
                <div className="p-4 m-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="text-xs font-semibold text-gray-900">Need Guidance?</div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Learn how our practical evaluations help you showcase your skills.
                    </p>
                    <button
                        onClick={() => navigate('/how-it-works')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer block"
                    >
                        View How It Works →
                    </button>
                </div>
            )}
        </aside>
    );
};

export default StudentSidebar;
