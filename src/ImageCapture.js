import React, { useState, useEffect, useRef } from 'react';  
import { sendDataToServer } from './utils';  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./camera.css";  

const ImageCapture = () => {
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
    // Check if mediaDevices and getUserMedia are available
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("mediaDevices API or getUserMedia method not available.");
    return;
  }

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
    formData.append('image_file', imageBlob, `captured-image-${Date.now()}.jpg`);  
    formData.append('latitude', latitude);  
    formData.append('longitude', longitude);  
    formData.append('material_tag', materialTag); 

    const response = await sendDataToServer(formData);  

    if (!response.ok) {
      console.error('Error sending data:', response.statusText);  
    } else {
      toast.success ("Photo successfully added!");
      setTimeout(() => {
        setShowPreview(false);  
        setImageSrc(null);  
        setMaterialTag(''); 
        initCamera();  
        window.location.reload();  
      }, 2000); // 2 second delay
    }
  };

  const handleRetakePhoto = () => {
    setShowPreview(false);  
    setMaterialTag(''); 
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
          <img src={imageSrc} alt="Captured" className="video-element" />
          <div>
            <label htmlFor="material-tag">Material Tag:</label>
            <input
              type="text"
              id="material-tag"
              value={materialTag}
              onChange={(e) => setMaterialTag(e.target.value)}
              placeholder="Type material (e.g., plastic)"
            />
          </div>
          <button className="button" onClick={handleAcceptPhoto}>Accept Photo</button>
          <button className="button" onClick={handleRetakePhoto}>Retake Photo</button>
        </>
      )}
    </div>
  );
};

export default ImageCapture;

