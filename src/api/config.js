// =====================================================================
//  API YAPILANDIRMASI
//  Backend URL'ini değiştirmek için sadece bu dosyaya bakın!
//  Ya da projenin kök dizinindeki .env dosyasını düzenleyin:
//    VITE_API_BASE_URL=https://sizin-backend-url.com/api
//    VITE_USE_MOCK=false   ← Backend hazır olunca false yapın
// =====================================================================

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * true  → Backend yokken sahte verilerle çalışır (geliştirme aşaması)
 * false → Gerçek API çağrıları yapılır (backend hazır olduğunda)
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
