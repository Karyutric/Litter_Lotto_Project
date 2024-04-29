import React, { useState } from 'react';

// Component for capturing the user's current geolocation.
const LocationCapture = () => {
  // State to store the current latitude.
  const [latitude, setLatitude] = useState(null);

  // State to store the current longitude.
  const [longitude, setLongitude] = useState(null);

  // Function to handle the capturing of the user's location.
  const handleCaptureLocation = () => {
    // Use the Geolocation API to get the current position.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Update the latitude and longitude states with the captured position.
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        // Log any errors if the location cannot be obtained.
        console.error('Error getting location:', error);
      }
    );
  };

  // The component's rendered JSX.
  return (
    <div>
      {/* Conditional rendering based on whether the latitude and longitude have been captured */}
      {latitude && longitude ? (
        <div>
          {/* Display the captured latitude and longitude */}
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      ) : (
        /* Render a button to capture location if not already captured */
        <button onClick={handleCaptureLocation}>Capture Location</button>
      )}
    </div>
  );
};

// Export the component for use in other parts of the application.
export default LocationCapture;