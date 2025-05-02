import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';
import { updateUser } from '../api/ocAPI';

const ProfilePage = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isEditingField, setIsEditingField] = useState({ username: false, email: false, password: false });

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
      if (field === 'password' && !formData.password) {
        setMessage('Password cannot be empty.');
        return;
      }
      const updatedData = await updateUser(field, formData[field]);
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      setIsEditingField({ ...isEditingField, [field]: false });

      if (field === 'password') 
        setFormData({ ...formData, password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || `Failed to update ${field}`);
    }
  };

  const handleEditClick = (field) => {
    setIsEditingField({ ...isEditingField, [field]: true });
  };

  const handleCancelClick = (field) => {
    setIsEditingField({ ...isEditingField, [field]: false });
    setFormData({
      ...formData,
      [field]: user?.[field] || '',
    });
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>
      {message && <p className='message'>{message}</p>}
      <form>
        <div>
          <label className='label'>Username: </label>
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

        <div>
          <label className='label'>Email: </label>
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

        <div>
          <label className='label'>Password: </label>
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