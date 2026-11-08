import React from 'react';
import StudioNoise from '../../ui/animations/StudioNoise';
import HeroHeadline from './HeroHeadline';
import HeroActions from './HeroActions';
import HeroMetricsStrip from './HeroMetricsStrip';
import HeroDossierCard from './HeroDossierCard';

/**
 * HeroSection
 * Modular orchestration container featuring React Bits StudioNoise background
 * and an asymmetric two-column responsive layout.
 */
const HeroSection = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <section
            className="w-full relative font-mono p-6 sm:p-10 lg:p-12 rounded-md bg-[#080809] border border-white/[0.08] mb-12 select-none overflow-hidden"
            id="HeroSection"
        >
            {/* React Bits Studio Noise Background Texture */}
            <StudioNoise
                contrast={1.0}
                dust={0.1}
                scratches={0.25}
                opacity={0.22}
                fps={24}
                className="z-0"
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col gap-8">
                {/* Super-header / Kicker Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="text-xs text-[#8a8a8e] font-display uppercase tracking-widest">
                        Empirical Skill Verification Protocol
                    </span>
                    <span className="text-xs text-[#555555] font-mono hidden sm:inline-block">
                        Status: Active
                    </span>
                </div>

                {/* Two-Column Asymmetric Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column (58% / 7 Cols): Headline, Actions, Telemetry Metrics */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        <HeroHeadline />

                        <HeroActions
                            onStartAssessment={onStartAssessment}
                            onPostRequisition={onPostRequisition}
                        />

                        <HeroMetricsStrip />
                    </div>

                    {/* Right Column (42% / 5 Cols): Candidate Dossier Card */}
                    <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                        <HeroDossierCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
