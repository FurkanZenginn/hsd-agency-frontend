// =====================================================================
//  API İSTEK MERKEZİ (API CLIENT)
//  Tüm HTTP istekleri buradan geçer.
//  - Token yönetimi otomatik yapılır (Authorization: Bearer ...)
//  - HTTP hataları yaklanır ve Türkçe mesaja dönüştürülür
//  - 401 gelirse kullanıcı otomatik çıkış yapılır
// =====================================================================

import { API_BASE_URL } from './config';

const HTTP_ERRORS = {
    400: 'Geçersiz istek. Lütfen bilgilerinizi kontrol edin.',
    401: 'Oturumunuz sona erdi. Lütfen tekrar giriş yapın.',
    403: 'Bu işlem için yetkiniz bulunmamaktadır.',
    404: 'İstenen kaynak bulunamadı.',
    409: 'Bu kayıt zaten mevcut.',
    422: 'Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.',
    429: 'Çok fazla istek gönderildi. Lütfen bir süre bekleyin.',
    500: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
    503: 'Servis şu an kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
};

/**
 * Token'ı localStorage'dan alır.
 */
function getToken() {
    return localStorage.getItem('token');
}

/**
 * Temel API isteği atar.
 * @param {string} endpoint - API endpoint ('/auth/login' gibi)
 * @param {RequestInit} options - fetch seçenekleri
 * @returns {Promise<any>} - JSON yanıt
 */
async function request(endpoint, options = {}) {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // 401 → kullanıcıyı çıkış yaptır
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth:logout'));
    }

    // Hata durumunda anlamlı mesaj fırlat
    if (!response.ok) {
        let errorMessage = HTTP_ERRORS[response.status] || 'Beklenmeyen bir hata oluştu.';
        try {
            const errorData = await response.json();
            if (errorData?.message) errorMessage = errorData.message;
            if (errorData?.error) errorMessage = errorData.error;
        } catch {
            // JSON parse edilemedi, genel mesaj kullanılır
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
    }

    // 204 No Content gibi boş yanıtlar
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// =====================================================================
//  HTTP Metod Kısayolları
// =====================================================================

export const apiClient = {
    get: (endpoint, options = {}) =>
        request(endpoint, { method: 'GET', ...options }),

    post: (endpoint, body, options = {}) =>
        request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        }),

    put: (endpoint, body, options = {}) =>
        request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options,
        }),

    patch: (endpoint, body, options = {}) =>
        request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
            ...options,
        }),

    delete: (endpoint, options = {}) =>
        request(endpoint, { method: 'DELETE', ...options }),
};
