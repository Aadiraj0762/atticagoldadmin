import apiClient from '../http';

async function getSales() {
  try {
    const response = await apiClient().get('/api/v1.0/accounts/sales/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getSalesById(id) {
  try {
    const response = await apiClient().get(`/api/v1.0/accounts/sales/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateSales(id, payload) {
  try {
    const response = await apiClient().post(`/api/v1.0/accounts/sales/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteSalesById(id) {
  try {
    const response = await apiClient().post(`/api/v1.0/accounts/sales/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getSales, getSalesById, updateSales, deleteSalesById };
