import { create } from 'zustand';
import api from '../lib/api';

/**
 * Global authentication and registration state store.
 * Manages user session, JWT tokens in localStorage, and wizard registration data.
 */
export const useAuthStore = create((set, get) => ({
    authMode: 'login', // 'login' or 'register'
    setAuthMode: (mode) => set({ authMode: mode }),

    // User State
    user: (() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    })(),
    tokens: (() => {
        try {
            return JSON.parse(localStorage.getItem('tokens')) || null;
        } catch {
            return null;
        }
    })(),
    isAuthenticated: Boolean(localStorage.getItem('tokens')),

    // Registration Wizard State
    step: 1,
    setStep: (step) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

    role: null, // 'student' or 'client'
    setRole: (role) => set({ role }),

    formData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        companyName: '',
        designation: '',
        companySize: '',
        industry: '',
        trainCount: '',
        trainingGoals: [],
        learningGoal: '',
        experienceLevel: '',
        interests: []
    },

    updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),

    updateUser: (partialUser) => set((state) => {
        const updated = { ...(state.user || {}), ...partialUser };
        localStorage.setItem('user', JSON.stringify(updated));
        return { user: updated };
    }),

    // API Actions
    login: async (email, password) => {
        try {
            const response = await api.post('/accounts/login/', { email, password });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.detail || error.error || 'Login failed');
            }

            const data = await response.json();
            const user = {
                email,
                role: data.role,
                onboarding_stage: data.onboarding_stage ?? 0,
            };

            localStorage.setItem('tokens', JSON.stringify(data.tokens));
            localStorage.setItem('user', JSON.stringify(user));

            set({
                isAuthenticated: true,
                user,
                tokens: data.tokens,
                role: data.role,
            });
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    signup: async () => {
        const { formData, role } = get();
        const payload = {
            email: formData.email,
            password: formData.password,
            role: role,
        };

        try {
            const response = await api.post('/accounts/register/', payload);

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(JSON.stringify(error));
            }

            const data = await response.json();
            const user = {
                email: formData.email,
                role: role,
                onboarding_stage: 0,
            };

            localStorage.setItem('tokens', JSON.stringify(data.tokens));
            localStorage.setItem('user', JSON.stringify(user));

            set({
                isAuthenticated: true,
                user,
                tokens: data.tokens,
                role: role,
            });
            return user;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    logout: async () => {
        const { tokens } = get();
        if (tokens?.refresh) {
            try {
                await api.post('/accounts/logout/', { refresh: tokens.refresh });
            } catch (e) {
                console.error('Logout failed:', e);
            }
        }
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        set({ isAuthenticated: false, user: null, tokens: null, role: null, step: 1 });
    },

    resetWizard: () => set({
        step: 1,
        role: null,
        formData: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            companyName: '',
            designation: '',
            companySize: '',
            industry: '',
            trainCount: '',
            trainingGoals: [],
            learningGoal: '',
            experienceLevel: '',
            interests: []
        }
    })
}));

export default useAuthStore;
