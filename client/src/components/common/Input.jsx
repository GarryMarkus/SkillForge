import React from 'react';

const Input = ({
    label,
    error,
    helperText,
    type = 'text',
    className = '',
    containerClassName = '',
    id,
    ...props
}) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs sm:text-sm font-medium text-zinc-300"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                    error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500' : ''
                } ${className}`}
                {...props}
            />
            {error ? (
                <span className="text-xs text-rose-400 mt-0.5">{error}</span>
            ) : helperText ? (
                <span className="text-xs text-zinc-400 mt-0.5">{helperText}</span>
            ) : null}
        </div>
    );
};

export default Input;
