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
            <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                <div className="border-b border-gray-100 pb-5 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                        {isUpdate ? 'Account Settings' : 'Company Profile Setup'}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
                        Configure Company Profile
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Set up your organization's hiring preferences to post technical jobs and connect with verified candidates.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-xs font-medium">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Section 01: Entity Coordinates */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-2">
                            Company Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="e.g. Nexus Technologies"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Primary Industry <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="e.g. Cloud Infrastructure / SaaS"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Company Website <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://example.com"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Headquarters Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-2">
                            Hiring Capacity &amp; Preferences
                        </h2>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                                Planned Hiring Volume
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'TIER_01', label: '1–10 Openings', desc: 'Startup / Boutique team' },
                                    { id: 'TIER_02', label: '10–50 Openings', desc: 'Growth stage engineering' },
                                    { id: 'TIER_03', label: '50+ Openings', desc: 'High-volume enterprise' }
                                ].map(tier => (
                                    <button
                                        type="button"
                                        key={tier.id}
                                        onClick={() => setHiringCapacity(tier.id)}
                                        className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                                            hiringCapacity === tier.id
                                                ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm'
                                                : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                        }`}
                                    >
                                        <div className="font-semibold text-sm">{tier.label}</div>
                                        <div className={`text-xs mt-1 ${hiringCapacity === tier.id ? 'text-blue-700' : 'text-gray-500'}`}>
                                            {tier.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Notification &amp; Screening Preferences
                            </label>
                            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600"
                                />
                                <span className="text-xs text-gray-700 font-medium">
                                    Real-time assessment notifications when candidates finish tests
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600"
                                />
                                <span className="text-xs text-gray-700 font-medium">
                                    Automatically shortlist candidates with a match rate above 75%
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Skip for Now
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isLoading
                                ? 'Saving...'
                                : isUpdate
                                ? 'Update Company Profile →'
                                : 'Save & Go to Dashboard →'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
