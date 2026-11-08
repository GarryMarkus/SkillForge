import React from 'react';

/**
 * HeroActions
 * Modular action button controls with understated monochrome styling
 * and natural ↗ action markers.
 */
const HeroActions = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
            {/* Primary Action Button */}
            <button
                type="button"
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2 border border-white/15 bg-[#121215] text-[#f5f5f5] hover:bg-[#1a1a1e] hover:border-white/25 px-5 py-2.5 rounded-sm transition-colors text-xs sm:text-sm cursor-pointer shadow-sm"
            >
                <span>Start Free Assessment</span>
                <span className="text-[#888888]">↗</span>
            </button>

            {/* Secondary Action Button */}
            <button
                type="button"
                onClick={onPostRequisition}
                className="inline-flex items-center gap-2 border border-white/10 bg-transparent text-[#cccccc] hover:text-white hover:border-white/20 hover:bg-white/[0.03] px-5 py-2.5 rounded-sm transition-colors text-xs sm:text-sm cursor-pointer"
            >
                <span>Hire Verified Talent</span>
                <span className="text-[#737373]">↗</span>
            </button>

            {/* Tertiary Link */}
            <a
                href="#CapabilitiesRow"
                className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#f5f5f5] px-3 py-2 transition-colors cursor-pointer"
            >
                <span>Read Protocol</span>
                <span className="text-[#555555]">↗</span>
            </a>
        </div>
    );
};

export default HeroActions;
