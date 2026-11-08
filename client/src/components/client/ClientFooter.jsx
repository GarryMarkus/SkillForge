import React from 'react';

const ClientFooter = () => {
    return (
        <footer className="w-full bg-[#09090B] border-t border-white/[0.08] py-4 font-sans text-xs text-zinc-500" id="ClientFooter">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-zinc-300 font-medium">Employer Enclave Active</span>
                    <span className="text-zinc-600">·</span>
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
