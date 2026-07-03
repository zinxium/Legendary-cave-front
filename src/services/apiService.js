import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getSouvenirs = async () => {
  const response = await axios.get(`${API_URL}/api/photos/souvenirs`);
  return response.data;
};


export const getAlumni = async () => {
  const response = await axios.get(`${API_URL}/api/alumni`);
  return response.data;
};

export const sendContact = async (data) => {
  const response = await axios.post(`${API_URL}/api/contact`, data);
  return response.data;
};
