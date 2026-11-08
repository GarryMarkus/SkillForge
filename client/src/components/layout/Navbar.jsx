import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import CardNav from '../ui/animations/CardNav';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';

    // React Bits CardNav Data Architecture
    const navCards = [
        {
            title: 'Verification Engine',
            tag: 'SYS_ENGINE',
            icon: 'terminal',
            description: 'Sandboxed code execution, runtime profiling, and AST structural integrity analysis.',
            links: [
                { title: 'Practical Assessments', href: '/student/assessment' },
                { title: 'Verification Pillars', href: '/#CapabilitiesRow' },
                { title: 'Complexity Benchmarks', href: '/#CapabilitiesRow' },
            ],
        },
        {
            title: 'Proctoring Telemetry',
            tag: 'SENSOR_NET',
            icon: 'shield',
            description: 'Biometric focus validation and multi-display anomaly prevention telemetry.',
            links: [
                { title: 'Evaluation Journey Spec', href: '/#BlueprintSection' },
                { title: 'Telemetry Safeguards', href: '/#BlueprintSection' },
                { title: 'Methodology Comparison', href: '/#BlueprintSection' },
            ],
        },
        {
            title: 'Enterprises & Teams',
            tag: 'DISPATCH',
            icon: 'hub',
            description: 'Pre-screened engineering pipelines without manual resume review delays.',
            links: [
                { title: 'How It Works Guide', href: '/how-it-works' },
                { title: 'Recruiter Command Deck', href: '/#PersonaSplitSection' },
                { title: 'Candidate Skill Passport', href: '/#PersonaSplitSection' },
            ],
        },
        {
            title: isAuthenticated ? 'Active Session' : 'Terminal Access',
            tag: 'AUTH_GATEWAY',
            icon: 'fingerprint',
            description: isAuthenticated
                ? `Logged in as ${user?.role === 'client' ? 'Recruiter' : 'Engineer'} (${user?.email || 'Active User'}).`
                : 'Authenticate to access sandboxed assessments and verifiable skill passports.',
            links: isAuthenticated
                ? [
                      { title: 'Open Dashboard', href: dashboardPath },
                      { title: 'Start New Assessment', href: '/student/assessment' },
                      { title: 'Sign Out Session', onClick: handleLogout },
                  ]
                : [
                      { title: 'Sign In to Account', href: '/auth' },
                      { title: 'Developer Onboarding', href: '/auth' },
                      { title: 'Employer Portal', href: '/auth' },
                  ],
        },
    ];

    // Logo Component
    const logoNode = (
        <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-blueprint-900 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent font-mono font-bold text-sm shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-cyanAccent group-hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all">
                <span className="relative z-10">SF</span>
                <div className="absolute inset-0 bg-cyanAccent/10 rounded-lg blur-xs" />
            </div>
            <div className="flex items-baseline">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyanAccent transition-colors">
                    SkillForge
                </span>
                <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-cyanAccent/90 bg-cyanAccent/10 border border-cyanAccent/20">
                    [v2.5_ACTIVE]
                </span>
            </div>
        </Link>
    );

    // Live Telemetry Badge
    const telemetryNode = (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">SYS_NET: ACTIVE // 99.8% VERIFIED</span>
        </div>
    );

    // Primary Call to Action
    const ctaNode = (
        <Link
            to={isAuthenticated ? '/student/assessment' : '/auth'}
            className="group relative inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-950 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyanAccent to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_28px_rgba(0,240,255,0.5)] transition-all cursor-pointer overflow-hidden"
        >
            <span className="relative z-10 font-bold tracking-tight">Start Assessment</span>
            <span className="material-symbols-outlined text-[16px] relative z-10 transform transition-transform group-hover:translate-x-1">
                arrow_forward
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );

    // Secondary Call to Action (Sign In or User Avatar)
    const secondaryCtaNode = isAuthenticated ? (
        <div className="flex items-center gap-2.5">
            <Link
                to={dashboardPath}
                className="text-xs font-mono font-semibold text-slate-300 hover:text-cyanAccent px-2.5 py-1.5 rounded-lg border border-transparent hover:border-white/[0.08] transition-all"
            >
                Dashboard
            </Link>
            <Link
                to={dashboardPath}
                title={user?.email || 'User Profile'}
                className="w-8 h-8 rounded-lg bg-blueprint-850 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent font-mono font-bold text-xs hover:border-cyanAccent shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all"
            >
                {user?.role === 'client' ? 'HR' : 'ME'}
            </Link>
        </div>
    ) : (
        <Link
            to="/auth"
            className="text-slate-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-transparent hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
        >
            Sign In
        </Link>
    );

    return (
        <header className="sticky top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
            <div className="max-w-7xl mx-auto flex justify-center">
                <CardNav
                    cards={navCards}
                    logo={logoNode}
                    telemetry={telemetryNode}
                    cta={ctaNode}
                    secondaryCta={secondaryCtaNode}
                    maxWidth="100%"
                    minHeight={180}
                    accentColor="#00F0FF"
                    menuLabel={true}
                    linkComponent={Link}
                    routeKey={location.pathname}
                />
            </div>
        </header>
    );
};

export default Navbar;
