import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-4 sm:p-5 border-b border-white/[0.06] ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '', ...props }) => {
    return (
        <h3 className={`font-mono font-bold text-white text-base tracking-tight ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const CardDescription = ({ children, className = '', ...props }) => {
    return (
        <p className={`text-xs text-[#888888] mt-1 leading-relaxed ${className}`} {...props}>
            {children}
        </p>
    );
};

export const CardContent = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-4 sm:p-5 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-4 sm:p-5 border-t border-white/[0.06] flex items-center justify-between ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
