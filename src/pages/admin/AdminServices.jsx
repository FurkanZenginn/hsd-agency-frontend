import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Clock,
    DollarSign,
    Edit2,
    Trash2,
    Sparkles,
    Loader2
} from 'lucide-react';
import { getServices, addService, updateService, deleteService } from '../../services/api';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    // Modal & Form States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Hair',
        price: '',
        duration: '',
        image: '',
        frequentlyBookedWith: ''
    });

    const categories = ['All', 'Hair', 'Tattoo', 'Spa', 'Piercing'];

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (activeTab === 'All') {
            setFilteredServices(services);
        } else {
            setFilteredServices(services.filter(service => service.category === activeTab));
        }
    }, [activeTab, services]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const data = await getServices();
            setServices(data);
            setFilteredServices(data);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingService) {
                await updateService(editingService.id, formData);
                alert("Service updated successfully!");
            } else {
                await addService(formData);
                alert("New service added successfully!");
            }
            fetchServices();
            closeModal();
        } catch (error) {
            console.error("Operation failed", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            setLoading(true);
            try {
                await deleteService(id);
                fetchServices();
            } catch (error) {
                console.error("Delete failed", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData(service);
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                category: 'Hair',
                price: '',
                duration: '',
                image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=300', // Default placeholder
                frequentlyBookedWith: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    return (
        <div className="min-h-full pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">Service Management</h1>
                    <p className="text-[#78716c] mt-1 text-sm font-medium">Manage your service catalog and pricing.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 hover:shadow-orange-300 transition-all active:scale-95"
                >
                    <Plus size={18} />
                    Add New Service
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`
                            px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                            ${activeTab === category
                                ? 'bg-[#1c1917] text-white shadow-lg'
                                : 'bg-white text-[#78716c] hover:bg-stone-50 border border-stone-200'}
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Service Grid */}
            {loading && services.length === 0 ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-[#f97316]" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map(service => (
                        <div key={service.id} className="bg-white rounded-[2rem] p-4 shadow-sm border border-stone-100 hover:shadow-md transition-all group">
                            {/* Card Image */}
                            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1c1917] shadow-sm">
                                    {service.category}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="px-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-[#1c1917] line-clamp-1">{service.name}</h3>
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#f97316] bg-orange-50 px-2 py-1 rounded-lg">
                                        <DollarSign size={14} />
                                        {service.price}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-[#78716c] font-medium mb-4">
                                    <Clock size={14} />
                                    <span>{service.duration}</span>
                                </div>

                                {/* Badge */}
                                {service.frequentlyBookedWith && (
                                    <div className="flex items-center gap-2 bg-[#fdfbf7] border border-[#feebe1] p-2 rounded-xl mb-4">
                                        <div className="bg-[#fff7ed] p-1.5 rounded-lg text-[#f97316]">
                                            <Sparkles size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#a8a29e] uppercase font-bold tracking-wider">Booked With</p>
                                            <p className="text-xs font-bold text-[#1c1917]">{service.frequentlyBookedWith}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                                    <button
                                        onClick={() => openModal(service)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-[#1c1917] hover:bg-stone-50 transition-colors"
                                    >
                                        <Edit2 size={14} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 rounded-xl text-[#a8a29e] hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-[#a8a29e] transition-colors"
                        >
                            <Trash2 size={20} className="rotate-45" /> {/* Using Trash as X for now, or X icon if imported */}
                        </button>

                        <h2 className="text-2xl font-bold text-[#1c1917] mb-6">
                            {editingService ? 'Edit Service' : 'Add New Service'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-[#1c1917] mb-1">Service Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-[#f97316]/20 text-sm font-medium"
                                    placeholder="e.g. Premium Haircut"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#1c1917] mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-[#f97316]/20 text-sm font-medium"
                                        placeholder="45"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#1c1917] mb-1">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-[#f97316]/20 text-sm font-medium"
                                        placeholder="e.g. 45 min"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#1c1917] mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-[#f97316]/20 text-sm font-medium"
                                >
                                    {categories.filter(c => c !== 'All').map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#1c1917] mb-1">Frequently Booked With</label>
                                <input
                                    type="text"
                                    name="frequentlyBookedWith"
                                    value={formData.frequentlyBookedWith}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-[#f97316]/20 text-sm font-medium"
                                    placeholder="Optional pairing"
                                />
                            </div>

                            {/* Hidden Image Input for now, using default or existing */}
                            <input type="hidden" name="image" value={formData.image} />

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-3 rounded-xl font-bold text-[#78716c] hover:bg-stone-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 rounded-xl bg-[#f97316] text-white font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-70"
                                >
                                    {loading ? 'Saving...' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
