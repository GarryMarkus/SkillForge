import React from 'react';

const ClientFooter = () => {
    return (
        <div className="w-full flex flex-col select-none">
            {/* Technical CAD Ground / Coordinates Information Strip */}
            <section className="w-full border border-black/20 bg-surface-container-lowest p-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                <div className="flex items-center gap-space-md flex-wrap">
                    <span className="text-primary-container font-bold">[CAD_COORDINATES]</span>
                    <span className="font-mono text-on-surface">[X: +42.109 // Y: -11.002 // GRID: 1px_ORTHO]</span>
                    <span className="text-black/30">|</span>
                    <span>SECURITY_SIGNATURE: SHA256:7c8b2a1e94d0..</span>
                </div>
                <div className="flex items-center gap-space-sm">
                    <span className="border border-black/15 bg-surface-container px-space-xs py-0.5 text-on-surface font-bold">
                        SKILLFORGE ENTERPRISE TALENT ACQUISITION ENGINE v4.9
                    </span>
                </div>
            </section>

            {/* Base Footer Ribbon */}
            <footer className="w-full bg-surface-container-lowest border-t border-black/15 py-space-sm">
                <div className="w-full px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
                    <div>
                        <span className="text-primary-container font-bold">+</span> SYSTEM METADATA: SPEC_REV: 04.912{' '}
                        <span className="text-black/30">|</span> ENCRYPTION: AES-256-GCM{' '}
                        <span className="text-black/30">|</span> AUTONOMOUS TALENT REQUISITION ENGINE &copy; {new Date().getFullYear()}
                    </div>
                    <div className="flex items-center gap-space-md">
                        <span className="text-secondary font-bold">STATUS: NOMINAL</span>
                        <span className="border border-black/15 px-space-xs py-0.5 text-on-surface font-bold">
                            CAD_SYS_ID: #SF-REC-9002
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientFooter;
