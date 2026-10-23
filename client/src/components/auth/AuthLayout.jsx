import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, LeftPanel }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-background font-mono antialiased text-on-surface selection:bg-primary-container selection:text-on-primary">
            {/* Top Navigation Console Rail */}
            <header className="w-full h-14 bg-surface-container-lowest border-b border-black/15 px-margin flex items-center justify-between select-none z-20">
                <div className="flex items-center gap-space-sm">
                    <span className="text-primary-container font-bold">+</span>
                    <span className="font-bold text-headline-sm uppercase tracking-tight">
                        SKILLFORGE // IDENTITY_PORTAL
                    </span>
                    <span className="hidden sm:inline-block border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm text-primary-container font-bold uppercase ml-2">
                        [SEC_NODE: AUTH_01]
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-space-xs text-label-sm text-on-surface-variant">
                    <span className="text-primary-container font-bold">LOC:</span>
                    <span>ROOT &gt; IDENTITY_GATEWAY &gt; CREDENTIAL_VERIFICATION</span>
                </div>

                <div>
                    <Link
                        to="/"
                        className="border border-black/20 bg-surface px-space-sm py-space-xs text-label-sm uppercase hover:bg-black hover:text-white transition-none font-bold flex items-center gap-1"
                    >
                        <span>[ &lt;- RETURN_TO_INDEX ]</span>
                    </Link>
                </div>
            </header>

            {/* Main Asymmetrical Split */}
            <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Cobalt Blueprint Specification Schematic (42% width) */}
                <div className="hidden lg:flex w-[42%] bg-primary-container relative p-8 xl:p-12 border-r border-black/20 overflow-y-auto">
                    <LeftPanel />
                </div>

                {/* Right Panel: Drafting Paper Off-White Form Viewport (58% width) */}
                <div className="w-full lg:w-[58%] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto bg-background">
                    <div className="w-full max-w-xl">
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom CAD Footer Strip */}
            <footer className="w-full bg-surface-container-lowest border-t border-black/15 py-space-xs px-margin select-none">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-label-sm text-on-surface-variant">
                    <div>
                        <span className="text-primary-container font-bold">+</span> SYSTEM_AUTH_VERSION: 4.9.12 // ENCRYPTION: AES-256-GCM
                    </div>
                    <div>
                        <span className="border border-black/15 px-space-xs py-0.5 bg-surface text-on-surface font-bold">
                            CAD_ID: #SF-AUTH-GATEWAY
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
