import React from 'react';
import { Link } from 'react-router-dom';
import StudioNoise from '../ui/animations/StudioNoise';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <StudioNoise opacity={0.09}>
            <div className="min-h-screen w-full flex flex-col font-mono antialiased text-[#ededed] select-none">
                {/* Top Navigation Bar */}
                <header className="w-full h-14 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.06] select-none z-20">
                    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to="/" className="flex items-center gap-2.5 group">
                                <span className="w-6 h-6 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center text-[#f5f5f5] text-xs font-mono font-bold">
                                    SF
                                </span>
                                <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#888888] transition-colors">
                                    SkillForge
                                </span>
                            </Link>
                            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-300 border border-white/[0.08] bg-white/[0.04]">
                                Authentication Portal
                            </span>
                        </div>

                        <div>
                            <Link
                                to="/"
                                className="px-3.5 py-1.5 rounded-sm bg-[#121316] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-white hover:border-white/20 transition-colors flex items-center gap-1.5"
                            >
                                <span>&larr; Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Split */}
                <div className="flex-1 w-full flex flex-col lg:flex-row relative z-10">
                    {/* Left Panel: Value proposition (40% width) */}
                    <div className="hidden lg:flex w-[40%] bg-[#0A0B0F]/95 border-r border-white/[0.08] p-8 xl:p-12 text-[#ededed] flex-col justify-between">
                        <LeftPanel />
                    </div>

                    {/* Right Panel: Clean form viewport (60% width) */}
                    <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 flex-1">
                        <div className="relative w-full max-w-lg">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
                            />
                            <div className="relative">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <footer className="w-full bg-[#060709] border-t border-white/[0.06] py-3.5 font-mono select-none relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#71717A]">
                        <div>
                            SkillForge — Empirical Skill Verification Protocol
                        </div>
                        <div>
                            &copy; {new Date().getFullYear()} SkillForge, Inc.
                        </div>
                    </div>
                </footer>
            </div>
        </StudioNoise>
    );
};

export default AuthLayout;
