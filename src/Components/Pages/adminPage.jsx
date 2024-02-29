import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { toast } from 'react-toastify'; // For displaying notifications
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling
import './adminPage.css' // Custom CSS

const serverBaseUrl = 'http://31.104.89.199:8000'; // Base URL of the backend server

const AdminPage = () => {
    const [users, setUsers] = useState([]); // State for storing user data
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for storing any error messages
    const navigate = useNavigate(); // Hook for navigation
    const adminAccessToken = localStorage.getItem('accessToken'); // Retrieve the admin access token

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, []); // The empty dependency array ensures this runs once on mount

    // Function to fetch users from the server
    const fetchUsers = async () => {
        setIsLoading(true); // Show loading indicator
        setError(null); // Reset error state
        try {
            const response = await fetch(`${serverBaseUrl}/image_capture/users/`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + adminAccessToken }
            });
            if (response.ok) {
                const data = await response.json(); // Parse JSON data
                setUsers(data); // Update state with fetched users
            } else {
                setError('Failed to fetch users'); // Set error message on failure
            }
        } catch (error) {
            setError('An error occurred while fetching users'); // Set error message on exception
        }
        setIsLoading(false); // Hide loading indicator
    };

    // Function to navigate to a specific user's images
    const navigateToUserImages = (userId) => {
        navigate(`/admin/gallery/${userId}`); // Navigate using user ID
    };

    // Function to remove a user
    const removeUser = async (userId) => {
        setIsLoading(true); // Show loading indicator
        setError(null); // Reset error state
        try {
            const response = await fetch(`${serverBaseUrl}/image_capture/users/${userId}/delete`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + adminAccessToken }
            });
            if (response.ok) {
                // Filter out the removed user from the users state
                setUsers(users.filter(user => user.id !== userId));
                toast.success("User successfully removed!"); // Show success notification
            } else {
                setError('Failed to remove user'); // Set error message on failure
            }
        } catch (error) {
            setError('An error occurred while removing user'); // Set error message on exception
        }
        setIsLoading(false); // Hide loading indicator
    };

    // Render the admin dashboard UI
    return (
        <div className="container py-5">
            <div className='admin-wrapper'>
                <h1 className="mb-4">Admin Dashboard</h1>
                {/* Display a spinner while loading */}
                {isLoading && <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>}
                {/* Display an error message if there is an error */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {/* Render a card for each user */}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {users.map(user => (
                        <div className="col" key={user.id}>
                            <div className="card h-100 d-flex flex-column justify-content-between">
                                <div className="card-body special-card">
                                    <h5 className="card-title">{user.username}</h5>
                                </div>
                                <div className="card-footer">
                                    {/* Button to remove a user */}
                                    <button className="btn btn-danger mb-2 w-100" onClick={() => removeUser(user.id)}>Remove User</button>
                                    {/* Button to view a user's images */}
                                    <button className="btn btn-primary w-100" onClick={() => navigateToUserImages(user.id)}>View Images</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>   
        </div>
    );
};

export default AdminPage; // Export the component
