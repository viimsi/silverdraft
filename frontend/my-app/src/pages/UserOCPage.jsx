import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OCCard from '../components/OCCard';
import '../styles/UserOCPage.css'; 

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
        const res = await axios.get(`http://localhost:5000/api/ocs/user/${user._id}`, { withCredentials: true });
        setOCs(res.data);
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
      await axios.delete(`http://localhost:5000/api/ocs/${id}`, { withCredentials: true });
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