import React, { useState, useEffect, useRef } from 'react';
import { sendDataToServer } from './utils';
import "./camera.css";

// This is a React component for capturing images and optionally geolocation on a mobile device.
const MobileImageCapture = () => {
  // Ref to the video element for displaying the camera stream.
  const videoRef = useRef(null);

  // State to hold the captured image's data URL.
  const [imageSrc, setImageSrc] = useState(null);

  // State to control the visibility of the image preview.
  const [showPreview, setShowPreview] = useState(false);

  // State to store the current latitude.
  const [latitude, setLatitude] = useState(null);

  // State to store the current longitude.
  const [longitude, setLongitude] = useState(null);
  
  // State to store the material tag entered by the user
  const [materialTag, setMaterialTag] = useState('');


  // Effect to initialize the camera when the component mounts.
  useEffect(() => {
    initCamera();
  }, []);

  // Function to initialize the camera.
  const initCamera = async () => {
    try {
      // Defines the constraints for the camera (use the rear camera).
      const constraints = { video: { facingMode: 'environment' } };

      // Requests access to the media devices and sets the video stream.
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Function to handle the capture of an image.
  const handleCapture = async () => {
    // Create a canvas element to capture and process the image.
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Get the canvas context and draw the current frame from the video.
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL (JPEG format).
    const capturedImageSrc = canvas.toDataURL('image/jpeg');
    setImageSrc(capturedImageSrc);
    setShowPreview(true);

    // Check if geolocation is available and get the current position.
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  };

  // Function to handle the acceptance of the captured photo.
  const handleAcceptPhoto = async () => {
    // Convert the image source to a blob.
    const imageBlob = await (await fetch(imageSrc)).blob();

    // Create a FormData object and append the image and location data.
    const formData = new FormData();
    formData.append('image_file', imageBlob, `captured-image-${Date.now()}.jpg`);
    formData.append('material_tag', materialTag);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    // Send the data to the server.
    const response = await sendDataToServer(formData);

    // Handle any errors during the data transmission.
    if (!response.ok) {
      console.error('Error sending data:', response.statusText);
    }

  // Function to handle changing the camera back to the live feed.
    setShowPreview(false);
    setImageSrc(null);
    setMaterialTag('');
    initCamera();
  
  };

  // Function to handle retaking the photo.
  const handleRetakePhoto = () => {
    setShowPreview(false);
    initCamera();
  };

  // The component's rendered JSX.
  return (
    <div>
      {/* Conditionally render the camera view or the captured image preview. */}
      <div className="container">
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
            className="material-tag-input" // Add CSS class for styling
          />
          <button className="button" onClick={handleAcceptPhoto}>Accept Photo</button>
          <button className="button" onClick={handleRetakePhoto}>Retake Photo</button>
        </>
      )}
      </div>
    </div>
  );
};

export default MobileImageCapture;




