import apiClient from '../http';

async function getAttendance() {
  try {
    const response = await apiClient().get('/api/v1.0/hr/attendance/get');
    return response.data;
  } catch (err) {
    return err;
  }
}

async function getAttendanceById(id) {
  try {
    const response = await apiClient().get(`/api/v1.0/hr/attendance/get/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function createAttendance(payload) {
  try {
    const response = await apiClient().post('/api/v1.0/hr/attendance/create', payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function updateAttendance(id, payload) {
  try {
    const response = await apiClient().post(`/api/v1.0/hr/attendance/update/${id}`, payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

async function deleteAttendanceById(id) {
  try {
    const response = await apiClient().post(`/api/v1.0/hr/attendance/delete/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export { getAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendanceById };
