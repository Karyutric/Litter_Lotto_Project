import React from 'react';
import NavBar from '../Services/NavBar';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Litter Impact</h1>
      </header>

      <div className="dashboard-map">
        {/* Placeholder for map */}
        <div className="map-placeholder">Map</div>
      </div>

      <NavBar />
    </div>
  );
};

export default Dashboard;

