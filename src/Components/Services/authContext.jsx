import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        user: JSON.parse(localStorage.getItem('user')) || null, // Storing user data
    });

    // Function to update the auth state and local storage during login
    const login = (accessToken, refreshToken, userData) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData)); // Store the user data as a string

        setAuthState({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: userData,
        });
    };

    // Function to clear auth state and local storage during logout
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setAuthState({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    };

    // Effect to keep state in sync with local storage
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        if (storedAccessToken && storedRefreshToken && storedUser) {
            setAuthState({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                user: JSON.parse(storedUser), // Parse the user data back into an object
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
