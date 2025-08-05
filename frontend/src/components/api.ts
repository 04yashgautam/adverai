import axios from 'axios';

const api = axios.create({
  baseURL: 'adverai-backend.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;