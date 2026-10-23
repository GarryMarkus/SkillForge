import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-canvas-light font-mono antialiased text-ink-primary select-none">
            {/* Top Navigation Console Rail */}
            <header className="w-full h-16 bg-surface border-b border-black/15 select-none z-20">
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-canvas-blueprint font-bold text-base">+</span>
                        <span className="font-bold text-sm sm:text-base uppercase tracking-tight text-ink-primary">
                            SKILLFORGE // IDENTITY PORTAL
                        </span>
                        <span className="hidden sm:inline-block border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs text-canvas-blueprint font-bold uppercase">
                            [ SYSTEM STATUS: ACTIVE ]
                        </span>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="border border-black/25 bg-surface px-3 py-1.5 text-xs uppercase hover:bg-black hover:text-white transition-none font-bold flex items-center gap-1.5"
                        >
                            <span>[ ← RETURN TO HOME ]</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Asymmetrical Split */}
            <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Cobalt Blueprint Specification Schematic (42% width) */}
                <div className="hidden lg:flex w-[42%] bg-canvas-blueprint relative p-8 xl:p-12 border-r border-black/20 overflow-y-auto">
                    <LeftPanel />
                </div>

                {/* Right Panel: Drafting Paper Off-White Form Viewport (58% width) */}
                <div className="w-full lg:w-[58%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto bg-canvas-light flex-1">
                    <div className="w-full max-w-xl">
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom CAD Utility Footer Strip */}
            <footer className="w-full bg-surface-container-low border-t border-black/15 py-3 font-mono select-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                        <span className="text-canvas-blueprint font-bold">[ ENCLAVE VERIFIED ]</span>
                        <span className="text-black/20">|</span>
                        <span>SKILLFORGE IDENTITY &amp; AUTHENTICATION PORTAL</span>
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} SKILLFORGE ALGORITHMIC EVALUATION CORP.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
