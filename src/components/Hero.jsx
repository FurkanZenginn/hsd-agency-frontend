import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import AgencyCard from './AgencyCard';
import CategoryFilter from './CategoryFilter';

const MOCK_AGENCIES = [
    {
        id: 1,
        name: "Elite Cuts Barbershop",
        category: "Barber",
        rating: 4.9,
        location: "Downtown, New York",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        name: "Mindful Space Therapy",
        category: "Psychologist",
        rating: 5.0,
        location: "Beverly Hills, CA",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        name: "Pure Nutrition Dietetics",
        category: "Dietitian",
        rating: 4.8,
        location: "Austin, Texas",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
    }
];

const CATEGORIES = ["All", "Barber", "Psychologist", "Dietitian", "Beauty Salon", "Fitness Coach"];

const Hero = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center bg-white border border-stone-100 shadow-sm">

                {/* Background Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/40 blur-[100px] rounded-full" />

                <div className="relative z-10 w-full p-8 md:p-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold mb-8">
                                <Sparkles size={14} className="text-orange-500" />
                                <span>The Future of Agency Management</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1] text-stone-900">
                                Elevate Your <br />
                                <span className="text-gradient">
                                    Digital Presence
                                </span>
                            </h1>
                            <p className="text-lg text-stone-500 mb-10 max-w-xl leading-relaxed font-light">
                                The all-in-one ecosystem for visionaries. Manage appointments, staff, and your brand with a platform designed for excellence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                                <button className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white shadow-lg shadow-orange-200">
                                    Book Now
                                    <ArrowRight size={20} />
                                </button>
                                <button className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 font-semibold rounded-xl transition-all border border-stone-200 shadow-sm flex items-center justify-center">
                                    View Demo
                                </button>
                            </div>
                        </div>

                        {/* Visual / Stats */}
                        <div className="hidden md:flex w-full md:w-[400px] h-[450px] relative">
                            <div className="absolute inset-0 bg-stone-100 rounded-3xl transform rotate-3" />
                            <div className="absolute inset-0 bg-white rounded-3xl border border-stone-100 -rotate-3 flex flex-col items-center justify-center p-8 gap-8 shadow-xl">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-stone-800 mb-2">500+</div>
                                    <div className="text-stone-400 font-bold tracking-widest text-xs uppercase">Agencies Onboarded</div>
                                </div>
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full" />
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-stone-800 mb-2">98%</div>
                                    <div className="text-stone-400 font-bold tracking-widest text-xs uppercase">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Agencies Section */}
            <section>
                <div className="flex flex-col gap-8 mb-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800 mb-2">Featured Agencies</h2>
                            <p className="text-stone-500">Discover the top-rated professionals in your area.</p>
                        </div>
                        <button className="text-orange-500 hover:text-orange-600 font-semibold hidden md:block transition-colors">View all agencies</button>
                    </div>

                    <CategoryFilter
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_AGENCIES.map((agency) => (
                        <AgencyCard key={agency.id} {...agency} />
                    ))}
                </div>

                <button className="text-orange-500 hover:text-orange-600 font-semibold md:hidden mt-8 w-full text-center">View all agencies</button>
            </section>
        </div>
    );
};

export default Hero;
