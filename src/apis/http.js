import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:9000',
  // baseURL: 'http://benaka.gold/api',
  headers: { Authorization: `Bearer ${localStorage.token}` },
});
