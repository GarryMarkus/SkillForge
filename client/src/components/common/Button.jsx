import React from 'react';

const variants = {
    primary: 'bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white border border-transparent focus:border-white/40',
    secondary: 'bg-[#121316] text-[#E4E4E7] border border-white/10 hover:border-white/20',
    accent: 'bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white border border-transparent focus:border-white/40',
    outline: 'bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20',
    ghost: 'bg-transparent text-[#888888] hover:text-white hover:underline underline-offset-4 border border-transparent',
    danger: 'bg-[#121316] text-[#888888] hover:text-white border border-white/10 hover:border-white/30',
};

const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 rounded-sm gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 rounded-sm gap-2.5',
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
