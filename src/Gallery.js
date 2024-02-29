import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Import specific icon for use in a button
import { toast } from 'react-toastify'; // Import toastify for showing success/error messages
import 'react-toastify/dist/ReactToastify.css'; // Import styling for toastify

const serverBaseUrl = 'http://31.104.89.199:8000'; // Base URL of the server

const Gallery = () => {
  const [images, setImages] = useState([]); // State to store fetched images
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for detail view or deletion

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []);

  // Function to fetch images from the server
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage for authentication

      const response = await fetch(`${serverBaseUrl}/image_capture/images/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle errors
      }

      const data = await response.json(); // Parse JSON response
      setImages(data); // Update state with fetched images
    } catch (error) {
      console.error('Error fetching images:', error); // Log errors
    }
  };

  // Function to handle click on an image (for viewing in detail)
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set selected image for viewing or deletion
  };

  // Function to close the detail view/modal
  const handleCloseModal = () => {
    setSelectedImage(null); // Clear selected image
  };

  // Function to handle image deletion
  const handleDeleteImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(`${serverBaseUrl}/image_capture/images/${selectedImage.id}/delete`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the token for authentication
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Filter out the deleted image from the state
          setImages(images.filter((image) => image.id !== selectedImage.id));
          setSelectedImage(null); // Clear selected image
          toast.success("Photo successfully deleted!"); // Show success message
        } else {
          console.error('Failed to delete the image'); // Handle failure
        }
      } catch (error) {
        console.error('Error deleting image:', error); // Log errors
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
            {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>} // Conditional rendering of tags if available
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
