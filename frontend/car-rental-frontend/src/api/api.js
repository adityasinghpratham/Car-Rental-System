// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true // Important for session-based auth
});

export default API;
