import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import client from '../../api/client';
import ClientOnboardingHeader from '../../components/onboarding/ClientOnboardingHeader';
import CompanySpecForm from '../../components/onboarding/CompanySpecForm';

const ClientOnboarding = () => {
    const { user, tokens, updateOnboardingStage } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
                const response = await client.get('/accounts/profile/');
                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        company_name: data.company_name || '',
                        industry: data.industry || '',
                        website: data.website || '',
                        address: data.address || '',
                    });
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
            }
        };
        fetchProfile();
    }, [tokens]);

    const handleChange = (e) => {
        setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isUpdate = Boolean(user?.onboarding_stage && user.onboarding_stage >= 2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const path = isUpdate
            ? '/accounts/profile/update/'
            : '/accounts/onboarding/';

        try {
            const response = isUpdate
                ? await client.patch(path, profile)
                : await client.put(path, profile);

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                updateOnboardingStage(resData.onboarding_stage || 2);
                navigate('/client/dashboard');
            } else {
                const err = await response.json().catch(() => ({}));
                console.error('Failed to update client profile:', err);
                setError(err);
            }
        } catch (err) {
            console.error('Error submitting client profile:', err);
            setError('A network error occurred while updating your company profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col select-none">
            <ClientOnboardingHeader clientEmail={user?.email || 'recruiter@enterprise.io'} />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CompanySpecForm
                    profile={profile}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    isUpdate={isUpdate}
                    error={error}
                    onBypass={() => navigate('/client/dashboard')}
                />
            </main>
        </div>
    );
};

export default ClientOnboarding;
