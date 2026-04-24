import axios from 'axios';

// For deployment, fallback to the Render URL if env is missing
const API_URL = process.env.REACT_APP_API_URL || 'https://arcadehub-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log('🚀 API Base URL:', API_URL);

api.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(`📡 [API Request] ${config.method.toUpperCase()} -> ${fullUrl}`);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
};

export const games = {
  saveScore: (data) => api.post('/games/save-score', data),
  getLeaderboard: () => api.get('/games/leaderboard'),
  getMyStats: () => api.get('/games/my-stats')
};

export const feedback = {
  submit: (data) => api.post('/feedback/submit', data)
};

export default api;
