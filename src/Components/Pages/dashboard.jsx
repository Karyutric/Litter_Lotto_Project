import React, { useEffect, useRef, useState } from 'react';
import './dashboard.css';

// Placeholder for the global initMap function
window.initMap = () => {};

const serverBaseUrl = 'http://86.185.79.60:8000';

const Dashboard = () => {
  const mapRef = useRef(null); // Reference to the div where the map will be displayed
  const [imageLocations, setImageLocations] = useState([]); // State to store image locations

  useEffect(() => {
    // Defines the initMap function which initializes the Google Map
    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 54.7877, lng: -6.4923 }, // Initial centre of the map
        zoom: 8, // Initial zoom level
      });

      // Loops through imageLocations and places markers on the map
      imageLocations.forEach((location) => {
        new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
        });
      });
    };

    // Calls the function to load the Google Maps script
    loadGoogleMapsScript();
  }, [imageLocations]); // useEffect depends on imageLocations to update markers

  // Function to dynamically load the Google Maps script
  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      // If the Google Maps API is already loaded, initialize the map
      window.initMap();
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      // Set API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKL7W4QOWoRd1kvXzimVNy1flrg8m7HRk`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  // Fetches image locations from the server
  useEffect(() => {
    const fetchImageLocations = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token
        const response = await fetch(`${serverBaseUrl}/image_capture/images/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON response
        // Update the imageLocations state with the fetched data
        setImageLocations(data.map(location => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })));
      } catch (error) {
        // Log any errors to the console
        console.error('Fetch error:', error);
      }
    };

    fetchImageLocations(); // Call the fetch function
  }, []); // This useEffect has no dependencies, so it runs once on component mount

  return (
    <div className="dashboard">
      <div className="main-wrapper">
        <header className="dashboard-header mb-5 text-center">
          <h1 className="header display-1 fw-bold">Litter Impact</h1>
        </header>

        <div className="container-fluid px-0">
          <div className="row">
            <div className="col">
              {/* The map will be injected into this div */}
              <div className="map-container" ref={mapRef} style={{ height: '400px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
