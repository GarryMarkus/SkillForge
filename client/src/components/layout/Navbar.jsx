import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-black/15 select-none font-mono">
            {/* Top Primary CAD Header */}
            <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                    <Link to="/" className="font-headline-sm text-headline-sm tracking-tight text-primary-container uppercase font-bold hover:opacity-80 transition-opacity flex items-center gap-1.5">
                        <span className="text-primary-container font-bold">+</span>
                        <span>SKILLFORGE</span>
                    </Link>
                    <span className="text-xs border border-primary-container/30 bg-primary-fixed/30 px-2 py-0.5 text-primary-container font-bold hidden sm:inline-block">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                </div>

                <div className="flex items-center gap-space-md sm:gap-space-lg">
                    <nav className="hidden md:flex items-center gap-space-lg">
                        <a 
                            href="#CapabilitiesRow" 
                            className="text-xs uppercase text-on-surface-variant hover:text-primary-container transition-colors font-bold"
                        >
                            VERIFICATION
                        </a>
                        <a 
                            href="#BlueprintSection" 
                            className="text-xs uppercase text-on-surface-variant hover:text-primary-container transition-colors font-bold"
                        >
                            PROCTORING
                        </a>
                        <a 
                            href="#PersonaSplitSection" 
                            className="text-xs uppercase text-on-surface-variant hover:text-primary-container transition-colors font-bold"
                        >
                            MATCH ENGINE
                        </a>
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to={dashboardPath}
                                    className="text-xs uppercase text-primary-container font-bold hover:underline"
                                >
                                    CONSOLE
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs uppercase text-red-600 hover:text-white hover:bg-red-600 px-2 py-0.5 border border-red-300 transition-none cursor-pointer font-bold"
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="text-xs uppercase text-on-surface-variant hover:text-on-surface transition-colors font-bold"
                            >
                                LOGIN
                            </Link>
                        )}
                    </nav>

                    <Link
                        to={isAuthenticated ? "/student/assessment" : "/auth"}
                        className="inline-flex items-center justify-center text-xs sm:text-sm bg-primary-container text-white border border-primary-container px-4 py-2 uppercase hover:bg-black shadow-[2px_2px_0px_#0A0A0A] transition-none font-bold"
                    >
                        [ START ASSESSMENT ]
                    </Link>

                    {isAuthenticated ? (
                        <Link 
                            to={dashboardPath}
                            title={user?.email || 'User Profile'}
                            className="w-8 h-8 rounded-none bg-primary-container flex items-center justify-center text-white hover:bg-black transition-none font-bold text-xs"
                        >
                            {user?.role === 'client' ? 'EP' : 'CD'}
                        </Link>
                    ) : (
                        <Link 
                            to="/auth" 
                            title="Account Authentication"
                            className="w-8 h-8 rounded-none bg-surface-container-high border border-black/20 flex items-center justify-center text-on-surface-variant hover:bg-black hover:text-white transition-none"
                        >
                            <span className="material-symbols-outlined text-[18px]">login</span>
                        </Link>
                    )}

                    {/* Mobile menu trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-1 border border-black/20 text-on-surface cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-surface-container-lowest border-b border-black/20 p-space-md flex flex-col gap-space-sm font-label-md text-label-md">
                    <a 
                        href="#CapabilitiesRow" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container font-bold"
                    >
                        &gt; VERIFICATION
                    </a>
                    <a 
                        href="#BlueprintSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container font-bold"
                    >
                        &gt; PROCTORING
                    </a>
                    <a 
                        href="#PersonaSplitSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container font-bold"
                    >
                        &gt; MATCH ENGINE
                    </a>
                    {isAuthenticated ? (
                        <>
                            <Link 
                                to={dashboardPath}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-1 uppercase text-primary-container font-bold"
                            >
                                &gt; CONSOLE ({user?.role?.toUpperCase()})
                            </Link>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="text-left py-1 uppercase text-red-600 font-bold"
                            >
                                &gt; LOGOUT
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/auth" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1 uppercase text-on-surface-variant font-bold"
                        >
                            &gt; LOGIN / REGISTER
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
