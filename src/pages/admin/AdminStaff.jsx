import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, Calendar, Edit2, Star, Check, X, Shield } from 'lucide-react';

const MOCK_STAFF = [
    {
        id: 1,
        name: "Sarah Jenkins",
        email: "sarah.j@hsd.agency",
        role: "Master Stylist",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
        skills: ["Colorist", "Precision Cuts", "Styling"],
        status: "Active",
        rating: 4.9,
        schedule: "Mon-Fri"
    },
    {
        id: 2,
        name: "David Chen",
        email: "david.c@hsd.agency",
        role: "Senior Barber",
        avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150",
        skills: ["Fades", "Beard Sculpting", "Shaves"],
        status: "Active",
        rating: 4.8,
        schedule: "Tue-Sat"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        email: "elena.r@hsd.agency",
        role: "Esthetician",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        skills: ["Skincare", "Facials", "Peels"],
        status: "On Leave",
        rating: 5.0,
        schedule: "Mon-Thu"
    },
    {
        id: 4,
        name: "Michael Ross",
        email: "michael.r@hsd.agency",
        role: "Massage Therapist",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        skills: ["Deep Tissue", "Sports Recovery", "Swedish"],
        status: "Active",
        rating: 4.7,
        schedule: "Wed-Sun"
    },
    {
        id: 5,
        name: "Jessica Wu",
        email: "jessica.w@hsd.agency",
        role: "Nail Artist",
        avatar: "https://images.unsplash.com/photo-1597223591421-2890606714b9?auto=format&fit=crop&q=80&w=150",
        skills: ["Nail Art", "Manicure", "Pedicure"],
        status: "Inactive",
        rating: 4.9,
        schedule: "Fri-Mon"
    }
];

const ToggleSwitch = ({ active, onChange }) => (
    <button
        onClick={() => onChange(!active)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${active ? 'bg-[#7B9E89]' : 'bg-stone-200'}`}
    >
        <span
            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`}
        />
    </button>
);

const AdminStaff = () => {
    const [staffList, setStaffList] = useState(MOCK_STAFF);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleToggleStatus = (id) => {
        setStaffList(prev => prev.map(staff => {
            if (staff.id === id) {
                return { ...staff, status: staff.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return staff;
        }));
    };

    const filteredStaff = staffList.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Active' && staff.status === 'Active') ||
            (statusFilter === 'On Leave' && staff.status === 'On Leave'); // Simplification for demo
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 pb-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Team & Staff Management</h1>
                    <p className="text-[var(--color-foreground-muted)]">Oversee your team, roles, and availability.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#FF8C42] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-[#e67e3b] transition-all hover:-translate-y-1">
                    <Plus size={20} />
                    Add New Team Member
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search staff by name or role..."
                        className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-stone-50 p-1 rounded-xl">
                    {['All', 'Active', 'On Leave'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setStatusFilter(filter)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${statusFilter === filter ? 'bg-white text-[var(--color-foreground)] shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50/50 border-b border-stone-100">
                            <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-wider pl-8">Staff Member</th>
                            <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-wider">Role & Expertise</th>
                            <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-wider">Status</th>
                            <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-wider">Performance</th>
                            <th className="p-6 text-xs font-bold text-stone-400 uppercase tracking-wider text-right pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {filteredStaff.map(staff => (
                            <tr key={staff.id} className="group hover:bg-[#FAF7F2] transition-colors">
                                {/* Staff Member */}
                                <td className="p-6 pl-8">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${staff.status === 'Active' ? 'bg-green-500' : staff.status === 'On Leave' ? 'bg-amber-500' : 'bg-stone-400'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[var(--color-foreground)]">{staff.name}</h3>
                                            <div className="flex items-center gap-1 text-xs text-[var(--color-foreground-muted)]">
                                                <Mail size={12} /> {staff.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Role & Expertise */}
                                <td className="p-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Shield size={14} className="text-[#FF8C42]" />
                                            <span className="font-bold text-sm text-[var(--color-foreground)]">{staff.role}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {staff.skills.map((skill, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] uppercase font-bold tracking-wider rounded-md border border-orange-100">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                {/* Status Toggle */}
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <ToggleSwitch active={staff.status === 'Active'} onChange={() => handleToggleStatus(staff.id)} />
                                        <span className={`text-sm font-medium ${staff.status === 'Active' ? 'text-[#7B9E89]' : 'text-stone-400'}`}>
                                            {staff.status === 'Active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </td>

                                {/* Performance */}
                                <td className="p-6">
                                    <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg w-fit border border-stone-100">
                                        <Star size={14} className="text-orange-400 fill-orange-400" />
                                        <span className="font-bold text-sm text-[var(--color-foreground)]">{staff.rating}</span>
                                        <span className="text-xs text-stone-400">/ 5.0</span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="p-6 pr-8 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-[var(--color-foreground)] transition-colors" title="Edit Profile">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-[var(--color-foreground)] transition-colors" title="View Schedule">
                                            <Calendar size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStaff;
