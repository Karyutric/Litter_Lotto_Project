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

      const response = await fetch('http://86.173.58.38:8000/image_capture/images/', {
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

  const handleDeleteImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(`http://86.173.58.38:8000/image_capture/images/${selectedImage.id}/delete`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Remove the image from the gallery view
          setImages(images.filter((image) => image.id !== selectedImage.id));
          // Close the modal or larger view
          setSelectedImage(null);
        } else {
          console.error('Failed to delete the image');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
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
          <button onClick={handleDeleteImage}>Delete Image</button> {/* Add this button */}
        </div>
      )}
    </div>
  );
};

export default Gallery;


