import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';

const Footer = () => {
    return (
        <footer className="w-full bg-[#060709] border-t border-white/[0.06] font-mono text-xs text-[#737373] py-10 mt-auto relative z-20 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: Platform & Copyright */}
                <div className="flex items-center gap-3">
                    <BrandLogo className="w-5 h-5" />
                    <span className="font-display font-bold text-white text-sm">
                        SkillForge
                    </span>
                    <span className="text-[#444444]">·</span>
                    <span className="text-[#888888]">
                        &copy; {new Date().getFullYear()}
                    </span>
                </div>

                {/* Center: Editorial Monospace Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-[#888888]">
                    <Link to="/verification" className="hover:text-white transition-colors">
                        Verification ↗
                    </Link>
                    <Link to="/protocol" className="hover:text-white transition-colors">
                        Protocol ↗
                    </Link>
                    <Link to="/talent" className="hover:text-white transition-colors">
                        Talent &amp; Teams ↗
                    </Link>
                    <Link to="/how-it-works" className="hover:text-white transition-colors">
                        How It Works ↗
                    </Link>
                    <Link to="/auth" className="hover:text-white transition-colors">
                        Sign In ↗
                    </Link>
                </div>

                {/* Right: Protocol Indicator */}
                <div className="text-[#555555]">
                    Empirical Verification Protocol
                </div>
            </div>
        </footer>
    );
};

export default Footer;
