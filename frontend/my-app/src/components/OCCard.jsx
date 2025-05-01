import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/OCCard.css';

const OCCard = ({ oc, isOwner, onDelete }) => {
  const navigate = useNavigate();
  const randomTilt = Math.random() * 10 - 5;

  const colors = ['#ffc0cb', '#add8e6', '#fdfd96', '#98fb98', '#ffb6c1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const handleClick = () => {
    navigate(`/oc/edit/${oc._id}`);
  };

  const cardStyle = {
    transform: `rotate(${randomTilt}deg)`,
    backgroundColor: randomColor,
    textDecoration: 'none',
    color: 'inherit',
  };

  const cardContent = (
    <>
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
        <div className="oc-card-owner">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="oc-card-edit"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(oc._id);
            }}
            className="oc-card-delete"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );

  return isOwner ? (
    <div className="oc-card" style={cardStyle}>
      {cardContent}
    </div>
  ) : (
    <Link to={`/oc/${oc._id}`} className="oc-card" style={cardStyle}>
      {cardContent}
    </Link>
  );
};

export default OCCard;