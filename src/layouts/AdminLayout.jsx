import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, ShoppingBag, BarChart3, Image, LogOut, Settings, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, to }) => (
    <NavLink
        to={to}
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

    return (
        <div className="flex min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#FAF7F2] border-r border-[#E5E0D8] fixed h-full z-10">
                <div className="h-24 flex items-center px-8">
                    <h1 className="text-xl font-bold tracking-tight text-[var(--color-foreground)]">
                        HSD <span className="font-medium text-[#7B9E89]">ADMIN</span>
                    </h1>
                </div>

                <nav className="px-4 space-y-1">
                    <div className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest px-4 mb-4 mt-2">
                        Management
                    </div>
                    <SidebarItem icon={LayoutDashboard} label="Overview" to="/admin/overview" />
                    <SidebarItem icon={Calendar} label="Appointments" to="/admin/appointments" />
                    <SidebarItem icon={Users} label="Staff" to="/admin/staff" />
                    <SidebarItem icon={Layers} label="Services" to="/admin/services" />
                    <SidebarItem icon={ShoppingBag} label="Products" to="/admin/products" />
                    <SidebarItem icon={BarChart3} label="Analytics" to="/admin/analytics" />

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

            {/* Main Content */}
            <div className="flex-1 ml-72">
                <header className="sticky top-0 z-20 h-20 px-8 flex items-center justify-between bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[#E5E0D8]">
                    <h2 className="font-bold text-lg text-[var(--color-foreground)]">Admin Portal</h2>
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
