import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroActions
 * Modular action button controls establishing an intentional 3-tier monochrome CTA hierarchy:
 * Primary fill -> Secondary bordered -> Tertiary understated link.
 */
const HeroActions = ({ onStartAssessment, onPostRequisition }) => {
    return (
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 font-mono">
            {/* Tier 1: Primary High-Contrast Action */}
            <button
                type="button"
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2 bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white px-5 py-2.5 rounded-sm transition-colors text-xs sm:text-sm cursor-pointer"
            >
                <span>Start Free Assessment</span>
                <span aria-hidden="true">↗</span>
            </button>

            {/* Tier 2: Secondary Dark Surface Action */}
            <button
                type="button"
                onClick={onPostRequisition}
                className="inline-flex items-center gap-2 bg-[#121316] text-[#E4E4E7] border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-sm transition-colors text-xs sm:text-sm cursor-pointer"
            >
                <span>Hire Verified Talent</span>
                <span className="text-[#888888]" aria-hidden="true">↗</span>
            </button>

            {/* Tier 3: Minimal Text Link */}
            <Link
                to="/protocol"
                className="inline-flex items-center gap-1.5 text-[#888888] hover:text-[#FFFFFF] hover:underline underline-offset-4 text-sm px-2 py-2 transition-colors cursor-pointer"
            >
                <span>Read Protocol</span>
                <span aria-hidden="true">↗</span>
            </Link>
        </div>
    );
};

export default HeroActions;
