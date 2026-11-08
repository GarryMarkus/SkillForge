import React, { useRef } from 'react';

/**
 * SpotlightCard - High-performance hardware-accelerated spotlight card.
 * Uses direct DOM CSS variable manipulation for zero React state re-renders during mouse tracking,
 * zero layout thrashing, and crisp Enterprise Dark styling.
 */
const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(59, 130, 246, 0.08)',
    borderColor = 'rgba(59, 130, 246, 0.25)',
    size = 400,
    chamfered = false,
    bgClassName = 'bg-[#121318]',
    as: Component = 'div',
    ...props
}) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseEnter = () => {
        const el = cardRef.current;
        if (el) el.style.setProperty('--spotlight-opacity', '1');
    };

    const handleMouseLeave = () => {
        const el = cardRef.current;
        if (el) el.style.setProperty('--spotlight-opacity', '0');
    };

    return (
        <Component
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden border border-white/[0.08] ${bgClassName} transition-colors duration-200 ${chamfered ? 'clip-chamfer' : 'rounded-2xl'} ${className}`}
            style={{
                '--mouse-x': '-1000px',
                '--mouse-y': '-1000px',
                '--spotlight-opacity': '0',
            }}
            {...props}
        >
            {/* Direct GPU-accelerated spotlight glow */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0 opacity-[var(--spotlight-opacity)]"
                style={{
                    background: `radial-gradient(${size}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 70%)`,
                }}
                aria-hidden="true"
            />

            {/* Direct GPU-accelerated border sheen */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0 rounded-[inherit] opacity-[var(--spotlight-opacity)]"
                style={{
                    background: `radial-gradient(${size * 0.65}px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 60%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </Component>
    );
};

export default SpotlightCard;
