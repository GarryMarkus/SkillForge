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
        <div className="flex flex-col gap-5 font-sans select-none" id="ProctorTelemetryPanel">
            {/* Live Camera Box */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Camera &amp; Environment
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                        <span className="text-xs font-medium text-zinc-300">
                            {faceDetected ? 'Face Verified' : 'Adjusting...'}
                        </span>
                    </div>
                </div>

                {/* Viewport */}
                <div className="relative w-full aspect-video bg-[#09090B] rounded-xl overflow-hidden flex items-center justify-center border border-white/[0.08]">
                    {webcamNode && (
                        <div className="absolute inset-0 w-full h-full object-cover">
                            {webcamNode}
                        </div>
                    )}

                    {/* Subtle Gaze Overlay Box */}
                    <div className="relative w-28 h-36 border border-emerald-500/60 rounded-xl flex flex-col justify-between p-2 z-10 pointer-events-none">
                        <span className="text-[10px] bg-emerald-500 text-zinc-950 px-1.5 py-0.5 rounded font-medium self-start">
                            Face Lock
                        </span>
                        <div className="text-[11px] text-right text-emerald-400 font-mono font-semibold">
                            {faceDetected ? '98% Conf' : 'Searching'}
                        </div>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="pt-1 space-y-1.5 text-xs text-zinc-400">
                    <div className="flex justify-between">
                        <span>Webcam Feed:</span>
                        <span className="font-medium text-emerald-400">Active (720p HD)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Background Observers:</span>
                        <span className="font-medium text-zinc-200">None Detected</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Head Orientation:</span>
                        <span className="font-medium text-zinc-200 font-mono">{headRotation || 'Aligned'}</span>
                    </div>
                </div>
            </div>

            {/* Session Integrity Score Card */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Session Integrity
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                        Nominal
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                        <span className="text-zinc-400">Integrity Risk Level:</span>
                        <span className="font-semibold text-white text-sm font-mono">
                            {riskScore} / 50 Pts
                        </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all ${riskScore > 25 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(100, (riskScore / 50) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Mini Counters Grid */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-zinc-400 text-[11px] font-normal">Tab Switches</div>
                        <div className="text-base font-semibold text-white font-mono">{tabSwitches}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-zinc-400 text-[11px] font-normal">Audio Interrupts</div>
                        <div className="text-base font-semibold text-white font-mono">{audioSpikes}</div>
                    </div>
                </div>
            </div>

            {/* Realtime Event Stream */}
            <div className="bg-[#121318] rounded-2xl border border-white/[0.08] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 text-xs">
                    <span className="font-semibold text-zinc-300 uppercase tracking-wider">Activity Log</span>
                    <span className="text-blue-400 font-medium">Live</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs">
                    {auditLogs.length === 0 ? (
                        <div className="text-zinc-500 py-2 text-center">No alerts recorded. Session clean.</div>
                    ) : (
                        auditLogs.map((log, i) => (
                            <div key={i} className="py-1 flex items-center justify-between text-zinc-300 border-b border-white/[0.04]">
                                <span className="text-[11px] text-zinc-500 font-mono">{log.time}</span>
                                <span className={log.type === 'warn' ? 'text-amber-400 font-medium' : 'text-zinc-300'}>
                                    {log.text}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProctorTelemetryPanel;
