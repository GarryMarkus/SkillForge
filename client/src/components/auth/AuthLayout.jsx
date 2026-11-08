import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#09090B] font-sans antialiased text-zinc-100 select-none">
            {/* Top Navigation Bar */}
            <header className="w-full h-16 bg-[#09090B] border-b border-white/[0.08] select-none z-20">
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                SF
                            </span>
                            <span className="font-semibold text-sm sm:text-base tracking-tight text-white">
                                SkillForge
                            </span>
                        </Link>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                            Secure Portal
                        </span>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="px-3 py-1.5 rounded-lg border border-zinc-700/80 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                        >
                            <span>&larr; Back to Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Split */}
            <div className="flex-1 w-full flex flex-col lg:flex-row">
                {/* Left Panel: Value proposition (40% width) */}
                <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-zinc-950 via-[#10121A] to-blue-950/30 border-r border-white/[0.08] p-8 xl:p-12 text-white flex-col justify-between">
                    <LeftPanel />
                </div>

                {/* Right Panel: Clean form viewport (60% width) */}
                <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#09090B] flex-1">
                    <div className="w-full max-w-lg">
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <footer className="w-full bg-[#09090B] border-t border-white/[0.08] py-4 font-sans select-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
                    <div>
                        SkillForge — Empirical Skill Verification &amp; Intelligent Matching
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} SkillForge, Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
