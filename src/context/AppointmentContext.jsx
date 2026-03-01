import { createContext, useState, useCallback } from 'react';
import { appointmentService } from '../api/appointmentService';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState({
        service: null,
        staff: null,
        date: null,
        time: null,
        notes: '',
    });

    const [appointments, setAppointments] = useState([]);
    const [appointmentsLoading, setAppointmentsLoading] = useState(false);
    const [appointmentsError, setAppointmentsError] = useState(null);

    const fetchAppointments = useCallback(async () => {
        setAppointmentsLoading(true);
        setAppointmentsError(null);
        try {
            const data = await appointmentService.getAppointments();
            setAppointments(Array.isArray(data) ? data : data?.appointments ?? []);
        } catch (err) {
            setAppointmentsError(err.message);
        } finally {
            setAppointmentsLoading(false);
        }
    }, []);

    const updateBookingData = (stepData) => {
        setBookingData((prev) => ({ ...prev, ...stepData }));
    };

    const resetBooking = () => {
        setBookingData({ service: null, staff: null, date: null, time: null, notes: '' });
    };

    const addAppointment = useCallback(async (newAppt) => {
        const created = await appointmentService.createAppointment(newAppt);
        setAppointments((prev) => [created, ...prev]);
        return created;
    }, []);

    const updateAppointment = (id, updatedData) => {
        setAppointments((prev) =>
            prev.map((appt) => appt.id === id ? { ...appt, ...updatedData } : appt)
        );
    };

    const cancelAppointment = useCallback(async (id) => {
        await appointmentService.cancelAppointment(id);
        setAppointments((prev) =>
            prev.map((appt) => appt.id === id ? { ...appt, status: 'Cancelled' } : appt)
        );
    }, []);

    return (
        <AppointmentContext.Provider value={{
            bookingData, updateBookingData, resetBooking,
            appointments, appointmentsLoading, appointmentsError,
            fetchAppointments, addAppointment, updateAppointment, cancelAppointment,
        }}>
            {children}
        </AppointmentContext.Provider>
    );
};
