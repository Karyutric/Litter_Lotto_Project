import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
const serverBaseUrl = 'http://192.168.1.135:8000';

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
            const response = await fetch(`http://192.168.1.135:8000/image_capture/users/${userId}/images`, {
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
                    image_url: image.image_path ? `${serverBaseUrl}${image.image_path}` : null
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

    const deleteImage = async (imageId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://192.168.1.135:8000/image_capture/images/${imageId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + adminAccessToken
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
            <div className="user-images">
                {images.map(image => (
                    <div key={image.id}>
                        <img src={image.image_url} alt="User Content" /> {/* Ensure image_url is correct */}
                        <button onClick={() => deleteImage(image.id)}>Delete Image</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
