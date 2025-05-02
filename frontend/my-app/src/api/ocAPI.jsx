import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ocs';
const API_AUTH_URL = 'http://localhost:5000/api/auth';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});


// Get all OCs
export const getOCs = async () => {
  try {
    const response = await API.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching OCs:', error);
  }
};

// Get OC by ID
export const getOCById = async (id) => {
  try {
    const response = await API.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OC by ID:', error);
  }
};

// Get OCs by User ID
export const getOCsByUserId = async (userId) => {
  try {
    const response = await API.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OCs by User ID:', error);
  }
};

// Create a new OC
export const createOC = async (ocData) => {
  try {
    const response = await API.post(API_URL, ocData);
    return response.data;
  } catch (error) {
    console.error('Error creating OC:', error);
  }
};

// Update an OC
export const updateOC = async (id, ocData) => {
  try {
    const response = await API.put(`${API_URL}/${id}`, ocData);
    return response.data;
  } catch (error) {
    console.error('Error updating OC:', error);
  }
};

// Delete an OC
export const deleteOC = async (id) => {
  try {
    const response = await API.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting OC:', error);
  }
};

export const registerUser = async (userData) => {
  const res = await API.post(`${API_AUTH_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post(`${API_AUTH_URL}/login`, userData);
  return res.data;
};

export const updateUser = async (field, value) => {
  try {
    const response = await API.put(`${API_AUTH_URL}/me`, {[field]: value});
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};