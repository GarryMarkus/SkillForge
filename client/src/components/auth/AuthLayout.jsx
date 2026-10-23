import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-[#FAFAFA] font-sans antialiased text-gray-900 select-none">
            {/* Top Navigation Bar */}
            <header className="w-full h-16 bg-white border-b border-gray-200 select-none z-20">
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                SF
                            </span>
                            <span className="font-bold text-base tracking-tight text-gray-900">
                                SkillForge
                            </span>
                        </Link>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            Secure Portal
                        </span>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                        >
                            <span>← Back to Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Split */}
            <div className="flex-1 w-full flex flex-col lg:flex-row">
                {/* Left Panel: Value proposition (42% width) */}
                <div className="hidden lg:flex w-[42%] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 xl:p-12 text-white flex-col justify-between">
                    <LeftPanel />
                </div>

                {/* Right Panel: Clean form viewport (58% width) */}
                <div className="w-full lg:w-[58%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#FAFAFA] flex-1">
                    <div className="w-full max-w-lg">
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <footer className="w-full bg-white border-t border-gray-200 py-4 font-sans select-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
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
