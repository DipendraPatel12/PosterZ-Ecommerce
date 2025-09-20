import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Create an Axios instance with default settings
const axiosClient = axios.create({
  baseURL: apiUrl, // Ensure backend is on this port
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ This ensures cookies are sent with every request
});

// Optional: interceptor to include token in headers
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
