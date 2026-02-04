import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Star, Shield, Lock, Smartphone, Mail, Bell, Edit3 } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    // Mock Stats Data
    const stats = [
        { label: 'Total Appointments', value: '24', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Favorite Business', value: 'Elite Cuts', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Member Since', value: 'Oct 2024', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    const [notifications, setNotifications] = useState({ email: true, sms: false });

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header Card: Identity */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                {/* Soft Background Gradient Blob */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-50/50 to-stone-50/50" />

                <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden ring-4 ring-orange-50 translate-y-2 md:translate-y-0">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=FF8C42&color=fff"}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 text-center md:text-left flex-1 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-1">{user?.name || 'Guest User'}</h1>
                    <p className="text-[var(--color-foreground-muted)]">{user?.email || 'guest@example.com'}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                        <span className="px-4 py-1.5 rounded-full bg-stone-100 text-xs font-bold uppercase tracking-wider text-stone-500 border border-stone-200">
                            {user?.role || 'Customer'}
                        </span>
                    </div>
                </div>

                <div className="relative z-10">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg">
                        <Edit3 size={18} />
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={26} />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--color-foreground-muted)] font-medium mb-0.5">{stat.label}</p>
                            <p className="text-2xl font-bold text-[var(--color-foreground)]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security */}
                <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
                        <div className="p-2 bg-stone-50 rounded-lg"><Lock size={20} className="text-stone-400" /></div>
                        Account Security
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all group">
                            <span className="font-medium text-stone-600 group-hover:text-[var(--color-foreground)]">Change Password</span>
                            <span className="text-stone-400 text-sm">••••••••</span>
                        </button>
                        <div className="w-full flex items-center justify-between p-4 rounded-xl">
                            <span className="font-medium text-stone-600">Two-Factor Authentication</span>
                            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Enabled</span>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
                        <div className="p-2 bg-stone-50 rounded-lg"><Bell size={20} className="text-stone-400" /></div>
                        Preferences
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-[var(--color-primary)] transition-colors"><Mail size={18} /></div>
                                <div>
                                    <p className="font-medium text-[var(--color-foreground)]">Email Notifications</p>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">Booking updates & news</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-[var(--color-primary)]' : 'bg-stone-200'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${notifications.email ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-[var(--color-primary)] transition-colors"><Smartphone size={18} /></div>
                                <div>
                                    <p className="font-medium text-[var(--color-foreground)]">SMS Alerts</p>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">Reminders & Promos</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.sms ? 'bg-[var(--color-primary)]' : 'bg-stone-200'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${notifications.sms ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
