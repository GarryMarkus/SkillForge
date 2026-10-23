import React, { useState } from 'react';

const CompanySpecForm = ({
    profile,
    onChange,
    onSubmit,
    isLoading,
    isUpdate,
    error,
    onBypass
}) => {
    const [hiringCapacity, setHiringCapacity] = useState('TIER_02');
    const [realtimeWebhooks, setRealtimeWebhooks] = useState(true);
    const [strictCosineCutoff, setStrictCosineCutoff] = useState(true);

    return (
        <div className="space-y-6 font-mono select-none" id="CompanySpecForm">
            {/* Top Specification Tracker Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-canvas-blueprint">
                    <span>[+]</span>
                    <span>[ ENTERPRISE ENTITY REGISTRATION // RECRUITER SPECIFICATION ]</span>
                </div>
                <div className="text-xs text-outline font-bold">
                    MODE: {isUpdate ? 'RECONFIGURATION' : 'INITIAL PROVISIONING'}
                </div>
            </div>

            {/* Cobalt Blue System Spec Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-primary p-6 sm:p-8 shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-5">
                    <span className="text-xs uppercase tracking-wider text-white font-bold">
                        [ SYSTEM SPECIFICATION // ENTERPRISE TALENT ACQUISITION CAPABILITIES ]
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 text-[11px] border border-white/30 uppercase font-bold">
                        ENCLAVE ACTIVE
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [01] TF-IDF MATCH ENGINE
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Calculates cosine similarity vectors between job requirements and candidate resume ASTs.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [02] HARDWARE PROCTOR ENCLAVE
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Full audit trails with optical face tracking, window blur detection, and strict risk caps.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-4">
                        <div className="font-bold text-xs text-white uppercase mb-1">
                            [03] AUTONOMOUS SHORTLIST
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-mono">
                            Direct requisition dispatch with instant offer generation and verified talent rank indexes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="border border-red-500 bg-red-50 p-4 text-red-700 text-xs flex items-start gap-2">
                    <span className="font-bold shrink-0">[TELEMETRY ERROR]:</span>
                    <span>{typeof error === 'string' ? error : JSON.stringify(error)}</span>
                </div>
            )}

            {/* Main Spec Form Container */}
            <div className="bg-surface-container-lowest border border-black/20 p-6 sm:p-10 shadow-[6px_6px_0px_#0A0A0A]">
                <div className="border-b border-black/15 pb-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl uppercase tracking-tight text-ink-primary font-bold mb-2">
                        ENTERPRISE ENTITY SPECIFICATION
                    </h1>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        Configure corporate credentials to deploy high-concurrency technical requisitions and inspect verified engineering talent dossiers.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Section 01: Entity Coordinates */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-canvas-blueprint uppercase border-b border-black/10 pb-1.5">
                            <span>// SECTION 01:</span>
                            <span>CORPORATE LEGAL IDENTITY</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    ENTERPRISE LEGAL ENTITY NAME <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="e.g. Nexus Infrastructure Systems Corp."
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    PRIMARY INDUSTRY VERTICAL <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="e.g. Distributed Systems / Cloud Infrastructure"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    CORPORATE WEBSITE DOMAIN <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://nexusinfra.io"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-outline mb-1.5">
                                    HEADQUARTERS LOCATION / TIMEZONE <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA (UTC-7)"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-surface border border-black/25 focus:border-canvas-blueprint focus:outline-none text-xs sm:text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences & Anti-Cheat Protocols */}
                    <div className="space-y-4 pt-4 border-t border-black/10">
                        <div className="flex items-center gap-2 text-xs font-bold text-canvas-blueprint uppercase border-b border-black/10 pb-1.5">
                            <span>// SECTION 02:</span>
                            <span>HIRING CAPACITY &amp; SECURITY POLICIES</span>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-outline mb-2">
                                REQUISITION PIPELINE SCALE TIER
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'TIER_01', label: 'TIER 01: 1-10 ROLES', desc: 'Boutique / Early-stage team' },
                                    { id: 'TIER_02', label: 'TIER 02: 10-50 ROLES', desc: 'Growth stage engineering' },
                                    { id: 'TIER_03', label: 'TIER 03: 50+ ROLES', desc: 'High-throughput enterprise' }
                                ].map(tier => (
                                    <button
                                        type="button"
                                        key={tier.id}
                                        onClick={() => setHiringCapacity(tier.id)}
                                        className={`p-3 text-left border cursor-pointer transition-none ${
                                            hiringCapacity === tier.id
                                                ? 'bg-canvas-blueprint text-white border-canvas-blueprint'
                                                : 'bg-surface border-black/20 hover:border-black/50 text-ink-primary'
                                        }`}
                                    >
                                        <div className="font-bold text-xs uppercase">{tier.label}</div>
                                        <div className={`text-[11px] mt-1 ${hiringCapacity === tier.id ? 'text-white/80' : 'text-on-surface-variant'}`}>
                                            {tier.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="block text-xs uppercase font-bold text-outline mb-1">
                                TELEMETRY DISPATCH PREFERENCES
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-black/15 bg-surface cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="accent-canvas-blueprint"
                                />
                                <span className="text-xs text-ink-primary font-mono">
                                    [x] REAL-TIME PROCTOR EVENT DISPATCH (Flagged incidents immediately notify console)
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-black/15 bg-surface cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="accent-canvas-blueprint"
                                />
                                <span className="text-xs text-ink-primary font-mono">
                                    [x] STRICT TF-IDF MATCHING THRESHOLD (Require minimum 65% cosine similarity for auto-shortlist)
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* CTA Action Rail */}
                    <div className="pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="px-6 py-3.5 border border-black/25 text-xs sm:text-sm font-bold uppercase hover:bg-black/5 transition-none cursor-pointer"
                        >
                            [ CANCEL // RETURN TO DASHBOARD ]
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-canvas-blueprint text-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold border border-canvas-blueprint hover:bg-primary-hover transition-none cursor-pointer shadow-[3px_3px_0px_#0A0A0A] disabled:opacity-50"
                        >
                            {isLoading
                                ? '[ PROVISIONING ENTITY... ]'
                                : isUpdate
                                    ? '[ UPDATE ENTERPRISE SPECIFICATION → ]'
                                    : '[ INITIALIZE ENTERPRISE PROFILE → ]'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
