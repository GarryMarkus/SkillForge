import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`rounded-xl bg-[#121318] border border-white/[0.08] shadow-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-5 sm:p-6 border-b border-white/[0.06] ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '', ...props }) => {
    return (
        <h3 className={`font-semibold text-white text-base sm:text-lg tracking-tight ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const CardDescription = ({ children, className = '', ...props }) => {
    return (
        <p className={`text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed ${className}`} {...props}>
            {children}
        </p>
    );
};

export const CardContent = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-5 sm:p-6 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className = '', ...props }) => {
    return (
        <div className={`p-4 sm:p-6 border-t border-white/[0.06] flex items-center justify-between ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
