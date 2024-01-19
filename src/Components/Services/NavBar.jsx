import React from 'react';
import { FaHome, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Services/logout';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/dashboard');
  }

  const handleCameraClick = () => {
    navigate('/camera-gallery');
  };

  return (
    <nav className="nav-bar">
      <button className="nav-button" onClick={handleHomeClick}><FaHome /></button>
      <button className="nav-button camera-button" onClick={handleCameraClick}><FaCamera /></button>
      <LogoutButton />
    </nav>
  );
};

export default NavBar;
