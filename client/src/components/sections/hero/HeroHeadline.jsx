import React from 'react';

/**
 * HeroHeadline
 * Modular typography primitive featuring Courier Prime display titles
 * and Consolas monospace metadata.
 */
const HeroHeadline = () => {
    return (
        <div className="space-y-4">
            {/* Monospace Kicker */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-wider text-[#737373] uppercase">
                    Empirical Skill Verification Protocol
                </span>
            </div>

            {/* Display Title in Courier Prime */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]">
                <span className="block text-[#f5f5f5]">SkillForge</span>
                <span className="block text-[#737373]">Verifies Competence</span>
            </h1>

            {/* Description Paragraph in Consolas */}
            <p className="text-sm sm:text-base font-mono text-[#8a8a8e] max-w-xl leading-relaxed">
                Objective technical evaluation without resume inflation. Direct code analysis, sandboxed execution, and verified skill dossiers engineered for high-signal engineering teams.
            </p>
        </div>
    );
};

export default HeroHeadline;
