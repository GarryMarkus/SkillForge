import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authMode: 'login', // 'login' or 'register'
    setAuthMode: (mode) => set({ authMode: mode }),

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
