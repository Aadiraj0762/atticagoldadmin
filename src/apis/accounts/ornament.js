import apiClient from '../http';

async function getOrnament(query = {}) {
  try {
    const response = await apiClient().post('/api/v1.0/accounts/ornament/get', query);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateOrnament(query = {}) {
  try {
    const response = await apiClient().post('/api/v1.0/accounts/ornament/update', query);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getOrnament, updateOrnament };
