import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#050505] font-mono antialiased text-[#ededed] select-none">
            {/* Top Navigation Bar */}
            <header className="w-full h-14 bg-[#050505] border-b border-white/[0.06] select-none z-20">
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2 group">
                            <span className="w-6 h-6 rounded-sm bg-[#111113] border border-white/20 flex items-center justify-center text-[#f5f5f5] text-xs font-mono">
                                SF
                            </span>
                            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#888888] transition-colors">
                                SkillForge
                            </span>
                        </Link>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-sm text-[11px] font-mono text-[#888888] border border-white/10 bg-[#0b0b0c]">
                            Authentication Portal
                        </span>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="px-3 py-1.5 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white hover:border-white/25 transition-colors flex items-center gap-1.5"
                        >
                            <span>&larr; Back to Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Split */}
            <div className="flex-1 w-full flex flex-col lg:flex-row">
                {/* Left Panel: Value proposition (40% width) */}
                <div className="hidden lg:flex w-[40%] bg-[#0b0b0c] border-r border-white/10 p-8 xl:p-12 text-[#ededed] flex-col justify-between">
                    <LeftPanel />
                </div>

                {/* Right Panel: Clean form viewport (60% width) */}
                <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#050505] flex-1">
                    <div className="w-full max-w-lg">
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <footer className="w-full bg-[#050505] border-t border-white/[0.06] py-3.5 font-mono select-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#555555]">
                    <div>
                        SkillForge — Empirical Skill Verification Protocol
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} SkillForge, Inc.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
