import React from 'react';

/**
 * ShinyText - Renders text with a subtle monochrome sweep.
 */
const ShinyText = ({
    text,
    children,
    disabled = false,
    speed = 5,
    className = '',
    color = '#EDEDED',
    shineColor = '#FFFFFF',
}) => {
    const content = text || children;

    if (disabled) {
        return <span className={className}>{content}</span>;
    }

    return (
        <span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(110deg, #737373 20%, ${color} 45%, ${shineColor} 50%, ${color} 55%, #737373 80%)`,
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
