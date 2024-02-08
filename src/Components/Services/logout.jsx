import React, { useContext, useState } from 'react';
import { AuthContext } from './authContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Make sure you have 'react-bootstrap' installed

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleLogoutConfirm = () => {
        logout();
        navigate('/login');
        setShowModal(false);
    };

    const handleLogoutCancel = () => {
        setShowModal(false);
    };

    return (
        <>
            <button className="nav-link btn btn-link" onClick={handleLogoutClick}>
                Logout
            </button>

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
