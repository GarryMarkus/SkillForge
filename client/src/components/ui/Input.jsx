import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '../layout/Layout';

const Input = ({
    label,
    type = "text",
    icon: Icon,
    error,
    success,
    className,
    ...props
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className={cn("relative group w-full", className)}>
            <div className={cn(
                "relative flex items-center w-full rounded-xl border-2 transition-all duration-300 bg-white dark:bg-black overflow-hidden",
                error ? "border-red-500 bg-red-50/10" :
                    success ? "border-green-500 bg-green-50/10" :
                        focused ? "border-blue-500 shadow-[0px_4px_12px_rgba(59,130,246,0.2)]" :
                            "border-gray-200 dark:border-gray-800"
            )}>
                {/* Icon */}
                {Icon && (
                    <div className="pl-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                {/* Input Field */}
                <input
                    {...props}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    onFocus={(e) => {
                        setFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur?.(e);
                    }}
                    className={cn(
                        "w-full px-4 py-4 bg-transparent outline-none text-black dark:text-white placeholder-transparent font-medium",
                        !Icon && "pl-4"
                    )}
                    placeholder={label}
                    id={props.name}
                />

                {/* Floating Label */}
                <label
                    htmlFor={props.name}
                    className={cn(
                        "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 font-medium",
                        Icon ? "left-11" : "left-4",
                        (focused || props.value) ? "text-xs -translate-y-[120%] top-3 md:top-3.5 opacity-0 md:opacity-100 hidden" : "text-base top-3.5"
                    )}
                >
                    {label}
                </label>

                {/* Floating Label for Focused State (Always Visible) */}
                {(focused || props.value) && (
                    <span className={cn(
                        "absolute top-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 transition-all",
                        Icon ? "left-11" : "left-4"
                    )}>
                        {label}
                    </span>
                )}

                {/* Password Toggle or Validation Icon */}
                <div className="pr-4 flex items-center gap-2">
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <X className="w-5 h-5 text-red-500" />
                            </motion.div>
                        )}
                        {success && !error && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check className="w-5 h-5 text-green-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="text-red-500 text-xs font-semibold mt-1 ml-1 overflow-hidden"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;
