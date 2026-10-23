import React from 'react';
import { motion } from 'framer-motion';

/**
 * BorderBeam - A single-pixel hairline beam of light traveling along
 * the perimeter of a container's 1px border.
 */
const BorderBeam = ({
    className = '',
    size = 25, // percentage of the perimeter (e.g. 25 = 25% beam length)
    duration = 6,
    delay = 0,
    color = '#1D52B8',
    secondaryColor = 'rgba(29, 82, 184, 0.0)',
    borderWidth = 1.5,
    reverse = false,
}) => {
    const rawId = React.useId();
    const cleanId = `beam-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
        >
            <svg
                className="w-full h-full block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={cleanId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="60%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="none"
                    stroke={`url(#${cleanId})`}
                    strokeWidth={borderWidth}
                    strokeLinecap="square"
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
