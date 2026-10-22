import React from 'react';

import ThemeToggle from '../layout/ThemeToggle';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex bg-light-canvas dark:bg-dark-canvas transition-colors duration-500 overflow-hidden relative">
            {/* Floating Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Back to Home (Mobile/Desktop) */}
            <Link to="/" className="absolute top-6 left-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all group">
                <ArrowLeft className="w-6 h-6 text-black dark:text-white group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* Left Panel (Visuals) - Hidden on Mobile */}
            <div className="hidden lg:flex w-[40%] bg-black relative flex-col justify-between p-12 overflow-hidden">
                <LeftPanel />
            </div>

            {/* Right Panel (Forms) */}
            <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 sm:p-12 relative">
                <div className="w-full max-w-xl">
                    <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                        <span className="text-2xl font-black text-black dark:text-white">SkillForge</span>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
