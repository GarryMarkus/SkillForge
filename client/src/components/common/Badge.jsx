import React from 'react';

const variants = {
    default: 'text-zinc-300 border-white/[0.08] bg-white/[0.04]',
    primary: 'text-[#f5f5f5] border-white/15 bg-white/[0.06]',
    success: 'text-[#d4d4d4] border-white/15 bg-white/[0.04]',
    warning: 'text-[#a3a3a3] border-white/10 bg-white/[0.02]',
    error: 'text-[#d4d4d4] border-white/20 bg-white/[0.04]',
};

const sizes = {
    sm: 'text-[10px] px-1.5 py-0.25',
    md: 'text-xs px-2 py-0.5',
};

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    dot = false,
    className = '',
}) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 font-mono tracking-tight rounded-sm border ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
        >
            {dot && (
                <span className="w-1 h-1 rounded-full bg-[#888888]" />
            )}
            {children}
        </span>
    );
};

export default Badge;
