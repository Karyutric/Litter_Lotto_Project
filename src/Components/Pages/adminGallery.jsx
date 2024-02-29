import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access userId from URL parameters
import { toast } from 'react-toastify'; // For displaying notifications
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For icons
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Specific icon for the delete button
import 'react-toastify/dist/ReactToastify.css'; // Styles for toast notifications
import './adminGallery.css'; // Custom styles for the gallery

const serverBaseUrl = 'http://31.104.89.199:8000'; // Base URL of the backend server

const AdminGallery = () => {
    // State for storing images, selected image, loading status, and error messages
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Retrieve the admin access token from local storage for authorization
    const adminAccessToken = localStorage.getItem('accessToken');
    // Extract userId from URL parameters
    const { userId } = useParams(); 

    // Fetch user images on component mount and when userId changes
    useEffect(() => {
        fetchUserImages(userId);
    }, [userId]);

    // Function to fetch images from the server for a specific user
    const fetchUserImages = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${serverBaseUrl}/image_capture/users/${userId}/images`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + adminAccessToken
                }
            });

            if (response.ok) {
                const imagesData = await response.json();
                // Update image URLs to be absolute paths
                const updatedImagesData = imagesData.map(image => ({
                    ...image,
                    image_url: image.image_path ? `${serverBaseUrl}${image.image_path}` : null
                }));
                setImages(updatedImagesData);
            } else {
                // Handle errors if the response is not OK
                const errorData = await response.json();
                setError('Failed to fetch images: ' + errorData.detail);
            }
        } catch (error) {
            // Catch and handle any errors during the fetch operation
            setError('An error occurred while fetching images: ' + error.message);
        }
        setIsLoading(false);
    };

    // Function to handle image selection (click event)
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Function to close the modal showing the selected image
    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    // Function to handle the deletion of an image
    const handleDeleteImage = async () => {
        if (selectedImage) {
            try {
                const response = await fetch(`${serverBaseUrl}/image_capture/images/${selectedImage.id}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${adminAccessToken}`
                    }
                });

                if (response.ok) {
                    // Remove the deleted image from state to update UI
                    setImages(images.filter((img) => img.id !== selectedImage.id));
                    toast.success("Image successfully deleted!"); // Show success notification
                    setSelectedImage(null); // Deselect image after deletion
                } else {
                    toast.error("Failed to delete the image"); // Show error notification
                }
            } catch (error) {
                toast.error("An error occurred while deleting the image"); // Show error notification
            }
        }
    };

    // Render the gallery UI
    return (
        <div className='adminGallery-wrapper'>
            <h1>User Images</h1>
            {isLoading && <p>Loading...</p>} // Display loading message
            {error && <p>Error: {error}</p>} // Display error message

            <div className="gallery">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img 
                            src={image.image_url} 
                            alt="User Content" 
                            className="gallery-image"
                            onClick={() => handleImageClick(image)} // Set image as selected on click
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="PreviewModal" onClick={handleCloseModal}>
                    <img src={selectedImage.image_url} alt="Full Size" />
                    <button onClick={handleDeleteImage} className="delete-button">
                        <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x" /> // Delete button with icon
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminGallery
