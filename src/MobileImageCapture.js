import React, { useState, useEffect, useRef } from 'react';
import { sendDataToServer } from './utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./camera.css";

// React functional component for capturing images on mobile devices
const MobileImageCapture = () => {
  // Ref for the video element where the camera stream will be displayed
  const videoRef = useRef(null);
  // State hooks for various component states
  const [imageSrc, setImageSrc] = useState(null); // Base64 source of the captured image
  const [showPreview, setShowPreview] = useState(false); // Boolean to show/hide the image preview
  const [latitude, setLatitude] = useState(null); // Latitude from geolocation
  const [longitude, setLongitude] = useState(null); // Longitude from geolocation
  const [materialTag, setMaterialTag] = useState(''); // User-defined tag for the material

  // Effect hook to initialize the camera when the component mounts
  useEffect(() => {
    initCamera();
  }, []);

  // Asynchronous function to initialize the camera
  const initCamera = async () => {
    try {
      const constraints = { video: { facingMode: 'environment' } }; // Use the rear-facing camera
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream; // Assign the camera stream to the video element
    } catch (error) {
      console.error('Error accessing camera:', error); // Log errors if camera access fails
    }
  };

  // Asynchronous function to handle the image capture
  const handleCapture = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth; // Set canvas width to video width
    canvas.height = videoRef.current.videoHeight; // Set canvas height to video height
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height); // Draw the video frame to the canvas
    const capturedImageSrc = canvas.toDataURL('image/jpeg'); // Convert canvas to a data URL
    setImageSrc(capturedImageSrc); // Set the captured image source in state
    setShowPreview(true); // Show the preview of the captured image

    // Attempt to get the current geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude); // Set latitude in state
        setLongitude(position.coords.longitude); // Set longitude in state
      });
    } else {
      console.error('Geolocation is not supported in this browser.'); // Log an error if geolocation isn't supported
    }
  };

  // Asynchronous function to handle accepting the captured photo
  const handleAcceptPhoto = async () => {
    const imageBlob = await (await fetch(imageSrc)).blob(); // Convert the data URL to a blob
    const formData = new FormData(); // Create a new FormData object for sending the image data
    formData.append('image_path', imageBlob, `Image-${Date.now()}.jpg`); // Append the image blob to the form data
    formData.append('material_tag', materialTag); // Append the material tag to the form data
    formData.append('latitude', latitude.toString()); // Append the latitude to the form data
    formData.append('longitude', longitude.toString()); // Append the longitude to the form data

    try {
      // Send the image data to the server
      const data = await sendDataToServer(formData);
      toast.success("Photo successfully added!"); // Display a success toast message
      // Reset component state and reinitialise the camera
      setShowPreview(false);
      setImageSrc(null);
      setMaterialTag('');
      initCamera();
      // Reload the page after 2 seconds to reset the state and UI
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
        console.error('Error sending data:', error); // Log errors if sending data fails
        toast.error("Failed to add photo."); // Display an error toast message
    }
  };

  // Function to handle retaking the photo
  const handleRetakePhoto = () => {
    setShowPreview(false); // Hide the preview
    initCamera(); // Reinitialize the camera
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