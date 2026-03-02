import { BarChart3, Users, Calendar, TrendingUp, Eye, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
    {
        label: 'Toplam Ziyaretçi',
        value: '1,248',
        change: '+12.5%',
        up: true,
        icon: Eye,
        color: 'from-blue-500 to-cyan-400',
        shadow: 'shadow-blue-500/20',
    },
    {
        label: 'Randevu Sayısı',
        value: '64',
        change: '+8.2%',
        up: true,
        icon: Calendar,
        color: 'from-emerald-500 to-green-400',
        shadow: 'shadow-emerald-500/20',
    },
    {
        label: 'Aktif Müşteri',
        value: '312',
        change: '+3.1%',
        up: true,
        icon: Users,
        color: 'from-violet-500 to-purple-400',
        shadow: 'shadow-violet-500/20',
    },
    {
        label: 'Aylık Gelir',
        value: '₺28,450',
        change: '-2.4%',
        up: false,
        icon: TrendingUp,
        color: 'from-red-500 to-orange-400',
        shadow: 'shadow-red-500/20',
    },
];

const recentAppointments = [
    { name: 'Ahmet Yılmaz', service: 'Saç Kesimi', time: '14:00', status: 'Tamamlandı' },
    { name: 'Mehmet Kaya', service: 'Sakal Tıraşı', time: '15:30', status: 'Bekliyor' },
    { name: 'Ali Demir', service: 'Saç + Sakal', time: '16:00', status: 'Bekliyor' },
    { name: 'Can Öztürk', service: 'Saç Boyama', time: '17:00', status: 'İptal' },
    { name: 'Emre Arslan', service: 'Saç Kesimi', time: '18:00', status: 'Bekliyor' },
];

const statusColor = {
    'Tamamlandı': 'bg-emerald-500/10 text-emerald-400',
    'Bekliyor': 'bg-amber-500/10 text-amber-400',
    'İptal': 'bg-red-500/10 text-red-400',
};

export const AdminAnalytics = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Analitik Panel</h1>
                <p className="text-white/40 text-sm mt-1">Genel bakış ve istatistikler</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#1c1c27] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg flex items-center justify-center`}>
                                <stat.icon size={20} className="text-white" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-white/30 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <div className="xl:col-span-2 bg-[#1c1c27] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Clock size={18} className="text-white/30" />
                            <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider">Son Randevular</h2>
                        </div>
                    </div>
                    <div className="divide-y divide-white/5">
                        {recentAppointments.map((apt, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 text-sm font-bold">
                                        {apt.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white/80">{apt.name}</p>
                                        <p className="text-xs text-white/30">{apt.service}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-white/40 hidden sm:block">{apt.time}</span>
                                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${statusColor[apt.status]}`}>
                                        {apt.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Info */}
                <div className="bg-[#1c1c27] border border-white/5 rounded-2xl p-6 flex flex-col">
                    <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">Hızlı Bilgiler</h2>
                    <div className="space-y-5 flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/40">Bugünkü Randevular</span>
                            <span className="text-lg font-bold text-white">8</span>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/40">Aktif Ürünler</span>
                            <span className="text-lg font-bold text-white">6</span>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/40">Ekip Üyeleri</span>
                            <span className="text-lg font-bold text-white">4</span>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/40">Toplam Hizmet</span>
                            <span className="text-lg font-bold text-white">12</span>
                        </div>
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/5">
                        <p className="text-[11px] text-white/20 text-center uppercase tracking-wider">Son güncelleme: Bugün</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
