import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './adminGallery.css'
=======
import { useParams } from 'react-router-dom'; // Import useParams
const serverBaseUrl = 'http://192.168.1.135:8000';
>>>>>>> parent of 4b9f6a3 (All design aspects completed)

const AdminGallery = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const adminAccessToken = localStorage.getItem('accessToken');
    const { userId } = useParams(); // Retrieve userId from URL parameters

    useEffect(() => {
        fetchUserImages(userId); // eslint-disable-next-line
    }, [userId]);

    const fetchUserImages = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
<<<<<<< HEAD
            const response = await fetch(`https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/users/${userId}/images`, { 
=======
            const response = await fetch(`http://86.173.58.38:8000/image_capture/users/${userId}/images`, {
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + adminAccessToken
                }
            });
        
            if (response.ok) {
                const imagesData = await response.json();
                // Construct full URLs
                const updatedImagesData = imagesData.map(image => {
                return {
                    ...image,
                    image_url: image.image_path ? `https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/${image.image_path}` : null
                };
            });
            setImages(updatedImagesData);
            } else {
                const errorData = await response.json();
                setError('Failed to fetch images: ' + errorData.detail);
            }
        } catch (error) {
            setError('An error occurred while fetching images: ' + error.message);
        }
        setIsLoading(false);
    };

<<<<<<< HEAD
    
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
      };


    const handleDeleteImage = async () => {
        if (selectedImage) {
            try {
                const response = await fetch(`https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/${selectedImage.id}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${adminAccessToken}`
                    }
                });

                if (response.ok) {
                    setImages(images.filter((img) => img.id !== selectedImage.id));
                    toast.success("Image successfully deleted!");
                    setSelectedImage(null);
                } else {
                    toast.error("Failed to delete the image");
=======
    const deleteImage = async (imageId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://86.173.58.38:8000/image_capture/images/${imageId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + adminAccessToken
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
                }
            });
            if (response.ok) {
                setImages(prevImages => prevImages.filter(image => image.id !== imageId));
            } else {
                setError('Failed to delete image');
            }
        } catch (error) {
            setError('An error occurred while deleting image: ' + error.message);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h1>User Images</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
<<<<<<< HEAD
            <div className="gallery">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img 
                            src={image.image_url} 
                            alt="User Content" 
                            className="gallery-image"
                            onClick={() => handleImageClick(image)} 
                        />
=======
            <div className="user-images">
                {images.map(image => (
                    <div key={image.id}>
                        <img src={image.image_url} alt="User Content" /> {/* Ensure image_url is correct */}
                        <button onClick={() => deleteImage(image.id)}>Delete Image</button>
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
