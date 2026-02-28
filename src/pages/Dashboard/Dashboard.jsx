import { useState } from 'react';
import { Calendar, User, Settings, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AppointmentsList } from './AppointmentsList';
import { ProfileSettings } from './ProfileSettings';
import { Booking } from '../Booking'; // Reuse booking form inside dashboard

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('appointments');
    const [logoutModal, setLogoutModal] = useState(false);

    const tabs = [
        { id: 'appointments', label: 'Randevularım', icon: Calendar },
        { id: 'new', label: 'Randevu Al', icon: Plus },
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'settings', label: 'Ayarlar', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-light pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-primary-500/10 to-transparent"></div>

            <div className="max-w-[90rem] mx-auto relative z-10">
                <div className="mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif text-dark tracking-tight mb-3">Hoş Geldiniz, <span className="text-primary-500">{user?.name || 'Kullanıcı'}</span></h1>
                    <p className="text-gray-500 text-lg font-light">Randevularınızı ve hesap ayarlarınızı yönetin.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-white/80 backdrop-blur-md shadow-xl border border-white/50 rounded-3xl p-5 sticky top-40">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium tracking-wider text-[13px] transition-all duration-300 ${isActive
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                                : 'text-gray-500 hover:bg-gray-50/80 hover:text-dark'
                                                }`}
                                        >
                                            <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} strokeWidth={isActive ? 2 : 1.5} />
                                            {tab.label}
                                        </button>
                                    );
                                })}

                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => setLogoutModal(true)}
                                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium tracking-wider text-[13px] text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                                    >
                                        <LogOut size={20} strokeWidth={1.5} />
                                        Çıkış Yap
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {activeTab === 'appointments' && <AppointmentsList />}
                        {activeTab === 'new' && (
                            <div className="bg-white/80 backdrop-blur-md shadow-xl border border-white/50 rounded-[2rem] overflow-hidden">
                                {/* Wrap booking to limit max-width if needed or let it fill */}
                                <Booking isDashboard={true} onBookingComplete={() => setActiveTab('appointments')} />
                            </div>
                        )}
                        {activeTab === 'profile' && <ProfileSettings view="profile" />}
                        {activeTab === 'settings' && <ProfileSettings view="settings" />}
                    </main>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {logoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-md">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full shadow-2xl animate-fade-in-up text-center border overflow-hidden">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                            <LogOut size={36} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-serif text-dark mb-3">Çıkış Yap?</h3>
                        <p className="text-gray-500 mb-10 font-light text-lg">Hesabınızdan çıkış yapmak istediğinize emin misiniz?</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setLogoutModal(false)} className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-dark transition-colors border border-gray-200">Vazgeç</button>
                            <button onClick={() => { logout(); setLogoutModal(false); }} className="flex-1 py-4 bg-red-500 text-white font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Çıkış Yap</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
