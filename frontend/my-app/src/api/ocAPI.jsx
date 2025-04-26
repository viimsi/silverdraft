import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ocs';

// Get all OCs
export const getOCs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching OCs:', error);
  }
};

// Get OC by ID
export const getOCById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OC by ID:', error);
  }
};

// Create a new OC
export const createOC = async (ocData) => {
  try {
    const response = await axios.post(API_URL, ocData);
    return response.data;
  } catch (error) {
    console.error('Error creating OC:', error);
  }
};

// Update an OC
export const updateOC = async (id, ocData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, ocData);
    return response.data;
  } catch (error) {
    console.error('Error updating OC:', error);
  }
};

// Delete an OC
export const deleteOC = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting OC:', error);
  }
};
