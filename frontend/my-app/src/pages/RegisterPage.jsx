import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import '../styles/RegisterPage.css';

const Register = () => {
  const handleRegister = async data => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      alert('Registration successful!');
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className='register-page'>
      <h2>Register</h2>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default Register;
