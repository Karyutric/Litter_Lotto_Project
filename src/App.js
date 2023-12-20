import React from 'react';  // Importing React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importing components from react-router-dom for routing
import ImageCapture from './ImageCapture';  // Importing ImageCapture component
import MobileImageCapture from './MobileImageCapture'; // Importing MobileImageCapture component for mobile devices
import LocationCapture from './LocationCapture';  // Importing LocationCapture component
import Gallery from './Gallery';  // Importing Gallery component

// Function to detect if the current device is a mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Main App component
const App = () => {
  return (
    <Router> 
      <div> 
      
        <Routes>
          <Route exact path="/" element={isMobileDevice() ? <MobileImageCapture /> : <ImageCapture />} />
          {/* Route for root path. It renders MobileImageCapture if it's a mobile device, otherwise ImageCapture */}
          <Route path="/location" element={<LocationCapture />} />
          {/* Route for '/location' path that renders LocationCapture component */}
        </Routes>

        <Gallery />

      </div>
    </Router>
  );
};

export default App;  // Exporting the App component for use


