import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
// Create an Axios instance with default settings
const axiosClient = axios.create({
  baseURL: apiUrl, // Ensure backend is on this port
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include token in requests
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
