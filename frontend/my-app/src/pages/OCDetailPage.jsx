import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/OCDetailPage.css';

const OCDetailPage = () => {
  const { id } = useParams();
  const [oc, setOC] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOC = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ocs/${id}`);
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
    <div className="oc-detail-page">
      <h2 className="oc-name">{oc.fullname}</h2>

      <div className="top-section">
      <div className="left-info">
        <div className="nickname-age-row">
          {oc.nickname && (
            <div className="nickname-container">
              <p className="nickname-title">Nickname:</p>
              <p className="nickname-db">{oc.nickname}</p>
            </div>
          )}
          {oc.age && (
            <div className="age-container">
              <p className="age-title">Age:</p>
              <p className="age-db">{oc.age}</p>
            </div>
          )}
        </div>

        {oc.backstory && (
          <div className="backstory-container">
            <p className="backstory-title">Backstory:</p>
            <p className="backstory-db">{oc.backstory}</p>
          </div>
        )}
      </div>


      {oc.imageUrl && (
        <div className="right-image">
          <div className="polaroid">
            <img
              src={oc.imageUrl}
              alt={`${oc.fullname}'s image`}
              className="oc-image"
            />
          </div>
        </div>
      )}
      </div>

      {oc.personality && (
        <div className="personality-container">
          <p className="personality-title">Personality:</p>
          <p className="personality-db">{oc.personality}</p>
        </div>
      )}

      <div className="bottom-section">
        {oc.likes && (
          <div className="likes-container">
            <p className="likes-title">Likes:</p>
            <p className="likes-db">{oc.likes}</p>
          </div>
        )}
        {oc.dislikes && (
          <div className="dislikes-container">
            <p className="dislikes-title">Dislikes:</p>
            <p className="dislikes-db">{oc.dislikes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCDetailPage;
