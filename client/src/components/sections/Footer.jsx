import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/[0.06] font-mono text-xs text-[#737373] py-10 mt-auto relative z-20 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: Platform & Copyright */}
                <div className="flex items-center gap-3">
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
                    <Link to="/how-it-works" className="hover:text-white transition-colors">
                        How It Works ↗
                    </Link>
                    <a href="/#CapabilitiesRow" className="hover:text-white transition-colors">
                        Verification ↗
                    </a>
                    <a href="/#BlueprintSection" className="hover:text-white transition-colors">
                        Proctoring ↗
                    </a>
                    <a href="/#PersonaSplitSection" className="hover:text-white transition-colors">
                        Enterprises ↗
                    </a>
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
