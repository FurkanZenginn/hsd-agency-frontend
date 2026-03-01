import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/apiClient';

/**
 * Herhangi bir API endpoint'inden veri çekmek için genel hook.
 * Token ve hata yönetimi apiClient üzerinden yapılır.
 *
 * @param {string|null} endpoint - '/services' gibi path (null ise istek atılmaz)
 * @param {object} options - ek seçenekler
 */
export const useFetch = (endpoint, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!!endpoint);
    const [error, setError] = useState(null);

    const optionsKey = JSON.stringify(options);

    const fetchData = useCallback(async () => {
        if (!endpoint) return;
        setLoading(true);
        setError(null);
        try {
            const result = await apiClient.get(endpoint, JSON.parse(optionsKey));
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, optionsKey]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
