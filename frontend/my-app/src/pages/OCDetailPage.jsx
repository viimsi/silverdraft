import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/OCDetailPage.css';
import { getOCById } from '../api/ocAPI';

const OCDetailPage = () => {
  const { id } = useParams();
  const [oc, setOC] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOC = async () => {
      try {
        const data = await getOCById(id);
        setOC(data);
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
      <h2 className="oc-name">{oc.fullname || 'N/A'}</h2>

      <div className="top-section">
        <div className="left-info">
          <div className="nickname-age-row">
            <div className="nickname-container">
              <p className="nickname-title">Nickname:</p>
              <p className="nickname-db">{oc.nickname || 'N/A'}</p>
            </div>
            <div className="age-container">
              <p className="age-title">Age:</p>
              <p className="age-db">{oc.age || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="right-image">
          <div className="polaroid">
            {oc.imageUrl ? (
              <img
                src={oc.imageUrl}
                alt={`${oc.fullname || 'N/A'}'s image`}
                className="oc-image"
              />
            ) : (
              <div className="image-placeholder">No Image</div>
            )}
          </div>
        </div>
      </div>

      <div className="backstory-container">
        <p className="backstory-title">Backstory:</p>
        <p className="backstory-db">{oc.backstory || 'N/A'}</p>
      </div>

      <div className="personality-container">
        <p className="personality-title">Personality:</p>
        <p className="personality-db">{oc.personality || 'N/A'}</p>
      </div>

      <div className="bottom-section">
        <div className="likes-container">
          <p className="likes-title">Likes:</p>
          <p className="likes-db">{oc.likes || 'N/A'}</p>
        </div>
        <div className="dislikes-container">
          <p className="dislikes-title">Dislikes:</p>
          <p className="dislikes-db">{oc.dislikes || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default OCDetailPage;
