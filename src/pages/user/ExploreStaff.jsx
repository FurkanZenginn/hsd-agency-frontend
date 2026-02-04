import React, { useState, useEffect } from 'react';
import { Star, Clock, Award } from 'lucide-react';
import { getStaffMembers } from '../../services/api';

const StaffCard = ({ staff }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            <div className="p-6 flex flex-col items-center flex-1">
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-[var(--color-primary)]">
                        <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-[var(--color-foreground)] text-center mb-1">
                    {staff.name}
                </h3>
                <p className="text-[var(--color-foreground-muted)] text-sm font-medium mb-3 text-center">
                    {staff.role}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-1.5 mb-4 bg-orange-50/50 px-3 py-1 rounded-full">
                    <Star size={14} className="text-orange-400 fill-orange-400" />
                    <span className="text-[var(--color-foreground)] font-bold text-sm">{staff.rating}</span>
                    <span className="text-stone-400 text-xs">({staff.reviewCount} reviews)</span>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-1.5 text-sm text-[var(--color-secondary)] mb-4 font-medium">
                    <Award size={16} />
                    <span>{staff.experience} years exp.</span>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
                    {staff.specialties.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs px-2.5 py-1 rounded-lg bg-stone-50 text-[var(--color-foreground-muted)] border border-stone-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action */}
            <div className="p-4 pt-0 mt-auto">
                <button className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

const ExploreStaff = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStaffMembers();
                setStaffMembers(data);
            } catch (error) {
                console.error("Failed to fetch staff members", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight">
                    Our Experts
                </h1>
                <p className="text-[var(--color-foreground-muted)] text-lg max-w-2xl">
                    Meet our talented professionals dedicated to your style. Choose the best expert for your needs.
                </p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-96 bg-white rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                    {staffMembers.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreStaff;
