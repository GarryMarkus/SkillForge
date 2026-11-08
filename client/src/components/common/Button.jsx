import React from 'react';

const variants = {
    primary: 'bg-white text-zinc-950 hover:bg-zinc-100 active:bg-zinc-200 font-semibold shadow-sm focus:ring-zinc-400',
    secondary: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white border border-zinc-700/80 font-medium focus:ring-zinc-600',
    accent: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 font-medium shadow-sm focus:ring-blue-400',
    outline: 'bg-transparent text-zinc-300 hover:text-white border border-zinc-700/80 hover:bg-zinc-800/60 font-medium focus:ring-zinc-600',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/60 font-medium focus:ring-zinc-600',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 font-medium focus:ring-rose-500',
};

const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    icon,
    type = 'button',
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`inline-flex items-center justify-center font-sans transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
