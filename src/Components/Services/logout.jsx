import React, { useContext } from 'react';
import { AuthContext } from './authContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button className="nav-button" onClick={handleLogout}>
            <FaSignOutAlt /> {/* Use the logout icon here */}
        </button>
    );
};

export default LogoutButton;
