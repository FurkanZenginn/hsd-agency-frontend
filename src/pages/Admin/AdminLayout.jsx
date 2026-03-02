import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, Package, Users, Scissors, Phone, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
    { name: 'Analitik', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Ürünler', path: '/admin/products', icon: Package },
    { name: 'Ekip', path: '/admin/team', icon: Users },
    { name: 'Hizmetler', path: '/admin/services', icon: Scissors },
    { name: 'İletişim', path: '/admin/contact', icon: Phone },
    { name: 'Ayarlar', path: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f0f13] text-white flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-[#16161d] border-r border-white/5
                flex flex-col transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-[70px] flex items-center justify-between px-6 border-b border-white/5">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/20">
                            H
                        </div>
                        <div>
                            <span className="text-sm font-bold tracking-wider text-white/90 group-hover:text-white transition-colors">HSD</span>
                            <span className="text-[10px] text-white/40 block -mt-0.5 tracking-[0.2em] uppercase">Admin Panel</span>
                        </div>
                    </button>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-3 mb-3">Menü</p>
                    {sidebarLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'bg-gradient-to-r from-red-500/15 to-transparent text-red-400 shadow-sm'
                                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                                }
                            `}
                        >
                            <link.icon size={18} />
                            <span>{link.name}</span>
                            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <LogOut size={18} />
                        <span>Siteye Dön</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="h-[70px] bg-[#16161d]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-white/60 hover:text-white transition-colors"
                    >
                        <Menu size={22} />
                    </button>
                    <div className="hidden lg:block text-sm text-white/30">
                        HSD Agency Yönetim Paneli
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
