import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Services/logout';
import './NavBar.css';

const AdminNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light mask-custom shadow-0">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link" onClick={() => navigate('/adminPage')}>LitterLotto</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Expand Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/adminPage')}>Users</button>
            </li>
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