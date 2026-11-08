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
        <div className="space-y-6 font-sans select-none" id="CompanySpecForm">
            {/* Top Overview Banner */}
            <div className="rounded-xl bg-[#121318] border border-white/[0.08] p-6 sm:p-8 shadow-sm">
                <div className="border-b border-white/[0.06] pb-5 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                        {isUpdate ? 'Account Settings' : 'Company Profile Setup'}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                        Configure Company Profile
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        Set up your organization's hiring preferences to post technical jobs and connect with verified candidates.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3.5 text-rose-400 text-xs font-medium">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Section 01: Entity Details */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 border-b border-white/[0.06] pb-2">
                            Company Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Company Name <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="e.g. Nexus Technologies"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Primary Industry <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="e.g. Cloud Infrastructure / SaaS"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Company Website <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://example.com"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Headquarters Location <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-700/70 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences */}
                    <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 border-b border-white/[0.06] pb-2">
                            Hiring Capacity &amp; Preferences
                        </h2>

                        <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-2">
                                Planned Hiring Volume
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'TIER_01', label: '1–10 Openings', desc: 'Early stage / Boutique team' },
                                    { id: 'TIER_02', label: '10–50 Openings', desc: 'Growth stage engineering' },
                                    { id: 'TIER_03', label: '50+ Openings', desc: 'High-volume enterprise' }
                                ].map(tier => (
                                    <button
                                        type="button"
                                        key={tier.id}
                                        onClick={() => setHiringCapacity(tier.id)}
                                        className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer ${
                                            hiringCapacity === tier.id
                                                ? 'bg-blue-500/10 border-blue-500 text-white shadow-sm'
                                                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                                        }`}
                                    >
                                        <div className="font-semibold text-sm">{tier.label}</div>
                                        <div className={`text-xs mt-1 ${hiringCapacity === tier.id ? 'text-blue-300' : 'text-zinc-500'}`}>
                                            {tier.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <label className="block text-xs font-medium text-zinc-300 mb-1">
                                Notification &amp; Screening Preferences
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-zinc-900/40 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 accent-blue-600"
                                />
                                <span className="text-xs text-zinc-300 font-medium">
                                    Real-time assessment notifications when candidates finish tests
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-zinc-900/40 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 accent-blue-600"
                                />
                                <span className="text-xs text-zinc-300 font-medium">
                                    Automatically shortlist candidates with a match rate above 75%
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="px-5 py-2.5 rounded-lg border border-zinc-700/80 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            Skip for Now
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-white hover:bg-zinc-100 text-zinc-950 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isLoading
                                ? 'Saving...'
                                : isUpdate
                                ? 'Update Company Profile'
                                : 'Save & Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
