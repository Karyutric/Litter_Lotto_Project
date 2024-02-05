import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const adminAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchUsers(); // eslint-disable-next-line
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
<<<<<<< HEAD
            const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/users/', {
=======
            const response = await fetch('http://86.173.58.38:8000/image_capture/users/', {
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + adminAccessToken }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (error) {
            setError('An error occurred while fetching users');
        }
        setIsLoading(false);
    };

    const navigateToUserImages = (userId) => {
        navigate(`/admin/gallery/${userId}`);
    };

    const removeUser = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
<<<<<<< HEAD
            const response = await fetch(`https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/users/${userId}/delete`, {
=======
            const response = await fetch(`http://86.173.58.38:8000/image_capture/users/${userId}/delete`, {
>>>>>>> parent of 4b9f6a3 (All design aspects completed)
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + adminAccessToken }
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                setError('Failed to remove user');
            }
        } catch (error) {
            setError('An error occurred while removing user');
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        <p onClick={() => navigateToUserImages(user.id)} style={{ cursor: 'pointer' }}>{user.username}</p>
                        <button onClick={() => removeUser(user.id)}>Remove User</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
