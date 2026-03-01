import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Button } from '../components/Common/Button';
import { Scissors, Eye, EyeOff } from 'lucide-react';
import { formatPhoneNumber } from '../utils/formatters';

export const Register = () => {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+90');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor!');
            return;
        }

        setIsLoading(true);
        try {
            await register(name, email, password); // phone backend tarafında tutulacaksa servise eklenebilir, şu an api mock'a göre gidiyoruz
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Kayıt olunamadı. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-slow-zoom" style={{ animationDelay: '2s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
            </div>

            <div className="max-w-md w-full space-y-8 glass-dark p-10 md:p-12 rounded-3xl z-10 animate-fade-in-up">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-primary-500/10 text-primary-500 rounded-full flex items-center justify-center mb-6 border border-primary-500/20">
                        <Scissors className="h-8 w-8" />
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-2">Kayıt Ol</h2>
                    <p className="text-sm text-gray-400 font-light">Aramıza katılmak için bir hesap oluşturun</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                        <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="sr-only">Ad Soyad</label>
                            <input
                                type="text"
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                                placeholder="Ad Soyad"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only">E-posta adresi</label>
                            <input
                                type="email"
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                                placeholder="E-posta adresi"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only">Telefon Numarası</label>
                            <input
                                type="tel"
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                                placeholder="Telefon Numarası"
                                value={phone}
                                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                            />
                        </div>
                        <div className="relative">
                            <label className="sr-only">Şifre</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors pr-12"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                                onTouchStart={() => setShowPassword(true)}
                                onTouchEnd={() => setShowPassword(false)}
                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="sr-only">Şifreyi Onayla</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors pr-12"
                                placeholder="Şifreyi Onayla"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onMouseDown={() => setShowConfirmPassword(true)}
                                onMouseUp={() => setShowConfirmPassword(false)}
                                onMouseLeave={() => setShowConfirmPassword(false)}
                                onTouchStart={() => setShowConfirmPassword(true)}
                                onTouchEnd={() => setShowConfirmPassword(false)}
                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                        </Button>
                    </div>

                    <div className="text-center mt-6 text-sm text-gray-400 font-light">
                        Zaten bir hesabınız var mı?{' '}
                        <Link to="/login" className="font-medium tracking-wide text-white hover:text-primary-500 transition-colors">
                            Giriş Yap
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
