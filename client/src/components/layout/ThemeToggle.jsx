import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './Layout';

const ThemeToggle = ({ className }) => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={cn(
                "p-3 rounded-xl bg-blue-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer",
                className
            )}
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="w-6 h-6" />
            ) : (
                <Sun className="w-6 h-6" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
