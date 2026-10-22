import { create } from 'zustand';

const API_URL = 'http://localhost:8000/api/accounts';

export const useAuthStore = create((set, get) => ({
    authMode: 'login', // 'login' or 'register'
    setAuthMode: (mode) => set({ authMode: mode }),

    // User State
    user: JSON.parse(localStorage.getItem('user')) || null,
    tokens: JSON.parse(localStorage.getItem('tokens')) || null,
    isAuthenticated: !!localStorage.getItem('tokens'),

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
        // Client specific
        phoneNumber: '',
        companyName: '',
        designation: '',
        companySize: '',
        industry: '',
        trainCount: '',
        trainingGoals: [],
        // Student specific
        learningGoal: '',
        experienceLevel: '',
        interests: []
    },

    updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),

    // API Actions
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }

            const data = await response.json();

            // Store data
            const user = { email, role: data.role };
            localStorage.setItem('tokens', JSON.stringify(data.tokens));
            localStorage.setItem('user', JSON.stringify(user));

            set({ isAuthenticated: true, user, tokens: data.tokens, role: data.role });
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    signup: async () => {
        const { formData, role } = get();

        // Prepare payload based on role
        const payload = {
            email: formData.email,
            password: formData.password,
            role: role,
            // Add other fields as needed by backend or separate onboarding call
            // specific fields handled by Profile models in backend, might need separate flow or updated serializer
        };

        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(JSON.stringify(error));
            }

            const data = await response.json();
            const user = { email: formData.email, role: role };

            // Auto login after signup
            localStorage.setItem('tokens', JSON.stringify(data.tokens));
            localStorage.setItem('user', JSON.stringify(user));

            set({ isAuthenticated: true, user, tokens: data.tokens });
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
                await fetch(`${API_URL}/logout/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokens.access}` },
                    body: JSON.stringify({ refresh: tokens.refresh }),
                });
            } catch (e) { console.error('Logout failed', e); }
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
