// Import React library for building user interfaces
import React from 'react';

// Import components for capturing images and displaying a gallery
import ImageCapture from '../../ImageCapture';
import MobileImageCapture from '../../MobileImageCapture'; 
import Gallery from '../../Gallery';
// Import CSS styles for the camera functionality
import '../../camera.css';

// Function to detect if the current device is a mobile device based on the user agent
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// React functional component to render the camera and gallery UI
const CameraGallery = () => {
  return (
    <>
      {/* Container div for the camera and gallery components */}
      <div className='container'>
        {/* Conditionally render MobileImageCapture or ImageCapture component based on the device type */}
        {isMobileDevice() ? <MobileImageCapture /> : <ImageCapture />}
        {/* Gallery component to display captured images */}
        <Gallery />
      </div>
    </>
  );
};

// Export CameraGallery component for use in other parts of the application
export default CameraGallery;
