// Imports necessary hooks from React
import React, { createContext, useState, useEffect } from 'react';

// Creating a Context for authentication state to be accessible throughout the application
export const AuthContext = createContext();

// AuthProvider component that will wrap around the application or parts of it to provide authentication state
export const AuthProvider = ({ children }) => {
    // Initialize state with values from localStorage or set to null if not available
    const [authState, setAuthState] = useState({
        accessToken: localStorage.getItem('accessToken'), // Retrieve access token from localStorage
        refreshToken: localStorage.getItem('refreshToken'), // Retrieve refresh token from localStorage
        user: JSON.parse(localStorage.getItem('user')) || null, // Parse the user object from localStorage, defaulting to null if not found
    });

    // Function to update authentication state and localStorage when user logs in
    const login = (accessToken, refreshToken, userData) => {
        // Update localStorage with new credentials and user data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData)); // Convert user data to a string for storage

        // Update state with new authentication information
        setAuthState({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: userData,
        });
    };

    // Function to clear authentication state and localStorage when user logs out
    const logout = () => {
        // Remove authentication information from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Reset state to signify that the user is logged out
        setAuthState({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    };

    // Effect hook to synchronize auth state with localStorage when the component mounts
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        // Check if there is existing authentication information in localStorage and update state accordingly
        if (storedAccessToken && storedRefreshToken && storedUser) {
            setAuthState({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                user: JSON.parse(storedUser), // Parse the stored user string back into an object
            });
        }
    }, []); // Empty dependency array means this effect runs once on component mount

    // Provide the authentication state and functions to the component tree
    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children} {/* Render children components passed to this provider */}
        </AuthContext.Provider>
    );
};
