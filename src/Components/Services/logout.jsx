import React, { useContext, useState } from 'react';
import { AuthContext } from './authContext'; // Import the authentication context
import { useNavigate } from 'react-router-dom'; // Hook for programmatically navigating
import { Modal, Button } from 'react-bootstrap'; // Bootstrap components for UI

// LogoutButton component definition
const LogoutButton = () => {
    const { logout } = useContext(AuthContext); // Destructure the logout function from AuthContext
    const navigate = useNavigate(); // Initialize navigate hook
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the logout confirmation modal

    // Function to show the logout confirmation modal
    const handleLogoutClick = () => {
        setShowModal(true);
    };

    // Function to handle logout confirmation
    const handleLogoutConfirm = () => {
        logout(); // Call the logout function from AuthContext to clear authentication state
        navigate('/login'); // Navigate to the login page
        setShowModal(false); // Close the modal
    };

    // Function to cancel logout and close the modal
    const handleLogoutCancel = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* Logout button that opens the confirmation modal */}
            <button className="nav-link btn btn-link" onClick={handleLogoutClick}>
                Logout
            </button>

            {/* Confirmation modal for logging out */}
            <Modal show={showModal} onHide={handleLogoutCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                
                    <Button variant="danger" onClick={handleLogoutCancel}>
                        No
                    </Button>
                    
                    <Button variant="primary" onClick={handleLogoutConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogoutButton;
