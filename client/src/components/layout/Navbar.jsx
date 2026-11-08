import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';

    return (
        <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#050505]/90 backdrop-blur-sm border-b border-white/[0.06] font-mono select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
                {/* Left: Brand Identity */}
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-display font-bold text-white text-base tracking-tight group-hover:text-[#ededed] transition-colors">
                            SkillForge
                        </span>
                        <span className="text-[11px] text-[#666666] font-mono">
                            v2.5
                        </span>
                    </Link>
                </div>

                {/* Center: Minimalist Monotone Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 text-xs text-[#888888]">
                    <Link to="/how-it-works" className="hover:text-[#f5f5f5] transition-colors">
                        How It Works
                    </Link>
                    <a href="/#CapabilitiesRow" className="hover:text-[#f5f5f5] transition-colors">
                        Verification
                    </a>
                    <a href="/#BlueprintSection" className="hover:text-[#f5f5f5] transition-colors">
                        Proctoring
                    </a>
                    <a href="/#PersonaSplitSection" className="hover:text-[#f5f5f5] transition-colors">
                        For Employers
                    </a>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 text-xs">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={dashboardPath}
                                className="text-[#888888] hover:text-[#f5f5f5] transition-colors px-2 py-1"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/student/assessment"
                                className="bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
                            >
                                <span>Assessment</span>
                                <span className="text-[#888888]">↗</span>
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-[#666666] hover:text-[#ededed] transition-colors px-1"
                                title="Sign out"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth"
                                className="text-[#888888] hover:text-[#f5f5f5] transition-colors px-2 py-1"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/auth"
                                className="bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
                            >
                                <span>Start Assessment</span>
                                <span className="text-[#888888]">↗</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
