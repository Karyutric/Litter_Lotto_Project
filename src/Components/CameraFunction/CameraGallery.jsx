import React from 'react';

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
      
      <div className='container'>
        {isMobileDevice() ? <MobileImageCapture /> : <ImageCapture />}
        <Gallery />
      </div>
    </>
  );
};

export default CameraGallery;
