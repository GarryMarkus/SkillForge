import React from 'react';

/**
 * BrandLogo - Renders the exact SkillForge emblem image used as the site favicon
 * (`apple-touch-icon.png` / `favicon-32x32.png`) so website headers and the
 * browser tab icon stay visually identical across every page.
 */
const BrandLogo = ({ className = 'w-7 h-7', alt = '' }) => (
    <img
        src="/apple-touch-icon.png?v=4"
        alt={alt}
        aria-hidden={alt === '' ? 'true' : undefined}
        draggable={false}
        className={`block ${className} object-contain shrink-0 select-none`.trim()}
    />
);

export default BrandLogo;
