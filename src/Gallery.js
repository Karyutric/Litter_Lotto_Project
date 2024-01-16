import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

      const response = await fetch('http://192.168.1.135:8000/image_capture/images/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image.image_url} alt="Gallery" onClick={() => handleImageClick(image)} />
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <img src={selectedImage.image_url} alt="Full Size" />
          {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>}
        </div>
      )}
    </div>
  );
};

export default Gallery;


