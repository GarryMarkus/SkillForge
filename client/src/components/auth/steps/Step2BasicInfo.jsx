import React from 'react';
import { useAuthStore } from '../../../store/authStore';

const Step2BasicInfo = () => {
    const { role, formData, updateFormData } = useAuthStore();

    return (
        <div className="space-y-space-md font-mono">
            <div className="border-b border-black/15 pb-2">
                <h2 className="text-headline-sm font-bold uppercase text-on-surface">
                    [ 02_IDENTITY_CREDENTIALS // BASIC_INFORMATION ]
                </h2>
                <p className="text-body-sm text-secondary">
                    Provide legal identity parameters and cryptographic access passkeys.
                </p>
            </div>

            <div className="space-y-space-md">
                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        LEGAL_FULL_NAME *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateFormData({ fullName: e.target.value })}
                        placeholder="e.g. ALEX VANCE"
                        className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                    />
                </div>

                <div>
                    <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                        PRIMARY_EMAIL_IDENTIFIER *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="candidate@nexus.io"
                        className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div>
                        <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                            PASSWORD_SPECIFICATION *
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => updateFormData({ password: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                            CONFIRM_PASSWORD_VERIFICATION *
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                        />
                    </div>
                </div>

                {/* Client-Specific Fields */}
                {role === 'client' && (
                    <div className="space-y-space-md pt-space-xs border-t border-black/15">
                        <div className="text-label-sm font-bold text-primary-container uppercase">
                            // ENTERPRISE_ORGANIZATIONAL_PARAMETERS
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    COMPANY_LEGAL_ENTITY_NAME *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyName}
                                    onChange={(e) => updateFormData({ companyName: e.target.value })}
                                    placeholder="NEXUS INFRASTRUCTURE INC"
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                    DESIGNATION_OR_ROLE_TITLE *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.designation}
                                    onChange={(e) => updateFormData({ designation: e.target.value })}
                                    placeholder="LEAD TECHNICAL RECRUITER"
                                    className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-label-sm uppercase font-bold text-outline mb-1">
                                TELEMETRY_PHONE_CONTACT
                            </label>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                                placeholder="+1 (555) 019-2834"
                                className="w-full px-3 py-2 bg-surface border border-black/25 focus:border-primary focus:outline-none text-body-md font-mono"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step2BasicInfo;
