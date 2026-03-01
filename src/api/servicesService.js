// =====================================================================
//  HİZMET SERVİSİ (SERVICES SERVICE)
//  USE_MOCK=true  → Sahte veriyle çalışır (backend gerekmez)
//  USE_MOCK=false → Gerçek API çağrısı yapılır
// =====================================================================

import { apiClient } from './apiClient';
import { USE_MOCK } from './config';

const MOCK_DELAY = () => new Promise((r) => setTimeout(r, 400));

const MOCK_SERVICES = [
    { id: 's1', name: 'Hassas Kesim', duration: '60 dk', price: '$80' },
    { id: 's2', name: 'Balyaj Boya', duration: '180 dk', price: '$150' },
    { id: 's3', name: 'Keratin Bakımı', duration: '120 dk', price: '$250' },
];

export const servicesService = {
    getServices: async () => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return MOCK_SERVICES;
        }
        return apiClient.get('/services');
    },

    getServiceById: async (id) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return MOCK_SERVICES.find((s) => s.id === id) || null;
        }
        return apiClient.get(`/services/${id}`);
    },
};
