import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientOnboardingHeader = ({ clientEmail = 'recruiter@enterprise.io' }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-surface-container-lowest border-b border-black/15 select-none font-mono">
            {/* Top Minimalist Console Rail */}
            <div className="h-16 w-full px-margin flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-space-md">
                    <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                        <span className="text-primary-container font-bold">+</span>
                        <span className="font-bold">SKILLFORGE // ENTERPRISE_PROVISIONING_CONSOLE</span>
                    </div>
                    <span className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-primary-container uppercase hidden md:inline-block font-bold">
                        [PROVISIONING_NODE: ACTIVE // 256-BIT_ENCRYPTION]
                    </span>
                </div>

                <div className="hidden xl:flex items-center gap-space-xs border border-black/15 bg-surface-container-lowest px-space-md py-space-xs text-label-md font-label-md text-on-surface-variant">
                    <span className="text-primary-container font-bold">LOC:</span>
                    <span>ROOT &gt; ENTERPRISE_PIPELINE &gt; ENTITY_REGISTRATION</span>
                </div>

                <div className="flex items-center gap-space-md">
                    <div className="hidden md:flex items-center gap-space-xs border-r border-black/15 pr-space-md text-label-sm font-label-sm text-on-surface-variant">
                        <span>[{clientEmail.toUpperCase()}]</span>
                        <span className="text-black/30">|</span>
                        <span>STAGE: PROVISIONING_01</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/client/dashboard')}
                        className="border border-black/25 bg-surface-container-lowest px-space-sm py-space-xs text-label-sm font-label-sm text-on-surface uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold"
                    >
                        [ &lt;- RETURN_TO_DASHBOARD ]
                    </button>
                    <div className="w-8 h-8 rounded-none bg-primary-container flex items-center justify-center shrink-0 text-white font-bold text-xs">
                        EP
                    </div>
                </div>
            </div>

            {/* Sub-Header Coordinates Ribbon */}
            <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant shrink-0">
                    <span className="text-primary-container font-bold">[COORD: ENTITY_SPEC_01]</span>
                    <span className="text-on-surface font-bold">
                        PIPELINE: ENTERPRISE_ORGANIZATION_IDENTITY_INITIALIZATION
                    </span>
                </div>

                <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                    <span className="bg-primary-fixed/40 border border-primary-container/30 px-space-xs py-0.5 text-primary-container font-bold uppercase">
                        ● STATUS: PROVISIONING_READY
                    </span>
                    <div className="hidden lg:flex items-center gap-space-xs text-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
                        <span>GRID_SYNCHRONIZED</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientOnboardingHeader;
