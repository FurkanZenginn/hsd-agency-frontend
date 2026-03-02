import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'hsd2026';

export const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('hsd_admin_auth', 'true');
            navigate('/admin/analytics');
        } else {
            setError('Yanlış şifre!');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-red-500/20 mb-4">
                        H
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-white/30 text-sm mt-1">HSD Agency Yönetim</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-[#1c1c27] border border-white/5 rounded-2xl p-8">
                    <div className="mb-6">
                        <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-2">
                            Admin Şifresi
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                                className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                                placeholder="Şifreyi girin"
                                autoFocus
                            />
                            <button
                                type="button"
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 text-xs mt-2 animate-fade-in">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
                    >
                        Giriş Yap
                    </button>
                </form>

                <p className="text-center text-white/15 text-xs mt-6">
                    <button onClick={() => navigate('/')} className="hover:text-white/40 transition-colors">
                        ← Siteye Dön
                    </button>
                </p>
            </div>
        </div>
    );
};
