import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
>>>>>>> parent of 4b9f6a3 (All design aspects completed)

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

<<<<<<< HEAD
      const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/images/', {
=======
      const response = await fetch('http://86.173.58.38:8000/image_capture/images/', {
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
        headers: {
          'Authorization': `Bearer ${token}` // No need for 'Content-Type': 'application/json' if no body is sent
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
<<<<<<< HEAD
        const response = await fetch(`https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/images/${selectedImage.id}/delete`, {
=======
        const response = await fetch(`http://86.173.58.38:8000/image_capture/images/${selectedImage.id}/delete`, {
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          setImages(images.filter((image) => image.id !== selectedImage.id));
          setSelectedImage(null);
        } else {
          toast.error("Failed to delete the image");
        }
      } catch (error) {
        toast.error("Error deleting image: " + error.message);
      }
    }
  };

  return (
<<<<<<< HEAD
    <div className='camera-wrapper'>
      <div className="gallery">
        {images.map((image, index) => (
          // Use image.image_path as it now contains the direct URL to the image in Firebase
          <img key={index} src={image.image_path} alt="Gallery" onClick={() => handleImageClick(image)} />
=======
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image.image_url} alt="Gallery" onClick={() => handleImageClick(image)} />
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
        ))}
      </div>

      {selectedImage && (
<<<<<<< HEAD
        <div className="PreviewModal" onClick={handleCloseModal}>
          <img src={selectedImage.image_path} alt="Full Size" />
          {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>}
          <button onClick={handleDeleteImage} className="delete-button">
            <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x" />
          </button>
=======
        <div className="modal" onClick={handleCloseModal}>
          <img src={selectedImage.image_url} alt="Full Size" />
          {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>}
          <button onClick={handleDeleteImage}>Delete Image</button> {/* Add this button */}
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
        </div>
      )}
    </div>
  );
};

export default Gallery;



