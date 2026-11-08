import React from 'react';

/**
 * ShinyText - Renders text with a continuous metallic shimmer sheen
 * that sweeps across the characters.
 */
const ShinyText = ({
    text,
    children,
    disabled = false,
    speed = 4,
    className = '',
    color = '#F8FAFC',
    shineColor = '#00F0FF',
}) => {
    const content = text || children;

    if (disabled) {
        return <span className={className}>{content}</span>;
    }

    return (
        <span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(110deg, #94A3B8 20%, ${color} 45%, ${shineColor} 50%, ${color} 55%, #94A3B8 80%)`,
                backgroundSize: '200% 100%',
                animation: `shiny-sweep ${speed}s linear infinite`,
            }}
        >
            <style>{`
                @keyframes shiny-sweep {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
            {content}
        </span>
    );
};

export default ShinyText;
