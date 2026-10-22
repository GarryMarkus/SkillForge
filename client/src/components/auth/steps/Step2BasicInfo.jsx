import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import Input from '../../ui/Input';
import { User, Mail, Lock, Phone, Building, IdCard } from 'lucide-react';

const Step2BasicInfo = () => {
    const { role, formData, updateFormData } = useAuthStore();



    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-black dark:text-white">Basic Information</h2>
                <p className="text-gray-500">Let's get to know you better.</p>
            </div>

            <div className="space-y-4">
                <Input
                    label="Full Name"
                    name="fullName"
                    icon={User}
                    value={formData.fullName}
                    onChange={(e) => updateFormData({ fullName: e.target.value })}
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        icon={Lock}
                        value={formData.password}
                        onChange={(e) => updateFormData({ password: e.target.value })}
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                    />
                </div>

                {/* Client Specific Fields */}
                {role === 'client' && (
                    <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-4 fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Phone Number"
                                name="phoneNumber"
                                icon={Phone}
                                value={formData.phoneNumber}
                                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                            />
                            <Input
                                label="Designation"
                                name="designation"
                                icon={IdCard}
                                value={formData.designation}
                                onChange={(e) => updateFormData({ designation: e.target.value })}
                            />
                        </div>
                        <Input
                            label="Company Name"
                            name="companyName"
                            icon={Building}
                            value={formData.companyName}
                            onChange={(e) => updateFormData({ companyName: e.target.value })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step2BasicInfo;
