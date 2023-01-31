import apiClient from '../http';

async function getEmployee() {
  try {
    const response = await apiClient.get('/api/v1.0/admin/employee/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getEmployeeById(id) {
  try {
    const response = await apiClient.get(`/api/v1.0/admin/employee/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function createEmployee(payload) {
  try {
    const response = await apiClient.post('/api/v1.0/admin/employee/create', payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateEmployee(id, payload) {
  try {
    const response = await apiClient.post(`/api/v1.0/admin/employee/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteEmployeeById(id) {
  try {
    const response = await apiClient.post(`/api/v1.0/admin/employee/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getEmployee, getEmployeeById, createEmployee, updateEmployee, deleteEmployeeById };
