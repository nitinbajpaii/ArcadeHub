import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
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
