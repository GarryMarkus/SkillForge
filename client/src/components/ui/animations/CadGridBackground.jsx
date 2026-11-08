import React from 'react';

/**
 * CadGridBackground - High-performance, static enterprise background canvas.
 * Powered by pure CSS hardware-accelerated radial dot/grid pattern with zero CPU/JS overhead,
 * zero unthrottled mouse-tracking listeners, and zero composite layer thrashing.
 */
const CadGridBackground = ({
    className = '',
    children,
}) => {
    return (
        <div className={`relative w-full overflow-hidden bg-[#09090B] ${className}`}>
            {/* Pure CSS hardware-accelerated subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] [transform:translateZ(0)]"
                aria-hidden="true"
            />
            {/* Soft, static top radial ambient gradient (Vercel/Linear style) */}
            <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/[0.04] to-transparent rounded-full blur-3xl [transform:translateZ(0)]"
                aria-hidden="true"
            />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

export default CadGridBackground;
