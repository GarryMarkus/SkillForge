import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../layout/Layout';

const Card = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn(
                "relative rounded-4xl border-2 border-light-border dark:border-gray-700 bg-light-card dark:bg-dark-card overflow-hidden shadow-xl",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default Card;
