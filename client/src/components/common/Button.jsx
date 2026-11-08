import React from 'react';

const variants = {
    primary: 'bg-[#111113] hover:bg-[#1a1a1d] text-[#f5f5f5] border border-white/10 focus:border-white/30',
    secondary: 'bg-transparent text-[#888888] hover:text-[#f5f5f5] border border-transparent hover:border-white/10',
    accent: 'bg-white text-black hover:bg-[#ededed] border border-white focus:border-white/40',
    outline: 'bg-transparent text-[#cccccc] hover:text-white border border-white/10 hover:border-white/20',
    ghost: 'bg-transparent text-[#888888] hover:text-[#f5f5f5] border border-transparent',
    danger: 'bg-transparent text-[#888888] hover:text-white border border-white/10 hover:border-white/30',
};

const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-4 py-2 rounded-md gap-2',
    lg: 'text-base px-5 py-2.5 rounded-md gap-2.5',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    icon,
    external = false,
    type = 'button',
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`inline-flex items-center justify-center font-mono tracking-tight transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            <span>{children}</span>
            {external && <span className="text-xs text-[#888888] ml-0.5">↗</span>}
        </button>
    );
};

export default Button;
