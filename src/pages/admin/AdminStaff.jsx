import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Mail, Edit2, Star, X, Shield, Trash2, Camera, CheckCircle, AlertCircle } from 'lucide-react';

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
    }
];

// --- Components ---

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-up ${type === 'success' ? 'bg-[#5da078] text-white' : 'bg-red-500 text-white'
            }`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{message}</span>
        </div>
    );
};

const ToggleSwitch = ({ active, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!active)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${active ? 'bg-[#7B9E89]' : 'bg-stone-200'}`}
    >
        <span
            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`}
        />
    </button>
);

const SkillsInput = ({ skills, onAdd, onRemove }) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            onAdd(input.trim());
            setInput("");
        }
    };

    return (
        <div className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus-within:border-[var(--color-primary)] transition-all flex flex-wrap gap-2 items-center min-h-[50px]">
            {skills.map((skill, index) => (
                <span key={index} className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg animate-in fade-in zoom-in duration-200">
                    {skill}
                    <button type="button" onClick={() => onRemove(skill)} className="hover:text-red-500"><X size={12} /></button>
                </span>
            ))}
            <input
                type="text"
                className="bg-transparent outline-none text-sm flex-1 min-w-[100px]"
                placeholder={skills.length === 0 ? "Type skill & hit Enter..." : ""}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

// --- Main Page ---

const AdminStaff = () => {
    const [staffList, setStaffList] = useState(MOCK_STAFF);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // UI State
    const [toast, setToast] = useState(null); // { message, type }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [editingStaffId, setEditingStaffId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        skills: [],
        avatar: "",
        status: "Active"
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    // --- Handlers ---

    const handleOpenModal = (staff = null) => {
        if (staff) {
            setEditingStaffId(staff.id);
            setFormData({
                name: staff.name,
                email: staff.email,
                role: staff.role,
                skills: [...staff.skills],
                avatar: staff.avatar,
                status: staff.status
            });
        } else {
            setEditingStaffId(null);
            setFormData({
                name: "",
                email: "",
                role: "",
                skills: [],
                avatar: "",
                status: "Active"
            });
        }
        setIsModalOpen(true);
    };

    const handleSaveStaff = (e) => {
        e.preventDefault();

        if (editingStaffId) {
            // Update Existing
            setStaffList(prev => prev.map(s => s.id === editingStaffId ? { ...s, ...formData } : s));
            showToast(`${formData.name} updated successfully!`);
        } else {
            // Create New
            const newMember = {
                id: Date.now(),
                ...formData,
                rating: 5.0, // Default for new
            };
            setStaffList([newMember, ...staffList]);
            showToast(`${formData.name} added to the team!`);
        }
        setIsModalOpen(false);
    };

    const handleDeleteClick = (staff) => {
        setStaffToDelete(staff);
    };

    const confirmDelete = () => {
        if (staffToDelete) {
            setStaffList(prev => prev.filter(s => s.id !== staffToDelete.id));
            showToast(`${staffToDelete.name} removed.`, 'success');
            setStaffToDelete(null);
        }
    };

    const handleToggleStatus = (id) => {
        setStaffList(prev => {
            const updated = prev.map(staff => {
                if (staff.id === id) {
                    const newStatus = staff.status === 'Active' ? 'Inactive' : 'Active';
                    // Optional: show toast for status change? Maybe too noisy.
                    return { ...staff, status: newStatus };
                }
                return staff;
            });
            return updated;
        });
    };

    // --- Filter Logic ---

    const filteredStaff = staffList.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Active' && staff.status === 'Active') ||
            (statusFilter === 'On Leave' && staff.status === 'On Leave') ||
            (statusFilter === 'Inactive' && staff.status === 'Inactive');
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 pb-12 animate-fade-in relative min-h-screen">
            {/* Toast Notification */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Team & Staff Management</h1>
                    <p className="text-[var(--color-foreground-muted)]">Oversee your team, roles, and availability.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-[#FF8C42] text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-[#e67e3b] transition-all hover:-translate-y-1"
                >
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
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map(staff => (
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
                                            <span className="text-xs text-stone-400"> / 5.0</span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-6 pr-8 text-right">
                                        <div className="flex items-center justify-end gap-2 text-stone-400">
                                            <button
                                                onClick={() => handleOpenModal(staff)}
                                                className="p-2 rounded-lg hover:bg-orange-50 hover:text-[#FF8C42] hover:scale-110 transition-all duration-200"
                                                title="Edit Profile"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(staff)}
                                                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 hover:scale-110 transition-all duration-200"
                                                title="Delete Staff"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-16 text-center text-stone-400">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300">
                                            <Search size={32} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-stone-500">No staff members found</p>
                                            <p className="text-sm">Try adjusting your search or filters.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                                {editingStaffId ? "Edit Team Member" : "Add New Team Member"}
                            </h2>
                            <p className="text-stone-500">
                                {editingStaffId ? "Update details for this staff member." : "Enter the details for the new staff member."}
                            </p>
                        </div>

                        <form onSubmit={handleSaveStaff} className="space-y-5">
                            {/* Photo & Status */}
                            <div className="flex items-start gap-6">
                                <div className="space-y-2 flex-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Profile Photo</label>
                                    <div className="flex gap-3">
                                        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0 overflow-hidden border border-stone-200 relative group">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <Camera size={24} />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-all h-fit text-sm"
                                            placeholder="Image URL..."
                                            value={formData.avatar}
                                            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Status</label>
                                    <div className="flex items-center gap-3 h-[50px]">
                                        <ToggleSwitch
                                            active={formData.status === 'Active'}
                                            onChange={(isActive) => setFormData({ ...formData, status: isActive ? 'Active' : 'Inactive' })}
                                        />
                                        <span className={`text-sm font-bold ${formData.status === 'Active' ? 'text-[#7B9E89]' : 'text-stone-400'}`}>
                                            {formData.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-all"
                                    placeholder="e.g. Jane Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Role</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-all"
                                        placeholder="e.g. Sr. Stylist"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-all"
                                        placeholder="e.g. jane@hsd.agency"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Expertise (Type & Enter)</label>
                                <SkillsInput
                                    skills={formData.skills}
                                    onAdd={(newSkill) => setFormData({ ...formData, skills: [...formData.skills, newSkill] })}
                                    onRemove={(skillToRemove) => setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) })}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 text-stone-500 font-bold hover:bg-stone-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] px-4 py-3 bg-[#FF8C42] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-[#e67e3b] transition-all"
                                >
                                    {editingStaffId ? "Save Changes" : "Create Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {staffToDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Delete Team Member?</h2>
                        <p className="text-stone-500 mb-8">
                            Are you sure you want to remove <span className="font-bold text-stone-800">{staffToDelete.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setStaffToDelete(null)}
                                className="px-6 py-3 text-stone-500 font-bold hover:bg-stone-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminStaff;
