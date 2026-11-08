import React from 'react';

const ClientFooter = () => {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/[0.06] py-3.5 font-mono text-xs text-[#555555] select-none" id="ClientFooter">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-[#888888]">Employer Workspace · Active</span>
                    <span className="text-[#444444]">&bull;</span>
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
