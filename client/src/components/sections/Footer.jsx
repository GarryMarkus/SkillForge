import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#09090B] border-t border-white/[0.08] font-sans text-sm text-zinc-400 py-10 mt-auto relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                        SF
                    </div>
                    <span className="font-semibold text-white text-sm tracking-tight">SkillForge</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400">Technical Skill Verification Platform</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                    <a href="/#CapabilitiesRow" className="hover:text-white transition-colors">Verification</a>
                    <a href="/#BlueprintSection" className="hover:text-white transition-colors">Evaluation Flow</a>
                    <a href="/#PersonaSplitSection" className="hover:text-white transition-colors">For Enterprises</a>
                    <Link to="/auth" className="hover:text-white transition-colors">Sign In</Link>
                </div>

                <div className="text-xs text-zinc-400">
                    &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
