import apiClient from '../http';

async function getRelease() {
  try {
    const response = await apiClient.get('/api/v1.0/branch/release/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getReleaseById(id) {
  try {
    const response = await apiClient.get(`/api/v1.0/branch/release/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getReleaseByCustomerId(id) {
  try {
    const response = await apiClient.post('/api/v1.0/branch/release/get', {
      customerId: id,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

async function createRelease(payload) {
  try {
    const response = await apiClient.post('/api/v1.0/branch/release/create', payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateRelease(id, payload) {
  try {
    const response = await apiClient.post(`/api/v1.0/branch/release/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteReleaseById(id) {
  try {
    const response = await apiClient.post(`/api/v1.0/branch/release/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getRelease, getReleaseById, getReleaseByCustomerId, createRelease, updateRelease, deleteReleaseById };
