import React, { useState, useEffect, useRef } from 'react';  // Importing React hooks
import { sendDataToServer } from './utils';  // Importing a utility function to send data to the server
import "./camera.css";  // Importing CSS for styling

// The ImageCapture component
const ImageCapture = () => {
  const videoRef = useRef(null);  // Ref to access the video element in the DOM
  const [imageSrc, setImageSrc] = useState(null);  // State to store the captured image source
  const [showPreview, setShowPreview] = useState(false);  // State to toggle between preview and capture mode
  const [latitude, setLatitude] = useState(null);  // State to store latitude for geolocation
  const [longitude, setLongitude] = useState(null);  // State to store longitude for geolocation
  const [materialTag, setMaterialTag] = useState(''); // State to store the material tag entered by the user

  // Effect hook to initialize the camera when the component mounts
  useEffect(() => {
    initCamera();
  }, []);

  // Function to initialize the camera
  const initCamera = async () => {
    try {
      const constraints = { video: { facingMode: 'environment' } };  // Camera settings
      const stream = await navigator.mediaDevices.getUserMedia(constraints);  // Access the camera
      videoRef.current.srcObject = stream;  // Assign the camera stream to the video element
    } catch (error) {
      console.error('Error accessing camera:', error);  // Error handling
    }
  };

  // Function to handle image capture
  const handleCapture = async () => {
    const canvas = document.createElement('canvas');  // Create a canvas element
    canvas.width = videoRef.current.videoWidth;  // Set canvas width
    canvas.height = videoRef.current.videoHeight;  // Set canvas height
    const context = canvas.getContext('2d');  // Get the 2D context of the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);  // Draw the video frame to the canvas
    const capturedImageSrc = canvas.toDataURL('image/jpeg');  // Convert the canvas content to a data URL
    setImageSrc(capturedImageSrc);  // Update the image source state
    setShowPreview(true);  // Show the preview of the captured image

    // Get the current geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);  // Update latitude state
        setLongitude(position.coords.longitude);  // Update longitude state
      });
    } else {
      console.error('Geolocation is not supported in this browser.');  // Error handling for unsupported geolocation
    }
  };

  // Function to handle the acceptance of the captured photo
  const handleAcceptPhoto = async () => {
    const imageBlob = await (await fetch(imageSrc)).blob();  // Convert the image source to a blob
    const formData = new FormData();  // Create a FormData object
    formData.append('image_file', imageBlob, `captured-image-${Date.now()}.jpg`);  // Append the image blob to the FormData
    formData.append('latitude', latitude);  // Append latitude
    formData.append('longitude', longitude);  // Append longitude
    formData.append('material_tag', materialTag); // Append the material tag

    const response = await sendDataToServer(formData);  // Send the FormData to the server

    if (!response.ok) {
      console.error('Error sending data:', response.statusText);  // Error handling for server response
    }
    
    setShowPreview(false);  // Hide the preview
    setImageSrc(null);  // Reset the image source state
    setMaterialTag(''); // Reset the material tag state
    initCamera();  // Re-initialize the camera for a new capture
  };

  // Function to handle retaking the photo
  const handleRetakePhoto = () => {
    setShowPreview(false);  // Hide the preview
    setMaterialTag(''); // Reset the material tag state
    initCamera();  // Re-initialize the camera
  };

  // Render the component
  return (
    <div className="container">
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
