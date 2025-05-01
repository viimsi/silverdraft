import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import axios from 'axios';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

      document.cookie = 'token=; Max-Age=0; path=/;';
      setUser(null);

      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div className="header-banner">
      <div className="header-left">
        <Link to="/" className="header-title">silverDraft</Link>
      </div>
      <div className="header-right">
        {user ? (
          <>
            <Link to="/oc/add" className="header-button">Add OC</Link>
            <Link to="/my-ocs" className="header-button">View My OCs</Link>
            <Link to="/profile" className="header-button">Edit My Profile</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-button">Login</Link>
            <Link to="/register" className="header-button">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;