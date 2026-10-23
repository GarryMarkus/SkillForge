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
    const gradientId = React.useId();

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
        >
            <svg
                className="w-full h-full block"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="60%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={borderWidth}
                    strokeLinecap="square"
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
