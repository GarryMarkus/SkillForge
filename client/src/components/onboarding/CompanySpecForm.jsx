import React, { useState } from 'react';
import { Building2, Globe, MapPin, Layers, ArrowUpRight, Bell, CheckCircle2 } from 'lucide-react';

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
            <div className="rounded-md bg-[#0D0F14] border border-white/[0.08] border-t-white/15 p-6 sm:p-8 shadow-2xl">
                <div className="border-b border-white/[0.06] pb-5 mb-6 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-sm bg-[#111318] border border-white/15 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8a8e] block mb-1">
                            {isUpdate ? 'Company Settings' : 'Company Setup'}
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-1">
                            Set Up Your Employer Profile
                        </h1>
                        <p className="text-xs text-[#888888] leading-relaxed">
                            Add your company details to post roles and shortlist verified engineers.
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-sm border border-rose-500/25 bg-rose-500/10 p-3.5 text-rose-300 text-xs">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Section 01: Entity Details */}
                    <div className="space-y-4">
                        <h2 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 border-b border-white/[0.06] pb-2 w-full">
                            <Building2 className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                            <span>Company Details</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                                    Company Name <span className="text-[#71717A]">*</span>
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={onChange}
                                    placeholder="Nexus Technologies"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                    <Layers className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Industry</span>
                                    <span className="text-[#71717A]">*</span>
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={onChange}
                                    placeholder="Cloud Infrastructure / SaaS"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                    <Globe className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Website</span>
                                    <span className="text-[#71717A]">*</span>
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={onChange}
                                    placeholder="https://example.com"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 mb-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                                    <span>Location</span>
                                    <span className="text-[#71717A]">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={onChange}
                                    placeholder="San Francisco, CA"
                                    required
                                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#060709] border border-white/[0.08] focus:border-white/25 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#555555] transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Requisition Preferences */}
                    <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                        <h2 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 border-b border-white/[0.06] pb-2 w-full">
                            <Bell className="w-3.5 h-3.5 text-[#888888]" strokeWidth={1.75} aria-hidden="true" />
                            <span>Hiring Preferences</span>
                        </h2>

                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-2">
                                Team Hiring Volume
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'TIER_01', label: '1–10 Roles', desc: 'Focused team growth' },
                                    { id: 'TIER_02', label: '10–50 Roles', desc: 'Scaling engineering org' },
                                    { id: 'TIER_03', label: '50+ Roles', desc: 'High-volume hiring' }
                                ].map(tier => {
                                    const active = hiringCapacity === tier.id;
                                    return (
                                        <button
                                            type="button"
                                            key={tier.id}
                                            onClick={() => setHiringCapacity(tier.id)}
                                            className={`p-3.5 text-left rounded-sm border font-mono transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                                                active
                                                    ? 'bg-[#181B22] border-white/30 text-white'
                                                    : 'bg-[#060709] border-white/[0.08] hover:border-white/20 text-[#888888]'
                                            }`}
                                        >
                                            <div>
                                                <div className="font-semibold text-xs text-[#f5f5f5]">{tier.label}</div>
                                                <div className="text-[11px] mt-1 text-[#71717A]">
                                                    {tier.desc}
                                                </div>
                                            </div>
                                            {active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <label className="flex items-center gap-3 p-3 rounded-sm border border-white/[0.08] hover:border-white/15 bg-[#060709] cursor-pointer select-none transition-colors">
                                <input
                                    type="checkbox"
                                    checked={realtimeWebhooks}
                                    onChange={(e) => setRealtimeWebhooks(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#060709] text-white accent-zinc-200"
                                />
                                <span className="text-xs text-zinc-300 font-mono">
                                    Notify me when a matched candidate completes verification
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-sm border border-white/[0.08] hover:border-white/15 bg-[#060709] cursor-pointer select-none transition-colors">
                                <input
                                    type="checkbox"
                                    checked={strictCosineCutoff}
                                    onChange={(e) => setStrictCosineCutoff(e.target.checked)}
                                    className="w-3.5 h-3.5 rounded-none border border-white/20 bg-[#060709] text-white accent-zinc-200"
                                />
                                <span className="text-xs text-zinc-300 font-mono">
                                    Highlight candidates with 75%+ role fit first
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onBypass}
                            className="bg-[#121316] text-[#E4E4E7] hover:text-white border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer"
                        >
                            Skip for Now
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold px-6 py-2.5 rounded-sm text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <span>
                                {isLoading
                                    ? 'Saving...'
                                    : isUpdate
                                    ? 'Update Company Profile'
                                    : 'Save & Continue'}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySpecForm;
