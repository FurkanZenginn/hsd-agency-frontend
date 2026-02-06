import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added import
import { Search, SlidersHorizontal, MapPin, Scissors, Sparkles, PenTool, Gem, Calendar, Clock, MoreVertical } from 'lucide-react';
import AgencyCard from '../../components/AgencyCard';
import CategoryCard from '../../components/CategoryCard';
import { getAgencies, getAppointments } from '../../services/api';

const POPULAR_SERVICES = [
    { id: 1, title: "Barber", count: "25+ Active", icon: Scissors },
    { id: 2, title: "Spa & Beauty", count: "18+ Active", icon: Sparkles },
    { id: 3, title: "Tattoo Art", count: "12+ Active", icon: PenTool },
    { id: 4, title: "Piercing", count: "8+ Active", icon: Gem },
];

const Home = () => {
    const navigate = useNavigate(); // Added hook
    const [agencies, setAgencies] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const [agencyData, aptData] = await Promise.all([
                getAgencies(),
                getAppointments()
            ]);
            setAgencies(agencyData);
            // Filter for "Upcoming" appointments for the dashboard view
            setAppointments(aptData.filter(a => a.status === 'Upcoming'));
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-16 pb-20">

            {/* 1. Hero & Search Section */}
            <section className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden flex items-center justify-center p-6 shadow-2xl shadow-orange-900/5 group">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                        <span className="block text-orange-400 text-lg font-bold uppercase tracking-widest mb-4">Welcome to HSD AGENCY</span>
                        Find & Book <br /> The Best Services
                    </h1>

                    {/* Search Bar */}
                    <div className="flex gap-4 max-w-xl mx-auto">
                        <div className="relative flex-1">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for service, agency name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white h-16 pl-14 pr-6 rounded-2xl border-none shadow-xl text-[var(--color-foreground)] placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/30 transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/book-appointment')}
                            className="h-16 px-8 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-[var(--color-primary-hover)] transition-all hover:-translate-y-1"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div >
            </section >

            {/* 2. Popular Categories */}
            < section className="space-y-6" >
                <h2 className="text-2xl font-bold text-[var(--color-foreground)] px-2">Explore Popular Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {POPULAR_SERVICES.map(service => (
                        <CategoryCard
                            key={service.id}
                            title={service.title}
                            count={service.count}
                            icon={service.icon}
                            onClick={() => { }}
                        />
                    ))}
                </div>
            </section >

            {/* 3. Upcoming Appointments */}
            < section className="space-y-6" >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Upcoming Appointments</h2>
                    <button className="text-[var(--color-primary)] font-semibold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.length > 0 ? appointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-3xl p-5 border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex gap-5 items-center hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.1)] transition-all">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0">
                                <img src={apt.image} className="w-full h-full object-cover" alt="Service" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-[var(--color-foreground)] text-lg truncate">{apt.service}</h3>
                                <p className="text-stone-500 text-sm mb-3">{apt.provider}</p>

                                <div className="flex gap-4 text-xs font-semibold text-[var(--color-foreground-muted)]">
                                    <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-md">
                                        <Calendar size={14} className="text-[var(--color-primary)]" />
                                        {apt.date}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-md">
                                        <Clock size={14} className="text-[var(--color-primary)]" />
                                        {apt.time}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-10 text-center text-stone-400 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
                            No upcoming appointments.
                        </div>
                    )}
                </div>
            </section >

            {/* 4. Featured Near You */}
            < section className="space-y-6" >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Featured Near You</h2>
                    <button className="text-[var(--color-primary)] font-semibold hover:underline">See All Agencies</button>
                </div>

                {
                    loading ? (
                        <div className="py-20 text-center text-stone-400">Finding best agencies...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {agencies.map(agency => (
                                <AgencyCard key={agency.id} {...agency} />
                            ))}
                        </div>
                    )
                }
            </section >
        </div >
    );
};

export default Home;
