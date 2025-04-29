import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isEditingField, setIsEditingField] = useState({ username: false, email: false, password: false }); // Individual edit states

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (field) => {
    try {
      const updatedData = { [field]: formData[field] }; // Only send the updated field
      if (field === 'password' && !formData.password) {
        setMessage('Password cannot be empty.');
        return;
      }
      const res = await axios.put('http://localhost:5000/api/auth/me', updatedData, { withCredentials: true });
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      setIsEditingField({ ...isEditingField, [field]: false }); // Exit edit mode for the field
      if (field === 'password') setFormData({ ...formData, password: '' }); // Clear password field
    } catch (err) {
      setMessage(err.response?.data?.message || `Failed to update ${field}`);
    }
  };

  const handleEditClick = (field) => {
    setIsEditingField({ ...isEditingField, [field]: true }); // Enable edit mode for the field
  };

  const handleCancelClick = (field) => {
    setIsEditingField({ ...isEditingField, [field]: false }); // Disable edit mode for the field
    setFormData({
      ...formData,
      [field]: user?.[field] || '', // Reset the field to its original value
    });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form>
        {/* Username Field */}
        <div>
          <label>Username:</label>
          {isEditingField.username ? (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => handleSubmit('username')}>
                Save
              </button>
              <button type="button" onClick={() => handleCancelClick('username')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{formData.username}</span>
              <button type="button" onClick={() => handleEditClick('username')}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          {isEditingField.email ? (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => handleSubmit('email')}>
                Save
              </button>
              <button type="button" onClick={() => handleCancelClick('email')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{formData.email}</span>
              <button type="button" onClick={() => handleEditClick('email')}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label>Password:</label>
          {isEditingField.password ? (
            <>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
              <button type="button" onClick={() => handleSubmit('password')}>
                Save
              </button>
              <button type="button" onClick={() => handleCancelClick('password')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>********</span>
              <button type="button" onClick={() => handleEditClick('password')}>
                Edit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;