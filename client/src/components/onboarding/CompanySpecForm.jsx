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
        <div className="space-y-space-lg font-mono">
            {/* Top Specification Tracker Banner */}
            <div className="border border-black/20 bg-surface-container-lowest p-space-md flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-primary-container">
                    <span>[+]</span>
                    <span>[ ENTERPRISE_ENTITY_REGISTRATION // CAD_SPEC_CLIENT_01 ]</span>
                </div>
                <div className="font-label-sm text-label-sm text-outline">
                    PIPELINE_MODE: {isUpdate ? 'RECONFIGURATION' : 'INITIAL_PROVISIONING'}
                </div>
            </div>

            {/* Cobalt Blue System Spec Highlight Card */}
            <div className="bg-canvas-blueprint text-white border border-white/20 p-space-lg shadow-[4px_4px_0px_#191C1D]">
                <div className="flex items-center justify-between border-b border-white/20 pb-space-sm mb-space-md">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-white/80 font-bold">
                        [ SYSTEM_SPEC // ENTERPRISE_TALENT_ACQUISITION_CAPABILITIES ]
                    </span>
                    <span className="bg-white/10 px-space-xs py-0.5 text-label-sm font-label-sm border border-white/30 uppercase">
                        NODE_INDEX: PROV-ENT-04
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [01] TF-IDF MATCH ENGINE
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Algorithmic candidate ranking calculates cosine vector similarity between job specs and candidate resume ASTs.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [02] HARDWARE ANTI-CHEAT
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Access cryptographic proctor audit trails with real-time face count analysis, tab focus swaps, and integrity scores.
                        </p>
                    </div>

                    <div className="border border-white/20 bg-white/5 p-space-sm">
                        <div className="font-bold text-label-sm text-white/90 uppercase mb-1">
                            [03] STREAMLINED SHORTLIST
                        </div>
                        <p className="text-body-sm text-white/70 leading-relaxed">
                            Direct requisition dispatch with automated candidate invites and synchronized status updates across stages.
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="border border-red-500 bg-red-50 p-space-md text-red-700 text-body-sm flex items-start gap-space-sm">
                    <span className="font-bold shrink-0">[TELEMETRY_ERROR]:</span>
                    <span>{typeof error === 'string' ? error : JSON.stringify(error)}</span>
                </div>
            )}

            {/* Main Spec Form Container */}
            <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D]">
                <div className="border-b border-black/15 pb-space-md mb-space-lg">
                    <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface font-bold">
                        ENTERPRISE ENTITY SPECIFICATION
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        Configure corporate credentials to deploy high-concurrency technical requisitions and inspect verified engineering talent.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-space-xl">
                    {/* Section 01: Entity Coordinates */}
                    <div className="space-y-space-md">
                        <div className="flex items-center gap-space-xs text-label-sm font-label-sm font-bold text-primary-container uppercase border-b border-black/10 pb-1">
                            <span>// SECTION 01:</span>
                            <span>CORPORATE_LEGAL_&amp;_DOMAIN_COORDINATES</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    ENTERPRISE_LEGAL_ENTITY_NAME <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="e.g. Nexus Infrastructure Systems Corp."
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary-container focus:outline-none font-body-md text-body-md rounded-none"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    PRIMARY_INDUSTRY_VERTICAL <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="e.g. Distributed Systems / FinTech"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary-container focus:outline-none font-body-md text-body-md rounded-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    CORPORATE_WEBSITE_DOMAIN <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://nexusinfra.io"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary-container focus:outline-none font-body-md text-body-md rounded-none"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    HEADQUARTERS_LOCATION / TIMEZONE <span className="text-red-600">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA (UTC-7)"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary-container focus:outline-none font-body-md text-body-md rounded-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences & Anti-Cheat Protocols */}
                    <div className="space-y-space-md pt-space-md border-t border-black/10">
                        <div className="flex items-center gap-space-xs text-label-sm font-label-sm font-bold text-primary-container uppercase border-b border-black/10 pb-1">
                            <span>// SECTION 02:</span>
                            <span>HIRING_CAPACITY_&amp;_SECURITY_POLICIES</span>
                        </div>

                        <div>
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-2">
                                REQUISITION_PIPELINE_SCALE_TIER
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                                {[
                                    { id: 'TIER_01', label: 'TIER 01: 1-10 ROLES', desc: 'Boutique / Early-stage team' },
                                    { id: 'TIER_02', label: 'TIER 02: 10-50 ROLES', desc: 'Growth stage engineering' },
                                    { id: 'TIER_03', label: 'TIER 03: 50+ ROLES', desc: 'High-throughput enterprise' }
                                ].map(tier => (
                                    <button
                                        type="button"
                                        key={tier.id}
                                        onClick={() => setHiringCapacity(tier.id)}
                                        className={`p-space-sm text-left border cursor-pointer transition-none ${
                                            hiringCapacity === tier.id
                                                ? 'bg-primary-container text-white border-primary-container'
                                                : 'bg-surface border-black/20 hover:border-black/50 text-on-surface'
                                        }`}
                                    >
                                        <div className="font-bold text-label-sm uppercase">{tier.label}</div>
                                        <div className={`text-label-xs mt-0.5 ${hiringCapacity === tier.id ? 'text-white/80' : 'text-on-surface-variant'}`}>
                                            {tier.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-space-xs pt-space-xs">
                            <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                TELEMETRY_DISPATCH_PREFERENCES
                            </label>
                            <label className="flex items-center gap-space-sm p-space-xs border border-black/10 bg-surface cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="accent-primary-container"
                                />
                                <span className="text-body-sm text-on-surface">
                                    [x] REAL_TIME_PROCTOR_EVENT_WEBHOOKS (Flagged incidents immediately dispatched to console)
                                </span>
                            </label>

                            <label className="flex items-center gap-space-sm p-space-xs border border-black/10 bg-surface cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="accent-primary-container"
                                />
                                <span className="text-body-sm text-on-surface">
                                    [x] STRICT_TF_IDF_MATCHING_CUTOFF (Require minimum 65% cosine similarity for auto-shortlist)
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* CTA Action Rail */}
                    <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer font-bold"
                        >
                            [ &lt;- BYPASS_RETURN_TO_DASHBOARD ]
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary-container text-white px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary-container hover:bg-black transition-none cursor-pointer disabled:opacity-50"
                        >
                            {isLoading
                                ? '[ PROVISIONING_ENTITY... ]'
                                : isUpdate
                                    ? '[ UPDATE_ENTERPRISE_ENTITY_SPEC -> ]'
                                    : '[ INITIALIZE_ENTERPRISE_PIPELINE -> ]'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
