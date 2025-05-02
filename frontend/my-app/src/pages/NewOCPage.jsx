import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/OCEditPage.css'; // Reuse the styles from OCEditPage
import { createOC } from '../api/ocAPI';

const NewOCPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    nickname: '',
    age: '',
    backstory: '',
    personality: '',
    likes: '',
    dislikes: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOC(formData);
      navigate('/my-ocs');
    } catch (err) {
      setError('Failed to add OC. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="oc-edit-page">
      <h2 className="oc-name">Add New OC</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="top-section">
          <div className="left-info">
            <div className="fullname-container">
              <label className="fullname-title">Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="fullname-db"
                placeholder="Enter full name"
              />
            </div>

            <div className="nickname-age-row">
              <div className="nickname-container">
                <label className="nickname-title">Nickname:</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="nickname-db"
                  placeholder="Enter nickname"
                />
              </div>
              <div className="age-container">
                <label className="age-title">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="age-db"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="backstory-container">
              <label className="backstory-title">Backstory:</label>
              <textarea
                name="backstory"
                value={formData.backstory}
                onChange={handleChange}
                className="backstory-db"
                placeholder="Enter backstory"
              />
            </div>
          </div>

          <div className="right-image">
            <div className="polaroid">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="OC Image"
                  className="oc-image"
                />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
            </div>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="image-upload"
              placeholder="Image URL"
            />
          </div>
        </div>

        <div className="personality-container">
          <label className="personality-title">Personality:</label>
          <textarea
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            className="personality-db"
            placeholder="Enter personality"
          />
        </div>

        <div className="bottom-section">
          <div className="likes-container">
            <label className="likes-title">Likes:</label>
            <textarea
              name="likes"
              value={formData.likes}
              onChange={handleChange}
              className="likes-db"
              placeholder="Enter likes"
            />
          </div>
          <div className="dislikes-container">
            <label className="dislikes-title">Dislikes:</label>
            <textarea
              name="dislikes"
              value={formData.dislikes}
              onChange={handleChange}
              className="dislikes-db"
              placeholder="Enter dislikes"
            />
          </div>
        </div>

        <button type="submit" className="auth-button">Add OC</button>
      </form>
    </div>
  );
};

export default NewOCPage;