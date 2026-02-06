import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ArrowLeft, UserPlus, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        captchaInput: ''
    });

    const [captchaCode, setCaptchaCode] = useState('');

    // Generate random CAPTCHA code
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Leaving out confusing chars like I, 1, O, 0
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(result);
    };

    // Initialize CAPTCHA on mount
    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (!value.startsWith('90')) {
            value = '90' + value;
        }

        if (value.length > 12) value = value.slice(0, 12);

        // Format: +90 5XX XXX XX XX
        let formatted = '+90';
        if (value.length > 2) {
            formatted += ' ' + value.slice(2, 5);
        }
        if (value.length > 5) {
            formatted += ' ' + value.slice(5, 8);
        }
        if (value.length > 8) {
            formatted += ' ' + value.slice(8, 10);
        }
        if (value.length > 10) {
            formatted += ' ' + value.slice(10, 12);
        }

        setFormData(prev => ({
            ...prev,
            phone: formatted
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validate phone number length (must be 12 digits: 90 + 10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 12) {
            setError('Lütfen geçerli bir telefon numarası giriniz.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (formData.captchaInput.toUpperCase() !== captchaCode) {
            setError('Güvenlik kodu hatalı. Lütfen tekrar deneyiniz.');
            generateCaptcha(); // Refresh CAPTCHA on error
            setFormData(prev => ({ ...prev, captchaInput: '' })); // Clear input
            return;
        }

        setLoading(true);

        // Simulate registration delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Registration Data:', formData);
        navigate('/login/customer');
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
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-500/10 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-500/20"
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

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
                                    placeholder="+90 544 540 17 10"
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

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* CAPTCHA Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Güvenlik Doğrulaması</label>
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="captchaInput"
                                        required
                                        value={formData.captchaInput}
                                        onChange={handleChange}
                                        placeholder="Kodu giriniz"
                                        className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all uppercase tracking-widest"
                                    />
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl border border-[rgba(0,0,0,0.05)] select-none">
                                    <span className="font-mono text-xl font-bold tracking-widest text-[var(--color-primary)] opacity-80" style={{ letterSpacing: '0.2em' }}>
                                        {captchaCode}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={generateCaptcha}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-[var(--color-foreground-muted)]"
                                        title="Kodu Yenile"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                </div>
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