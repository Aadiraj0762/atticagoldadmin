import axios from 'axios';
import global from '../utils/global';

export default axios.create({
  baseURL: global.baseURL,
  headers: { Authorization: `Bearer ${localStorage.token}` },
});
