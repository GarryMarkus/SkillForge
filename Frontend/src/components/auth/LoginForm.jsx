import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock, User, Github, Linkedin, ArrowRight } from 'lucide-react';

const LoginForm = () => {
    const { setAuthMode } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-black dark:text-white mb-2">Welcome Back</h2>
                <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8 relative">
                <div className="absolute inset-0 p-1 flex">
                    <motion.div
                        layoutId="tab"
                        className="w-1/2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                    />
                </div>
                <button className="flex-1 relative z-10 py-2.5 text-sm font-bold text-black dark:text-white">Login</button>
                <button
                    onClick={() => setAuthMode('register')}
                    className="flex-1 relative z-10 py-2.5 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    icon={Lock}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="font-bold text-blue-500 hover:underline">Forgot Password?</a>
                </div>

                <Button
                    className="w-full text-lg py-4 flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                </Button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-light-canvas dark:bg-dark-canvas text-gray-500 font-medium">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-bold text-black dark:text-white">
                    <Github className="w-5 h-5" />
                    Github
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-bold text-black dark:text-white">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    LinkedIn
                </button>
            </div>

            <p className="mt-8 text-center text-gray-500">
                Don't have an account? <button onClick={() => setAuthMode('register')} className="font-bold text-blue-500 hover:underline">Create Account</button>
            </p>
        </div>
    );
};

export default LoginForm;
