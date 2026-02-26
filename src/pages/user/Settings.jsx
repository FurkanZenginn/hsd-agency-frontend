import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    User, Bell, Shield, Check, AlertCircle, Lock,
    Camera, KeyRound, RefreshCw, Mail, Phone, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserSettings, uploadProfileImage } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SectionCard = ({ title, icon: Icon, children, danger = false }) => (
    <div className={`rounded-[2rem] p-8 border ${danger ? 'bg-red-50/30 border-red-100' : 'bg-white/60 backdrop-blur-xl border-white/80'} shadow-sm mb-8`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
            <div className={`p-2.5 rounded-xl ${danger ? 'bg-red-100 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                {Icon && <Icon size={20} />}
            </div>
            <h2 className={`text-xl font-bold ${danger ? 'text-red-600' : 'text-stone-900'}`}>{title}</h2>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const ToggleSwitch = ({ label, description, checked, onChange }) => (
    <div className="flex items-start sm:items-center justify-between gap-4 group p-4 rounded-2xl border border-stone-100 bg-white hover:border-orange-200 transition-colors">
        <div className="flex-1">
            <p className="font-bold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors">{label}</p>
            <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative flex-shrink-0 w-14 h-8 rounded-full transition-colors duration-300 ${checked ? 'bg-orange-500' : 'bg-stone-200'}`}
        >
            <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-xl animate-fade-in ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
            }`}>
            {type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold text-sm tracking-wide">{message}</span>
        </div>
    );
};

const Settings = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    // Profile Image Upload States
    const fileInputRef = useRef(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // Form States
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+90 555 123 4567', // Mock phone
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [toggles, setToggles] = useState({
        twoFactor: true,
        smsReminders: true,
        emailReminders: true,
        marketing: false,
        styleDiaryAlerts: true
    });

    useEffect(() => {
        const fetchSettings = async () => {
            await getUserSettings(); // Keep the API call for realistic loading, but disregard result
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const closeToast = useCallback(() => {
        setToast(null);
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be less than 5MB.', 'error');
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showToast('Invalid file type. Please upload a JPG, PNG, or GIF.', 'error');
            return;
        }

        setPreviewImage(URL.createObjectURL(file));
        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('profileImage', file);

            const result = await uploadProfileImage(formData);
            if (result.success) {
                if (updateUser) {
                    updateUser({ avatar: URL.createObjectURL(file) });
                }
                showToast('Profile picture updated successfully!');
            } else {
                throw new Error('Upload failed');
            }
        } catch {
            setPreviewImage(null); // Revert to previous image
            showToast('Failed to upload image. Please try again.', 'error');
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            showToast('Name and Email are required.', 'error');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (updateUser) {
            updateUser({ name: formData.name, email: formData.email, phone: formData.phone });
        }

        showToast('Personal information updated successfully!');
    };

    const handleSaveSecurity = (e) => {
        e.preventDefault();
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            showToast('All password fields are required.', 'error');
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            showToast('New passwords do not match.', 'error');
            return;
        }
        if (formData.newPassword.length < 8) {
            showToast('Password must be at least 8 characters.', 'error');
            return;
        }
        showToast('Security settings updated successfully!');
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
    );

    const tabs = [
        { id: 'profile', label: 'Personal Info', icon: User, desc: 'Manage your identity' },
        { id: 'security', label: 'Security Center', icon: Shield, desc: 'Passwords & 2FA' },
        { id: 'notifications', label: 'Notification Engine', icon: Bell, desc: 'Alerts & Reminders' }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 lg:px-0 pb-20 font-sans animate-fade-in">

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-2">Account Settings</h1>
                <p className="text-stone-500 font-medium">Manage your personal preferences, security, and beauty concierge settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left: Vertical Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-4 shadow-sm border border-white/80 sticky top-24">
                        <nav className="space-y-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-300 flex-shrink-0 lg:flex-shrink text-left group ${activeTab === tab.id
                                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                                        : 'text-stone-500 hover:bg-white hover:text-stone-900 border border-transparent hover:border-stone-100 hover:shadow-sm'
                                        }`}
                                >
                                    <div className={`${activeTab === tab.id ? 'text-white' : 'text-stone-400 group-hover:text-orange-500 transition-colors'}`}>
                                        <tab.icon size={22} />
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className={`text-sm font-bold ${activeTab === tab.id ? 'text-white' : 'text-stone-900'}`}>{tab.label}</div>
                                        <div className={`text-xs ${activeTab === tab.id ? 'text-orange-100' : 'text-stone-400'}`}>{tab.desc}</div>
                                    </div>
                                    <div className="lg:hidden text-sm font-bold">{tab.label}</div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Right: Content Modules */}
                <div className="lg:col-span-3 space-y-8">

                    {/* 1. PERSONAL INFO MODULE */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <SectionCard title="Personal Information" icon={User}>

                                {/* Profile Picture Area */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 bg-stone-50/50 rounded-2xl border border-stone-100">
                                    <div className="relative group cursor-pointer" onClick={() => !isUploadingImage && fileInputRef.current?.click()}>
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
                                            <img
                                                src={previewImage || user?.avatar || "https://ui-avatars.com/api/?name=Busra+Yavuz&background=FAF7F2&color=2D2A26"}
                                                alt="Profile"
                                                className={`w-full h-full object-cover transition-opacity duration-300 ${isUploadingImage ? 'opacity-50 grayscale' : 'opacity-100'} group-hover:opacity-80`}
                                            />
                                            {isUploadingImage && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <RefreshCw size={24} className="text-white animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors pointer-events-auto"
                                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                        >
                                            <Camera size={14} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="font-bold text-stone-900 text-lg">Profile Picture</h3>
                                        <p className="text-sm text-stone-500 mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-2"
                                        >
                                            View Public Profile
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+90 (___) ___ ____"
                                                    className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-full space-y-2">
                                            <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-stone-100">
                                        <button type="submit" className="bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40">
                                            Save Profile Changes
                                        </button>
                                    </div>
                                </form>
                            </SectionCard>
                        </div>
                    )}

                    {/* 2. SECURITY CENTER */}
                    {activeTab === 'security' && (
                        <div className="animate-fade-in space-y-8">
                            <SectionCard title="Password Management" icon={KeyRound}>
                                <form onSubmit={handleSaveSecurity} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">Current Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">Confirm New Password</label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3.5 font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-stone-100">
                                        <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-stone-900/20">
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </SectionCard>

                            <SectionCard title="Two-Factor Authentication (2FA)" icon={Shield}>
                                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl mb-6 flex gap-4 items-start">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0"><ShieldCheck size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-amber-900">Gold Member Security Feature</h4>
                                        <p className="text-sm text-amber-800/80 mt-1">Add an extra layer of security to your account. Once enabled, you'll be required to enter a code sent to your phone during sign-in.</p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    label="Enable 2FA via SMS"
                                    description="Receive a secure 6-digit code to +90 555 123 4567 upon login."
                                    checked={toggles.twoFactor}
                                    onChange={(val) => {
                                        setToggles(p => ({ ...p, twoFactor: val }))
                                        showToast(`2FA ${val ? 'Enabled' : 'Disabled'} Successfully`, 'success')
                                    }}
                                />
                            </SectionCard>
                        </div>
                    )}

                    {/* 3. NOTIFICATION ENGINE */}
                    {activeTab === 'notifications' && (
                        <div className="animate-fade-in space-y-8">
                            <SectionCard title="Communication Preferences" icon={Bell}>
                                <div className="space-y-4">
                                    <ToggleSwitch
                                        label="Push & SMS Reminders"
                                        description="Crucial appointment alerts 24h & 2h before your scheduled visit to avoid missed bookings."
                                        checked={toggles.smsReminders}
                                        onChange={(val) => {
                                            setToggles(p => ({ ...p, smsReminders: val }))
                                            showToast('SMS Preferences Updated')
                                        }}
                                    />
                                    <ToggleSwitch
                                        label="Email Confirmations"
                                        description="Receive detailed receipts, preparation guides, and post-visit aftercare instructions."
                                        checked={toggles.emailReminders}
                                        onChange={(val) => {
                                            setToggles(p => ({ ...p, emailReminders: val }))
                                            showToast('Email Preferences Updated')
                                        }}
                                    />
                                    <ToggleSwitch
                                        label="New Service & Product Announcements"
                                        description="Be the first to know about new high-end treatments, VIP slots, and restocked premium products."
                                        checked={toggles.marketing}
                                        onChange={(val) => {
                                            setToggles(p => ({ ...p, marketing: val }))
                                            showToast('Marketing Preferences Updated')
                                        }}
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard title="Concierge Updates" icon={RefreshCw}>
                                <div className="space-y-4">
                                    <ToggleSwitch
                                        label="Style Diary Updates"
                                        description="Get notified instantly when your expert uploads a new Before & After photo to your gallery."
                                        checked={toggles.styleDiaryAlerts}
                                        onChange={(val) => {
                                            setToggles(p => ({ ...p, styleDiaryAlerts: val }));
                                            showToast('Style Diary Alerts Updated');
                                        }}
                                    />
                                </div>
                            </SectionCard>
                        </div>
                    )}

                </div>
            </div>

            {/* Global Toast Area */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
        </div>
    );
};

export default Settings;
