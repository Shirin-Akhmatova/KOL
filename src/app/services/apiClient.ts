import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // проксируем /api к http://localhost:5005/api
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
