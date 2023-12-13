import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
        const response = await fetch('http://192.168.1.135:8000/image_capture/images/');
        const data = await response.json();
        setImages(data); // Directly use the response data
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
        </div>
      )}
    </div>
  );
};

export default Gallery;
