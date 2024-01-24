import React, { useState, useEffect } from 'react';

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
        const response = await fetch('http://192.168.1.135:8000/image_capture/user/current/', {
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
      const response = await fetch('http://192.168.1.135:8000/image_capture/user/change-password/', {
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
    } catch (error) {
      console.error('Error changing password:', error.message);
    }
  };

  return (
    <div>
      <h1>User Settings</h1>
      <p>Name: {userInfo.first_name} {userInfo.surname}</p>
      <p>Username: {userInfo.username}</p>
      <p>Member Since: {userInfo.joinedDate}</p>

      {error && <p className="error-message">{error}</p>} 

      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default UserSettings;

