import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // change if hosted
});
console.log(process.env.REACT_APP_BASE_URL)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
