import React, { useState, useEffect } from 'react';
import './userSettings.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/";

const UserSettings = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    surname: '',
    username: '',
    joinedDate: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://litter-lotto-py-e1a362be7b85.herokuapp.com/image_capture/user/current/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        
        setUserInfo({
          first_name: data.first_name,
          surname: data.surname,
          username: data.username,
          joinedDate: data.date_joined ? new Date(data.date_joined).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : 'N/A',
        });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
        setError('The new passwords do not match.');
        return;
    }

    // If passwords match, continue with the API call
    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
      
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(API_URL + 'user/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Password change failed');
      }

      console.log('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success("Password successfully changed!");
    } catch (error) {
      console.error('Error changing password:', error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className='userSettings-wrapper'>
        <div className="text-center mb-5">
          <h1 className="mb-4">{`${userInfo.first_name} ${userInfo.surname}`}</h1>
          <p className="text-muted h4 font-weight-bold">Member Since: 123</p>
          <p className="text-muted h5 font-weight-bold">{userInfo.joinedDate}</p>
        </div>

        <div className="card">
          <div className="card-body">
            {error && <div className="alert alert-danger" role="alert">{error}</div>} 

            <form onSubmit={handlePasswordChange} className="mb-3">
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


