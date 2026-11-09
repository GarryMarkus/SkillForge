import React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import RotatingText from '../../ui/animations/RotatingText';

/**
 * HeroHeadline
 * Modular typography primitive featuring Courier Prime display titles,
 * React Bits RotatingText with smooth monochrome highlight pill resizing, and Consolas metadata.
 */
const HeroHeadline = () => {
    return (
        <LayoutGroup id="hero-headline-layout">
            <div className="space-y-4">
                {/* Display Title in Courier Prime */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.18]">
                    <span className="block text-[#f5f5f5]">SkillForge</span>
                    <motion.span
                        layout
                        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                        className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[#737373] mt-1.5 sm:mt-2"
                    >
                        <motion.span
                            layout
                            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                            className="inline-block"
                        >
                            Verifies
                        </motion.span>
                        <RotatingText
                            texts={['Competence', 'Code Quality', 'Execution', 'System Design']}
                            mainClassName="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white text-[#050505] rounded-sm font-display font-bold inline-flex items-center overflow-hidden selection:bg-[#050505] selection:text-white"
                            staggerDuration={0.025}
                            staggerFrom="first"
                            rotationInterval={2800}
                            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                            highlight={true}
                            highlightColor="#ffffff"
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
