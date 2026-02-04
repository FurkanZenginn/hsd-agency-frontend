import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Check, X, Calendar, Clock, User, ChevronDown, Settings, Save, ArrowLeft } from 'lucide-react';

const MOCK_APPOINTMENTS = [
    {
        id: '#APT-001',
        customer: { name: 'Emma Wilson', avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=FFEDD5&color=F97316' },
        service: 'Premium Haircut & Styling',
        duration: '45 min',
        staff: { name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-24',
        time: '10:00',
        status: 'Confirmed',
        price: '$85.00',
        notes: 'Client prefers quiet session.'
    },
    {
        id: '#APT-002',
        customer: { name: 'Michael Brown', avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=D1FAE5&color=059669' },
        service: 'Deep Tissue Massage',
        duration: '60 min',
        staff: { name: 'Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-24',
        time: '11:30',
        status: 'Pending',
        price: '$120.00',
        notes: 'First time visitor.'
    },
    {
        id: '#APT-003',
        customer: { name: 'Sophia Chen', avatar: 'https://ui-avatars.com/api/?name=Sophia+Chen&background=E0E7FF&color=4F46E5' },
        service: 'Gel Manicure Deluxe',
        duration: '30 min',
        staff: { name: 'Jessica Wu', avatar: 'https://images.unsplash.com/photo-1597223591421-2890606714b9?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-24',
        time: '14:00',
        status: 'Confirmed',
        price: '$65.00',
        notes: ''
    },
    {
        id: '#APT-004',
        customer: { name: 'James Rodriguez', avatar: 'https://ui-avatars.com/api/?name=James+Rodriguez&background=F3E8FF&color=7C3AED' },
        service: 'Beard Sculpting & Trim',
        duration: '20 min',
        staff: { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-25',
        time: '09:15',
        status: 'Cancelled',
        price: '$45.00',
        notes: 'Cancelled via app.'
    },
    {
        id: '#APT-005',
        customer: { name: 'Olivia Taylor', avatar: 'https://ui-avatars.com/api/?name=Olivia+Taylor&background=FCE7F3&color=DB2777' },
        service: 'Full Body Spa Treatment',
        duration: '90 min',
        staff: { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-25',
        time: '16:00',
        status: 'Pending',
        price: '$210.00',
        notes: 'VIP Client.'
    },
    {
        id: '#APT-006',
        customer: { name: 'Robert Fox', avatar: 'https://ui-avatars.com/api/?name=Robert+Fox&background=E5E7EB&color=374151' },
        service: 'Sports Recovery Session',
        duration: '45 min',
        staff: { name: 'Michael Ross', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
        date: '2026-10-26',
        time: '08:00',
        status: 'Confirmed',
        price: '$95.00',
        notes: ''
    }
];

const AdminAppointments = () => {
    // --- State ---
    const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedApt, setSelectedApt] = useState(null); // For Drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // --- Actions ---

    // 1. Confirm directly from table
    const handleQuickConfirm = (id) => {
        setAppointments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, status: 'Confirmed' } : apt
        ));
        triggerToast();
    };

    // 2. Open Drawer
    const handleEditClick = (apt) => {
        setSelectedApt({ ...apt }); // Create a copy for editing
        setIsDrawerOpen(true);
    };

    // 3. Save Changes from Drawer
    const handleSaveChanges = () => {
        setAppointments(prev => prev.map(apt =>
            apt.id === selectedApt.id ? selectedApt : apt
        ));
        setIsDrawerOpen(false);
        triggerToast();
    };

    // Helper for Toast
    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // --- Filtering ---
    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch =
            apt.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // --- Render Components ---

    const StatusPill = ({ status }) => {
        let styles = "bg-stone-100 text-stone-600";
        if (status === 'Confirmed') styles = "bg-[#7B9E89] text-white shadow-md shadow-green-900/10";
        if (status === 'Pending') styles = "bg-[#FF8C42] text-white shadow-md shadow-orange-900/10";
        if (status === 'Cancelled') styles = "bg-red-50 text-red-500 border border-red-100";

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${styles}`}>
                {status}
            </span>
        );
    };

    const FilterTab = ({ label, count, color }) => (
        <button
            onClick={() => setStatusFilter(label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border
            ${statusFilter === label
                    ? 'bg-[var(--color-foreground)] text-white border-[var(--color-foreground)]'
                    : 'bg-white text-[var(--color-foreground-muted)] border-stone-200 hover:bg-stone-50'}`}
        >
            {label !== 'All' && <span className={`w-2 h-2 rounded-full ${color}`} />}
            {label}
            {label === 'All' && <span className="text-xs bg-stone-700 text-stone-300 px-1.5 py-0.5 rounded-full ml-1">{appointments.length}</span>}
        </button>
    );

    return (
        <div className="relative min-h-[calc(100vh-100px)]">
            {/* Header & Controls */}
            <div className="space-y-8 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">Appointments Control Center</h1>
                        <p className="text-[var(--color-foreground-muted)] font-medium">Manage bookings, assignments, and scheduling.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#FF8C42] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-[#e67e3b] transition-all hover:-translate-y-1">
                        <Plus size={20} />
                        Create Manual Booking
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center">
                    <div className="flex flex-wrap gap-2">
                        <FilterTab label="All" count={appointments.length} />
                        <FilterTab label="Pending" color="bg-orange-500" />
                        <FilterTab label="Confirmed" color="bg-[#7B9E89]" />
                        <FilterTab label="Cancelled" color="bg-red-500" />
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all font-medium text-[var(--color-foreground)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/80 border-b border-stone-100">
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest pl-8">ID</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest">Client</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest">Service Info</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest">Staff</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest">Schedule</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest">Status</th>
                                <th className="p-6 text-xs font-extrabold text-[#A8A29E] uppercase tracking-widest text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((apt) => (
                                    <tr
                                        key={apt.id}
                                        onClick={() => handleEditClick(apt)}
                                        className="group hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                                    >
                                        <td className="p-6 pl-8 text-sm font-bold text-stone-400 font-mono">{apt.id}</td>

                                        {/* Client */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full p-0.5 bg-white shadow-sm border border-stone-100">
                                                    <img src={apt.customer.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                                </div>
                                                <span className="text-sm font-bold text-[var(--color-foreground)]">{apt.customer.name}</span>
                                            </div>
                                        </td>

                                        {/* Service */}
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-[var(--color-foreground)]">{apt.service}</span>
                                                <span className="text-xs font-medium text-stone-400 mt-0.5">{apt.duration} • {apt.price}</span>
                                            </div>
                                        </td>

                                        {/* Staff */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <img src={apt.staff.avatar} alt="" className="w-6 h-6 rounded-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                                <span className="text-sm font-medium text-[var(--color-foreground-muted)]">{apt.staff.name}</span>
                                            </div>
                                        </td>

                                        {/* Schedule */}
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-[var(--color-foreground)]">{apt.date}</span>
                                                <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mt-0.5">
                                                    <Clock size={12} /> {apt.time}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="p-6">
                                            <StatusPill status={apt.status} />
                                        </td>

                                        {/* Actions */}
                                        <td className="p-6 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                {apt.status === 'Pending' && (
                                                    <button
                                                        onClick={() => handleQuickConfirm(apt.id)}
                                                        className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                                                        title="Quick Confirm"
                                                    >
                                                        <Check size={16} strokeWidth={3} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleEditClick(apt)}
                                                    className="w-8 h-8 rounded-lg border border-stone-200 text-stone-400 flex items-center justify-center hover:bg-stone-50 hover:text-[var(--color-foreground)] transition-colors"
                                                >
                                                    <Settings size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-stone-400">
                                            <div className="p-4 rounded-full bg-stone-50"><Search size={24} /></div>
                                            <p className="font-medium">No appointments match your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- UPDATE DRAWER --- */}
            {/* Backdrop */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}

            {/* Panel */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedApt && (
                    <>
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--color-foreground)]">Edit Appointment</h3>
                                <p className="text-sm text-[var(--color-foreground-muted)]">{selectedApt.id} • {selectedApt.service}</p>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Client Card */}
                            <div className="bg-stone-50 p-4 rounded-xl flex items-center gap-3 border border-stone-100">
                                <img src={selectedApt.customer.avatar} className="w-12 h-12 rounded-full" alt="" />
                                <div>
                                    <p className="font-bold text-[var(--color-foreground)]">{selectedApt.customer.name}</p>
                                    <p className="text-xs text-[var(--color-foreground-muted)]">Verified Customer</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Date & Time</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            value={selectedApt.date}
                                            onChange={(e) => setSelectedApt({ ...selectedApt, date: e.target.value })}
                                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 font-medium focus:border-[var(--color-primary)] outline-none"
                                        />
                                        <input
                                            type="time"
                                            value={selectedApt.time}
                                            onChange={(e) => setSelectedApt({ ...selectedApt, time: e.target.value })}
                                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 font-medium focus:border-[var(--color-primary)] outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Assigned Staff</label>
                                    <div className="relative">
                                        <select
                                            value={selectedApt.staff.name}
                                            onChange={(e) => setSelectedApt({ ...selectedApt, staff: { ...selectedApt.staff, name: e.target.value } })}
                                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 font-medium focus:border-[var(--color-primary)] outline-none appearance-none"
                                        >
                                            <option>Marcus Johnson</option>
                                            <option>Sarah Mitchell</option>
                                            <option>Jessica Wu</option>
                                            <option>David Chen</option>
                                            <option>Elena Rodriguez</option>
                                            <option>Michael Ross</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Internal Notes</label>
                                    <textarea
                                        value={selectedApt.notes || ''}
                                        onChange={(e) => setSelectedApt({ ...selectedApt, notes: e.target.value })}
                                        className="w-full h-24 bg-white border border-stone-200 rounded-xl px-4 py-3 font-medium focus:border-[var(--color-primary)] outline-none resize-none"
                                        placeholder="Add private notes for staff..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-stone-100 bg-white">
                            <button
                                onClick={handleSaveChanges}
                                className="w-full py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg shadow-lg shadow-orange-500/20 hover:bg-[#e67e3b] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                Save Changes
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Notification Toast */}
            <div className={`fixed bottom-8 right-8 bg-stone-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="p-1 bg-green-500 rounded-full text-white"><Check size={12} strokeWidth={3} /></div>
                <span className="font-bold text-sm">Update Successful</span>
            </div>
        </div>
    );
};

export default AdminAppointments;
