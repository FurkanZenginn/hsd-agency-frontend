// =====================================================================
//  PERSONEL SERVİSİ (STAFF SERVICE)
//  USE_MOCK=true  → Sahte veriyle çalışır (backend gerekmez)
//  USE_MOCK=false → Gerçek API çağrısı yapılır
// =====================================================================

import { apiClient } from './apiClient';
import { USE_MOCK } from './config';

const MOCK_DELAY = () => new Promise((r) => setTimeout(r, 400));

const MOCK_STAFF = [
    { id: 'st1', name: 'Alex Johnson', role: 'Kıdemli Stilist', avatar: null },
    { id: 'st2', name: 'Sam Rivera', role: 'Renk Uzmanı', avatar: null },
    { id: 'st3', name: 'Jamie Lee', role: 'Usta Stilist', avatar: null },
];

const MOCK_SLOTS = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

export const staffService = {
    getStaff: async () => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return MOCK_STAFF;
        }
        return apiClient.get('/staff');
    },

    getStaffById: async (id) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return MOCK_STAFF.find((s) => s.id === id) || null;
        }
        return apiClient.get(`/staff/${id}`);
    },

    getAvailableSlots: async (staffId, date) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return MOCK_SLOTS;
        }
        return apiClient.get(`/staff/${staffId}/slots?date=${date}`);
    },
};
