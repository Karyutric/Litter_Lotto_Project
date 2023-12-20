import React, { useState, useEffect } from 'react';  // Importing React and its hooks

const Gallery = () => {
  const [images, setImages] = useState([]);  // State to store an array of images
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image for display

  // Effect hook to fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from a server
  const fetchImages = async () => {
    try {
      const response = await fetch('http://192.168.1.135:8000/image_capture/images/');  // Fetching data from the given URL
      const data = await response.json();  // Parsing the response as JSON
      setImages(data); // Updating the images state with fetched data
    } catch (error) {
      console.error('Error fetching images:', error);  // Error handling in case of failure to fetch
    }
  };

  // Function to handle image click, setting the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);  // Updating the selectedImage state
  };

  // Function to close the modal that displays the selected image
  const handleCloseModal = () => {
    setSelectedImage(null);  // Resetting the selectedImage state
  };

  // Rendering the component
  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image.image_url} alt="Gallery" onClick={() => handleImageClick(image)} />
          // Mapping each image in the images array to an img element
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <img src={selectedImage.image_url} alt="Full Size" />
          {/* Display the material tag if available */}
          {selectedImage.material_tag && <p className="tag">{selectedImage.material_tag}</p>}
        </div>
      )}
    </div>
  );
};

export default Gallery;  // Exporting the Gallery component

