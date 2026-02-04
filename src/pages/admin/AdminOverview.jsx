import React from 'react';
import { DollarSign, Calendar, Users, Star, ArrowUpRight, Download, ChevronDown, CheckCircle2, Clock, XCircle } from 'lucide-react';

const MetricCard = ({ title, value, trend, icon: Icon }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(255,140,66,0.15)] border border-orange-50/50 flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
            <div className="p-3 rounded-full bg-orange-50 text-[var(--color-primary)]">
                <Icon size={24} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 text-sm font-bold text-[#7B9E89] bg-[#7B9E89]/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={14} />
                    {trend}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-[var(--color-foreground-muted)] text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-[var(--color-foreground)]">{value}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, subtitle, status, time }) => {
    let statusColor = "bg-orange-100 text-orange-600";
    let StatusIcon = Clock;

    if (status === 'Confirmed') {
        statusColor = "bg-[#7B9E89]/20 text-[#7B9E89]";
        StatusIcon = CheckCircle2;
    } else if (status === 'Cancelled') {
        statusColor = "bg-red-100 text-red-500";
        StatusIcon = XCircle;
    }

    return (
        <div className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors px-4 -mx-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold">
                    {title.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-sm text-[var(--color-foreground)]">{title}</h4>
                    <p className="text-xs text-[var(--color-foreground-muted)]">{subtitle}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${statusColor}`}>
                    <StatusIcon size={12} />
                    {status}
                </span>
                <span className="text-[10px] text-stone-400">{time}</span>
            </div>
        </div>
    );
};

const MockAreaChart = () => (
    <div className="relative w-full h-full overflow-hidden">
        <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF8C42" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Grid Lines */}
            <path d="M0,250 L1000,250 M0,200 L1000,200 M0,150 L1000,150 M0,100 L1000,100 M0,50 L1000,50" stroke="#f5f5f4" strokeWidth="1" />

            {/* Data Area */}
            <path d="M0,220 Q100,180 200,200 T400,150 T600,100 T800,120 T1000,50 V300 H0 Z" fill="url(#chartGradient)" />

            {/* Data Line */}
            <path d="M0,220 Q100,180 200,200 T400,150 T600,100 T800,120 T1000,50" fill="none" stroke="#FF8C42" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-stone-400 px-2 mt-2">
            <span>Aug 1</span>
            <span>Aug 7</span>
            <span>Aug 14</span>
            <span>Aug 21</span>
            <span>Aug 28</span>
        </div>
    </div>
);

const AdminOverview = () => {
    return (
        <div className="space-y-8 pb-10">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Dashboard Overview</h1>
                    <p className="text-[var(--color-foreground-muted)]">Track your agency performance in real-time.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 text-[var(--color-foreground)] shadow-sm">
                        <Calendar size={16} />
                        Last 30 Days
                        <ChevronDown size={14} className="text-stone-400" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[#e67e3b] shadow-md shadow-orange-100 transition-all hover:-translate-y-0.5">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value="$124,500"
                    trend="+12% vs last mo"
                    icon={DollarSign}
                />
                <MetricCard
                    title="Total Bookings"
                    value="1,482"
                    trend="+5.4% vs last mo"
                    icon={Calendar}
                />
                <MetricCard
                    title="Active Clients"
                    value="892"
                    trend="+22% vs last mo"
                    icon={Users}
                />
                <MetricCard
                    title="Avg. Feedback"
                    value="4.9/5.0"
                    trend="+0.1 vs last mo"
                    icon={Star}
                />
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[var(--color-foreground)]">Revenue Trends</h2>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 text-xs text-[var(--color-foreground-muted)]">
                                <span className="w-2 h-2 rounded-full bg-[#FF8C42]"></span> Current Period
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[var(--color-foreground-muted)]">
                                <span className="w-2 h-2 rounded-full bg-stone-200"></span> Previous
                            </div>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <MockAreaChart />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[var(--color-foreground)]">Recent Activity</h2>
                        <button className="text-xs font-bold text-[var(--color-primary)] hover:underline">View All</button>
                    </div>
                    <div className="space-y-1">
                        <ActivityItem
                            title="Premium Haircut & Styling"
                            subtitle="Client: John Doe"
                            status="Confirmed"
                            time="2 min ago"
                        />
                        <ActivityItem
                            title="Consultation Session"
                            subtitle="Client: Sarah Smith"
                            status="Pending"
                            time="15 min ago"
                        />
                        <ActivityItem
                            title="Full Body Massage"
                            subtitle="Client: Michael Brown"
                            status="Confirmed"
                            time="45 min ago"
                        />
                        <ActivityItem
                            title="Facial Treatment"
                            subtitle="Client: Emma Wilson"
                            status="Cancelled"
                            time="1h ago"
                        />
                        <ActivityItem
                            title="Beard Trim"
                            subtitle="Client: James Bond"
                            status="Confirmed"
                            time="2h ago"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
