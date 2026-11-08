import React from 'react';
import { motion } from 'framer-motion';

/**
 * BorderBeam - A quiet, hairline monochrome beam segment
 * that travels around the perimeter of a container.
 */
const BorderBeam = ({
    className = '',
    size = 25, // percentage of the perimeter
    duration = 8,
    delay = 0,
    colorFrom = 'rgba(255, 255, 255, 0.4)',
    colorTo = 'rgba(255, 255, 255, 0)',
    borderWidth = 1,
    borderRadius = 6,
    reverse = false,
}) => {
    const rawId = React.useId();
    const cleanId = `beam-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] ${className}`}
        >
            <svg
                className="w-full h-full block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={cleanId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
                        <stop offset="60%" stopColor={colorTo} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.rect
                    x="0.75"
                    y="0.75"
                    width="98.5"
                    height="98.5"
                    rx={borderRadius ? 3.5 : 0}
                    ry={borderRadius ? 3.5 : 0}
                    fill="none"
                    stroke={`url(#${cleanId})`}
                    strokeWidth={borderWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={100}
                    strokeDasharray={`${size} ${100 - size}`}
                    initial={{ strokeDashoffset: reverse ? -100 : 0 }}
                    animate={{ strokeDashoffset: reverse ? 0 : -100 }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration,
                        delay,
                    }}
                />
            </svg>
        </div>
    );
};

export default BorderBeam;
