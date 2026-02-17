import React, { useState, useEffect } from 'react';
import {
    DollarSign,
    Calendar,
    Users,
    Activity,
    TrendingUp,
    Zap,
    ChevronDown,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    AlertTriangle,
    Star,
    ArrowRight,
    MoreHorizontal,
    Loader2
} from 'lucide-react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area
} from 'recharts';
import {
    getAdminStats,
    getRevenueData,
    getDashboardSchedule,
    getTopStaff,
    getLowStock,
    getSmartInsights,
    triggerReorderItem
} from '../../services/api';


// --- COMPONENTS ---

const KPICard = ({ stat, loading }) => {
    const isSolid = stat?.variant === 'solid';
    const Icon = stat?.icon;

    if (loading) {
        return (
            <div className={`relative p-6 rounded-[2rem] shadow-sm flex items-center justify-center h-44 bg-white border border-stone-100`}>
                <Loader2 className="animate-spin text-orange-200" size={32} />
            </div>
        );
    }

    return (
        <div className={`
            relative p-6 rounded-[2rem] shadow-sm flex flex-col justify-between h-44 transition-all hover:shadow-md hover:-translate-y-1
            ${isSolid
                ? 'bg-[#f97316] text-white shadow-orange-200'
                : 'bg-white border border-stone-100 text-[#1c1917]'
            }
        `}>
            <div className="flex justify-between items-start">
                <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isSolid ? 'bg-white/20 text-white' : 'bg-orange-50 text-[#f97316]'}
                `}>
                    {Icon && <Icon size={24} strokeWidth={2} />}
                </div>
                <div className={`
                    flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold
                    ${isSolid
                        ? 'bg-white/20 text-white'
                        : stat?.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }
                `}>
                    {stat?.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat?.trend}
                </div>
            </div>

            <div className="mt-4">
                <h3 className={`text-sm font-medium mb-1 ${isSolid ? 'text-orange-100' : 'text-[#78716c]'}`}>
                    {stat?.label}
                </h3>
                <p className="text-3xl font-bold">{stat?.value}</p>
                {stat?.subValue && (
                    <p className={`text-xs mt-2 font-medium ${isSolid ? 'text-orange-100' : 'text-[#a8a29e]'}`}>
                        {stat.subValue}
                    </p>
                )}
            </div>
        </div>
    );
};

const ScheduleItem = ({ item }) => (
    <div className="flex items-center gap-4 py-3 border-b border-stone-50 last:border-0 hover:bg-stone-50/50 rounded-lg px-2 transition-colors">
        <div className="w-16 flex flex-col items-center justify-center bg-orange-50 rounded-lg py-2 text-[#f97316]">
            <span className="text-xs font-bold">{item.time.split(' ')[0]}</span>
            <span className="text-[10px] uppercase font-medium">{item.time.split(' ')[1]}</span>
        </div>
        <div>
            <p className="text-[#1c1917] font-semibold text-sm">{item.client}</p>
            <p className="text-[#78716c] text-xs flex items-center gap-1">
                {item.service} • <span className="text-[#f97316] font-medium">{item.staff}</span>
            </p>
        </div>
    </div>
);

const StaffItem = ({ staff }) => (
    <div className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0 hover:bg-stone-50/50 rounded-lg px-2 transition-colors">
        <div className="flex items-center gap-3">
            <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            <div>
                <p className="text-[#1c1917] font-semibold text-sm">{staff.name}</p>
                <p className="text-[#78716c] text-xs">{staff.role}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-[#1c1917] font-bold text-sm">{staff.revenue}</p>
            <div className="flex items-center gap-1 justify-end text-xs text-[#f97316] font-medium">
                <Star size={10} fill="#f97316" /> {staff.rating}
            </div>
        </div>
    </div>
);

const StockItem = ({ item, onReorder }) => (
    <div className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${item.critical ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                <AlertTriangle size={16} />
            </div>
            <div>
                <p className="text-[#1c1917] font-medium text-sm">{item.name}</p>
                <p className={`text-xs ${item.critical ? 'text-red-500 font-bold' : 'text-[#78716c]'}`}>
                    {item.stock} {item.unit} left
                </p>
            </div>
        </div>
        <button
            onClick={() => onReorder(item.id)}
            className="text-xs font-semibold text-[#f97316] hover:underline"
        >
            Reorder
        </button>
    </div>
);

const InsightItem = ({ insight }) => (
    <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
        <div className="p-2 rounded-lg bg-white shadow-sm text-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-colors">
            <Zap size={16} />
        </div>
        <div className="flex-1">
            <p className="text-[#1c1917] text-sm font-medium leading-snug">{insight.text}</p>
        </div>
        <ArrowRight size={16} className="text-[#d6d3d1] group-hover:text-[#f97316] transition-colors self-center" />
    </div>
);

const SectionHeader = ({ title, action }) => (
    <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-lg font-bold text-[#1c1917]">{title}</h3>
        {action && (
            <button className="p-1.5 rounded-lg hover:bg-stone-100 text-[#a8a29e] hover:text-[#78716c] transition-colors">
                <MoreHorizontal size={18} />
            </button>
        )}
    </div>
);

const AdminOverview = () => {
    // State Management
    const [timeRange, setTimeRange] = useState('This Week');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    // Data States
    const [stats, setStats] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [staff, setStaff] = useState([]);
    const [stock, setStock] = useState([]);
    const [insights, setInsights] = useState([]);

    // Loading & Processing States
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    // Reorder loading state per item
    const [reorderingItems, setReorderingItems] = useState({});

    useEffect(() => {
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRange]);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [statsData, revenue, scheduleData, staffData, stockData, insightsData] = await Promise.all([
                getAdminStats(),
                getRevenueData(),
                getDashboardSchedule(),
                getTopStaff(),
                getLowStock(),
                getSmartInsights()
            ]);

            // Transform stats api object to array for mapping
            const transformedStats = [
                { id: 1, ...statsData.revenue, icon: DollarSign },
                { id: 2, ...statsData.appointments, icon: Calendar },
                { id: 3, ...statsData.newClients, icon: Users },
                { id: 4, ...statsData.satisfaction, icon: Activity }
            ];

            setStats(transformedStats);
            setRevenueData(revenue);
            setSchedule(scheduleData);
            setStaff(staffData);
            setStock(stockData);
            setInsights(insightsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = async () => {
        setIsExporting(true);
        // Simulate export delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsExporting(false);
        alert("Report exported successfully!");
    };

    const handleReorder = async (id) => {
        setReorderingItems(prev => ({ ...prev, [id]: true }));
        try {
            const result = await triggerReorderItem(id);
            if (result.success) {
                alert(`Order placed for item ID: ${id}`);
                // Optimistically update UI -> remove item from list or reduce count ? 
                // For now, just keep it, or maybe mark as "Ordered"
            }
        } catch (error) {
            console.error("Reorder failed", error);
        } finally {
            setReorderingItems(prev => ({ ...prev, [id]: false }));
        }
    };

    const handleScanInsights = async () => {
        setIsScanning(true);
        // Simulate scanning animation
        await new Promise(resolve => setTimeout(resolve, 3000));
        // Refresh insights (could fetch new ones here)
        const newInsights = await getSmartInsights();
        setInsights(newInsights);
        setIsScanning(false);
    };

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        setIsTimeDropdownOpen(false);
    };

    return (
        <div className="min-h-full pb-10">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">Dashboard Overview</h1>
                    <p className="text-[#78716c] mt-1 text-sm font-medium">Welcome back, here's what's happening today.</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Time Range Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-[#1c1917] shadow-sm hover:bg-stone-50 transition-colors w-36 justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#78716c]" />
                                <span>{timeRange}</span>
                            </div>
                            <ChevronDown size={14} className="text-[#78716c]" />
                        </button>

                        {isTimeDropdownOpen && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-stone-100 py-1 z-10">
                                {['Today', 'This Week', 'This Month'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => handleTimeRangeChange(range)}
                                        className="w-full text-left px-4 py-2 text-sm text-[#1c1917] hover:bg-stone-50 hover:text-[#f97316] transition-colors font-medium"
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center"
                    >
                        {isExporting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Exporting...</span>
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                <span>Export Report</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* KPI Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 h-44 flex items-center justify-center">
                            <Loader2 className="animate-spin text-stone-300" />
                        </div>
                    ))
                ) : (
                    stats.map(stat => (
                        <KPICard key={stat.id} stat={stat} loading={isLoading} />
                    ))
                )}
            </section>

            {/* Main Content Area */}
            <div className="space-y-8">

                {/* Chart Section */}
                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-100 min-h-[400px] relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#1c1917]">Revenue & Appointment Trends</h2>
                            <p className="text-[#78716c] text-sm">Comparison of income vs booking volume</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#f97316]"></span> Revenue
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#44403c]"></span> Bookings
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="h-[350px] w-full flex items-center justify-center">
                            <Loader2 className="animate-spin text-[#f97316]" size={40} />
                        </div>
                    ) : (
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenueBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#f97316" stopOpacity={0.5} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a8a29e', fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a8a29e', fontSize: 12, fontWeight: 500 }}
                                        tickFormatter={(value) => `$${value}`}
                                        dx={-10}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a8a29e', fontSize: 12, fontWeight: 500 }}
                                        dx={10}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1c1917',
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            padding: '12px'
                                        }}
                                        itemStyle={{ color: '#ffffff', fontWeight: 600 }}
                                        labelStyle={{ color: '#a8a29e', marginBottom: '4px', fontSize: '12px' }}
                                        cursor={{ opacity: 0.1 }}
                                    />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="revenue"
                                        fill="url(#colorRevenueBar)"
                                        radius={[6, 6, 0, 0]}
                                        barSize={40}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="appointments"
                                        stroke="#44403c"
                                        strokeWidth={3}
                                        dot={{ fill: '#44403c', strokeWidth: 0, r: 4 }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </section>

                {/* Bottom 4-Panel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {/* Panel 1: Today's Schedule */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col h-full min-h-[300px]">
                        <SectionHeader title="Today's Schedule" action={true} />
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <Loader2 className="animate-spin text-stone-300" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
                                {schedule.map(item => (
                                    <ScheduleItem key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel 2: Top Performing Staff */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col h-full min-h-[300px]">
                        <SectionHeader title="Top Staff" action={true} />
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <Loader2 className="animate-spin text-stone-300" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
                                {staff.map(staffMember => (
                                    <StaffItem key={staffMember.id} staff={staffMember} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel 3: Low Stock Alerts */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col h-full min-h-[300px]">
                        <SectionHeader title="Low Stock Alerts" action={true} />
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <Loader2 className="animate-spin text-stone-300" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
                                {stock.map(item => (
                                    <StockItem key={item.id} item={item} onReorder={handleReorder} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel 4: AI Insights */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col h-full min-h-[300px]">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className={`text-[#f97316] ${isScanning ? 'animate-pulse' : ''} fill-[#f97316]`} size={20} />
                            <h3 className="text-lg font-bold text-[#1c1917]">Smart Insights</h3>
                        </div>
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <Loader2 className="animate-spin text-stone-300" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                                {insights.map((insight) => (
                                    <InsightItem key={insight.id} insight={insight} />
                                ))}
                            </div>
                        )}
                        <button
                            onClick={handleScanInsights}
                            disabled={isScanning}
                            className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-[#e7e5e4] text-[#78716c] font-bold text-xs hover:border-[#f97316] hover:text-[#f97316] hover:bg-orange-50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isScanning ? (
                                <>
                                    <Loader2 size={12} className="animate-spin" />
                                    Scanning...
                                </>
                            ) : (
                                "Scan for new insights"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
