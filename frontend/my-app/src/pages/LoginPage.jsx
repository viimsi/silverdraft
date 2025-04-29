import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Login = () => {
  const handleLogin = async data => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} isLogin={true} />
    </div>
  );
};

export default Login;