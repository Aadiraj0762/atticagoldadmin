import apiClient from '../http';

async function getOrnament(query = {}) {
  try {
    const response = await apiClient().post('/api/v1.0/admin/ornament/get', query);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getOrnament };
