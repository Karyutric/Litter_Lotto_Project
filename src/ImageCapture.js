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
      if (videoRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const capturedImageSrc = canvas.toDataURL('image/jpeg');
        setImageSrc(capturedImageSrc);
        setShowPreview(true);
      } else {
        console.error('Video element is not ready');
      }

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
          // Ensure there's an image to process
          if (!imageSrc) {
              console.error("No image captured.");
              toast.error("No image captured.");
              return;
          }
  
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
          
          // Prepare the data to send to your Django backend
          const dataToSend = {
              image_url: downloadURL,
              material_tag: materialTag,
              latitude: latitude,
              longitude: longitude
          };
  
          // Send the image URL and other data to your Django backend
          const responseBackend = await sendDataToServer(dataToSend);
  
          if (!responseBackend.ok) {
              const errorText = await responseBackend.text();
              throw new Error(`Failed to store image data in the backend. Server responded with: ${errorText}`);
          }
  
          toast.success("Photo successfully added and stored!");
          // Reset the component state
          setShowPreview(false);
          setImageSrc(null);
          setMaterialTag('');
          // Optionally reinitialize the camera
      } catch (error) {
          console.error('Error handling the photo:', error);
          toast.error(`Failed to upload photo: ${error.message}`);
      }
  };
  

    const handleRetakePhoto = () => {
        setShowPreview(false);
        initCamera();
    };

<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
};

export default ImageCapture;


