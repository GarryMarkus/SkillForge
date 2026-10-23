import React from 'react';

const ClientFooter = () => {
    return (
        <footer className="w-full bg-surface-container-low border-t border-black/15 py-4 font-mono select-none" id="ClientFooter">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                    <span className="text-canvas-blueprint font-bold">[ SYSTEM INTEGRITY: ACTIVE ]</span>
                    <span className="text-black/20">|</span>
                    <span>TALENT ACQUISITION ENGINE v4.9</span>
                </div>
                <div>
                    &copy; {new Date().getFullYear()} SKILLFORGE ALGORITHMIC EVALUATION CORP.
                </div>
            </div>
        </footer>
    );
};

export default ClientFooter;
