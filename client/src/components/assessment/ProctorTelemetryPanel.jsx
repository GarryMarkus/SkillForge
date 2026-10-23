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
            <div className="bg-canvas-blueprint text-on-primary border border-primary p-4 sm:p-5 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center justify-between border-b border-on-primary/30 pb-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-on-primary">
                        [ OPTICAL HARDWARE SUPERVISION ]
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 inline-block ${faceDetected ? 'bg-[#69db7c] animate-pulse' : 'bg-red-400'}`}></span>
                        <span className="text-[11px] font-bold tracking-tight">
                            {faceDetected ? 'ACTIVE' : 'OFFLINE'}
                        </span>
                    </div>
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
                    <svg className="absolute inset-0 w-full h-full opacity-20 text-on-primary pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern height="24" id="grid-pattern" patternUnits="userSpaceOnUse" width="24">
                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="50%" x2="50%" y1="0" y2="100%"></line>
                        <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.75" x1="0" x2="100%" y1="50%" y2="50%"></line>
                    </svg>

                    {/* Scanning Line Effect */}
                    <div className="absolute inset-x-0 h-0.5 bg-[#69db7c]/80 shadow-[0_0_8px_#69db7c] animate-[bounce_3s_infinite] pointer-events-none"></div>

                    {/* Face Wireframe Vector Tracking Target */}
                    <div className="relative w-28 h-36 border-2 border-[#69db7c] flex flex-col justify-between p-1.5 z-10 bg-[#69db7c]/5 pointer-events-none">
                        <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono bg-on-primary text-primary px-1 font-bold">TARGET</span>
                            <span className={`text-[9px] font-mono font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-red-400'}`}>
                                {faceDetected ? 'LOCKED' : 'SEARCHING'}
                            </span>
                        </div>
                        <div className="w-full h-16 flex items-center justify-center opacity-85">
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
                        <div className="text-[9px] font-mono text-right text-on-primary font-bold">
                            CONF: {faceDetected ? '98.2%' : '14.0%'}
                        </div>
                    </div>
                </div>

                {/* Camera Diagnostic Tag Stream */}
                <div className="mt-3 pt-2.5 border-t border-on-primary/20 space-y-1.5 text-xs text-on-primary">
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">FACE STATUS:</span>
                        <span className={`font-bold ${faceDetected ? 'text-[#69db7c]' : 'text-red-400'}`}>
                            {faceDetected ? 'DETECTED [CONF: 98.2%]' : 'SEARCHING...'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">MULTIPLE OBSERVERS:</span>
                        <span className="font-bold text-[#69db7c]">NONE DETECTED</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-on-primary/70">GAZE TRACKING:</span>
                        <span className="font-bold text-on-primary">ALIGNED (CENTER)</span>
                    </div>
                </div>
            </div>

            {/* ANTI-CHEAT HEURISTIC ENGINE STATUS CARD */}
            <div className="p-4 sm:p-5 border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A]">
                <div className="border-b border-black/15 pb-2.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-ink-primary tracking-wide">
                        [ INTEGRITY RISK ACCUMULATOR ]
                    </span>
                    <span className="text-xs text-on-surface-variant font-bold">MAX: 50 PTS</span>
                </div>

                <div className="mt-3">
                    <div className="flex justify-between items-baseline text-xs mb-1.5">
                        <span className="text-on-surface-variant font-bold">ACCUMULATED RISK:</span>
                        <span className={`text-base font-bold ${riskScore > 30 ? 'text-red-600' : 'text-ink-primary'}`}>
                            [ {String(riskScore).padStart(2, '0')} / 50 ]
                        </span>
                    </div>

                    {/* ASCII Visual Gauge */}
                    <div className="p-2.5 bg-surface-container border border-black/15 text-sm tracking-widest text-canvas-blueprint flex items-center justify-between">
                        <span className="tracking-widest font-mono">[{riskBars}]</span>
                        <span className={`text-xs px-2 py-0.5 border font-bold ${
                            riskScore > 30
                                ? 'bg-error-container text-on-error-container border-error'
                                : 'bg-surface-container-lowest border-primary text-canvas-blueprint'
                        }`}>
                            STATUS: {riskScore > 30 ? 'CRITICAL' : 'NOMINAL'}
                        </span>
                    </div>
                    <div className="mt-2 text-[11px] text-red-600 font-bold uppercase tracking-tight">
                        * POLICY: IMMEDIATE SESSION TERMINATION AT 50 POINTS
                    </div>
                </div>

                {/* Hardware Counters */}
                <div className="mt-4 pt-3 border-t border-black/10 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 border border-black/15 bg-surface-container-low">
                        <div className="text-[11px] text-on-surface-variant font-bold">TAB SWITCH</div>
                        <div className="text-lg text-ink-primary font-bold">
                            {String(tabSwitches).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="p-2 border border-black/15 bg-surface-container-low">
                        <div className="text-[11px] text-on-surface-variant font-bold">AUDIO SPIKE</div>
                        <div className="text-lg text-ink-primary font-bold">
                            {String(audioSpikes).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="p-2 border border-black/15 bg-surface-container-low">
                        <div className="text-[11px] text-on-surface-variant font-bold">HEAD ROT</div>
                        <div className="text-lg text-ink-primary font-bold">{headRotation}</div>
                    </div>
                </div>
            </div>

            {/* SECURITY EVENT LOG STREAM */}
            <div className="p-4 sm:p-5 border border-black/20 bg-surface-container-lowest shadow-[4px_4px_0px_#0A0A0A] flex-1 flex flex-col justify-between" id="SecurityAuditList">
                <div>
                    <div className="border-b border-black/15 pb-2.5 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-ink-primary tracking-wide">
                            [ AUDIT LOG STREAM ]
                        </span>
                        <span className="text-xs text-canvas-blueprint font-bold">[REALTIME]</span>
                    </div>

                    <div className="mt-3">
                        <div className="space-y-1.5 text-xs">
                            {auditLogs.map((log, i) => (
                                <div 
                                    key={i} 
                                    className={`py-1 px-1.5 border-b border-black/5 flex items-center justify-between ${
                                        log.type === 'warn' 
                                            ? 'bg-red-50 text-red-700 font-bold border-red-200' 
                                            : 'text-on-surface-variant'
                                    }`}
                                >
                                    <span className="font-mono text-[11px] text-outline">{log.time}</span>
                                    <span className={log.type === 'warn' ? 'text-red-700' : 'text-ink-primary'}>
                                        {log.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-black/10 text-xs text-on-surface-variant font-mono flex items-center justify-between">
                    <span className="text-canvas-blueprint font-bold">[ PROCTOR INTEGRITY: ACTIVE ]</span>
                    <span className="text-outline text-[11px]">ENCLAVE VERIFIED</span>
                </div>
            </div>
        </div>
    );
};

export default ProctorTelemetryPanel;
