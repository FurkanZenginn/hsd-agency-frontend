import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load from localStorage on mount, or set default dev user
    useEffect(() => {
        const storedUser = localStorage.getItem('hsd_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // DEV USER BYPASS
            const devUser = {
                id: 1,
                name: 'Valued Client',
                email: 'client@example.com',
                role: 'customer',
                avatar: 'https://ui-avatars.com/api/?name=Client&background=f97316&color=fff'
            };
            setUser(devUser);
        }
    }, []);

    const login = async (role) => {
        // role passed here is 'admin' or 'customer' used for internal logic
        // We map it to the API expected 'business' or 'customer' roleType if needed, 
        // or just pass it if the API expects generic.
        // The previous api.js expected 'business' or 'customer'.
        // Calling loginUser with 'business' returns admin data.

        // Logic Mapping:
        const apiRoleType = role === 'admin' ? 'business' : 'customer';

        try {
            const response = await loginUser('user@example.com', apiRoleType);

            if (response.success) {
                setUser(response.user);
                localStorage.setItem('hsd_user', JSON.stringify(response.user));
                return true;
            }
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hsd_user');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
