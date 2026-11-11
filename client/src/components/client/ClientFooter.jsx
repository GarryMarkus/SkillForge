import React from 'react';

const ClientFooter = () => {
    return (
        <footer className="w-full bg-[#060709] border-t border-white/[0.06] py-4 font-mono text-xs text-[#71717A] select-none" id="ClientFooter">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-[#888888]">Employer Workspace · Active</span>
                    <span className="text-[#71717A]">&bull;</span>
                    <span>Empirical skill verification protocol</span>
                </div>
                <div>
                    &copy; {new Date().getFullYear()} SkillForge, Inc.
                </div>
            </div>
        </footer>
    );
};

export default ClientFooter;
