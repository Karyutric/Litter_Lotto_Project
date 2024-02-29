import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import LogoutButton from '../Services/logout'; // Import LogoutButton component for logging out
import './NavBar.css'; // Import CSS for styling the navigation bar

const AdminNavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    // Navigation bar container with Bootstrap classes for styling
    <nav className="navbar navbar-expand-lg navbar-light mask-custom shadow-0">
      <div className="container-fluid">
        // Button acting as the brand/logo, navigates to the admin page on click
        <button className="navbar-brand btn btn-link" onClick={() => navigate('/adminPage')}>LitterLotto</button>
        // Toggler for responsive navigation bar
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Expand Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        // Collapsible container for navigation links
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            // Navigation item for Users section, navigates to the admin page on click
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/adminPage')}>Users</button>
            </li>
            // Logout button component
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
