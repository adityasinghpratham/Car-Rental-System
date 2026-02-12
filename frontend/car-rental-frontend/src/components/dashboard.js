// src/dashboard.js
import API from "./api.js";

export function fetchCars(successCallback, errorCallback) {
  API.get("/cars")
    .then(res => successCallback(res.data))
    .catch(err => errorCallback(err.message));
}

export function deleteCar(id, successCallback, errorCallback) {
  API.delete(`/cars/${id}`)
    .then(() => successCallback())
    .catch(err => errorCallback(err.message));
}

export function getRole() {
  return localStorage.getItem("role") || "USER";
}

export function logout() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  localStorage.removeItem("role");
  window.location.reload();
}
