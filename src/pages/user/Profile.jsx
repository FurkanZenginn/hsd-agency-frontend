import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Award,
    Sparkles,
    User,
    Settings,
    Image as ImageIcon,
    LogOut,
    ChevronRight,
    Heart,
    Star,
    Scissors,
    ShieldCheck,
    Camera,
    Gift,
    Droplets
} from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Mock Data for Customer View

    const preferences = {
        staff: [
            { name: "Marcus Johnson", role: "Senior Stylist", avatar: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=2D2A26&color=fff" },
            { name: "Sarah Lee", role: "Colorist", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=FF8C42&color=fff" }
        ],
        services: ["Classic Haircut", "Skin Care", "Beard Trim"]
    };

    const quickActions = [
        { title: "Booking History", icon: Calendar, sub: "View past services", path: "/appointments" },
        { title: "Edit Preferences", icon: Settings, sub: "Update notifications", path: "/settings" },
    ];

    const styleDiary = [
        { id: 1, service: "Balayage Retouch", date: "Oct 15, 2025", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400" },
        { id: 2, service: "Geometric Tattoo", date: "Aug 22, 2025", img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=400" }
    ];

    const beautyBio = {
        hair: { type: "Wavy / Thick", colorHistory: "Ash Brown", lastTreatment: "Keratin (4mo ago)", allergies: "None" },
        skin: { sensitivity: "High", concern: "Occasional Dryness", routine: "Morning & Night" },
        tattoo: { sensitivity: "High", healing: "Slow", preferredStyle: "Minimalist / Fine Line" }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in font-sans px-4 lg:px-0">
            {/* 1. Hero Profile Header & Loyalty Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-[0_8px_30px_-4px_rgba(45,42,38,0.03)] flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100/50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#7B9E89]/10 to-transparent rounded-tr-full opacity-60 pointer-events-none" />

                    <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full p-2 border-2 border-white/80 bg-white shadow-xl shadow-stone-200/50 flex-shrink-0">
                        <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=Busra+Yavuz&background=FAF7F2&color=2D2A26"}
                            alt={user?.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute bottom-1 right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white p-2 rounded-full border-2 border-white shadow-md shadow-amber-500/20" title="Gold Member">
                            <Sparkles size={16} fill="white" />
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-4 relative z-10 w-full">
                        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3">
                            <h1 className="text-4xl font-bold text-stone-900 tracking-tight">
                                {user?.name || "Büşra Yavuz"}
                            </h1>
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200 flex items-center gap-1.5 shadow-sm">
                                <Award size={14} className="text-amber-500" /> Gold Tier
                            </span>
                        </div>
                        <p className="text-stone-500 font-medium">
                            <span className="flex items-center justify-center sm:justify-start gap-1.5">
                                <ShieldCheck size={16} className="text-[#7B9E89]" /> Verified Member since Jan 2025
                            </span>
                        </p>

                        {/* Progress Bar */}
                        <div className="pt-2 max-w-sm mx-auto sm:mx-0">
                            <div className="flex justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                                <span>Gold</span>
                                <span className="text-stone-400">VIP (500 pts)</span>
                            </div>
                            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-[90%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                            </div>
                            <p className="text-xs text-orange-600 font-medium mt-2 text-right">Only 50 points to VIP!</p>
                        </div>
                    </div>
                </div>

                {/* Loyalty Hub / Points Card */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2.5rem] p-8 text-white shadow-xl shadow-stone-900/10 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 text-white/5 group-hover:text-white/10 transition-colors duration-500">
                        <Gift size={160} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-stone-400 font-bold uppercase tracking-wider text-xs mb-1 flex items-center gap-2">
                            <Star size={14} className="text-amber-400" fill="currentColor" /> Loyalty Hub
                        </h3>
                        <div className="text-5xl font-bold tracking-tight mb-2">450<span className="text-xl text-stone-400 font-medium ml-1">pts</span></div>
                        <p className="text-stone-300 text-sm leading-relaxed mb-6">
                            Redeemable for complimentary services or product upgrades.
                        </p>
                    </div>
                    <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-start gap-4">
                        <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 mt-0.5">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white mb-0.5">Free Beard Trim Available!</p>
                            <button className="text-xs text-amber-400 font-bold hover:text-amber-300 uppercase tracking-wider group/btn flex items-center gap-1">
                                Redeem Now <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Bio and Experts */}
                <div className="space-y-8 lg:col-span-1">

                    {/* My Beauty Bio */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 border border-white/80 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                            <Droplets className="text-blue-500" strokeWidth={2.5} size={22} />
                            My Beauty Bio
                        </h2>
                        <p className="text-sm text-stone-500 leading-relaxed -mt-2">
                            Our specialists consult your bio to provide a perfectly tailored experience every visit.
                        </p>

                        <div className="space-y-5">
                            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Scissors size={14} /> Hair Profile</h3>
                                <ul className="space-y-2 text-sm text-stone-700">
                                    <li className="flex justify-between"><span className="text-stone-500">Type</span> <span className="font-medium text-stone-900">{beautyBio.hair.type}</span></li>
                                    <li className="flex justify-between"><span className="text-stone-500">Base Color</span> <span className="font-medium text-stone-900">{beautyBio.hair.colorHistory}</span></li>
                                    <li className="flex justify-between"><span className="text-stone-500">Allergies</span> <span className="font-medium text-green-600">{beautyBio.hair.allergies}</span></li>
                                </ul>
                            </div>

                            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Droplets size={14} /> Skin Specs</h3>
                                <ul className="space-y-2 text-sm text-stone-700">
                                    <li className="flex justify-between"><span className="text-stone-500">Sensitivity</span> <span className="font-medium text-stone-900">{beautyBio.skin.sensitivity}</span></li>
                                    <li className="flex justify-between"><span className="text-stone-500">Main Concern</span> <span className="font-medium text-stone-900">{beautyBio.skin.concern}</span></li>
                                    <li className="flex justify-between"><span className="text-stone-500">Regimen</span> <span className="font-medium text-stone-900">{beautyBio.skin.routine}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 border border-white/80 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">Concierge Actions</h3>
                        {quickActions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(action.path)}
                                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                                        <action.icon size={18} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors">{action.title}</div>
                                        <div className="text-xs text-stone-500">{action.sub}</div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-stone-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>

                </div>

                {/* RIGHT COLUMN: Style Diary & Recommendations */}
                <div className="lg:col-span-2 space-y-8">

                    {/* AI Recommendations */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50/50 rounded-[2rem] p-1 border border-orange-100/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-[60px] opacity-40 mix-blend-multiply" />
                        <div className="bg-white/80 backdrop-blur-xl rounded-[1.8rem] p-7">
                            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-2">
                                <Sparkles className="text-orange-500" size={20} />
                                Recommended for You
                            </h2>
                            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                                Based on your recent <span className="font-semibold text-stone-900">Deep Tissue Massage</span>, our algorithm suggests this treatment for optimal wellness:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 items-center p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200" alt="Aroma" className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm" />
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-bold text-stone-900 text-base">Aromatherapy Session</h4>
                                    <p className="text-sm text-stone-500 mt-1 line-clamp-2">Enhance your muscle recovery with our signature essential oil blend designed to reduce inflammation.</p>
                                </div>
                                <button
                                    onClick={() => navigate('/services')}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-orange-500/20"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Style Diary */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 border border-white/80 shadow-sm">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                                    <Camera className="text-[#7B9E89]" strokeWidth={2.5} size={22} />
                                    Style Diary
                                </h2>
                                <p className="text-sm text-stone-500 mt-1">A visual history of your transformations.</p>
                            </div>
                            <button className="text-sm font-bold text-[#7B9E89] hover:text-[#5F7A6A] hover:underline underline-offset-4 decoration-2 transition-all">
                                View Full Gallery
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {styleDiary.map((item) => (
                                <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 cursor-pointer shadow-sm">
                                    <img src={item.img} alt={item.service} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 p-5">
                                        <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{item.date}</p>
                                        <h4 className="text-white font-bold text-lg leading-tight">{item.service}</h4>
                                    </div>
                                    <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        <ImageIcon size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preferred Experts */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 border border-white/80 shadow-sm">
                        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-6">
                            <Heart className="text-rose-500" strokeWidth={2.5} size={20} />
                            Your Go-To Specialists
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {preferences.staff.map((person, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate('/explore-staff')}
                                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-100 hover:border-rose-200 hover:shadow-md transition-all text-left group"
                                >
                                    <img src={person.avatar} alt={person.name} className="w-14 h-14 rounded-full border border-stone-100 shadow-sm group-hover:scale-105 transition-transform" />
                                    <div className="flex-1">
                                        <p className="font-bold text-stone-900 group-hover:text-rose-600 transition-colors">{person.name}</p>
                                        <p className="text-xs text-stone-500 font-medium">{person.role}</p>
                                    </div>
                                    <ChevronRight size={18} className="text-stone-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Logout */}
            <div className="flex justify-center pt-8 pb-4 border-t border-stone-200/50 mt-12">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-stone-500 font-bold hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-sm"
                >
                    <LogOut size={16} />
                    <span className="text-sm">Sign Out Securely</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;
