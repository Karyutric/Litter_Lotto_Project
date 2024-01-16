import React from 'react';
import NavBar from '../Services/NavBar';
import ImageCapture from '../../ImageCapture';
import MobileImageCapture from '../../MobileImageCapture'; 
import Gallery from '../../Gallery';
import '../../camera.css';

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const CameraGallery = () => {
  return (
    <>
      <NavBar />
      <div className='container'>
        {isMobileDevice() ? <MobileImageCapture /> : <ImageCapture />}
        <Gallery />
      </div>
    </>
  );
};

export default CameraGallery;
