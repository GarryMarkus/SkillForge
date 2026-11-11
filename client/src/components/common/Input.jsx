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
        <div className={`flex flex-col gap-1.5 font-mono ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs text-[#888888] font-normal"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={`w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/10 text-xs sm:text-sm text-[#f5f5f5] placeholder-[#555555] focus:outline-none focus:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${
                    error ? 'border-white/40' : ''
                } ${className}`}
                {...props}
            />
            {error ? (
                <span className="text-xs text-[#a3a3a3] mt-0.5">{error}</span>
            ) : helperText ? (
                <span className="text-xs text-[#666666] mt-0.5">{helperText}</span>
            ) : null}
        </div>
    );
};

export default Input;
