import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const Step2BasicInfo = () => {
    const { role, formData, updateFormData } = useAuthStore();

    return (
        <div className="space-y-4 font-mono">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-[#f5f5f5]">
                    Basic Account Information
                </h3>
                <p className="text-xs text-[#737373]">
                    Enter your name and authentication credentials.
                </p>
            </div>

            <div className="space-y-3.5">
                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1">
                        Full Legal Name <span className="text-[#737373]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateFormData({ fullName: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-[#888888] mb-1">
                        Email Address <span className="text-[#737373]">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="engineer@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                    />
                </div>

                {role === 'client' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-1">
                                Company Name <span className="text-[#737373]">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.companyName}
                                onChange={(e) => updateFormData({ companyName: e.target.value })}
                                placeholder="Acme Systems"
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#888888] mb-1">
                                Your Role / Title <span className="text-[#737373]">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.designation}
                                onChange={(e) => updateFormData({ designation: e.target.value })}
                                placeholder="Head of Engineering"
                                className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-mono text-[#888888] mb-1">
                            Password <span className="text-[#737373]">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => updateFormData({ password: e.target.value })}
                            placeholder="At least 8 characters"
                            className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-[#888888] mb-1">
                            Confirm Password <span className="text-[#737373]">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                            placeholder="Re-enter password"
                            className="w-full px-3.5 py-2.5 rounded-md bg-[#050505] border border-white/10 focus:border-white/30 focus:outline-none text-xs text-[#f5f5f5] placeholder-[#444444] transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2BasicInfo;
