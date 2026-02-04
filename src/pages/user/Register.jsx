import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ArrowLeft, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneChange = (e) => {
        // Strip all non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Use strict prefix logic: always enforce leading 90
        // If the user completely clears the input, we might reset, but typically we enforce 90
        // If the user tries to edit the 90, it will just re-add it because we strip and prepend.

        // If value doesn't start with 90 or is shorter than 2 (e.g. user deleting), ensure it
        if (!value.startsWith('90')) {
            // If the user typed '5...', assume they mean 905...
            value = '90' + value;
        }

        // Limit to 12 digits (90 + 10 digits)
        if (value.length > 12) value = value.slice(0, 12);

        // Format: +90 5XX-XXX-XXXX
        let formatted = '+90';
        if (value.length > 2) {
            formatted += ' ' + value.slice(2, 5);
        }
        if (value.length > 5) {
            formatted += '-' + value.slice(5, 8);
        }
        if (value.length > 8) {
            formatted += '-' + value.slice(8, 12);
        }

        setFormData(prev => ({
            ...prev,
            phone: formatted
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate registration delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Registration Data:', formData);

        // Navigate to login after successful "registration"
        // In a real app, you might auto-login or show a success message
        navigate('/login/customer'); // Defaulting to customer login for now

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)] relative overflow-hidden">
            {/* Background Aesthetics - Orange theme for default/neutral */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] opacity-10 blur-[120px] rounded-full pointer-events-none bg-orange-500" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] opacity-5 blur-[100px] rounded-full pointer-events-none bg-green-500" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg z-10"
            >
                <button
                    onClick={() => navigate('/login/customer')}
                    className="mb-6 flex items-center gap-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium"
                >
                    <ArrowLeft size={20} /> Back to Login
                </button>

                <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 bg-orange-50 text-orange-600">
                            <UserPlus size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                            Create Account
                        </h2>
                        <p className="text-[var(--color-foreground-muted)] mt-2">
                            Join HSD Agency to discover premium services.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    required
                                    value={formData.surname}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Phone Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+90 544-540-1710"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                                <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                                <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <button disabled={loading} className="w-full btn-primary py-3.5 rounded-xl font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[var(--color-foreground-muted)] text-sm">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login/customer')}
                                className="text-[var(--color-primary)] font-semibold hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;