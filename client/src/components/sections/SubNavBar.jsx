import React from 'react';

const SubNavBar = () => {
    return (
        <section className="w-full border-b border-cad bg-surface-container-lowest font-mono py-space-sm px-margin mb-space-md" id="SubNav">
            <div className="flex flex-wrap items-center justify-between gap-space-sm text-label-md font-label-md">
                <div className="flex items-center gap-space-sm">
                    <span className="w-2 h-2 bg-canvas-blueprint inline-block"></span>
                    <span className="text-canvas-blueprint font-bold tracking-wider">[SYS_TARGET: TALENT_ENGINE_DEPLOY]</span>
                    <span className="text-outline">::</span>
                    <span className="text-on-surface-variant">LOC: 0x48.213 / PROTOCOL: HTTPS-TLS1.3</span>
                </div>
                <div className="flex items-center gap-space-md">
                    <span className="bg-surface-container-high px-space-xs py-0.5 border border-cad text-label-sm font-label-sm text-ink-primary">
                        NODE: REGIONAL_US_EAST
                    </span>
                    <span className="text-label-sm font-label-sm text-canvas-blueprint font-bold">
                        [ENGINE_STATUS: SYNCHRONIZED]
                    </span>
                </div>
            </div>
        </section>
    );
};

export default SubNavBar;
