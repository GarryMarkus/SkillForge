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
            {/* Top Overview Banner */}
            <div className="rounded-md bg-[#0b0b0c] border border-white/10 p-6 sm:p-8">
                <div className="border-b border-white/[0.06] pb-5 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block mb-1">
                        {isUpdate ? 'Organization Settings' : 'Employer Profile Setup'}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-1.5">
                        Configure Company Profile
                    </h1>
                    <p className="text-xs text-[#888888] leading-relaxed">
                        Configure organization specifications to publish technical requisitions and match with verified engineers.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-md border border-rose-500/20 bg-rose-500/10 p-3.5 text-rose-300 text-xs">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Section 01: Entity Details */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888] border-b border-white/[0.06] pb-2">
                            01: Entity Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Company Name <span className="text-[#737373]">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="Nexus Technologies"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Primary Industry <span className="text-[#737373]">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="Cloud Infrastructure / SaaS"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Company Website <span className="text-[#737373]">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://example.com"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-[#888888] mb-1.5">
                                    Headquarters Location <span className="text-[#737373]">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences */}
                    <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888] border-b border-white/[0.06] pb-2">
                            02: Hiring Capacity &amp; Parameters
                        </h2>

                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-2">
                                Planned Hiring Volume
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'TIER_01', label: '1–10 Openings', desc: 'Early stage / Focused engineering' },
                                    { id: 'TIER_02', label: '10–50 Openings', desc: 'Growth stage scale' },
                                    { id: 'TIER_03', label: '50+ Openings', desc: 'High-volume enterprise' }
                                ].map(tier => (
                                    <button
                                        type="button"
                                        key={tier.id}
                                        onClick={() => setHiringCapacity(tier.id)}
                                        className={`p-3.5 text-left rounded-md border font-mono transition-all cursor-pointer ${
                                            hiringCapacity === tier.id
                                                ? 'bg-[#121214] border-white/30 text-white shadow-sm'
                                                : 'bg-[#050505] border-white/10 hover:border-white/20 text-[#888888]'
                                        }`}
                                    >
                                        <div className="font-semibold text-xs text-[#f5f5f5]">{tier.label}</div>
                                        <div className="text-[11px] mt-1 text-[#555555]">
                                            {tier.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <label className="block text-xs font-mono text-[#888888] mb-1">
                                Automated Notification &amp; Screening
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-md border border-white/10 bg-[#050505] cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#050505] text-white accent-zinc-200"
                                />
                                <span className="text-xs text-[#888888] font-mono">
                                    Instant alerts upon verified candidate assessment completion
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-md border border-white/10 bg-[#050505] cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#050505] text-white accent-zinc-200"
                                />
                                <span className="text-xs text-[#888888] font-mono">
                                    Auto-shortlist candidate submissions with match rate &gt;= 75%
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="px-4 py-2 rounded-md border border-white/10 text-xs font-mono text-[#888888] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                        >
                            Skip for Now
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 px-6 py-2 rounded-md text-xs font-mono transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isLoading
                                ? 'Saving...'
                                : isUpdate
                                ? 'Update Company Profile ↗'
                                : 'Save & Continue ↗'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
