import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

const VintageLogo = () => (
    <svg width="180" height="100" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block text-[#fdfbf7] hover:text-[#ff4433] transition-colors duration-500">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Barber Pole Central Element */}
            <path d="M90 15 L110 15 M90 55 L110 55" strokeWidth="3" />
            <rect x="92" y="15" width="16" height="40" strokeWidth="2" fill="transparent" />
            {/* Pole stripes */}
            <path d="M92 25 L108 35 M92 35 L108 45 M92 45 L108 55" strokeWidth="2" />

            {/* Pole top and bottom domes */}
            <path d="M90 15 Q100 0 110 15" fill="currentColor" />
            <path d="M90 55 Q100 70 110 55" fill="currentColor" />

            {/* Scissors */}
            <path d="M85 35 L55 10 M85 20 L55 45" strokeWidth="2.5" />
            <circle cx="50" cy="8" r="7" fill="transparent" />
            <circle cx="50" cy="47" r="7" fill="transparent" />
            <circle cx="70" cy="27.5" r="2" fill="currentColor" stroke="none" />

            {/* Comb */}
            <path d="M115 25 L135 10 C140 12 145 18 140 25 L120 40 Z" fill="none" strokeWidth="2" />
            <path d="M118 20 L124 16 M122 25 L128 21 M126 30 L132 26 M130 35 L136 31" strokeWidth="2" />
        </g>

        {/* Ornate Flourishes */}
        <path d="M30 65 C 50 45, 80 80, 100 65 C 120 80, 150 45, 170 65" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M50 70 C 70 60, 90 85, 100 80 C 110 85, 130 60, 150 70" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Texts */}
        <text x="100" y="100" textAnchor="middle" fill="currentColor" className="font-serif font-bold text-[22px] tracking-[0.1em]">HSD AGENCY</text>
        <text x="100" y="115" textAnchor="middle" fill="currentColor" className="font-sans text-[10px] tracking-[0.4em] font-medium opacity-80">KUAFÖR</text>
    </svg>
);

export const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const leftLinks = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Hakkımızda', path: '/about' },
        { name: 'Hizmetler', path: '/services' },
    ];

    const rightLinks = [
        { name: 'Ekip', path: '/team' },
        { name: 'Blog', path: '/blog' },
        { name: 'İletişim', path: '/contact' },
    ];

    const navLinkClass = (path) => `
        relative text-[12px] font-medium tracking-[0.2em] uppercase transition-colors duration-300
        ${location.pathname === path ? 'text-primary-500' : 'text-[#fdfbf7] hover:text-primary-500'}
        after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full
        ${location.pathname === path ? 'after:w-full' : ''}
    `;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 border-b border-white/5 ${scrolled ? 'glass-dark py-0' : 'bg-dark/95 backdrop-blur-lg py-2'}`}>
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-[100px] lg:h-[120px]">

                    {/* Left Menu */}
                    <div className="hidden lg:flex flex-1 justify-end items-center gap-6 xl:gap-12 pr-8 xl:pr-16 border-r border-white/5 h-1/2">
                        {leftLinks.map((link) => (
                            <Link key={link.name} to={link.path} className={navLinkClass(link.path)}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Centered Logo */}
                    <div className="shrink-0 px-8 transform transition-transform duration-500 hover:scale-[1.02]">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <VintageLogo />
                        </Link>
                    </div>

                    {/* Right Menu & Sign In */}
                    <div className="hidden lg:flex flex-1 justify-between items-center pl-8 xl:pl-16 border-l border-white/5 h-1/2">
                        <div className="flex items-center gap-6 xl:gap-12 shrink-0">
                            {rightLinks.map((link) => (
                                <Link key={link.name} to={link.path} className={navLinkClass(link.path)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="ml-4 shrink-0">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4 xl:gap-6">
                                    <Link to="/dashboard" className="px-6 xl:px-8 py-2 xl:py-3 border border-primary-500 bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white text-xs xl:text-[12px] font-medium uppercase tracking-[0.2em] transition-all duration-300">
                                        Hesabım
                                    </Link>
                                    <button onClick={() => setLogoutModal(true)} className="text-[#fdfbf7] text-xs xl:text-[12px] font-medium uppercase tracking-[0.2em] hover:text-red-400 transition-colors duration-300">
                                        Çıkış Yap
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="px-6 xl:px-8 py-2 xl:py-3 border border-[#fdfbf7] text-[#fdfbf7] text-xs xl:text-[12px] font-medium uppercase tracking-[0.2em] hover:border-primary-500 hover:text-primary-500 transition-all duration-300">
                                    Giriş Yap
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center pr-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#fdfbf7] hover:text-[#ff4433] focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`lg:hidden absolute w-full glass-dark border-t border-white/10 transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 py-10 flex flex-col gap-8 items-center">
                    {[...leftLinks, ...rightLinks].map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-xl font-bold uppercase tracking-[0.2em] transform transition-transform hover:scale-105 ${location.pathname === link.path ? 'text-[#ff4433]' : 'text-[#fdfbf7] hover:text-[#ff4433]'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-24 h-[1px] bg-white/20 my-4"></div>
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-4 w-full max-w-sm">
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full text-center px-6 py-4 bg-[#ff4433] text-white font-bold uppercase tracking-widest hover:bg-[#ff5544] transition-colors">
                                Hesabım
                            </Link>
                            <button onClick={() => setLogoutModal(true)} className="w-full text-center px-6 py-4 border border-white/20 text-[#fdfbf7] font-bold uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-colors">
                                Çıkış Yap
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full max-w-sm text-center px-6 py-4 border-2 border-[#fdfbf7] text-[#fdfbf7] font-bold uppercase tracking-widest hover:text-[#ff4433] hover:border-[#ff4433] transition-colors">
                            Giriş Yap
                        </Link>
                    )}
                </div>
            </div>
            {/* Logout Confirmation Modal */}
            {logoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-md">
                    <div className="bg-white rounded-3xl md:rounded-[2rem] p-8 md:p-12 max-w-sm w-full shadow-2xl animate-fade-in-up text-center border border-gray-100">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                            <LogOut size={36} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-serif text-dark mb-3">Çıkış Yap?</h3>
                        <p className="text-gray-500 mb-10 font-light text-lg">Hesabınızdan çıkış yapmak istediğinize emin misiniz?</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setLogoutModal(false)} className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-gray-100 hover:text-dark transition-all duration-300 border border-gray-200">Vazgeç</button>
                            <button onClick={() => { logout(); setLogoutModal(false); setIsOpen(false); }} className="flex-1 py-4 bg-red-500 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/20">Çıkış Yap</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
