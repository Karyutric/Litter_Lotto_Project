// Import necessary hooks and components from React and additional libraries
import React, { useState, useContext } from 'react';
import './RegisterForm.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FaUser, FaLock, FaEnvelope, FaSignature } from "react-icons/fa"; 
import { register } from '../Services/authServices'; 
import { AuthContext } from '../Services/authContext'; 

const RegisterForm = () => {
    // State hooks for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate(); 
    
    const { setUser } = useContext(AuthContext); 

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (password !== password2) {
            console.error('Passwords do not match'); // Checks if passwords match
            return;
        }
    
        const userData = { username, email, first_name, surname, password, password2 }; // Compile user data
        try {
            const data = await register(userData); // Attempts to register the user with provided data
    
            handleSuccessfulRegistration(data); // Handle successful registration
        } catch (error) {
            console.error('Registration failed:', error.message); // Logs error if registration fails
        }
    };

    // Handles successful registration
    const handleSuccessfulRegistration = (data) => {
        console.log('Registration successful:', data); // Logs successful registration
        navigate('/login'); // Navigates to login page after successful registration
    };

    // Render the registration form UI
    return (
        <div className="form-container">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {/* Input fields for first name, surname, username, email, and passwords */}
                    <div className="input-box">
                        <input type="text" placeholder='First Name' required value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                        <FaSignature className='icon' /> 
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Surname' required value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <FaSignature className='icon' /> 
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className='icon' /> 
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FaEnvelope className='icon' /> 
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className='icon' /> 
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Confirm Password' required value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <FaLock className='icon' /> 
                    </div>
                
                    <button type="submit">Register</button> 

                    <Link to="/login" className="cancel-button">Cancel</Link> 

                </form>

            </div>
        </div>
    );
}

export default RegisterForm; // Export the RegisterForm component
