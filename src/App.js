import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// Import the authentication context and provider
import { AuthProvider, AuthContext } from './Components/Services/authContext';
// Import page components
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/LoginForm/RegisterForm';
import CameraGallery from './Components/CameraFunction/CameraGallery';
import Dashboard from './Components/Pages/dashboard';
import AdminPage from './Components/Pages/adminPage';
import AdminGallery from './Components/Pages/adminGallery';
import UserSettings from './Components/Pages/userSettings';
import About from './Components/Pages/About';
// Import navigation components
import NavBar from './Components/Services/NavBar';
import AdminNavBar from './Components/Services/AdminNavBar';
// Import toast notifications
import { ToastContainer } from 'react-toastify';
// Import styles
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component responsible for rendering app content based on authentication state and user role
const AppContent = () => {
  // Hook to access current route/location
  const location = useLocation();
  // Access authentication state from context
  const { authState } = useContext(AuthContext);
  // Determine if the navigation bar should be shown based on the current path
  const showNavBar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';
  // Check if the logged-in user is an admin
  const isAdmin = authState.user?.role === 'admin';

  return (
    <>
      {/* Conditionally render the appropriate navigation bar */}
      {showNavBar && (isAdmin ? <AdminNavBar /> : <NavBar />)}
      <div className="main-content">
        <Routes>
          {/* Public routes accessible before authentication */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Conditional rendering of routes based on the user's role */}
          {isAdmin ? (
            // Admin-specific routes
            <>
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/admin/gallery/:userId" element={<AdminGallery />} />
            </>
          ) : (
            // Regular user-specific routes
            <>
              <Route path="/camera-gallery" element={<CameraGallery />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/userSettings" element={<UserSettings />} />
              <Route path="/about" element={<About />} />
            </>
          )}
        </Routes>
        {/* Toast notifications container */}
        <ToastContainer />
      </div>
    </>
  );
};

// Main App component that wraps everything in the AuthProvider and Router
const App = () => {
  return (
    <AuthProvider> {/* Provides authentication state to the entire app */}
      <Router> {/* Enables routing across the app */}
        <AppContent /> {/* Render the main content of the app */}
      </Router>
    </AuthProvider>
  );
};

export default App;
