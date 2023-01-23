import apiClient from './http';

async function getExpense() {
  try {
    const response = await apiClient.get('/api/v1.0/admin/expense/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getExpenseById(id) {
  try {
    const response = await apiClient.get(`/api/v1.0/admin/expense/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function createExpense(payload) {
  try {
    const response = await apiClient.post('/api/v1.0/admin/expense/create', payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateExpense(id, payload) {
  try {
    const response = await apiClient.post(`/api/v1.0/admin/expense/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteExpenseById(id) {
  try {
    const response = await apiClient.post(`/api/v1.0/admin/expense/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getExpense, getExpenseById, createExpense, updateExpense, deleteExpenseById };
