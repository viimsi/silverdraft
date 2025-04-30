import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OCCard from '../components/OCCard';

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
      setOCs(ocs.filter((oc) => oc._id !== id)); // Remove the deleted OC from the list
    } catch (err) {
      console.error('Failed to delete OC:', err);
      setError('Failed to delete OC. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Your OCs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/oc/add" style={{ display: 'inline-block', marginBottom: '20px', color: 'blue', textDecoration: 'underline' }}>
        Add New OC
      </Link>
      <div>
        {ocs.length > 0 ? (
          ocs.map((oc) => (
            <OCCard key={oc._id} oc={oc} isOwner={true} onDelete={handleDelete} />
          ))
        ) : (
          <p>No OCs found. Create your first OC!</p>
        )}
      </div>
    </div>
  );
};

export default UserOCPage;