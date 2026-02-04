import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Smartphone, Mail, Bell, Briefcase, Code, Database, Cpu, Layers, Award, Terminal, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState({ email: true, sms: false });

    // Mock Impact Data
    const impactStats = [
        { label: 'Active Projects', value: '5', sub: 'Data Cleaning Assistant', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Skills Verified', value: 'Elite', sub: 'SQL, Python, Flutter', icon: Code, color: 'text-[#7B9E89]', bg: 'bg-[#7B9E89]/10' },
        { label: 'Platform Status', value: 'Elite Member', sub: 'Top 5% Contributor', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
    ];

    const activeCollaborations = [
        { title: 'AI Data Cleaning Assistant', role: 'Lead Developer', progress: 75, color: 'bg-orange-500' },
        { title: 'TikTok Content Classification', role: 'AI Specialist', progress: 40, color: 'bg-[#7B9E89]' },
    ];

    const skills = [
        "Oracle SQL", "PL/SQL", "Python", "Flutter", "NLP", "React", "Data Engineering", "System Design"
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-16 animate-fade-in">
            {/* 1. Profile Hero Section */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col items-center text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--color-background)] to-transparent opacity-50" />

                <div className="relative z-10 w-40 h-40 rounded-full p-2 border-2 border-[var(--color-primary)] shadow-xl bg-white mb-6">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=FF8C42&color=fff"}
                        alt={user?.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                <div className="relative z-10 space-y-2 mb-8">
                    <h1 className="text-4xl font-bold text-[var(--color-foreground)] tracking-tight">
                        {user?.name || 'Guest User'}
                    </h1>
                    <p className="text-lg text-[var(--color-foreground-muted)] font-medium">
                        Computer Engineering Student | AI Tech Intern
                    </p>
                </div>

                <button className="relative z-10 px-8 py-3 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                    Personalize Profile
                </button>
            </div>

            {/* 2. Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {impactStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
                            <stat.icon size={28} strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-bold text-[var(--color-foreground-muted)] uppercase tracking-wider mb-1">
                            {stat.label}
                        </p>
                        <h3 className="text-3xl font-bold text-[var(--color-foreground)] mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-[var(--color-foreground-muted)] font-medium">
                            {stat.sub}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 3. Professional Portfolio */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
                        <Layers className="text-[var(--color-primary)]" />
                        Active Collaborations
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {activeCollaborations.map((collab, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-foreground)]">{collab.title}</h3>
                                        <p className="text-sm text-[var(--color-foreground-muted)]">{collab.role}</p>
                                    </div>
                                    <span className="text-xs font-bold bg-stone-100 px-3 py-1 rounded-full text-stone-600 uppercase tracking-wide">
                                        In Progress
                                    </span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-stone-400 mb-2">
                                        <span>Progress</span>
                                        <span>{collab.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${collab.color}`}
                                            style={{ width: `${collab.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Technical Skills & Tools */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
                        <Terminal className="text-[#7B9E89]" />
                        Technical Stack
                    </h2>
                    <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1.5 rounded-lg bg-stone-50 text-stone-600 text-sm font-medium border border-stone-100 hover:border-orange-200 hover:text-orange-600 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Account Settings */}
            <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm">
                <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
                    <Shield className="text-stone-400" />
                    Account Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <button className="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-[var(--color-primary)] transition-colors">
                                <Lock size={18} />
                            </div>
                            <span className="font-medium text-[var(--color-foreground)]">Security & Passwords</span>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-[var(--color-primary)] transition-colors">
                                <Bell size={18} />
                            </div>
                            <span className="font-medium text-[var(--color-foreground)]">Notification Preferences</span>
                        </div>
                    </button>
                    <button
                        onClick={logout}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors group md:col-span-2 mt-4 border-t border-stone-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-100 rounded-lg text-red-500 group-hover:text-red-600 transition-colors">
                                <LogOut size={18} />
                            </div>
                            <span className="font-medium text-[var(--color-foreground)] group-hover:text-red-600">Sign Out</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
