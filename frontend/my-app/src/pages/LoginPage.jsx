import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/ocAPI';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await loginUser(data);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  }

  return (
    <div className="login-page">
      <h2 className='title'>Login</h2>
      <AuthForm onSubmit={handleLogin} isLogin={true} />
      <button onClick={handleRegisterRedirect} className="register-button">
        Register
      </button>
    </div>
  );
};

export default Login;