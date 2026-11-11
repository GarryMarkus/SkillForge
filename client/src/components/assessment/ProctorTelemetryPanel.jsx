import React from 'react';
import { Camera, ShieldCheck, ShieldAlert, Activity } from '../ui/Icons';

const ProctorTelemetryPanel = ({
    faceDetected = true,
    riskScore = 5,
    tabSwitches = 0,
    audioSpikes = 0,
    headRotation = '1.4°',
    auditLogs = [],
    webcamNode = null
}) => {
    const isElevatedRisk = riskScore > 20;

    return (
        <div className="flex flex-col gap-4 font-mono select-none" id="ProctorTelemetryPanel">
            {/* Live Camera Box */}
            <div className="bg-[#0D0F14] rounded-md border border-white/[0.08] border-t-white/15 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                        <Camera className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                        <span>Camera Check</span>
                    </span>
                    <span className={`text-[11px] font-mono ${faceDetected ? 'text-emerald-400' : 'text-amber-300'}`}>
                        {faceDetected ? 'Verified' : 'Checking'}
                    </span>
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
                            {faceDetected ? 'Locked' : 'Scanning'}
                        </div>
                    </div>
                </div>

                {/* Status Summary */}
                <div className="pt-1 space-y-1 text-xs text-[#737373]">
                    <div className="flex justify-between">
                        <span>Stream:</span>
                        <span className="text-[#ededed] font-mono">Active (HD)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Head Angle:</span>
                        <span className="text-[#888888] font-mono">{headRotation || 'Aligned'}</span>
                    </div>
                </div>
            </div>

            {/* Session Integrity Score Card */}
            <div className="bg-[#111318] rounded-md border border-white/[0.08] border-t-white/15 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                        {isElevatedRisk ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} aria-hidden="true" />
                        ) : (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                        )}
                        <span>Session Status</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-sm bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-[11px]">
                        {isElevatedRisk ? 'Review' : 'Clean'}
                    </span>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-xs">
                        <span className="text-[#888888]">Alert Meter:</span>
                        <span className="text-white text-xs font-mono font-semibold">
                            {riskScore} / 50
                        </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#060709] border border-white/[0.08] overflow-hidden">
                        <div
                            className={`h-full transition-all ${isElevatedRisk ? 'bg-amber-400' : 'bg-emerald-400'}`}
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
                        <div className="text-[#737373] text-[10px]">Audio Events</div>
                        <div className="text-sm font-semibold text-white font-mono mt-0.5">{audioSpikes}</div>
                    </div>
                </div>

                {/* Audit Logs */}
                {auditLogs.length > 0 && (
                    <div className="pt-2.5 border-t border-white/[0.06] space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 text-[10px] text-[#71717A] uppercase tracking-wider">
                            <Activity className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                            <span>Activity Log</span>
                        </div>
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
