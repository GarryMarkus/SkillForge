import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../layout/Layout';

const Button = ({ children, className, variant = 'primary', onClick, ...props }) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-black text-lg rounded-full transition-transform active:translate-y-[2px] active:shadow-none border-light-border dark:border-black border-2 border-b-4";

    const variants = {
        primary: "bg-yellow-400 text-light-border hover:bg-yellow-300",
        secondary: "bg-white text-light-border hover:bg-gray-50 border-gray-300",
        dark: "bg-dark-card text-white border-gray-700 hover:bg-gray-800",
        accent: "bg-green-400 text-light-border hover:bg-green-300",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
