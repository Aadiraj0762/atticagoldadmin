import apiClient from '../http';

async function getSales() {
  try {
    const response = await apiClient().get('/api/v1.0/admin/sales/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function findSales(query = {}) {
  try {
    const response = await apiClient().post('/api/v1.0/admin/sales/get', query);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getSalesById(id) {
  try {
    const response = await apiClient().get(`/api/v1.0/admin/sales/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateSales(id, payload) {
  try {
    const response = await apiClient().post(`/api/v1.0/admin/sales/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteSalesById(id) {
  try {
    const response = await apiClient().post(`/api/v1.0/admin/sales/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getSales, findSales, getSalesById, updateSales, deleteSalesById };
