import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    Award,
    Sparkles,
    User,
    Settings,
    Image as ImageIcon,
    LogOut,
    ChevronRight,
    Heart,
    Star
} from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Mock Data for Customer View
    const stats = [
        {
            label: "Upcoming",
            value: "2 Appointments",
            icon: Calendar,
            bg: "bg-orange-50",
            text: "text-orange-600",
            border: "border-orange-100"
        },
        {
            label: "Total Visits",
            value: "12 Visits",
            icon: Clock,
            bg: "bg-stone-50",
            text: "text-stone-600",
            border: "border-stone-100"
        },
        {
            label: "Loyalty Points",
            value: "450 Points",
            icon: Award,
            bg: "bg-[#7B9E89]/10",
            text: "text-[#7B9E89]",
            border: "border-[#7B9E89]/20"
        },
    ];

    const preferences = {
        staff: [
            { name: "Marcus Johnson", role: "Senior Stylist", avatar: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=2D2A26&color=fff" },
            { name: "Sarah Lee", role: "Colorist", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=FF8C42&color=fff" }
        ],
        services: ["Classic Haircut", "Skin Care", "Beard Trim"]
    };

    const quickActions = [
        { title: "My Booking History", icon: Calendar, sub: "View past services" },
        { title: "Edit Personal Info", icon: Settings, sub: "Contact details" },
        { title: "My Gallery", icon: ImageIcon, sub: "Before & after" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in px-4 md:px-0">

            {/* 1. Customer Header */}
            <div className="bg-[#FFFDF9] rounded-[2rem] p-8 border border-stone-100 shadow-[0_8px_30px_-4px_rgba(45,42,38,0.03)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />

                <div className="relative z-10 w-32 h-32 rounded-full p-2 border border-stone-100 bg-white shadow-sm flex-shrink-0">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=Busra+Yavuz&background=FAF7F2&color=2D2A26"}
                        alt={user?.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-gradient-to-r from-amber-300 to-amber-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm" title="Gold Member">
                        <Sparkles size={14} fill="white" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">
                            Büşra Yavuz
                        </h1>
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider border border-amber-100">
                            Gold Member
                        </span>
                    </div>
                    <p className="text-[var(--color-foreground-muted)] font-medium">
                        Member since Jan 2025
                    </p>
                </div>
            </div>

            {/* 2. Loyalty & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-6 rounded-3xl border ${stat.border} ${stat.bg} flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300`}>
                        <div className={`p-3 rounded-2xl bg-white shadow-sm mb-4 ${stat.text}`}>
                            <stat.icon size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-[var(--color-foreground-muted)] font-medium uppercase tracking-wide opacity-80">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* 3. My Preferences */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
                        <Heart className="text-[var(--color-primary)]" strokeWidth={2.5} size={20} />
                        Personal Preferences
                    </h2>

                    <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm space-y-8">
                        {/* Preferred Staff */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-[var(--color-foreground-muted)] uppercase tracking-wider">
                                Favorite Specialists
                            </h3>
                            <div className="flex gap-6">
                                {preferences.staff.map((person, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full border border-stone-100" />
                                        <div>
                                            <p className="font-bold text-[var(--color-foreground)] text-sm">{person.name}</p>
                                            <p className="text-xs text-[var(--color-foreground-muted)]">{person.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-stone-50" />

                        {/* Favorite Services */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-[var(--color-foreground-muted)] uppercase tracking-wider">
                                Favorite Services
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {preferences.services.map((service, idx) => (
                                    <span key={idx} className="px-4 py-2 rounded-xl bg-stone-50 text-stone-600 text-sm font-medium border border-stone-100 hover:border-orange-200 hover:text-orange-600 transition-colors cursor-default">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Quick Access Grid */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)]">Quick Access</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {quickActions.map((action, idx) => (
                            <button key={idx} className="group w-full p-4 rounded-2xl bg-white border border-stone-100 shadow-sm hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300 text-left flex items-center gap-4">
                                <div className="p-3 bg-stone-50 rounded-xl text-stone-500 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                    <action.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[var(--color-foreground)] group-hover:text-orange-600 transition-colors">
                                        {action.title}
                                    </h4>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">
                                        {action.sub}
                                    </p>
                                </div>
                                <ChevronRight size={16} className="text-stone-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Logout */}
            <div className="flex justify-center pt-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-10 py-3.5 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-200/50"
                >
                    <LogOut size={18} />
                    <span>Sign Out Securely</span>
                </button>
            </div>

        </div>
    );
};

export default Profile;
