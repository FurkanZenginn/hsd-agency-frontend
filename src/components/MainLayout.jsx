import React, { useState } from 'react';
import { Menu, LayoutDashboard, Calendar, Users, Image, ShoppingBag, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
    ${isActive
                ? 'bg-orange-50 text-[var(--color-primary)] font-semibold shadow-sm border border-orange-100'
                : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-foreground)] hover:pl-5'
            }`}
    >
        {({ isActive }) => (
            <>
                <Icon size={20} className={`${isActive ? 'text-[var(--color-primary)]' : 'text-stone-400 group-hover:text-[var(--color-foreground)]'}`} />
                <span className="tracking-wide text-sm">{label}</span>
            </>
        )}
    </NavLink>
);

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    const isAdmin = user?.role === 'admin';

    return (
        <div className="flex min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Warm Light/Cream */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-[#FAF7F2] border-r border-[#E5E0D8]
        transform transition-transform duration-300 ease-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-24 flex items-center px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--color-foreground)] flex items-center gap-2">
                        HSD <span className="font-medium text-[var(--color-primary)]">AGENCY</span>
                    </h1>
                </div>

                <nav className="px-4 space-y-2">
                    <div className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest px-4 mb-4 mt-2">
                        {isAdmin ? 'Business Admin' : 'Client Portal'}
                    </div>

                    {isAdmin && (
                        <>
                            <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/admin-dashboard" />
                            <SidebarItem icon={Calendar} label="Appointments" to="/appointments" />
                            <SidebarItem icon={Users} label="Staff Management" to="/admin-dashboard" />
                            <SidebarItem icon={ShoppingBag} label="Products" to="#" />
                        </>
                    )}

                    {!isAdmin && (
                        <>
                            <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/home" />
                            <SidebarItem icon={ShoppingBag} label="Products" to="/products" />
                            <SidebarItem icon={Users} label="Our Experts" to="/explore-staff" />
                            <SidebarItem icon={Calendar} label="Appointments" to="/appointments" />
                            <SidebarItem icon={Image} label="Media Gallery" to="/media" />
                        </>
                    )}

                    <div className="pt-8">
                        <div className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest px-4 mb-4">Account</div>
                        <SidebarItem icon={User} label="Profile" to="/profile" />
                    </div>

                    <div className="pt-2">
                        <div className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest px-4 mb-4">Preferences</div>
                        <SidebarItem icon={Settings} label="Settings" to="/settings" />
                    </div>

                    <div className="pt-8 px-4">
                        <button
                            onClick={logout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-[var(--color-primary)] hover:bg-orange-50 hover:font-bold"
                        >
                            <LogOut size={20} />
                            <span className="tracking-wide text-sm">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-background)]">
                {/* Navbar - Light and Warm */}
                <header className="sticky top-0 z-30 h-20 px-4 lg:px-8 flex items-center justify-between bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[#E5E0D8]">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        {/* Mobile Logo */}
                        <div className="lg:hidden font-bold text-xl tracking-tight text-[var(--color-foreground)]">
                            HSD <span className="text-[var(--color-primary)]">AGENCY</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 ml-auto mr-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-bold text-[var(--color-foreground)]">
                                {user?.name || 'Guest'}
                            </span>
                            <span className="text-xs text-[var(--color-foreground-muted)] font-medium uppercase tracking-wider">
                                {isAdmin ? 'Business Admin' : 'Valued Client'}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 p-[2px] cursor-pointer ring-2 ring-transparent hover:ring-orange-200 transition-all shadow-sm">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-orange-100">
                                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=FF8C42&color=fff`} alt="Profile" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
