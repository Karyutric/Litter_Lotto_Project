import React, { useContext, useState } from 'react';
import { AuthContext } from '../Services/authContext';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from '../Services/authServices';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Using login from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const userData = { username, password };
        try {
            const response = await loginService(userData);
            if (response.ok) {
                const data = await response.json();
                handleSuccessfulLogin(data);
            } else {
                console.error('Login failed with status:', response.status);
                const errorData = await response.json();
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleSuccessfulLogin = (data) => {
        if (data.access && data.refresh && data.user) {
            // Call the login method from AuthContext
            login(data.access, data.refresh, data.user);

            // Conditional navigation based on user role
            if (data.user.role === 'admin') {
                navigate('/adminPage'); // Navigate to the admin page for admin users
            } else {
                navigate('/dashboard'); // Navigate to the dashboard for regular users
            }
        } else {
            console.error("Invalid login response structure:", data);
        }
    };

    return (
        <div className="login-page">
           
            <div className="logo-container">
                <img src="./App_logo.png" alt="Logo" />
            </div>
    
            {/* Form container */}
            <div className="form-container">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className='login-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text"
                                   placeholder='Username'
                                   required
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                            <FaUser className='icon'/>
                        </div>
                        <div className="input-box">
                            <input type="password"
                                   placeholder='Password'
                                   required
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <FaLock className='icon'/>
                        </div>
                        <div className="forgot">
                            <Link to="#">Forgot Password</Link>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
    
    export default LoginForm;
