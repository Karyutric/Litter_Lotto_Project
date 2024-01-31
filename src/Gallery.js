import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverBaseUrl = 'https://litter-lotto-py-e1a362be7b85.herokuapp.com';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

      const response = await fetch('${serverBaseUrl}/image_capture/images/', {
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
    console.log('Image clicked', image); // Debugging
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Debugging
    setSelectedImage(null);
  };

  const handleDeleteImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(`${serverBaseUrl}/image_capture/images/${selectedImage.id}/delete`, {
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
          toast.success("Photo successfully deleted!");
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
      <div className='camera-wrapper'>
        <div className="gallery">
          {images.map((image, index) => (
            <img key={index} src={image.image_url} alt="Gallery" onClick={() => handleImageClick(image)} />
          ))}
        </div>

        {selectedImage && (
          <div className="PreviewModal" onClick={handleCloseModal}>
            <img src={selectedImage.image_url} alt="Full Size" />
            {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>}
            <button onClick={handleDeleteImage} className="delete-button">
              <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x" />
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;


