import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.26:9000',
  // baseURL: 'https://benaka.gold/api',
  headers: { Authorization: `Bearer ${localStorage.token}` },
});
