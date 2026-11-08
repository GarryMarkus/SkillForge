import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CardNav from './CardNav';
import { useAuthStore } from '../../store/authStore';

/**
 * Navbar
 * SkillForge navigation header powered by the modular CardNav system.
 * Incorporates Courier Prime brand typography, Consolas metadata,
 * and expandable card panels for verification, proctoring, and platform workflows.
 */
const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/student/dashboard';

    const navItems = [
        {
            label: 'Verification',
            description: 'Empirical skill evaluation and anti-cheat diagnostic testing.',
            href: '/verification',
            links: [
                { label: 'Evaluation Methodology', href: '/verification' },
                { label: 'Three Pillars', href: '/verification#pillars' },
                { label: 'Sample Assessment', href: '/student/assessment' },
            ],
        },
        {
            label: 'Protocol',
            description: 'Tamper-evident verification pipeline and technical specifications.',
            href: '/protocol',
            links: [
                { label: 'Workflow Lifecycle', href: '/protocol' },
                { label: 'Data Specifications', href: '/protocol#specifications' },
                { label: 'Audit Trail Logs', href: '/how-it-works#audit' },
            ],
        },
        {
            label: 'Talent & Teams',
            description: 'Dual-track candidate credentials and enterprise hiring requisitions.',
            href: '/talent',
            links: [
                { label: 'Overview', href: '/talent' },
                { label: 'For Engineers', href: '/talent#engineers' },
                { label: 'For Hiring Teams', href: '/talent#employers' },
            ],
        },
    ];

    const logoNode = (
        <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] font-mono text-xs font-bold shadow-sm">
                SF
            </span>
            <span className="font-display font-bold text-[#f5f5f5] text-base tracking-tight group-hover:text-white transition-colors">
                SkillForge
            </span>
        </Link>
    );

    const secondaryCtaNode = isAuthenticated ? (
        <div className="flex items-center gap-2">
            <Link
                to={dashboardPath}
                className="card-nav__secondary-cta"
            >
                Dashboard
            </Link>
            <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors px-1.5 py-1 cursor-pointer font-mono"
                title="Sign out"
            >
                Sign Out
            </button>
        </div>
    ) : (
        <Link
            to="/auth"
            className="card-nav__secondary-cta"
        >
            Sign In
        </Link>
    );

    const ctaNode = isAuthenticated ? (
        <Link
            to="/student/assessment"
            className="card-nav__cta"
        >
            <span>Assessment</span>
            <span>↗</span>
        </Link>
    ) : (
        <Link
            to="/auth"
            className="card-nav__cta"
        >
            <span>Start Assessment</span>
            <span>↗</span>
        </Link>
    );

    return (
        <header className="sticky top-0 left-0 right-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 lg:px-8 bg-[#050505]/80 backdrop-blur-md transition-colors">
            <div className="max-w-7xl mx-auto flex justify-center">
                <CardNav
                    cards={navItems}
                    logo={logoNode}
                    cta={ctaNode}
                    secondaryCta={secondaryCtaNode}
                    maxWidth={1280}
                    linkComponent={Link}
                    routeKey={location.pathname}
                />
            </div>
        </header>
    );
};

export default Navbar;
