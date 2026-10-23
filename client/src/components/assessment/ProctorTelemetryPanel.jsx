import React from 'react';

const ProctorTelemetryPanel = ({
    faceDetected = true,
    riskScore = 5,
    tabSwitches = 0,
    audioSpikes = 0,
    headRotation = '1.4°',
    auditLogs = [],
    webcamNode = null
}) => {
    const riskPercentage = Math.round((riskScore / 50) * 10);
    const riskBars = "■".repeat(riskPercentage) + "░".repeat(Math.max(0, 10 - riskPercentage));

    return (
        <div className="flex flex-col gap-4 font-mono select-none" id="ProctorTelemetryPanel">
            {/* TOP BLUEPRINT SECURITY FEED (Cobalt Cad Box) */}
            <div className="bg-canvas-blueprint text-on-primary border border-primary p-4 shadow-[4px_4px_0px_#191C1D] relative">
                <span className="absolute top-1 left-1 font-label-sm text-label-sm text-on-primary/60">┌</span>
                <span className="absolute top-1 right-1 font-label-sm text-label-sm text-on-primary/60">┐</span>
                <span className="absolute bottom-1 left-1 font-label-sm text-label-sm text-on-primary/60">└</span>
                <span className="absolute bottom-1 right-1 font-label-sm text-label-sm text-on-primary/60">┘</span>

                <div className="flex items-center justify-between border-b border-on-primary/30 pb-2 mb-3">
                    <span className="font-label-sm text-label-sm tracking-wider font-bold uppercase text-on-primary">
                        [ HARDWARE_TELEMETRY // OPTICAL_FACE_VERIFICATION ]
                    </span>
                    <span className={`w-2 h-2 inline-block ${faceDetected ? 'bg-[#69db7c] animate-pulse' : 'bg-error'}`}></span>
                </div>

                {/* Live Camera Viewport / HUD */}
                <div className="relative w-full aspect-video bg-[#0E2C66] border border-on-primary/40 overflow-hidden flex items-center justify-center" id="proctor-optical-viewport">
                    {/* Embedded live camera video feed */}
                    {webcamNode && (
                        <div className="absolute inset-0 w-full h-full opacity-60">
                            {webcamNode}
                        </div>
                    )}

                    {/* CAD Crosshair Grid Background */}
                    <svg className="absolute inset-0 w-full h-full opacity-25 text-on-primary pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern height="24" id="grid-pattern" patternUnits="userSpaceOnUse" width="24">
                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="50%" x2="50%" y1="0" y2="100%"></line>
                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="0" x2="100%" y1="50%" y2="50%"></line>
                    </svg>

                    {/* CAD Scanning Line Effect */}
                    <div className="absolute inset-x-0 h-0.5 bg-[#69db7c]/80 shadow-[0_0_8px_#69db7c] animate-[bounce_3s_infinite] pointer-events-none"></div>

                    {/* Precision Crosshairs */}
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-on-primary/80 pointer-events-none">+ [00, 00]</div>
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-on-primary/80 pointer-events-none">+ [640, 00]</div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-on-primary/80 pointer-events-none">+ [00, 480]</div>
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono text-on-primary/80 pointer-events-none">+ [640, 480]</div>

                    {/* Face Wireframe Vector Simulation */}
                    <div className="relative w-28 h-36 border-2 border-[#69db7c] flex flex-col justify-between p-1 z-10 bg-[#69db7c]/5 pointer-events-none">
                        <div className="flex justify-between items-start">
                            <span className="text-[8px] font-mono bg-on-primary text-primary px-0.5 font-bold">[X:142 Y:088 W:120 H:150]</span>
                            <span className={`text-[8px] font-mono font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-error'}`}>
                                {faceDetected ? 'LOCKED' : 'SEARCHING'}
                            </span>
                        </div>
                        <div className="w-full h-16 flex items-center justify-center opacity-80">
                            <svg className="w-16 h-20 text-[#69db7c] stroke-current fill-none stroke-[1.2]" viewBox="0 0 100 120">
                                <ellipse cx="50" cy="55" rx="35" ry="45" strokeDasharray="2 2"></ellipse>
                                <circle cx="36" cy="46" r="3"></circle>
                                <circle cx="64" cy="46" r="3"></circle>
                                <line strokeWidth="0.5" x1="28" x2="72" y1="46" y2="46"></line>
                                <path d="M 50 48 L 47 64 L 53 64"></path>
                                <line x1="38" x2="62" y1="78" y2="78"></line>
                                <line stroke="#ff8787" strokeWidth="2" x1="50" x2="52" y1="52" y2="50"></line>
                            </svg>
                        </div>
                        <div className="text-[8px] font-mono text-right text-on-primary">
                            CONF: {faceDetected ? '98.2%' : '14.0%'}
                        </div>
                    </div>

                    <div className="absolute bottom-2 left-3 bg-[#001847]/80 px-2 py-0.5 border border-on-primary/30 text-[9px] font-mono pointer-events-none">
                        TARGET_HASH: CANDIDATE_094
                    </div>
                </div>

                {/* Camera Diagnostic Tag Stream */}
                <div className="mt-3 pt-2 border-t border-on-primary/20 space-y-1 font-label-sm text-label-sm text-on-primary">
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">OPTICAL_FEED:</span>
                        <span className="font-bold text-[#69db7c]">ACTIVE [64x48px_CANVAS]</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">FACE_DETECTED:</span>
                        <span className={`font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-error'}`}>
                            {faceDetected ? 'TRUE [CONFIDENCE: 98.2%]' : 'FALSE [SEARCHING]'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">SKIN_TONE_HEURISTIC:</span>
                        <span>STABLE</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">MULTIPLE_FACES:</span>
                        <span className="font-bold text-[#69db7c]">NONE</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">GAZE_VECTOR:</span>
                        <span>(0.02, -0.01) [NORMAL]</span>
                    </div>
                </div>
            </div>

            {/* ANTI-CHEAT HEURISTIC ENGINE STATUS CARD */}
            <div className="p-4 border border-on-surface/20 bg-surface-container-lowest shadow-[4px_4px_0px_#191C1D]">
                <div className="border-b border-on-surface/15 pb-2 flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold uppercase text-ink-primary">
                        [ PROCTOR_RISK_ACCUMULATOR ]
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">LIMIT: 50_PTS</span>
                </div>

                <div className="mt-3">
                    <div className="flex justify-between items-baseline font-label-md text-label-md">
                        <span className="text-on-surface-variant">CURRENT_RISK_SCORE:</span>
                        <span className={`font-headline-sm text-headline-sm font-bold ${riskScore > 30 ? 'text-error' : 'text-ink-primary'}`}>
                            [ {String(riskScore).padStart(2, '0')} / 50 ]
                        </span>
                    </div>

                    {/* ASCII Visual Gauge */}
                    <div className="mt-1.5 p-2 bg-surface-container border border-on-surface/20 font-headline-sm text-headline-sm tracking-widest text-canvas-blueprint flex items-center justify-between">
                        <span className="tracking-widest">[{riskBars}]</span>
                        <span className={`font-label-sm text-label-sm px-1.5 py-0.5 border font-bold ${
                            riskScore > 30
                                ? 'bg-error-container text-on-error-container border-error'
                                : 'bg-surface-container-lowest border-primary text-canvas-blueprint'
                        }`}>
                            STATUS: {riskScore > 30 ? 'CRITICAL' : 'SAFE'}
                        </span>
                    </div>
                    <div className="mt-2 text-[10px] text-error font-bold leading-tight uppercase">
                        * POLICY: AUTOMATIC_DISQUALIFICATION_AT_50_POINTS
                    </div>
                </div>

                {/* Hardware Counters */}
                <div className="mt-4 pt-3 border-t border-on-surface/10 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                        <div className="font-label-sm text-label-sm text-on-surface-variant">TAB_SWITCH</div>
                        <div className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                            {String(tabSwitches).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                        <div className="font-label-sm text-label-sm text-on-surface-variant">AUDIO_SPIKE</div>
                        <div className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                            {String(audioSpikes).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="p-2 border border-on-surface/15 bg-surface-container-low">
                        <div className="font-label-sm text-label-sm text-on-surface-variant">HEAD_ROT</div>
                        <div className="font-headline-sm text-headline-sm text-ink-primary font-bold">{headRotation}</div>
                    </div>
                </div>
            </div>

            {/* SECURITY EVENT LOG STREAM (#SecurityAuditList) */}
            <div className="p-4 border border-on-surface/20 bg-surface-container-lowest shadow-[4px_4px_0px_#191C1D] flex-1 flex flex-col justify-between" id="SecurityAuditList">
                <div>
                    <div className="border-b border-on-surface/15 pb-2 flex items-center justify-between">
                        <span className="font-label-md text-label-md font-bold uppercase text-ink-primary">
                            [ HARDWARE_AUDIT_LOG_STREAM ]
                        </span>
                        <span className="font-label-sm text-label-sm text-canvas-blueprint font-bold">[REALTIME]</span>
                    </div>

                    <div className="mt-3 overflow-hidden">
                        <div className="space-y-1.5 font-label-sm text-label-sm">
                            {auditLogs.map((log, i) => (
                                <div 
                                    key={i} 
                                    className={`py-1 border-b border-on-surface/10 flex items-center justify-between ${
                                        log.type === 'warn' 
                                            ? 'bg-error-container text-on-error-container px-1 font-bold' 
                                            : 'text-on-surface-variant'
                                    }`}
                                >
                                    <span>{log.time}</span>
                                    <span className={log.type === 'warn' ? 'text-on-error-container' : 'text-ink-primary'}>
                                        {log.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-2 border-t border-on-surface/15 text-[10px] text-on-surface-variant font-mono flex items-center gap-1">
                    <span className="text-canvas-blueprint font-bold">VERIFIER:</span>
                    <span>HW_SEC_ENCLAVE_SIGNED // 0x48bb701c9</span>
                </div>
            </div>
        </div>
    );
};

export default ProctorTelemetryPanel;
