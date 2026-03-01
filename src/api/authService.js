// =====================================================================
//  KİMLİK DOĞRULAMA SERVİSİ (AUTH SERVICE)
//  Kullanıcı giriş, kayıt, çıkış ve şifre sıfırlama işlemleri
//
//  USE_MOCK=true  → Sahte veriyle çalışır (backend gerekmez)
//  USE_MOCK=false → Gerçek API çağrısı yapılır
// =====================================================================

import { apiClient } from './apiClient';
import { USE_MOCK } from './config';

// ── Mock veri ────────────────────────────────────────────────────────
const MOCK_DELAY = () => new Promise((r) => setTimeout(r, 600));

const MOCK_USER = {
    id: 'mock-001',
    name: 'Misafir Kullanıcı',
    email: 'test@hsd.com',
    role: 'user',
};
const MOCK_TOKEN = 'mock-jwt-token-hsd-agency';

function saveMockSession(user) {
    localStorage.setItem('token', MOCK_TOKEN);
    localStorage.setItem('user', JSON.stringify(user));
}
// ─────────────────────────────────────────────────────────────────────

export const authService = {
    /**
     * Kullanıcı girişi
     */
    login: async (email, password) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            // Basit doğrulama – e-posta ve şifre doluysa kabul et
            if (!email || !password) {
                throw new Error('E-posta ve şifre gereklidir.');
            }
            const user = { ...MOCK_USER, email };
            saveMockSession(user);
            return { token: MOCK_TOKEN, user };
        }

        const data = await apiClient.post('/auth/login', { email, password });
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    },

    /**
     * Yeni kullanıcı kaydı
     */
    register: async (name, email, password) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            if (!name || !email || !password) {
                throw new Error('Tüm alanlar zorunludur.');
            }
            const user = { ...MOCK_USER, name, email };
            saveMockSession(user);
            return { token: MOCK_TOKEN, user };
        }

        const data = await apiClient.post('/auth/register', { name, email, password });
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    },

    /**
     * Kullanıcı çıkışı
     */
    logout: async () => {
        if (!USE_MOCK) {
            try {
                await apiClient.post('/auth/logout', {});
            } catch {
                // logout isteği başarısız olsa bile devam et
            }
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Şifremi unuttum
     */
    forgotPassword: async (email) => {
        if (USE_MOCK) {
            await MOCK_DELAY();
            return { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' };
        }
        return apiClient.post('/auth/forgot-password', { email });
    },
};
