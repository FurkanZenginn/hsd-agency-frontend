import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { getStaffMembers } from '../../services/api';

const TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
];

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [staffMembers, setStaffMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        const fetchStaff = async () => {
            const data = await getStaffMembers();
            setStaffMembers(data);
            setLoading(false);
        };
        fetchStaff();
    }, []);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleConfirm = () => {
        // Here you would typically send the data to the API
        alert(`Appointment Confirmed!\n\nStaff: ${selectedStaff.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
        navigate('/appointments'); // Redirect to appointments page
    };

    const isStepValid = () => {
        if (step === 1) return !!selectedStaff;
        if (step === 2) return !!selectedDate;
        if (step === 3) return !!selectedTime;
        return false;
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 pt-10 px-4">

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">Book Appointment</h1>
                <p className="text-[var(--color-foreground-muted)]">Select your preferred staff, date, and time.</p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-10 rounded-full" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-[var(--color-primary)] -z-10 rounded-full transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                />

                {[
                    { id: 1, label: "Staff", icon: User },
                    { id: 2, label: "Date", icon: Calendar },
                    { id: 3, label: "Time", icon: Clock }
                ].map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 bg-white px-2">
                        <div
                            className={`
                                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                                ${step >= s.id
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                                    : 'border-stone-300 text-stone-400 bg-white'
                                }
                            `}
                        >
                            <s.icon size={18} />
                        </div>
                        <span className={`text-xs font-bold ${step >= s.id ? 'text-[var(--color-primary)]' : 'text-stone-400'}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content Steps */}
            <div className="min-h-[400px]">

                {/* STEP 1: Select Staff */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-bold mb-6 text-[var(--color-foreground)]">Choose a Specialist</h2>
                        {loading ? (
                            <div className="text-center text-stone-400 py-12">Loading staff...</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {staffMembers.map(staff => (
                                    <div
                                        key={staff.id}
                                        onClick={() => setSelectedStaff(staff)}
                                        className={`
                                            cursor-pointer rounded-2xl p-4 border transition-all hover:shadow-lg flex items-center gap-4
                                            ${selectedStaff?.id === staff.id
                                                ? 'border-[var(--color-primary)] bg-orange-50 ring-2 ring-[var(--color-primary)] ring-offset-2'
                                                : 'border-stone-200 bg-white hover:border-[var(--color-primary)]'
                                            }
                                        `}
                                    >
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-100">
                                            <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[var(--color-foreground)]">{staff.name}</h3>
                                            <p className="text-xs text-[var(--color-primary)] font-semibold uppercase">{staff.role}</p>
                                            <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                                                <span>⭐ {staff.rating}</span>
                                                <span>• {staff.experience}y exp</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 2: Select Date */}
                {step === 2 && (
                    <div className="animate-fade-in max-w-md mx-auto text-center">
                        <h2 className="text-xl font-bold mb-6 text-[var(--color-foreground)]">Select a Date</h2>
                        <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-4 border border-stone-200 rounded-2xl text-lg font-medium focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none shadow-sm"
                        />
                        <p className="mt-4 text-stone-500 text-sm">
                            Please select a date to confirm availability. We are open Monday to Saturday.
                        </p>
                    </div>
                )}

                {/* STEP 3: Select Time */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-bold mb-6 text-[var(--color-foreground)]">Select a Time Slot</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {TIME_SLOTS.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`
                                        py-3 px-4 rounded-xl text-sm font-bold border transition-all
                                        ${selectedTime === time
                                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md transform scale-105'
                                            : 'bg-white border-stone-200 text-stone-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                        }
                                    `}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {selectedTime && (
                            <div className="mt-10 p-6 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                <h3 className="font-bold text-lg mb-4 text-[var(--color-foreground)]">Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Staff:</span>
                                        <span className="font-bold">{selectedStaff?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Date:</span>
                                        <span className="font-bold">{selectedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Time:</span>
                                        <span className="font-bold">{selectedTime}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-stone-100">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                        ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-stone-500 hover:bg-stone-50'}
                    `}
                >
                    <ChevronLeft size={20} /> Back
                </button>

                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`
                            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg
                            ${isStepValid()
                                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:translate-y-[-2px]'
                                : 'bg-stone-300 cursor-not-allowed'}
                        `}
                    >
                        Next <ChevronRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={handleConfirm}
                        disabled={!isStepValid()}
                        className={`
                            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-green-500/20
                            ${isStepValid()
                                ? 'bg-green-600 hover:bg-green-700 hover:translate-y-[-2px]'
                                : 'bg-stone-300 cursor-not-allowed'}
                        `}
                    >
                        Confirm Appointment <CheckCircle size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Booking;
