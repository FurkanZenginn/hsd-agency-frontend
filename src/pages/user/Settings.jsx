import React, { useState, useEffect } from 'react';
import {
    User, Bell, CreditCard, Shield, Moon, Sun, Monitor,
    Smartphone, Trash2, Check, ChevronRight, AlertCircle, Lock,
    Database, Code, Cpu, Terminal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserSettings } from '../../services/api';

const SectionCard = ({ title, icon: Icon, children, danger = false }) => (
    <div className={`rounded-[2rem] p-8 border ${danger ? 'bg-red-50/30 border-red-100' : 'bg-white border-stone-100'} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] mb-8`}>
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl ${danger ? 'bg-red-100 text-red-500' : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'}`}>
                <Icon size={22} />
            </div>
            <h2 className={`text-xl font-bold ${danger ? 'text-red-600' : 'text-[var(--color-foreground)]'}`}>{title}</h2>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const ToggleSwitch = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between group">
        <div>
            <p className="font-bold text-[var(--color-foreground)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">{label}</p>
            <p className="text-sm text-[var(--color-foreground-muted)]">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${checked ? 'bg-[var(--color-primary)]' : 'bg-stone-200'}`}
        >
            <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getUserSettings();
            setSettings(data);
            setLoading(false);
        };
        fetchSettings();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh] text-[var(--color-foreground-muted)] animate-pulse">
            Loading preferences...
        </div>
    );

    const tabs = [
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'appearance', label: 'App Experience', icon: Monitor },
        { id: 'notifications', label: 'Notification Hub', icon: Bell },
        { id: 'technical', label: 'Developer Controls', icon: Terminal },
    ];

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
            {/* Left: Navigation */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 sticky top-24">
                    <div className="px-4 py-4 mb-2 border-b border-stone-100">
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">HSD Settings</h3>
                    </div>
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-orange-50 text-[var(--color-primary)] shadow-sm'
                                    : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-foreground)]'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-3 space-y-8">

                {/* USER PROFILE */}
                {activeTab === 'profile' && (
                    <SectionCard title="User Profile" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[var(--color-foreground-muted)]">Full Name</label>
                                <input type="text" defaultValue={user?.name} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 font-medium text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[var(--color-foreground-muted)]">Email Address</label>
                                <input type="email" defaultValue={user?.email} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 font-medium text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
                            </div>
                            <div className="col-span-full space-y-2">
                                <label className="text-sm font-bold text-[var(--color-foreground-muted)]">Career Bio</label>
                                <textarea defaultValue="Computer Engineering Student | AI Tech Intern specializing in Data Cleaning & NLP." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 font-medium text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-primary)] transition-colors h-24 resize-none" />
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm font-bold text-[var(--color-foreground-muted)] mb-2 block">Active Projects</label>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium border border-orange-100">AI Data Cleaning Assistant</span>
                                    <span className="px-3 py-1 bg-[#7B9E89]/10 text-[#7B9E89] rounded-lg text-sm font-medium border border-[#7B9E89]/20">TikTok Content Classification</span>
                                </div>
                            </div>
                        </div>
                    </SectionCard>
                )}

                {/* APP EXPERIENCE */}
                {activeTab === 'appearance' && (
                    <SectionCard title="App Experience" icon={Monitor}>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center gap-4 p-4 rounded-xl border-2 border-[var(--color-primary)] bg-orange-50/30">
                                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                                    <Sun size={20} />
                                </span>
                                <div className="text-left">
                                    <p className="font-bold text-[var(--color-foreground)]">Visionary Mode</p>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">Warm Cream & Orange</p>
                                </div>
                                <div className="ml-auto text-[var(--color-primary)]"><Check size={20} /></div>
                            </button>
                            <button className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 hover:border-stone-300 opacity-60">
                                <span className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                    <Moon size={20} />
                                </span>
                                <div className="text-left">
                                    <p className="font-bold text-[var(--color-foreground)]">Midnight Mode</p>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">Pure Dark Slate</p>
                                </div>
                            </button>
                        </div>

                        <div className="h-px bg-stone-100 my-4" />
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--color-foreground-muted)]">Language</label>
                            <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 font-medium text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-primary)] transition-colors">
                                <option>English (US) - Professional</option>
                                <option>Turkish (TR)</option>
                                <option>Spanish (ES)</option>
                            </select>
                        </div>
                    </SectionCard>
                )}

                {/* NOTIFICATION HUB */}
                {activeTab === 'notifications' && (
                    <SectionCard title="Notification Hub" icon={Bell}>
                        <ToggleSwitch
                            label="New Service Alerts"
                            description="Deep learning model updates and new API endpoint alerts."
                            checked={settings.notifications.email}
                            onChange={() => { }}
                        />
                        <ToggleSwitch
                            label="Appointment Reminders"
                            description="SMS notifications synchronized with your calendar."
                            checked={settings.notifications.sms}
                            onChange={() => { }}
                        />
                        <ToggleSwitch
                            label="System Updates"
                            description="Platform changelogs and maintenance schedules."
                            checked={true}
                            onChange={() => { }}
                        />
                    </SectionCard>
                )}

                {/* DEVELOPER CONTROLS */}
                {activeTab === 'technical' && (
                    <SectionCard title="Developer Controls" icon={Database}>
                        <div className="bg-stone-900 rounded-xl p-6 text-white mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Terminal size={18} className="text-[#FF8C42]" />
                                    <span className="font-mono text-sm font-bold">API Status</span>
                                </div>
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">Operational</span>
                            </div>
                            <code className="font-mono text-sm text-stone-300 break-all block mb-2">
                                GET https://api.hsd-agency.com/v1/user/profile
                            </code>
                            <p className="text-xs text-stone-500 mt-2">Latency: 45ms</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 border border-stone-200 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Code size={20} /></div>
                                    <div>
                                        <p className="font-bold text-sm text-[var(--color-foreground)]">Mock Webhooks</p>
                                        <p className="text-xs text-[var(--color-foreground-muted)]">Receive events on localhost:3000</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-lg hover:bg-stone-200">Test Pixel</button>
                            </div>
                        </div>
                    </SectionCard>
                )}
            </div>
        </div>
    );
};

export default Settings;
