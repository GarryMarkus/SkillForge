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

    const navLinks = [
        { name: 'How It Works', path: '/how-it-works', isRoute: true },
        { name: 'Verification Engine', path: '/#CapabilitiesRow', isRoute: false },
        { name: 'Proctoring Telemetry', path: '/#BlueprintSection', isRoute: false },
        { name: 'For Enterprises', path: '/#PersonaSplitSection', isRoute: false },
    ];

    return (
        <header className="sticky top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#07080B]/85 border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)] font-sans transition-all">
            <div className="h-16 sm:h-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Brand Logo & High-Tech Telemetry */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        {/* High-tech Icon Glyph with Cyan Glow */}
                        <div className="relative w-9 h-9 rounded-lg bg-blueprint-900 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent font-mono font-bold text-base shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-cyanAccent group-hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all">
                            <span className="relative z-10">SF</span>
                            <div className="absolute inset-0 bg-cyanAccent/10 rounded-lg blur-xs" />
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyanAccent transition-colors">
                                SkillForge
                            </span>
                            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-cyanAccent/90 bg-cyanAccent/10 border border-cyanAccent/20">
                                [v2.5_ACTIVE]
                            </span>
                        </div>
                    </Link>

                    {/* Sleek Live Telemetry Sensor Pill */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="tracking-wide">SYS_NET: ACTIVE // 99.8% VERIFIED</span>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="flex items-center gap-5 sm:gap-7">
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = link.isRoute && location.pathname === link.path;
                            return link.isRoute ? (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative py-1 group text-sm transition-colors ${
                                        isActive ? 'text-cyanAccent font-semibold' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    <span>{link.name}</span>
                                    {/* Laser Underline Reveal */}
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] bg-cyanAccent transition-all duration-300 rounded-full ${
                                            isActive ? 'w-full shadow-[0_0_8px_#00F0FF]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_8px_#00F0FF]'
                                        }`}
                                    />
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="relative py-1 group text-sm text-slate-300 hover:text-white transition-colors"
                                >
                                    <span>{link.name}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyanAccent transition-all duration-300 rounded-full group-hover:w-full group-hover:shadow-[0_0_8px_#00F0FF]" />
                                </a>
                            );
                        })}

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={dashboardPath}
                                    className="relative py-1 text-cyanAccent font-semibold hover:text-cyan-300 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-400 hover:text-rose-400 text-xs font-mono px-2.5 py-1 rounded-md border border-white/[0.08] hover:border-rose-500/40 bg-white/[0.02] hover:bg-rose-500/10 transition-all cursor-pointer"
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                className="text-slate-300 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg border border-transparent hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </nav>

                    {/* Action CTA: Start Assessment with High-Contrast Gradient Border & Illumination */}
                    <Link
                        to={isAuthenticated ? "/student/assessment" : "/auth"}
                        className="group relative inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-950 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyanAccent to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_28px_rgba(0,240,255,0.5)] transition-all cursor-pointer overflow-hidden"
                    >
                        <span className="relative z-10 font-bold tracking-tight">Start Assessment</span>
                        <span className="material-symbols-outlined text-[18px] relative z-10 transform transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Authenticated User Avatar Pill */}
                    {isAuthenticated ? (
                        <Link
                            to={dashboardPath}
                            title={user?.email || 'User Profile'}
                            className="w-9 h-9 rounded-lg bg-blueprint-850 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent font-mono font-bold text-xs hover:border-cyanAccent shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
                        >
                            {user?.role === 'client' ? 'HR' : 'ME'}
                        </Link>
                    ) : null}

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-[22px] block">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#0C0E14]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6 flex flex-col gap-4 text-sm font-medium shadow-2xl animate-fadeIn">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] text-xs font-mono text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>SYS_NET: ACTIVE // 99.8% VERIFIED</span>
                    </div>

                    <Link
                        to="/how-it-works"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-slate-300 hover:text-cyanAccent transition-colors"
                    >
                        How It Works
                    </Link>
                    <a
                        href="/#CapabilitiesRow"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-slate-300 hover:text-cyanAccent transition-colors"
                    >
                        Verification Engine
                    </a>
                    <a
                        href="/#BlueprintSection"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-slate-300 hover:text-cyanAccent transition-colors"
                    >
                        Proctoring Telemetry
                    </a>
                    <a
                        href="/#PersonaSplitSection"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-slate-300 hover:text-cyanAccent transition-colors"
                    >
                        For Enterprises
                    </a>

                    <hr className="border-white/[0.08] my-1" />

                    {isAuthenticated ? (
                        <>
                            <Link
                                to={dashboardPath}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-2 text-cyanAccent font-semibold"
                            >
                                Open Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="text-left py-2 text-rose-400 font-semibold cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/auth"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 text-slate-100 font-semibold hover:text-cyanAccent transition-colors"
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
