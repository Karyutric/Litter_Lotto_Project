import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../Services/NavBar';
import './dashboard.css';

const Dashboard = () => {
  const mapRef = useRef(null);
  const [imageLocations, setImageLocations] = useState([]);
  
  // Make sure this function is in the global scope
  window.initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 54.7877, lng: -6.4923 },
      zoom: 8,
    });

    imageLocations.forEach((location) => {
      new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
      });
    });
  };

  const loadGoogleMapsScript = () => {
    if (window.google) {
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
      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    const fetchImageLocations = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://192.168.1.135:8000/image_capture/images/', {
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
      <header className="dashboard-header">
        <h1>Litter Impact</h1>
      </header>
      <div className="dashboard-map" ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <NavBar />
    </div>
  );
};

export default Dashboard;
