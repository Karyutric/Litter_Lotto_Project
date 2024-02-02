import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminPage.css'


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
            const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/users/', {
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
            const response = await fetch(`https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/users/${userId}/delete`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + adminAccessToken }
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
                toast.success("User successfully removed!");
            } else {
                setError('Failed to remove user');
            }
        } catch (error) {
            setError('An error occurred while removing user');
        }
        setIsLoading(false);
    };

    return (
        <div className="container py-5">
            <div className='admin-wrapper'>
                <h1 className="mb-4">Admin Dashboard</h1>
                {isLoading && <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {users.map(user => (
                        <div className="col" key={user.id}>
                            <div className="card h-100 d-flex flex-column justify-content-between">
                                <div className="card-body special-card ">
                                    <h5 className="card-title">{user.username}</h5>
                                </div>
                                <div className="card-footer">   
                                    <button className="btn btn-danger mb-2 w-100" onClick={() => removeUser(user.id)}>Remove User</button>
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

export default AdminPage;
