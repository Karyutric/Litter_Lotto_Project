import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Components/Services/authContext';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/LoginForm/RegisterForm';
import CameraGallery from './Components/CameraFunction/CameraGallery';
import Dashboard from './Components/Pages/dashboard';
import AdminPage from './Components/Pages/adminPage';
import AdminGallery from './Components/Pages/adminGallery'; // Import AdminGallery
import NavBar from './Components/Services/NavBar';

const AppContent = () => {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const showNavBar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';
  const isAdmin = authState.user?.role === 'admin';

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Conditional rendering based on role */}
          {isAdmin ? (
            // Routes available only to admin users
            <>
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/admin/gallery/:userId" element={<AdminGallery />} /> {/* Add route for AdminGallery */}
            </>
          ) : (
            // Routes available to regular users
            <>
              <Route path="/camera-gallery" element={<CameraGallery />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
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





