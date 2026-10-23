import React from 'react';

const ClientFooter = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-4 font-sans text-xs text-gray-500" id="ClientFooter">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-gray-900 font-medium">Employer Enclave Active</span>
                    <span className="text-gray-300">·</span>
                    <span>End-to-End Skill Verification</span>
                </div>
                <div>
                    &copy; {new Date().getFullYear()} SkillForge Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default ClientFooter;
