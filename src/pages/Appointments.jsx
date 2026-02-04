import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, MoreVertical } from 'lucide-react';
import { getAppointments } from '../services/api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAppointments();
            setAppointments(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">My Appointments</h1>
                <p className="text-[var(--color-foreground-muted)]">Manage your upcoming and past bookings.</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="p-12 text-center text-stone-400">Loading appointments...</div>
                ) : (
                    appointments.map((apt) => (
                        <div key={apt.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:shadow-lg hover:border-orange-100">
                            {/* Image / Date Box */}
                            <div className="w-full md:w-24 h-24 rounded-xl relative overflow-hidden flex-shrink-0">
                                <img src={apt.image} alt={apt.provider} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">{apt.provider}</span>
                                    {apt.status === 'Upcoming' ? (
                                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                                            Upcoming
                                        </span>
                                    ) : (
                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                                            Completed
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">{apt.service}</h3>

                                <div className="flex flex-wrap gap-4 text-sm text-[var(--color-foreground-muted)]">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} className="text-stone-400" />
                                        <span>{apt.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={16} className="text-stone-400" />
                                        <span>{apt.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} className="text-stone-400" />
                                        <span>{apt.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                                {apt.status === 'Upcoming' && (
                                    <>
                                        <button className="px-5 py-2 rounded-lg border border-[rgba(0,0,0,0.1)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-alt)] hover:text-[var(--color-foreground)] text-sm font-medium transition-colors">
                                            Reschedule
                                        </button>
                                        <button className="px-5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 text-sm font-medium transition-colors">
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {apt.status === 'Completed' && (
                                    <button className="px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-sm font-medium shadow-md transition-colors">
                                        Book Again
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Appointments;
