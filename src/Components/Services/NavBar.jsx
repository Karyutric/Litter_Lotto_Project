import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import LogoutButton from '../Services/logout'; // Import LogoutButton component for logging out
import './NavBar.css'; // Import CSS for styling the NavBar

// NavBar component definition
const NavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook for programmatic navigation

  return (
    // Bootstrap navbar component
    <nav className="navbar navbar-expand-lg navbar-light mask-custom shadow-0">
      <div className="container-fluid">
        {/* Navbar brand/logo, navigates to the dashboard page on click */}
        <button className="navbar-brand btn btn-link" onClick={() => navigate('/dashboard')}>LitterLotto</button>
        {/* Toggler button for collapsing navbar on smaller screens */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Expand Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Navigation link to the Home/Dashboard page */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/dashboard')}>Home</button>
            </li>
            {/* Navigation link to the Camera/Gallery page */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/camera-gallery')}>Camera</button>
            </li>
            {/* Navigation link to the User Settings page */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/userSettings')}>Settings</button>
            </li>
            {/* Navigation link to the About page */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/About')}>About</button>
            </li>
            {/* Logout button component */}
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
