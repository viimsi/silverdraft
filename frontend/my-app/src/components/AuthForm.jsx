import React, { useState } from 'react';
import '../styles/AuthForm.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ onSubmit, isLogin }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    if (isLogin) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {isLogin ? (
        <input
          name="emailOrUsername"
          type="text"
          placeholder="Email or Username"
          onChange={handleChange}
          className="auth-input"
          required
        />
      ) : (
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="auth-input"
          required
        />
      )}
      {!isLogin && (
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="auth-input"
          required
        />
      )}
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="auth-input"
        required
      />
      <button type="submit" className="auth-button">
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;