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
    return (
        <div className="flex flex-col gap-4 font-mono select-none" id="ProctorTelemetryPanel">
            {/* Live Camera Box */}
            <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8a8e]">
                        Optical Telemetry
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#ededed] font-mono">
                            {faceDetected ? 'Face Verified' : 'Calibrating'}
                        </span>
                    </div>
                </div>

                {/* Viewport */}
                <div className="relative w-full aspect-video bg-[#060709] rounded-sm overflow-hidden flex items-center justify-center border border-white/[0.08]">
                    {webcamNode && (
                        <div className="absolute inset-0 w-full h-full object-cover">
                            {webcamNode}
                        </div>
                    )}

                    {/* Subtle Gaze Overlay Box */}
                    <div className="relative w-24 h-32 border border-white/35 rounded-sm flex flex-col justify-between p-1.5 z-10 pointer-events-none">
                        <span className="text-[10px] bg-[#111318] text-zinc-200 border border-white/15 px-1.5 py-0.2 self-start font-mono">
                            Tracked
                        </span>
                        <div className="text-[10px] text-right text-white font-mono">
                            {faceDetected ? '98% conf' : 'searching'}
                        </div>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="pt-1 space-y-1 text-xs text-[#737373]">
                    <div className="flex justify-between">
                        <span>Feed:</span>
                        <span className="text-[#ededed] font-mono">Active (720p HD)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Observers:</span>
                        <span className="text-[#888888] font-mono">0 Detected</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Orientation:</span>
                        <span className="text-[#888888] font-mono">{headRotation || 'Aligned'}</span>
                    </div>
                </div>
            </div>

            {/* Session Integrity Score Card */}
            <div className="bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8a8e]">
                        Integrity Record
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px]">
                        Nominal
                    </span>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs">
                        <span className="text-[#888888]">Risk Index:</span>
                        <span className="text-white text-xs font-mono font-semibold">
                            {riskScore} / 50 pts
                        </span>
                    </div>
                    <div className="w-full h-1.5 rounded-none bg-[#060709] border border-white/[0.08] overflow-hidden">
                        <div 
                            className="h-full bg-[#F5F5F5] transition-all"
                            style={{ width: `${Math.min(100, (riskScore / 50) * 100)}%` }}
                        />
                    </div>
                </div>

                {/* Mini Counters Grid */}
                <div className="pt-1 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.08]">
                        <div className="text-[#737373] text-[10px]">Tab Switches</div>
                        <div className="text-sm font-semibold text-white font-mono mt-0.5">{tabSwitches}</div>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#060709] border border-white/[0.08]">
                        <div className="text-[#737373] text-[10px]">Audio Spikes</div>
                        <div className="text-sm font-semibold text-white font-mono mt-0.5">{audioSpikes}</div>
                    </div>
                </div>

                {/* Audit Logs */}
                {auditLogs.length > 0 && (
                    <div className="pt-2.5 border-t border-white/[0.06] space-y-1.5">
                        <div className="text-[10px] text-[#71717A] uppercase tracking-wider">Audit Log:</div>
                        <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-[10px]">
                            {auditLogs.slice(0, 5).map((log, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[#888888]">
                                    <span className="text-[#555555]">{log.time}</span>
                                    <span className="truncate">{log.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProctorTelemetryPanel;
