import React, { useEffect, useRef } from 'react';

/**
 * CadGridBackground - Architectural blueprint drafting grid with crosshairs (+)
 * and subtle cobalt cursor proximity illumination.
 */
const CadGridBackground = ({
    gridSize = 36,
    crosshairSize = 5,
    gridColor = 'rgba(0, 0, 0, 0.06)',
    crosshairColor = 'rgba(0, 0, 0, 0.18)',
    proximityColor = 'rgba(29, 82, 184, 0.15)',
    proximityCrosshairColor = '#1D52B8',
    proximityRadius = 140,
    interactive = true,
    className = '',
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = window.devicePixelRatio || 1;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            draw();
        };

        const draw = () => {
            if (!ctx || width === 0 || height === 0) return;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            const mouse = mouseRef.current;
            const radiusSq = proximityRadius * proximityRadius;

            // 1. Draw hairline grid lines
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, height);
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(width, y + 0.5);
            }
            ctx.stroke();

            // 2. Draw intersection crosshairs (+) and proximity reaction
            for (let x = 0; x <= width; x += gridSize) {
                for (let y = 0; y <= height; y += gridSize) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const distSq = dx * dx + dy * dy;

                    const isNear = mouse.active && distSq < radiusSq;
                    const proximityFactor = isNear ? 1 - Math.sqrt(distSq) / proximityRadius : 0;

                    // If within proximity radius, draw faint cell highlight
                    if (isNear && proximityFactor > 0.05) {
                        ctx.fillStyle = proximityColor;
                        ctx.globalAlpha = proximityFactor * 0.45;
                        ctx.fillRect(x - gridSize / 2, y - gridSize / 2, gridSize, gridSize);
                        ctx.globalAlpha = 1.0;
                    }

                    // Draw (+) crosshair
                    ctx.beginPath();
                    if (isNear && proximityFactor > 0.1) {
                        ctx.strokeStyle = proximityCrosshairColor;
                        ctx.lineWidth = 1.5;
                    } else {
                        ctx.strokeStyle = crosshairColor;
                        ctx.lineWidth = 1;
                    }

                    // Horizontal arm
                    ctx.moveTo(x - crosshairSize + 0.5, y + 0.5);
                    ctx.lineTo(x + crosshairSize + 0.5, y + 0.5);
                    // Vertical arm
                    ctx.moveTo(x + 0.5, y - crosshairSize + 0.5);
                    ctx.lineTo(x + 0.5, y + crosshairSize + 0.5);
                    ctx.stroke();
                }
            }

            ctx.restore();
        };

        const renderLoop = () => {
            const mouse = mouseRef.current;
            // Smooth cursor interpolation
            const dx = mouse.targetX - mouse.x;
            const dy = mouse.targetY - mouse.y;

            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
                mouse.x += dx * 0.25;
                mouse.y += dy * 0.25;
                draw();
                rafRef.current = requestAnimationFrame(renderLoop);
            } else {
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
                draw();
                rafRef.current = null;
            }
        };

        const scheduleRender = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(renderLoop);
            }
        };

        const handlePointerMove = (e) => {
            if (!interactive) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.targetX = e.clientX - rect.left;
            mouseRef.current.targetY = e.clientY - rect.top;
            mouseRef.current.active = true;
            scheduleRender();
        };

        const handlePointerLeave = () => {
            if (!interactive) return;
            mouseRef.current.targetX = -1000;
            mouseRef.current.targetY = -1000;
            mouseRef.current.active = false;
            scheduleRender();
        };

        resize();
        window.addEventListener('resize', resize);

        const parent = canvas.parentElement;
        if (interactive && parent) {
            parent.addEventListener('pointermove', handlePointerMove, { passive: true });
            parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });
        }

        return () => {
            window.removeEventListener('resize', resize);
            if (parent) {
                parent.removeEventListener('pointermove', handlePointerMove);
                parent.removeEventListener('pointerleave', handlePointerLeave);
            }
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [gridSize, crosshairSize, gridColor, crosshairColor, proximityColor, proximityCrosshairColor, proximityRadius, interactive]);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute inset-0 z-0 block w-full h-full select-none ${className}`}
            aria-hidden="true"
        />
    );
};

export default CadGridBackground;
