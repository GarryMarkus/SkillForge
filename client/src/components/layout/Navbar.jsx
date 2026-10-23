import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm font-sans transition-all">
            <div className="h-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Brand Logo & Friendly Status */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                            S
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                            SkillForge
                        </span>
                    </Link>

                    {/* Clean Status Indicator (No robot brackets) */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Evaluation Network Active</span>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
                        <Link 
                            to="/how-it-works" 
                            className={`transition-colors hover:text-blue-600 ${
                                location.pathname === '/how-it-works' ? 'text-blue-600 font-semibold' : ''
                            }`}
                        >
                            How It Works
                        </Link>
                        <a 
                            href="/#CapabilitiesRow" 
                            className="transition-colors hover:text-blue-600"
                        >
                            Verification
                        </a>
                        <a 
                            href="/#BlueprintSection" 
                            className="transition-colors hover:text-blue-600"
                        >
                            Proctoring
                        </a>
                        <a 
                            href="/#PersonaSplitSection" 
                            className="transition-colors hover:text-blue-600"
                        >
                            For Employers
                        </a>

                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to={dashboardPath}
                                    className="text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 hover:border-red-200 transition-colors cursor-pointer"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </nav>

                    {/* Primary Call to Action Button */}
                    <Link
                        to={isAuthenticated ? "/student/assessment" : "/auth"}
                        className="inline-flex items-center justify-center text-sm bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                    >
                        Start Assessment
                    </Link>

                    {/* User Avatar Pill */}
                    {isAuthenticated ? (
                        <Link 
                            to={dashboardPath}
                            title={user?.email || 'User Profile'}
                            className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
                        >
                            {user?.role === 'client' ? 'HR' : 'ME'}
                        </Link>
                    ) : null}

                    {/* Mobile menu trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 flex flex-col gap-4 text-sm font-medium shadow-lg animate-fadeIn">
                    <Link 
                        to="/how-it-works" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-gray-700 hover:text-blue-600"
                    >
                        How It Works
                    </Link>
                    <a 
                        href="/#CapabilitiesRow" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-gray-700 hover:text-blue-600"
                    >
                        Verification
                    </a>
                    <a 
                        href="/#BlueprintSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-gray-700 hover:text-blue-600"
                    >
                        Proctoring
                    </a>
                    <a 
                        href="/#PersonaSplitSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-gray-700 hover:text-blue-600"
                    >
                        For Employers
                    </a>
                    <hr className="border-gray-100 my-1" />
                    {isAuthenticated ? (
                        <>
                            <Link 
                                to={dashboardPath}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-2 text-blue-600 font-semibold"
                            >
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="text-left py-2 text-red-600 font-semibold cursor-pointer"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/auth" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 text-gray-900 font-semibold"
                        >
                            Sign In / Create Account
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
