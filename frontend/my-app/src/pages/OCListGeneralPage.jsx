import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OCCard from '../components/OCCard';

const OCListGeneralPage = () => {
  const [ocs, setOCs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOCs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ocs'); // Fetch all OCs
        setOCs(res.data);
      } catch (err) {
        setError('Failed to fetch OCs. Please try again later.');
        console.error(err);
      }
    };

    fetchOCs();
  }, []);

  return (
    <div>
      <h2>All User-Created OCs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {ocs.length > 0 ? (
          ocs.map((oc) => <OCCard key={oc._id} isOwner={false} oc={oc} />)
        ) : (
          <p>No OCs found.</p>
        )}
      </div>
    </div>
  );
};

export default OCListGeneralPage;