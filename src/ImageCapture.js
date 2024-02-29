import React, { useState, useEffect, useRef } from 'react';  
import { sendDataToServer } from './utils';  // Utility function for sending data to a server
import { toast } from 'react-toastify'; // For displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Styling for notifications
import "./camera.css";  // Custom CSS for styling the camera component

const ImageCapture = () => {
  const videoRef = useRef(null);  // Reference to the video element where the camera stream will be displayed
  const [imageSrc, setImageSrc] = useState(null);  // State for storing the captured image as a base64 encoded string
  const [showPreview, setShowPreview] = useState(false);  // State to toggle between camera view and image preview
  const [latitude, setLatitude] = useState(null);  // State for storing the latitude part of the geolocation
  const [longitude, setLongitude] = useState(null);  // State for storing the longitude part of the geolocation
  const [materialTag, setMaterialTag] = useState(''); // State for storing the material tag for the captured image

  useEffect(() => { 
    initCamera(); // Initialize camera on component mount
  }, []);

  const initCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("mediaDevices API or getUserMedia method not available.");
      return;
    }

    try {
      const constraints = { video: { facingMode: 'environment' } };  // Request rear camera for mobile devices
      const stream = await navigator.mediaDevices.getUserMedia(constraints);  
      videoRef.current.srcObject = stream;  // Assign the camera stream to the video element
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
    const imageBlob = await (await fetch(imageSrc)).blob(); // Convert the base64 image source to a blob
    const formData = new FormData(); // Create a FormData object to package the image and metadata
    formData.append('image_path', imageBlob, `Image-${Date.now()}.jpg`); // Append the image blob to the form data
    formData.append('material_tag', materialTag); // Append the material tag to the form data
    formData.append('latitude', latitude.toString()); // Append the latitude to the form data
    formData.append('longitude', longitude.toString()); // Append the longitude to the form data

    try {
      await sendDataToServer(formData); // Send the form data to the server
      toast.success("Photo successfully added!"); // Show success notification
      setShowPreview(false); // Hide the preview and show the camera view
      setImageSrc(null); // Reset the image source state
      setMaterialTag(''); // Reset the material tag state
      initCamera(); // Reinitialize the camera for the next capture
      setTimeout(() => {
        window.location.reload();  // Reload the page to refresh the state and UI
      }, 2000); 
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error("Failed to add photo."); // Show error notification
    }
  };

  const handleRetakePhoto = () => {
    setShowPreview(false);  // Hide the preview and show the camera view
    setMaterialTag(''); // Reset the material tag state
    initCamera();  // Reinitialize the camera for another capture
  };

  return (
    <div className="camera-container">
      {!showPreview ? (
        // Show the camera view with a capture button if not in preview mode
        <>
          <video className="video-element" autoPlay playsInline ref={videoRef} />
          <button className="button" onClick={handleCapture}>Capture Image</button>
        </>
      ) : (
        // Show the captured image preview with accept and retake options if in preview mode
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
