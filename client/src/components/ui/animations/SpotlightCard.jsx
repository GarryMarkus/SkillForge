import React, { useRef } from 'react';

/**
 * SpotlightCard - Minimalist monochrome card with subtle white boundary sheen.
 * Uses direct DOM CSS variables for zero React state re-renders during mouse tracking.
 */
const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.03)',
    borderColor = 'rgba(255, 255, 255, 0.15)',
    size = 400,
    chamfered = false,
    bgClassName = 'bg-[#0b0b0c]',
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
            className={`group relative overflow-hidden border border-white/10 ${bgClassName} transition-colors duration-150 ${chamfered ? 'clip-chamfer' : 'rounded-md'} ${className}`}
            style={{
                '--mouse-x': '-1000px',
                '--mouse-y': '-1000px',
                '--spotlight-opacity': '0',
            }}
            {...props}
        >
            {/* Subtle monochrome surface wash */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-200 ease-out z-0 opacity-[var(--spotlight-opacity)]"
                style={{
                    background: `radial-gradient(${size}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 70%)`,
                }}
                aria-hidden="true"
            />

            {/* Subtle monochrome border highlight */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-200 ease-out z-0 rounded-[inherit] opacity-[var(--spotlight-opacity)]"
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
            <div className="relative z-10 w-full h-full font-mono">
                {children}
            </div>
        </Component>
    );
};

export default SpotlightCard;
