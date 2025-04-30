import React from 'react';
import { Link } from 'react-router-dom';

const OCCard = ({ oc, isOwner, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{oc.fullname}</h3>
      {oc.nickname && <p><strong>Nickname:</strong> {oc.nickname}</p>}
      {oc.age && <p><strong>Age:</strong> {oc.age}</p>}
      {oc.backstory && <p><strong>Backstory:</strong> {oc.backstory}</p>}
      {oc.personality && <p><strong>Personality:</strong> {oc.personality}</p>}
      {oc.likes && <p><strong>Likes:</strong> {oc.likes}</p>}
      {oc.dislikes && <p><strong>Dislikes:</strong> {oc.dislikes}</p>}
      {oc.imageUrl && <img src={oc.imageUrl} alt={`${oc.fullname}'s image`} style={{ maxWidth: '200px' }} />}
      
      <Link to={`/oc/${oc._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        View Details
      </Link>

      {isOwner && (
        <div style={{ marginTop: '10px' }}>
          <Link to={`/oc/edit/${oc._id}`} style={{ marginRight: '10px', color: 'green' }}>
            Edit
          </Link>
          <button onClick={() => onDelete(oc._id)} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default OCCard;