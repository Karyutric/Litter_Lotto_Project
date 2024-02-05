import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { sendDataToServer } from './utils';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebase'; // Ensure you've exported `storage` from your firebase.js
import "./camera.css";
import 'react-toastify/dist/ReactToastify.css';

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
      try {
          // Convert data URL to blob
          const response = await fetch(imageSrc);
          const blob = await response.blob();
          
          // Define a file name based on the current timestamp
          const fileName = `captured-image-${Date.now()}.jpg`;
          const imageStorageRef = storageRef(storage, `images/${fileName}`);
          
          // Upload the image blob to Firebase Storage
          const snapshot = await uploadBytes(imageStorageRef, blob);
          
          // Get the image URL from Firebase Storage
          const downloadURL = await getDownloadURL(snapshot.ref);
          
          // Here, send the downloadURL along with other data to your Django backend
          const formData = new FormData();
          formData.append('image_url', downloadURL);
          formData.append('material_tag', materialTag);
          formData.append('latitude', latitude);
          formData.append('longitude', longitude);
  
          // Replace this with the actual function to send data to your Django backend
          const responseBackend = await sendDataToServer(formData);
  
          if (!responseBackend.ok) {
            throw new Error('Failed to store image data in the backend.');
          }
  
          toast.success("Photo successfully added and stored!");
          // Reset your component state as needed
          setShowPreview(false);
          setImageSrc(null);
          setMaterialTag('');
          initCamera();
      } catch (error) {
          console.error('Error handling the photo:', error);
          toast.error("Failed to upload photo.");
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

export default ImageCapture;


