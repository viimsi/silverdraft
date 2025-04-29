import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: '', // Updated field for login
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {isLogin ? (
        <input
          name="emailOrUsername"
          type="text"
          placeholder="Email or Username"
          onChange={handleChange}
          required
        />
      ) : (
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
      )}
      {!isLogin && (
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      )}
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;