import React from 'react';
import { cn } from '../layout/Layout';
import { motion } from 'framer-motion';

const Badge = ({ children, className, color = "bg-blue-300", rotate = "-rotate-2" }) => {
    return (
        <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1, rotate: parseInt(rotate.replace('rotate-', '')) || -2 }}
            viewport={{ once: true }}
            className={cn(
                "inline-block px-3 py-1 font-script text-xl text-light-border border-2 border-light-border rounded-lg shadow-sm mx-1",
                color,
                rotate,
                className
            )}
        >
            {children}
        </motion.span>
    );
};

export default Badge;
