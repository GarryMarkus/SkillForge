import React, { useEffect, useRef } from 'react';

/**
 * CadGridBackground - High-precision CAD blueprint drafting canvas.
 * Renders an interactive radial spotlight grid with fine hairline divisions (#ffffff0a),
 * registration crosshairs (+), and hardware-accelerated cursor illumination.
 */
const CadGridBackground = ({
    gridSize = 36,
    crosshairSize = 6,
    gridColor = 'rgba(255, 255, 255, 0.04)',
    crosshairColor = 'rgba(255, 255, 255, 0.12)',
    spotlightColor = 'rgba(0, 240, 255, 0.12)',
    spotlightCrosshairColor = '#00F0FF',
    spotlightRadius = 180,
    showRegistrationMarks = true,
    interactive = true,
    className = '',
    children,
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
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
            const radiusSq = spotlightRadius * spotlightRadius;

            // 1. Draw radial cursor illumination glow behind the grid
            if (mouse.active && mouse.x >= 0 && mouse.y >= 0) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, spotlightRadius
                );
                gradient.addColorStop(0, spotlightColor);
                gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.04)');
                gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            // 2. Draw high-precision hairline grid
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

            // 3. Draw intersection registration crosshairs (+)
            for (let x = 0; x <= width; x += gridSize) {
                for (let y = 0; y <= height; y += gridSize) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const distSq = dx * dx + dy * dy;

                    const isNear = mouse.active && distSq < radiusSq;
                    const proximityFactor = isNear ? 1 - Math.sqrt(distSq) / spotlightRadius : 0;

                    // Draw (+) crosshair
                    ctx.beginPath();
                    if (isNear && proximityFactor > 0.1) {
                        ctx.strokeStyle = spotlightCrosshairColor;
                        ctx.lineWidth = 1.5;
                        ctx.globalAlpha = Math.min(1, 0.3 + proximityFactor * 0.7);
                    } else {
                        ctx.strokeStyle = crosshairColor;
                        ctx.lineWidth = 1;
                        ctx.globalAlpha = 0.6;
                    }

                    // Horizontal arm
                    ctx.moveTo(x - crosshairSize + 0.5, y + 0.5);
                    ctx.lineTo(x + crosshairSize + 0.5, y + 0.5);
                    // Vertical arm
                    ctx.moveTo(x + 0.5, y - crosshairSize + 0.5);
                    ctx.lineTo(x + 0.5, y + crosshairSize + 0.5);
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            }

            ctx.restore();
        };

        const renderLoop = () => {
            const mouse = mouseRef.current;
            const dx = mouse.targetX - mouse.x;
            const dy = mouse.targetY - mouse.y;

            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
                mouse.x += dx * 0.22;
                mouse.y += dy * 0.22;
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

        const parent = containerRef.current || canvas.parentElement;
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
    }, [gridSize, crosshairSize, gridColor, crosshairColor, spotlightColor, spotlightCrosshairColor, spotlightRadius, interactive]);

    return (
        <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 z-0 block w-full h-full select-none"
                aria-hidden="true"
            />
            {/* Corner Architectural Registration Crosshairs */}
            {showRegistrationMarks && (
                <>
                    <div className="pointer-events-none absolute top-4 left-4 z-10 text-cyan-500/40 font-mono text-[10px] tracking-widest select-none">
                        + [00,00] CAD_SYS
                    </div>
                    <div className="pointer-events-none absolute top-4 right-4 z-10 text-cyan-500/40 font-mono text-[10px] tracking-widest select-none">
                        [100,00] +
                    </div>
                    <div className="pointer-events-none absolute bottom-4 left-4 z-10 text-cyan-500/30 font-mono text-[10px] tracking-widest select-none">
                        + [00,100]
                    </div>
                    <div className="pointer-events-none absolute bottom-4 right-4 z-10 text-cyan-500/30 font-mono text-[10px] tracking-widest select-none">
                        [100,100] +
                    </div>
                </>
            )}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

export default CadGridBackground;
