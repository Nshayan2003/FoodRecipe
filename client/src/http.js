import axios from "axios";

export const BASE_URL = "http://localhost:8000/";

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

AxiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("recipeToken");

    if (token) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
