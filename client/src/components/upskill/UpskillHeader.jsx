import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpskillHeader = ({
    moduleRef = 'CURR-04',
    moduleTopic = 'ORCHESTRATION',
    isCompleted = false
}) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-black/15 select-none font-mono" id="UpskillHeader">
            <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-canvas-blueprint font-bold text-base">+</span>
                    <span className="text-sm sm:text-base font-bold text-ink-primary uppercase tracking-tight truncate">
                        SKILLFORGE // ADAPTIVE CURRICULUM READER
                    </span>
                    <span className="border border-black/15 bg-surface-container-low px-2 py-0.5 text-xs font-bold text-canvas-blueprint uppercase hidden md:inline-block">
                        [ SYSTEM STATUS: ACTIVE ]
                    </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden lg:flex items-center gap-2 border-r border-black/15 pr-4 text-xs font-bold">
                        <span className="text-outline uppercase">MODULE:</span>
                        <span className="text-canvas-blueprint">
                            [ {moduleRef} // {moduleTopic?.toUpperCase() || 'CURRICULUM'} ]
                        </span>
                        <span className={`px-1.5 py-0.5 border text-[11px] uppercase ml-1 ${
                            isCompleted
                                ? 'bg-blue-50 border-canvas-blueprint text-canvas-blueprint'
                                : 'bg-surface border-black/15 text-outline'
                        }`}>
                            {isCompleted ? 'COMPLETED' : 'IN TRAINING'}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="border border-black/25 bg-surface-container-lowest px-3 py-1.5 text-xs text-ink-primary uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold flex items-center gap-1"
                    >
                        <span>[ ← RETURN TO DASHBOARD ]</span>
                    </button>
                    <div className="w-8 h-8 bg-canvas-blueprint flex items-center justify-center shrink-0 text-white font-bold text-xs">
                        U
                    </div>
                </div>
            </div>
        </header>
    );
};

export default UpskillHeader;
