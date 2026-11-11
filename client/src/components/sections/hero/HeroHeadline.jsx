import React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import RotatingText from '../../ui/animations/RotatingText';

/**
 * HeroHeadline
 * Modular typography primitive featuring Courier Prime display titles,
 * subtle hairline-accented RotatingText, and Consolas metadata.
 */
const HeroHeadline = () => {
    return (
        <LayoutGroup id="hero-headline-layout">
            <div>
                {/* Tightly anchored editorial kicker */}
                <div className="mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a8e]">
                        Empirical Skill Verification Protocol
                    </span>
                </div>

                {/* Display Title in Courier Prime */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.18] mb-4">
                    <span className="block text-[#FFFFFF] font-bold">SkillForge</span>
                    <motion.span
                        layout
                        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                        className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-1 sm:mt-1.5"
                    >
                        <motion.span
                            layout
                            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                            className="inline-block font-normal text-[#737373] border-b border-transparent pb-0.5"
                        >
                            Verifies
                        </motion.span>
                        <RotatingText
                            texts={['Execution', 'Competence', 'Code Quality', 'System Design']}
                            mainClassName="text-[#F5F5F5] font-semibold font-display border-b border-white/30 pb-0.5 inline-flex items-center overflow-hidden"
                            staggerDuration={0.025}
                            staggerFrom="first"
                            rotationInterval={2800}
                            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                            highlight={false}
                            highlightColor=""
                        />
                    </motion.span>
                </h1>

                {/* Description Paragraph in Consolas */}
                <p className="text-base md:text-lg font-mono text-[#888888] max-w-xl leading-relaxed">
                    Objective technical evaluation without resume inflation. Direct code analysis, sandboxed execution, and verified skill dossiers engineered for high-signal engineering teams.
                </p>
            </div>
        </LayoutGroup>
    );
};

export default HeroHeadline;
