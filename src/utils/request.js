import axios from 'axios';

const BASE_API = import.meta.env.VITE_API_PROXY_PATH;

const service = axios.create({
  baseURL: BASE_API
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("Axios request failed:", error);
    return Promise.reject(new Error(error));
  }
);

export default service;
