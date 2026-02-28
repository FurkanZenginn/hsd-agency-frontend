import { createContext, useState } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    // Current active booking being created
    const [bookingData, setBookingData] = useState({
        service: null,
        staff: null,
        date: null,
        time: null,
        notes: '',
    });

    // List of all user appointments
    const [appointments, setAppointments] = useState([
        // Mock initial data
        {
            id: "a1",
            service: { id: 's1', name: 'Hassas Kesim', duration: '60 dk', price: '$80' },
            staff: { id: 'st1', name: 'Alex Johnson', role: 'Kıdemli Stilist' },
            date: '2023-11-15',
            time: '10:00 AM',
            notes: '',
            status: 'Completed'
        }
    ]);

    const updateBookingData = (stepData) => {
        setBookingData((prev) => ({ ...prev, ...stepData }));
    };

    const resetBooking = () => {
        setBookingData({
            service: null,
            staff: null,
            date: null,
            time: null,
            notes: '',
        });
    };

    const addAppointment = (newAppt) => {
        const appt = {
            ...newAppt,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Confirmed'
        };
        setAppointments((prev) => [appt, ...prev]);
    };

    const updateAppointment = (id, updatedData) => {
        setAppointments((prev) =>
            prev.map(appt => appt.id === id ? { ...appt, ...updatedData } : appt)
        );
    };

    const cancelAppointment = (id) => {
        setAppointments((prev) =>
            prev.map(appt => appt.id === id ? { ...appt, status: 'Cancelled' } : appt)
        );
    };

    return (
        <AppointmentContext.Provider value={{
            bookingData, updateBookingData, resetBooking,
            appointments, addAppointment, updateAppointment, cancelAppointment
        }}>
            {children}
        </AppointmentContext.Provider>
    );
};
