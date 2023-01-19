import axios from "axios";

function loginApi(payload) {
  return axios
    .post("http://localhost:9000/api/v1.0/auth/login", payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

function getUserTypeApi(payload) {
  return axios
    .post("http://localhost:9000/api/v1.0/auth/get-user-type", payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

function getBranchUserApi(payload) {
  return axios
    .post("http://localhost:9000/api/v1.0/auth/get-branch-user", payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export { loginApi, getUserTypeApi, getBranchUserApi };
