import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-12 px-4 border-t border-light-border/10 dark:border-white/10 mt-12 bg-light-canvas dark:bg-dark-canvas z-10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <p className="font-bold text-lg">
                    SkillForge<span className="text-orange-500">.</span>
                </p>
                <p className="text-sm">
                    © {new Date().getFullYear()} SkillForge. Crafted with <span className="text-red-500">♥</span> for builders.
                </p>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-orange-500 transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-orange-500 transition-colors">Discord</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
