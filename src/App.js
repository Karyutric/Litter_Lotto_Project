import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/Services/authContext';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/LoginForm/RegisterForm';
import CameraGallery from './Components/CameraFunction/CameraGallery';
import Dashboard from './Components/Pages/dashboard';
import NavBar from './Components/Services/NavBar'

const AppContent = () => {
  const location = useLocation(); // Get the current location

  // Determine if the NavBar should be shown
  const showNavBar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/camera-gallery" element={<CameraGallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;



