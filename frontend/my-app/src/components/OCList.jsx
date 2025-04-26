import React, { useEffect, useState } from 'react';
import { getOCs, deleteOC } from '../api/ocAPI';

const OCList = () => {
  const [ocs, setOCs] = useState([]);

  useEffect(() => {
    const fetchOCs = async () => {
      const data = await getOCs();
      setOCs(data);
    };

    fetchOCs();
  }, []);

  const handleDelete = async (id) => {
    const deletedOC = await deleteOC(id);
    if (deletedOC) {
      setOCs(ocs.filter((oc) => oc._id !== id));
    }
  };

  return (
    <div>
      <h2>OC List</h2>
      <ul>
        {ocs.map((oc) => (
          <li key={oc._id}>
            <h3>{oc.fullname}</h3>
            <p>{oc.nickname}</p>
            <button onClick={() => handleDelete(oc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OCList;
