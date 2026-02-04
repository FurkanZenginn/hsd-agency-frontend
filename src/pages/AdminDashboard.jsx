import React from 'react';
import { Activity, Users, DollarSign, Calendar } from 'lucide-react';

const DashboardCard = ({ icon: Icon, title, value, trend }) => (
    <div className="bg-white p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-stone-200 shadow-sm hover:shadow-lg">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Icon size={24} />
            </div>
            <span className={`text-sm font-bold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trend}
            </span>
        </div>
        <div className="space-y-1">
            <h3 className="text-stone-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-stone-800">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2 text-stone-900">Dashboard Overview</h1>
                <p className="text-stone-500">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard icon={Activity} title="Total Revenue" value="$45,231" trend="+12.5%" />
                <DashboardCard icon={Users} title="Active Clients" value="2,543" trend="+8.2%" />
                <DashboardCard icon={Calendar} title="Appointments" value="142" trend="+4.3%" />
                <DashboardCard icon={DollarSign} title="Avg. Order Value" value="$328" trend="-1.2%" />
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-stone-800">Recent Activity</h2>
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-400">
                        <Activity size={32} />
                    </div>
                    <p className="text-stone-500 max-w-sm">
                        Activity feed plugin not connected. <br />
                        Connect `src/services/api.js` to fetch real data.
                    </p>
                    <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
