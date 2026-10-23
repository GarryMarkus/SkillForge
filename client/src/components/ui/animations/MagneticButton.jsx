import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton - Tactile micro-interaction that gently pulls toward
 * the pointer coordinates within a small radius, snapping back on exit.
 */
const MagneticButton = ({
    children,
    className = '',
    strength = 0.25,
    maxDisplacement = 8,
    onClick,
    disabled = false,
    ...props
}) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Mechanical damped spring
    const springConfig = { damping: 18, stiffness: 250, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handlePointerMove = (e) => {
        if (disabled || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        // Clamp displacement within [-maxDisplacement, maxDisplacement]
        const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
        const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

        x.set(clampedX);
        y.set(clampedY);
    };

    const handlePointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ x: springX, y: springY }}
            onClick={onClick}
            className={`inline-block ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
