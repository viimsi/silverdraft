import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OCCard from '../components/OCCard';
import '../styles/UserOCPage.css'; 
import { deleteOC, getOCsByUserId } from '../api/ocAPI';

const UserOCPage = ({ user }) => {
  const [ocs, setOCs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserOCs = async () => {
      if (!user) {
        setError('You must be logged in to view your OCs.');
        return;
      }

      try {
        const data = await getOCsByUserId(user._id);
        setOCs(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch your OCs. Please try again later.');
        console.error(err);
      }
    };

    fetchUserOCs();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteOC(id);
      setOCs(ocs.filter((oc) => oc._id !== id));
    } catch (err) {
      console.error('Failed to delete OC:', err);
      setError('Failed to delete OC. Please try again later.');
    }
  };

  return (
    <div className="oc-list-page">
      <h2 className="page-title">Your OCs</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="oc-card-container">
        {ocs.length > 0 ? (
          ocs.map((oc) => (
            <OCCard key={oc._id} oc={oc} isOwner={true} onDelete={handleDelete} />
          ))
        ) : (
          <p className="no-ocs-message">No OCs found. Create your first OC!</p>
        )}
      </div>
    </div>
  );
};

export default UserOCPage;