import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, ShoppingBag, BarChart3, Image, LogOut, Settings, Layers, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
    ${isActive
                ? 'bg-[#7B9E89]/10 text-[#7B9E89] font-bold shadow-sm border border-[#7B9E89]/20'
                : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-foreground)] hover:pl-5'
            }`}
    >
        {({ isActive }) => (
            <>
                <Icon size={20} className={`${isActive ? 'text-[#7B9E89]' : 'text-stone-400 group-hover:text-[var(--color-foreground)]'}`} />
                <span className="tracking-wide text-sm">{label}</span>
            </>
        )}
    </NavLink>
);

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Auto-Close Function
    const handleNavigation = () => {
        if (window.innerWidth < 1024) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] relative">

            {/* Sidebar Overlay (Backdrop) */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Sidebar - Drawer Style */}
            <aside className={`
                fixed inset-y-0 left-0 z-50
                w-72 bg-[#FAF7F2] border-r border-[#E5E0D8] h-full
                transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                <div className="h-24 flex items-center px-8">
                    <h1 className="text-xl font-bold tracking-tight text-[var(--color-foreground)]">
                        HSD <span className="font-medium text-[#7B9E89]">ADMIN</span>
                    </h1>
                </div>

                <nav className="px-4 space-y-1">
                    <div className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest px-4 mb-4 mt-2">
                        Management
                    </div>
                    <SidebarItem icon={LayoutDashboard} label="Overview" to="/admin/overview" onClick={handleNavigation} />
                    <SidebarItem icon={Calendar} label="Appointments" to="/admin/appointments" onClick={handleNavigation} />
                    <SidebarItem icon={Users} label="Staff" to="/admin/staff" onClick={handleNavigation} />
                    <SidebarItem icon={Layers} label="Services" to="/admin/services" onClick={handleNavigation} />
                    <SidebarItem icon={ShoppingBag} label="Products" to="/admin/products" onClick={handleNavigation} />
                    <SidebarItem icon={BarChart3} label="Analytics" to="/admin/analytics" onClick={handleNavigation} />

                    <div className="pt-8 px-4">
                        <button
                            onClick={logout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-[#FF8C42] hover:bg-orange-50 hover:font-bold"
                        >
                            <LogOut size={20} />
                            <span className="tracking-wide text-sm">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content - Full Width */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-background)] w-full">
                <header className="sticky top-0 z-30 h-20 px-4 lg:px-8 flex items-center justify-between bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[#E5E0D8]">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-[var(--color-foreground-muted)] hover:text-[#7B9E89] hover:bg-[#7B9E89]/10 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h2 className="font-bold text-lg text-[var(--color-foreground)]">Admin Portal</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold">{user?.name || 'Administrator'}</p>
                            <p className="text-xs text-[var(--color-foreground-muted)]">Verified Staff</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#7B9E89] text-white flex items-center justify-center font-bold">
                            {user?.name?.[0] || 'A'}
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
