import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.0.109:9000',
  headers: { Authorization: `Bearer ${localStorage.token}` },
});
