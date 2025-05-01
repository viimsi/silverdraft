import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async data => {
    try {
      await axios.post('http://localhost:5000/api/auth/login', data, { withCredentials: true });
      alert('Login successful!');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} isLogin={true} />
      <button onClick={handleRegisterRedirect} className="register-button">
        Register
      </button>
    </div>
  );
};

export default Login;