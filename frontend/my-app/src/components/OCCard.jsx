import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/OCCard.css';

const OCCard = ({ oc, isOwner, onDelete }) => {
  const randomTilt = Math.random() * 10 - 5;

  const colors = ['#ffc0cb', '#add8e6', '#fdfd96', '#98fb98', '#ffb6c1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link
      to={`/oc/${oc._id}`}
      className="oc-card"
      style={{
        transform: `rotate(${randomTilt}deg)`,
        backgroundColor: randomColor,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {oc.imageUrl && (
        <img
          src={oc.imageUrl}
          alt={`${oc.fullname}'s image`}
          style={{ maxWidth: '200px', borderRadius: '5px', marginBottom: '10px' }}
        />
      )}
      <h3>{oc.fullname}</h3>
      {oc.user?.username && <p><strong>Owner:</strong> {oc.user.username}</p>}

      {isOwner && (
        <div style={{ marginTop: '10px' }}>
          <Link to={`/oc/edit/${oc._id}`} style={{ marginRight: '10px', color: 'green' }} onClick={(e) => e.stopPropagation()}>
            Edit
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(oc._id);
            }}
            style={{ color: 'red' }}
          >
            Delete
          </button>
        </div>
      )}
    </Link>
  );
};

export default OCCard;