import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log('🚀 API Configured with URL:', API_URL);

api.interceptors.request.use((config) => {
  console.log(`📡 Sending ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
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
