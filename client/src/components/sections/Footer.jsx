import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-surface-container-low border-t border-cad font-mono select-none">
            <div className="h-auto md:h-12 max-w-7xl mx-auto px-margin py-3 md:py-0 flex flex-col md:flex-row items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant uppercase">
                <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                    <span>SPEC_ID: SF-2024-V4</span>
                    <span className="text-outline">|</span>
                    <span>REV.NO: 09.421</span>
                    <span className="text-outline">|</span>
                    <span>CALIBRATION: METRIC-TOLERANCE 0.001ms</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                    <span>ENCRYPTION: HARDENED_BLAKE3</span>
                    <span className="text-outline">|</span>
                    <span>© {new Date().getFullYear()} SKILLFORGE SYSTEMS CORP. ALL RIGHTS RESERVED.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
