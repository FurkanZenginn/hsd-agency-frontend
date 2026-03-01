// =====================================================================
//  RANDEVU SERVİSİ (APPOINTMENT SERVICE)
//  USE_MOCK=true  → Sahte veriyle çalışır (backend gerekmez)
//  USE_MOCK=false → Gerçek API çağrısı yapılır
// =====================================================================

import { apiClient } from './apiClient';
import { USE_MOCK } from './config';

const MOCK_DELAY = () => new Promise((r) => setTimeout(r, 500));

let mockAppointments = [
    {
        id: 'a1',
        service: { id: 's1', name: 'Hassas Kesim', duration: '60 dk', price: '$80' },
        staff: { id: 'st1', name: 'Alex Johnson', role: 'Kıdemli Stilist' },
        date: '2024-11-15',
        time: '10:00 AM',
        notes: '',
        status: 'Completed',
    },
];

export const appointmentService = {
    getAppointments: async () => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return [...mockAppointments];
        }
        return apiClient.get('/appointments');
    },

    createAppointment: async (data) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            const newAppt = {
                id: Math.random().toString(36).substr(2, 9),
                service: data.service,
                staff: data.staff,
                date: data.date,
                time: data.time,
                notes: data.notes || '',
                status: 'Confirmed',
            };
            mockAppointments = [newAppt, ...mockAppointments];
            return newAppt;
        }
        return apiClient.post('/appointments', {
            serviceId: data.service?.id,
            staffId: data.staff?.id,
            date: data.date,
            time: data.time,
            notes: data.notes || '',
        });
    },

    cancelAppointment: async (id) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            mockAppointments = mockAppointments.map((a) =>
                a.id === id ? { ...a, status: 'Cancelled' } : a
            );
            return { success: true };
        }
        return apiClient.patch(`/appointments/${id}/cancel`, {});
    },

    getAppointmentById: async (id) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return mockAppointments.find((a) => a.id === id) || null;
        }
        return apiClient.get(`/appointments/${id}`);
    },
};
