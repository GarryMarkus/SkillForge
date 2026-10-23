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
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant/30 select-none">
            {/* Top Primary CAD Header */}
            <div className="h-14 max-w-7xl mx-auto px-margin flex items-center justify-between border-b border-outline-variant/20">
                <div className="flex items-center gap-space-md">
                    <Link to="/" className="font-headline-sm text-headline-sm tracking-tight text-primary-container uppercase hover:opacity-80 transition-opacity">
                        SKILLFORGE
                    </Link>
                    <span className="font-label-sm text-label-sm border border-outline-variant/40 px-space-xs py-0.5 text-on-surface-variant hidden sm:inline-block">
                        [SYS_STATUS: NOMINAL]
                    </span>
                </div>

                <div className="flex items-center gap-space-lg">
                    <nav className="hidden md:flex items-center gap-space-lg">
                        <a 
                            href="#CapabilitiesRow" 
                            className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-primary-container transition-colors"
                        >
                            VERIFICATION
                        </a>
                        <a 
                            href="#BlueprintSection" 
                            className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-primary-container transition-colors"
                        >
                            PROCTORING
                        </a>
                        <a 
                            href="#PersonaSplitSection" 
                            className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-primary-container transition-colors"
                        >
                            MATCH_ENGINE
                        </a>
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to={dashboardPath}
                                    className="font-label-md text-label-md uppercase text-primary-container font-bold hover:underline"
                                >
                                    CONSOLE
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="font-label-md text-label-md uppercase text-error hover:text-on-error hover:bg-error px-1.5 py-0.5 border border-error/40 transition-colors"
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-on-surface transition-colors"
                            >
                                LOGIN
                            </Link>
                        )}
                    </nav>

                    <Link
                        to={isAuthenticated ? "/student/assessment" : "/auth"}
                        className="inline-flex items-center justify-center font-label-md text-label-md bg-primary-container text-on-primary border border-primary-container px-space-md py-1.5 uppercase hover:bg-primary hover:text-on-primary transition-colors"
                    >
                        START_ASSESSMENT
                    </Link>

                    {isAuthenticated ? (
                        <Link 
                            to={dashboardPath}
                            title={user?.email || 'User Profile'}
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:ring-2 hover:ring-primary-container transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">person</span>
                        </Link>
                    ) : (
                        <Link 
                            to="/auth" 
                            title="Account Authentication"
                            className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">login</span>
                        </Link>
                    )}

                    {/* Mobile menu trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-1 border border-outline-variant/40 text-on-surface"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Sub-bar: Technical Coordinates */}
            <div className="h-7 max-w-7xl mx-auto px-margin flex items-center justify-between bg-surface-container-low/50">
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-space-xs truncate">
                    <span className="text-outline">COORDINATE:</span>
                    <span className="truncate">ROOT &gt; PLATFORM &gt; TALENT_VERIFICATION_ENGINE</span>
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden sm:flex items-center gap-space-md shrink-0">
                    <span className="text-outline">GRID: 12-COL DRAFTING</span>
                    <span>[X:01 Y:01]</span>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/40 p-space-md flex flex-col gap-space-sm font-label-md text-label-md">
                    <a 
                        href="#CapabilitiesRow" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container"
                    >
                        &gt; VERIFICATION
                    </a>
                    <a 
                        href="#BlueprintSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container"
                    >
                        &gt; PROCTORING
                    </a>
                    <a 
                        href="#PersonaSplitSection" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 uppercase text-on-surface-variant hover:text-primary-container"
                    >
                        &gt; MATCH_ENGINE
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
                                className="text-left py-1 uppercase text-error"
                            >
                                &gt; LOGOUT
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/auth" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1 uppercase text-on-surface-variant"
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
