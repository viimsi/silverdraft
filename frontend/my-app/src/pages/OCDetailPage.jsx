import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OCDetailPage = () => {
  const { id } = useParams(); // Get the OC ID from the URL
  const [oc, setOC] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOC = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ocs/${id}`); // Fetch OC by ID
        setOC(res.data);
      } catch (err) {
        setError('Failed to fetch OC. Please try again later.');
        console.error(err);
      }
    };

    fetchOC();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!oc) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{oc.fullname}</h2>
      {oc.nickname && <p><strong>Nickname:</strong> {oc.nickname}</p>}
      {oc.age && <p><strong>Age:</strong> {oc.age}</p>}
      {oc.backstory && <p><strong>Backstory:</strong> {oc.backstory}</p>}
      {oc.personality && <p><strong>Personality:</strong> {oc.personality}</p>}
      {oc.likes && <p><strong>Likes:</strong> {oc.likes}</p>}
      {oc.dislikes && <p><strong>Dislikes:</strong> {oc.dislikes}</p>}
      {oc.imageUrl && <img src={oc.imageUrl} alt={`${oc.fullname}'s image`} style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default OCDetailPage;