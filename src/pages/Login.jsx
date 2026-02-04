import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Briefcase, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const { role } = useParams(); // 'customer' or 'business'
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const isBusiness = role === 'business';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Determine the internal role name for AuthContext
        const authRole = isBusiness ? 'admin' : 'customer';

        const success = await login(authRole);

        if (success) {
            // Explicit redirection based on the role
            if (isBusiness) {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)] relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] opacity-10 blur-[120px] rounded-full pointer-events-none ${isBusiness ? 'bg-green-500' : 'bg-orange-500'}`} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md z-10"
            >
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium"
                >
                    <ArrowLeft size={20} /> Back to Selection
                </button>

                <div className="glass-card rounded-[2rem] p-10 shadow-xl">
                    <div className="text-center mb-8">
                        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${isBusiness ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {isBusiness ? <Briefcase size={32} /> : <User size={32} />}
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] capitalize">
                            {role} Login
                        </h2>
                        <p className="text-[var(--color-foreground-muted)] mt-2">
                            Enter your credentials to access the {isBusiness ? 'admin dashboard' : 'discovery portal'}.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Email</label>
                            <input
                                type="email"
                                placeholder={isBusiness ? "admin@hsd.agency" : "client@example.com"}
                                className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[var(--color-foreground)] ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--color-background)] border border-[rgba(0,0,0,0.05)] rounded-xl px-4 py-3 text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                />
                                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <button disabled={loading} className="w-full btn-primary py-3.5 rounded-xl font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? 'Verifying...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[var(--color-foreground-muted)] text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/register')}
                                className="text-[var(--color-primary)] font-semibold hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
