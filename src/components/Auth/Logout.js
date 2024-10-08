import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/api';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser(); // Call the logoutUser function
        localStorage.removeItem('accessToken'); // Clear access token
        localStorage.removeItem('refreshToken'); // Clear refresh token
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>; // Optional loading message
}

export default Logout;
