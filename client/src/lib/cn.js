import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge multiple Tailwind and conditional class names safely.
 * Combines clsx for conditional objects/arrays and tailwind-merge to resolve conflicts.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default cn;
