import React, { useState, useEffect } from 'react';
import './userSettings.css'; // Importing CSS styles for the UserSettings component
import { toast } from 'react-toastify'; // Importing toast for showing notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for toast notifications

const serverBaseUrl = 'http://31.104.89.199:8000'; // Base URL of the backend server

const UserSettings = () => {
  // State to store user information
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    surname: '',
    username: '',
    joinedDate: '',
  });
  // States for handling password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors

  // Fetch user information on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
        const response = await fetch(`${serverBaseUrl}/image_capture/user/current/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Including the Authorization header with the access token
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error if response is not OK
        }

        const data = await response.json(); // Parse the JSON response
        
        // Set user information in the state
        setUserInfo({
          first_name: data.first_name,
          surname: data.surname,
          username: data.username,
          // Format the joined date
          joinedDate: data.date_joined ? new Date(data.date_joined).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : 'N/A',
        });
      } catch (error) {
        console.error('Fetch error:', error); // Log any fetch errors
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Handle password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error state

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
        setError('The new passwords do not match.'); // Set error if passwords do not match
        return;
    }

    // Prepare payload for the API call
    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the access token
      const response = await fetch(`${serverBaseUrl}/image_capture/user/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the Authorization header
        },
        body: JSON.stringify(payload) // Convert the payload into JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password change failed'); // Throw error on failure
      }

      // Reset password fields on successful password change
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success("Password successfully changed!"); // Show success notification
    } catch (error) {
      console.error('Error changing password:', error.message); // Log error on exception
    }
  };

  // Render the user settings UI
  return (
    <div className="container py-5">
      <div className='userSettings-wrapper'>
        <div className="text-center mb-5">
          <h1 className="mb-4">{`${userInfo.first_name} ${userInfo.surname}`}</h1>
          <p className="text-muted h4 font-weight-bold">Member Since:</p>
          <p className="text-muted h5 font-weight-bold">{userInfo.joinedDate}</p>
        </div>

        <div className="card">
          <div className="card-body">
            {error && <div className="alert alert-danger" role="alert">{error}</div>} 

            <form onSubmit={handlePasswordChange} className="mb-3">
              {/* Form fields for current password, new password, and confirm new password */}
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;