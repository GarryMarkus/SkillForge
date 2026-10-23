import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpskillHeader = ({
    moduleRef = 'CURR-04',
    moduleTopic = 'ORCHESTRATION',
    isCompleted = false
}) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none font-mono">
            {/* Top Minimalist Console Strip */}
            <div className="h-16 w-full px-margin flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-space-md">
                    <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                        <span className="text-primary-container font-bold">+</span>
                        <span className="font-bold">SKILLFORGE // ADAPTIVE_CURRICULUM_READER</span>
                    </div>
                    <span className="border border-black/15 bg-surface-container-low px-space-xs py-0.5 text-label-sm font-label-sm text-primary-container uppercase hidden md:inline-block font-bold">
                        [CURRICULUM_NODE: ACTIVE // 256-BIT_ENCRYPTION]
                    </span>
                </div>

                <div className="hidden xl:flex items-center gap-space-xs border border-black/15 bg-surface-container-lowest px-space-md py-space-xs text-label-md font-label-md text-on-surface-variant">
                    <span className="text-primary-container font-bold">LOC:</span>
                    <span>ROOT &gt; CANDIDATE_ENVIRONMENT &gt; ADAPTIVE_CURRICULUM</span>
                </div>

                <div className="flex items-center gap-space-md">
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="border border-black/25 bg-surface-container-lowest px-space-sm py-space-xs text-label-sm font-label-sm text-on-surface uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold flex items-center gap-1"
                    >
                        <span>[ &lt;- RETURN_TO_TELEMETRY_DASHBOARD ]</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                    </div>
                </div>
            </div>

            {/* Sub-Header Module Coordinate Strip */}
            <div className="h-10 w-full px-margin bg-surface-container flex items-center justify-between overflow-x-auto">
                <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant shrink-0">
                    <span className="text-primary-container font-bold">[COORD: X02-Y01]</span>
                    <span className="text-on-surface font-bold">
                        [ MODULE_REF: {moduleRef} // {moduleTopic?.toUpperCase() || 'ORCHESTRATION'} ]
                    </span>
                </div>

                <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                    <span className={`px-space-xs py-0.5 border font-bold uppercase ${
                        isCompleted
                            ? 'bg-primary-fixed/40 border-primary-container text-primary-container'
                            : 'bg-surface border-black/15 text-secondary'
                    }`}>
                        {isCompleted ? '● MODULE_STATUS: COMPLETED' : '■ MODULE_STATUS: IN_TRAINING'}
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

export default UpskillHeader;
