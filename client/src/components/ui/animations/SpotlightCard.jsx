import React, { useRef, useState } from 'react';

/**
 * SpotlightCard - React Bits-style interactive mouse-following radial border sheen card.
 * Dynamically tracks mouse coordinates to cast a high-precision radial beam along the border
 * and a subtle ambient glow over dark obsidian glass.
 */
const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(0, 240, 255, 0.15)',
    borderColor = 'rgba(0, 240, 255, 0.45)',
    size = 400,
    chamfered = false,
    bgClassName = 'bg-[#0C0E14]/90',
    as: Component = 'div',
    ...props
}) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setMousePos({ x: -1000, y: -1000 });
    };

    const chamferClass = chamfered
        ? 'clip-chamfer'
        : 'rounded-2xl';

    return (
        <Component
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden border border-white/[0.08] ${bgClassName} backdrop-blur-xl transition-all duration-300 ${chamferClass} ${className}`}
            style={{
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`,
            }}
            {...props}
        >
            {/* Interactive Radial Spotlight Inner Glow */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0"
                style={{
                    opacity,
                    background: `radial-gradient(${size}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
                }}
                aria-hidden="true"
            />

            {/* Interactive Radial Border Sheen Glow */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-0 rounded-[inherit]"
                style={{
                    opacity,
                    background: `radial-gradient(${size * 0.65}px circle at ${mousePos.x}px ${mousePos.y}px, ${borderColor}, transparent 60%)`,
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
