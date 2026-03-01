import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // apiClient 401 gelince otomatik logout
    useEffect(() => {
        const handleAutoLogout = () => setUser(null);
        window.addEventListener('auth:logout', handleAutoLogout);
        return () => window.removeEventListener('auth:logout', handleAutoLogout);
    }, []);

    const login = useCallback(async (email, password) => {
        setError(null);
        const data = await authService.login(email, password);
        setUser(data.user);
        return data;
    }, []);

    const register = useCallback(async (name, email, password) => {
        setError(null);
        const data = await authService.register(name, email, password);
        setUser(data.user);
        return data;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
    }, []);

    const updateUser = useCallback((updatedFields) => {
        setUser(prev => {
            const newUser = { ...prev, ...updatedFields };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
