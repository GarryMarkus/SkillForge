import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#050608] border-t border-white/[0.08] font-sans text-sm text-slate-400 py-12 mt-auto relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blueprint-900 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent font-mono font-bold text-xs shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                        SF
                    </div>
                    <span className="font-display font-bold text-white text-base tracking-tight">SkillForge</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-slate-400">EMPIRICAL VERIFICATION PROTOCOL</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                    <Link to="/" className="hover:text-cyanAccent transition-colors">Home</Link>
                    <Link to="/how-it-works" className="hover:text-cyanAccent transition-colors">How It Works</Link>
                    <a href="/#CapabilitiesRow" className="hover:text-cyanAccent transition-colors">Verification</a>
                    <a href="/#BlueprintSection" className="hover:text-cyanAccent transition-colors">Proctoring</a>
                    <a href="/#PersonaSplitSection" className="hover:text-cyanAccent transition-colors">For Enterprises</a>
                    <Link to="/auth" className="hover:text-cyanAccent transition-colors">Sign In</Link>
                </div>

                <div className="text-xs font-mono text-slate-400">
                    &copy; {new Date().getFullYear()} SKILLFORGE CAD. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
