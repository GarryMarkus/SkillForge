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

    const navCards = [
        {
            title: 'Verification Engine',
            tag: 'Evaluation',
            icon: 'verified',
            description: 'Sandboxed code execution, runtime profiling, and structural code analysis.',
            links: [
                { title: 'Practical Assessments', href: '/student/assessment' },
                { title: 'Evaluation Pillars', href: '/#CapabilitiesRow' },
                { title: 'Technical Rubrics', href: '/#CapabilitiesRow' },
            ],
        },
        {
            title: 'Proctoring Systems',
            tag: 'Integrity',
            icon: 'shield',
            description: 'Focus validation and anomaly prevention telemetry built for fairness.',
            links: [
                { title: 'Evaluation Journey', href: '/#BlueprintSection' },
                { title: 'Integrity Safeguards', href: '/#BlueprintSection' },
                { title: 'Methodology Comparison', href: '/#BlueprintSection' },
            ],
        },
        {
            title: 'For Enterprises',
            tag: 'Hiring',
            icon: 'corporate_fare',
            description: 'Direct access to pre-screened technical talent without resume guesswork.',
            links: [
                { title: 'How It Works', href: '/how-it-works' },
                { title: 'Recruiter Dashboard', href: '/#PersonaSplitSection' },
                { title: 'Skill Passports', href: '/#PersonaSplitSection' },
            ],
        },
        {
            title: isAuthenticated ? 'Active Account' : 'Portal Access',
            tag: 'Account',
            icon: 'account_circle',
            description: isAuthenticated
                ? `Signed in as ${user?.role === 'client' ? 'Recruiter' : 'Candidate'} (${user?.email || 'User'}).`
                : 'Access your assessments, verified skill credentials, and hiring tools.',
            links: isAuthenticated
                ? [
                      { title: 'Open Dashboard', href: dashboardPath },
                      { title: 'Start Assessment', href: '/student/assessment' },
                      { title: 'Sign Out', onClick: handleLogout },
                  ]
                : [
                      { title: 'Sign In', href: '/auth' },
                      { title: 'Candidate Registration', href: '/auth' },
                      { title: 'Employer Registration', href: '/auth' },
                  ],
        },
    ];

    // Minimal, authoritative Brand Logo
    const logoNode = (
        <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                SF
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                    SkillForge
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[11px] font-medium text-zinc-400 bg-zinc-800/80 border border-zinc-700/50">
                    v2.5
                </span>
            </div>
        </Link>
    );

    // Understated, professional network status
    const telemetryNode = (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Evaluation Network Active</span>
        </div>
    );

    // Solid, authoritative CTA
    const ctaNode = (
        <Link
            to={isAuthenticated ? '/student/assessment' : '/auth'}
            className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-950 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white hover:bg-zinc-100 shadow-sm transition-colors cursor-pointer"
        >
            <span>Start Assessment</span>
            <span className="material-symbols-outlined text-[15px]">
                arrow_forward
            </span>
        </Link>
    );

    // Clean secondary action
    const secondaryCtaNode = isAuthenticated ? (
        <div className="flex items-center gap-2">
            <Link
                to={dashboardPath}
                className="text-xs font-medium text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors"
            >
                Dashboard
            </Link>
            <Link
                to={dashboardPath}
                title={user?.email || 'User Profile'}
                className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 font-semibold text-xs hover:border-zinc-600 transition-colors"
            >
                {user?.role === 'client' ? 'HR' : 'ME'}
            </Link>
        </div>
    ) : (
        <Link
            to="/auth"
            className="text-zinc-300 hover:text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors"
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
                    minHeight={160}
                    menuLabel={true}
                    linkComponent={Link}
                    routeKey={location.pathname}
                />
            </div>
        </header>
    );
};

export default Navbar;
