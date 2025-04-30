import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OCEditPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchOC = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ocs/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError('Failed to fetch OC details.');
        console.error(err);
      }
    };

    fetchOC();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/ocs/${id}`, formData, { withCredentials: true });
      navigate('/my-ocs'); // Redirect to the user's OCs page
    } catch (err) {
      setError('Failed to update OC. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit OC</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Fullname"
          required
        />
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="Nickname"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <textarea
          name="backstory"
          value={formData.backstory}
          onChange={handleChange}
          placeholder="Backstory"
        />
        <textarea
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          placeholder="Personality"
        />
        <textarea
          name="likes"
          value={formData.likes}
          onChange={handleChange}
          placeholder="Likes"
        />
        <textarea
          name="dislikes"
          value={formData.dislikes}
          onChange={handleChange}
          placeholder="Dislikes"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default OCEditPage;