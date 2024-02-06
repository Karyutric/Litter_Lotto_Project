import React, { useEffect, useRef, useState } from 'react';
import './dashboard.css';

// Global initMap function defined outside the component
window.initMap = () => {
  // This will be populated later
};

const Dashboard = () => {
  const mapRef = useRef(null);
  const [imageLocations, setImageLocations] = useState([]);

  useEffect(() => {
    // Define the initMap function within useEffect
    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 54.7877, lng: -6.4923 },
        zoom: 8,
      });

      // Place markers for each image location
      imageLocations.forEach((location) => {
        new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
        });
      });
    };

    // Load the Google Maps script
    loadGoogleMapsScript();
  }, [imageLocations]); // Depend on imageLocations to update markers

  // Function to load the Google Maps script
  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      window.initMap();
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdRBqG6b5hSCSIyyHeBG_PadnoR2IZTHE&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  };

  // Fetch image locations
  useEffect(() => {
    const fetchImageLocations = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://86.181.239.223:8000/image_capture/images/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setImageLocations(data.map(location => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchImageLocations();
  }, []);

  return (
    <div className="dashboard">
      <div className="main-wrapper">
        <header className="dashboard-header mb-5 text-center">
          <h1 className="header display-1 fw-bold">Litter Impact</h1>
        </header>

        <div className="container-fluid px-0">
          <div className="row">
            <div className="col">
              <div className="map-container" ref={mapRef} style={{ height: '400px' }} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

