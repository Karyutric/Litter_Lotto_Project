// Import necessary hooks and components from React and additional libraries
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Services/authContext'; 
import './LoginForm.css'; 
import { FaUser, FaLock } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom'; 
import { login as loginService } from '../Services/authServices'; 

const LoginForm = () => {
    // State hooks for username and password inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Accessing the login function from AuthContext

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const userData = { username, password }; 
        try {
            const response = await loginService(userData); // Attempt to log in with the provided credentials
            if (response.ok) {
                const data = await response.json(); // Parses the successful response
                handleSuccessfulLogin(data); // Handles successful login
            } else {
                // Log errors if the login fails
                console.error('Login failed with status:', response.status);
                const errorData = await response.json(); 
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error during login:', error.message); 
        }
    };

    // Handles successful login
    const handleSuccessfulLogin = (data) => {
        if (data.access && data.refresh && data.user) {
            login(data.access, data.refresh, data.user); // Calls the login method from AuthContext with the received tokens and user data

            // Navigate based on the user role
            if (data.user.role === 'admin') {
                navigate('/adminPage'); // Navigate to the admin page for admin users
            } else {
                navigate('/dashboard'); // Navigate to the dashboard for regular users
            }
        } else {
            console.error("Invalid login response structure:", data); // Log an error if the response structure is invalid
        }
    };

    // Render the login form UI
    return (
        <div className="login-page">
            {/* Logo section */}
            <div className="logo-container">
                <img src="./App_logo.png" alt="Logo" />
            </div>
    
            {/* Form section */}
            <div className="form-container">
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {/* Username input field */}
                        <div className="input-box">
                            <input type="text"
                                   placeholder='Username'
                                   required
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                            <FaUser className='icon'/> {/* Username icon */}
                        </div>
                        {/* Password input field */}
                        <div className="input-box">
                            <input type="password"
                                   placeholder='Password'
                                   required
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <FaLock className='icon'/> {/* Password icon */}
                        </div>
                        {/* Submit button */}
                        <button type="submit">Login</button>
                        {/* Link to registration page */}
                        <div className="register-link">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
    
export default LoginForm; // Export the LoginForm component

