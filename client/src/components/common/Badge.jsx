import React from 'react';

const variants = {
    default: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
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
            className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full ${
                        variant === 'success'
                            ? 'bg-emerald-400'
                            : variant === 'primary'
                            ? 'bg-blue-400'
                            : variant === 'error'
                            ? 'bg-rose-400'
                            : variant === 'warning'
                            ? 'bg-amber-400'
                            : 'bg-zinc-400'
                    }`}
                />
            )}
            {children}
        </span>
    );
};

export default Badge;
