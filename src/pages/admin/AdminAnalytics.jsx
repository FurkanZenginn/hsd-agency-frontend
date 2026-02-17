import React, { useState, useEffect } from 'react';
import {
    PieChart, Pie, Cell,
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Zap, TrendingUp, Users, Brain, Calendar, ArrowUpRight } from 'lucide-react';
import { getAnalyticsData } from '../../services/api';

const COLORS = ['#f97316', '#44403c', '#ef4444', '#f59e0b', '#10b981'];

const AdminAnalytics = () => {
    const [period, setPeriod] = useState('Last 30 Days');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const analyticsData = await getAnalyticsData(period);
                setData(analyticsData);
            } catch (error) {
                console.error("Failed to load analytics", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [period]);

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center h-full min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-full pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">Business Analytics</h1>
                    <p className="text-[#78716c] mt-1 text-sm font-medium">Advanced insights from your business data.</p>
                </div>
                <div className="relative">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="appearance-none bg-white border border-stone-200 text-[#1c1917] font-bold py-2.5 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 cursor-pointer text-sm"
                    >
                        <option>Last 30 Days</option>
                        <option>Last 6 Months</option>
                        <option>Yearly</option>
                    </select>
                    <Calendar className="absolute right-3 top-2.5 text-[#78716c] pointer-events-none" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* 1. Sentiment Analysis (NLP Focus) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-orange-50 text-[#f97316] rounded-lg">
                            <Brain size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1c1917]">Customer Sentiment</h3>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.sentiments}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.sentiments.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1c1917', fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-[#78716c] font-medium mt-2">
                        NLP Analysis of {period} Reviews
                    </p>
                </div>

                {/* 2. Revenue Forecast (Regression Focus) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1c1917]">Revenue Forecast</h3>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.forecast} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a8a29e', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a8a29e', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="predicted" name="Predicted (Regression)" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Customer Segments (Clustering Focus) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1c1917]">Customer Segments (K-Means)</h3>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                                <XAxis type="number" dataKey="x" name="Frequency" unit="/yr" tick={{ fill: '#a8a29e', fontSize: 12 }} />
                                <YAxis type="number" dataKey="y" name="Spend" unit="$" tick={{ fill: '#a8a29e', fontSize: 12 }} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px' }} />
                                <Legend />
                                <Scatter name="VIP" data={data.clusters.filter(c => c.segment === 'VIP')} fill="#f97316" shape="circle" />
                                <Scatter name="Regular" data={data.clusters.filter(c => c.segment === 'Regular')} fill="#a8a29e" shape="triangle" />
                                <Scatter name="At-Risk" data={data.clusters.filter(c => c.segment === 'At-Risk')} fill="#ef4444" shape="square" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. Staff Performance (Radar) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1c1917]">Staff Performance</h3>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.staffPerformance}>
                                <PolarGrid stroke="#e7e5e4" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 10, fontWeight: 700 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Top Stylist" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                                <Radar name="Avg Staff" dataKey="B" stroke="#a8a29e" fill="#a8a29e" fillOpacity={0.2} />
                                <Legend />
                                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* AI Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.miningInsights.map((insight, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#1c1917] to-[#292524] rounded-[2rem] p-6 text-white shadow-lg flex items-start gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <Zap size={24} className="text-[#f97316]" />
                        </div>
                        <div>
                            <h4 className="text-[#f97316] font-bold text-sm mb-1 uppercase tracking-wider">
                                AI Insight #{idx + 1}
                            </h4>
                            <p className="text-sm font-medium leading-relaxed opacity-90">
                                {insight.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple Sparkles icon component if not imported from Lucide (though it is)
const Sparkles = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
);

export default AdminAnalytics;
