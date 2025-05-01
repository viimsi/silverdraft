import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OCCard from '../components/OCCard';
import '../styles/OCListGeneralPage.css'; // Import the CSS file

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
    <div className="oc-list-page">
      <h2 className="page-title">All User-Created OCs</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="oc-card-container">
        {ocs.length > 0 ? (
          ocs.map((oc) => <OCCard key={oc._id} isOwner={false} oc={oc} />)
        ) : (
          <p className="no-ocs-message">No OCs found.</p>
        )}
      </div>
    </div>
  );
};

export default OCListGeneralPage;