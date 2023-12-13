import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageCapture from './ImageCapture';
import MobileImageCapture from './MobileImageCapture'; // Import the mobile component
import LocationCapture from './LocationCapture';
import Gallery from './Gallery';

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


const App = () => {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route exact path="/" element={isMobileDevice() ? <MobileImageCapture /> : <ImageCapture />} />
          <Route path="/location" element={<LocationCapture />} />
        </Routes>

        <Gallery />

      </div>
    </Router>
  );
};

export default App;

