import React, { useContext, useState } from 'react';
import { AuthContext } from '../Services/authContext';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Services/authServices';
import { jwtDecode } from 'jwt-decode';


const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };
        try {
            const response = await login(userData);
            console.log('Login response:', response);
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

    const { setUser } = useContext(AuthContext);

    const handleSuccessfulLogin = (data) => {
        console.log("Login response data:", data);
    
        if (data.access && data.refresh) {
            // Storing tokens locally
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
    
            // Decode the JWT token to get user details
            try {
                const decodedUser = jwtDecode(data.access);
                console.log("Decoded user data:", decodedUser);
                setUser(decodedUser);  // Assuming 'setUser' updates the user context
                navigate('/dashboard');
            } catch (error) {
                console.error("Error decoding the JWT token:", error);
                // Handle the error (e.g., show an error message to the user)
            }
        } else {
            console.error("Invalid login response structure:", data);
            // Handle the error appropriately
        }
    };
  return (
    <div className="form-container">
        <div className='wrapper'>
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
  )
}

export default LoginForm