import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import '../styles/RegisterPage.css';
import { registerUser } from '../api/ocAPI';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className='register-page'>
      <h2 className='title'>Register</h2>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default Register;
