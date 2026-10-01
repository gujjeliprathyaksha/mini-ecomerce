import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mini-ecomerce-3aqc.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mini-store-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
