import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 font-sans text-sm text-gray-500 py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        S
                    </div>
                    <span className="font-bold text-gray-900 text-base">SkillForge</span>
                    <span className="text-gray-300">·</span>
                    <span>Empirical Skill Verification Platform</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link to="/how-it-works" className="hover:text-blue-600 transition-colors">How It Works</Link>
                    <a href="/#CapabilitiesRow" className="hover:text-blue-600 transition-colors">Verification</a>
                    <a href="/#PersonaSplitSection" className="hover:text-blue-600 transition-colors">For Employers</a>
                    <Link to="/auth" className="hover:text-blue-600 transition-colors">Sign In</Link>
                </div>

                <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} SkillForge. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
