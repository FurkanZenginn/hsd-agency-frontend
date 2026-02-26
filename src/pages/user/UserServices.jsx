import React, { useState, useEffect } from 'react';
import { Clock, CreditCard, Sparkles, ChevronRight, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../../services/api';

const CATEGORIES = ["All", "Hair", "Tattoo", "Spa", "Piercing"];

const UserServices = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await getServices();
                setServices(data || []);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service =>
        selectedCategory === "All" || service.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-[#fdfbf7] p-6 lg:p-10 font-sans">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/50 text-orange-600 text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Premium Experience
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
                    Our Professional Services
                </h1>
                <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Discover world-class treatments tailored to elevate your personal style and well-being.
                </p>
            </div>

            {/* Filter categories */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                ? "bg-stone-900 text-white shadow-md shadow-stone-900/10 scale-105 border border-stone-900"
                                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:shadow-sm hover:text-stone-900"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src={service.image || "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=400"}
                                        alt={service.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-stone-800 shadow-sm uppercase tracking-wider">
                                            {service.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                                        {service.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-stone-500 text-sm mb-6 pb-6 border-b border-stone-100">
                                        <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1.5 rounded-lg border border-stone-100">
                                            <Clock className="w-4 h-4 text-stone-400" />
                                            <span className="font-medium text-stone-700">{service.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-green-50/50 px-2 py-1.5 rounded-lg border border-green-100">
                                            <CreditCard className="w-4 h-4 text-green-500" />
                                            <span className="font-medium text-green-700">${service.price}</span>
                                        </div>
                                    </div>
                                    {service.frequentlyBookedWith && (
                                        <div className="mb-6 flex-grow">
                                            <p className="text-xs text-stone-400 font-medium tracking-wide uppercase mb-2">Often booked with</p>
                                            <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full font-medium">
                                                + {service.frequentlyBookedWith}
                                            </span>
                                        </div>
                                    )}
                                    <div className="mt-auto pt-4 flex gap-3 items-center">
                                        <button
                                            onClick={() => navigate('/book-appointment')}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-2xl transition-colors duration-300 shadow-sm shadow-orange-500/20 hover:shadow-orange-500/40 text-sm flex items-center justify-center gap-2 group/btn"
                                        >
                                            Book Now
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedService(service)}
                                            className="p-3 text-stone-400 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all duration-300"
                                            title="View Details"
                                        >
                                            <Info className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white rounded-3xl border border-stone-100 shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-50 mb-4">
                            <Sparkles className="w-8 h-8 text-stone-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">No services found</h3>
                        <p className="text-stone-500">We couldn't find any services in the "{selectedCategory}" category.</p>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-6 text-orange-600 font-medium hover:text-orange-700 transition-colors"
                        >
                            View all services
                        </button>
                    </div>
                )}
            </div>

            {/* Service Details Modal */}
            <AnimatePresence>
                {selectedService && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 pointer-events-none"
                        >
                            <div className="bg-[#fdfbf7] w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-stone-200/50">
                                {/* Modal Header Image */}
                                <div className="relative h-48 sm:h-64 flex-shrink-0">
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <span className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm shadow-sm rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                            {selectedService.category}
                                        </span>
                                        <h2 className="text-3xl font-bold">{selectedService.name}</h2>
                                    </div>
                                </div>

                                {/* Modal Content Scrollable Area */}
                                <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                                            <Clock className="w-4 h-4 text-stone-400" />
                                            <span className="font-medium text-stone-700">{selectedService.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                                            <CreditCard className="w-4 h-4 text-green-500" />
                                            <span className="font-medium text-green-700">${selectedService.price}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {selectedService.description && (
                                        <div className="mb-8">
                                            <h4 className="text-lg font-bold text-stone-900 mb-3">Service Overview</h4>
                                            <p className="text-stone-600 leading-relaxed">
                                                {selectedService.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Process Steps */}
                                    {selectedService.processSteps && selectedService.processSteps.length > 0 && (
                                        <div className="mb-8 p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                                            <h4 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-orange-500" />
                                                What to Expect
                                            </h4>
                                            <ul className="space-y-4">
                                                {selectedService.processSteps.map((step, index) => (
                                                    <li key={index} className="flex gap-3">
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-stone-600 pt-0.5">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Preparation & Aftercare */}
                                    {(selectedService.preparation || selectedService.aftercare) && (
                                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                            {selectedService.preparation && (
                                                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                                                    <h5 className="font-bold text-stone-900 mb-2">Before Your Visit</h5>
                                                    <p className="text-sm text-stone-600 leading-relaxed">{selectedService.preparation}</p>
                                                </div>
                                            )}
                                            {selectedService.aftercare && (
                                                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                                                    <h5 className="font-bold text-stone-900 mb-2">Aftercare</h5>
                                                    <p className="text-sm text-stone-600 leading-relaxed">{selectedService.aftercare}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="p-6 border-t border-stone-100 bg-white flex-shrink-0">
                                    <button
                                        onClick={() => navigate('/book-appointment')}
                                        className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 text-lg flex items-center justify-center gap-2 group/book"
                                    >
                                        Book This Service
                                        <ChevronRight className="w-5 h-5 group-hover/book:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserServices;
