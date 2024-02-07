import React, { useState, useEffect, useRef } from 'react';
import { sendDataToServer } from './utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./camera.css";

const MobileImageCapture = () => {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [materialTag, setMaterialTag] = useState('');

  useEffect(() => {
    initCamera();
  }, []);

  const initCamera = async () => {
    try {
      const constraints = { video: { facingMode: 'environment' } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCapture = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImageSrc = canvas.toDataURL('image/jpeg');
    setImageSrc(capturedImageSrc);
    setShowPreview(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  };

  const handleAcceptPhoto = async () => {
    const imageBlob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append('image_path', imageBlob, `Image-${Date.now()}.jpg`); // Ensure this matches backend expectation
    formData.append('material_tag', materialTag);
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());

    try {
      // eslint-disable-next-line
        const data = await sendDataToServer(formData);
        toast.success("Photo successfully added!");
        // Reset component state and UI as needed
        setShowPreview(false);
        setImageSrc(null);
        setMaterialTag('');
        initCamera();
        setTimeout(() => {
          window.location.reload();  
      }, 2000);
    } catch (error) {
        console.error('Error sending data:', error);
        toast.error("Failed to add photo.");
    }
};

  const handleRetakePhoto = () => {
    setShowPreview(false);
    initCamera();
  };

  return (
    <div className="camera-container">
        {!showPreview ? (
          <>
            <video className="video-element" autoPlay playsInline ref={videoRef} />
            <button className="button" onClick={handleCapture}>Capture Image</button>
          </>
        ) : (
          <>
            {imageSrc && <img src={imageSrc} alt="Captured" className="video-element" />}
            <input
              type="text"
              value={materialTag}
              onChange={(e) => setMaterialTag(e.target.value)}
              placeholder="Enter material tag"
              className="material-tag-input"
            />
            <button className="button" onClick={handleAcceptPhoto}>Accept Photo</button>
            <button className="button" onClick={handleRetakePhoto}>Retake Photo</button>
          </>
        )}
    </div>
  );
};

export default MobileImageCapture;