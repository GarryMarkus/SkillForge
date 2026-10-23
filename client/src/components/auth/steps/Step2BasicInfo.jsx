import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const Step2BasicInfo = () => {
    const { role, formData, updateFormData } = useAuthStore();

    return (
        <div className="space-y-4 font-sans">
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                    Basic Account Information
                </h3>
                <p className="text-xs text-gray-500">
                    Enter your name and login credentials.
                </p>
            </div>

            <div className="space-y-3.5">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateFormData({ fullName: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                    />
                </div>

                {role === 'client' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.companyName}
                                onChange={(e) => updateFormData({ companyName: e.target.value })}
                                placeholder="Acme Inc."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Your Role / Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.designation}
                                onChange={(e) => updateFormData({ designation: e.target.value })}
                                placeholder="Technical Recruiter"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => updateFormData({ password: e.target.value })}
                            placeholder="At least 8 characters"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                            placeholder="Re-enter password"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-600 focus:outline-none text-sm transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2BasicInfo;
