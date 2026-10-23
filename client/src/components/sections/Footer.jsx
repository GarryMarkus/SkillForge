import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-surface-container-low border-t border-black/15 font-mono select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant uppercase">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-bold text-ink-primary">SKILLFORGE PLATFORM</span>
                    <span className="text-black/30">|</span>
                    <span>EMPIRICAL TALENT VERIFICATION</span>
                    <span className="text-black/30">|</span>
                    <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="border border-primary-container/30 bg-primary-fixed/30 px-2 py-0.5 text-primary-container font-bold">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                    <span className="text-black/30">|</span>
                    <span>HARDENED ENCLAVE</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
