import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';

const ClientOnboarding = () => {
    const { user, tokens, updateOnboardingStage } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [profile, setProfile] = useState({
        company_name: '',
        industry: '',
        website: '',
        address: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!tokens?.access) return;
            try {
                const response = await api.get('/accounts/profile/');
                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        company_name: data.company_name || '',
                        industry: data.industry || '',
                        website: data.website || '',
                        address: data.address || '',
                    });
                }
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, [tokens]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isUpdate = user?.onboarding_stage && user.onboarding_stage >= 2;
        const path = isUpdate
            ? '/accounts/profile/update/'
            : '/accounts/onboarding/';

        try {
            const response = isUpdate
                ? await api.patch(path, profile)
                : await api.put(path, profile);

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                updateOnboardingStage(resData.onboarding_stage || 2);
                navigate('/client/dashboard');
            } else {
                const err = await response.json();
                console.error("Failed to update profile", err);
                alert("[VALIDATION_ERROR] Failed to update client telemetry: " + JSON.stringify(err));
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("[NETWORK_FAULT] Failed to transmit client entity details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface font-mono text-on-surface p-4 sm:p-8 flex items-center justify-center selection:bg-primary-container selection:text-on-primary">
            <div className="max-w-3xl w-full">
                {/* Header Track */}
                <div className="border border-black/20 bg-surface-container-lowest p-space-md mb-space-md flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1D52B8]">
                    <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold uppercase text-primary">
                        <span>[+]</span>
                        <span>[ ENTERPRISE_ENTITY_REGISTRATION // CAD_SPEC_CLIENT_01 ]</span>
                    </div>
                    <div className="font-label-sm text-label-sm text-outline">
                        STATUS: ONBOARDING_FLOW
                    </div>
                </div>

                {/* Main Form Box */}
                <div className="bg-surface-container-lowest border border-black/25 p-space-lg md:p-space-xl shadow-[4px_4px_0px_#191C1D]">
                    <div className="border-b border-black/15 pb-space-md mb-space-lg">
                        <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface font-bold">
                            RECRUITER ENTERPRISE PROVISIONING
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Register your corporate engineering entity to deploy high-concurrency talent requisitions and inspect cryptographic proctor dossiers.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-space-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    ENTERPRISE_LEGAL_ENTITY_NAME *
                                </label>
                                <input
                                    name="company_name"
                                    value={profile.company_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Nexus Infrastructure Systems Corp."
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    PRIMARY_INDUSTRY_VERTICAL *
                                </label>
                                <input
                                    name="industry"
                                    value={profile.industry}
                                    onChange={handleChange}
                                    placeholder="e.g. Cloud Infrastructure / FinTech"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    CORPORATE_WEBSITE_DOMAIN *
                                </label>
                                <input
                                    name="website"
                                    value={profile.website}
                                    onChange={handleChange}
                                    placeholder="https://nexusinfra.io"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm uppercase font-bold text-outline mb-1">
                                    HEADQUARTERS_LOCATION / TIMEZONE *
                                </label>
                                <input
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    placeholder="San Francisco, CA (UTC-7)"
                                    required
                                    className="w-full px-3 py-2 bg-surface border border-black/20 focus:border-primary focus:outline-none font-body-md text-body-md"
                                />
                            </div>
                        </div>

                        {/* CTA Rail */}
                        <div className="pt-space-md border-t border-black/15 flex flex-wrap items-center justify-between gap-space-md">
                            <button
                                type="button"
                                onClick={() => navigate('/client/dashboard')}
                                className="px-space-md py-2 border border-black/30 font-label-md text-label-md uppercase hover:bg-black hover:text-white transition-none cursor-pointer"
                            >
                                [ BYPASS_RETURN_TO_DASHBOARD ]
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary text-on-primary px-space-xl py-2.5 font-label-md text-label-md uppercase tracking-wider font-bold border border-primary hover:bg-surface hover:text-primary transition-none cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? '[ PROVISIONING_ENTITY... ]' : '[ INITIALIZE_ENTERPRISE_PIPELINE -> ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClientOnboarding;
