import axios from 'axios';

const isProduction = import.meta.env.PROD;
const backendApiUrl = import.meta.env.VITE_BASE_API;
const proxyPath = import.meta.env.VITE_API_PROXY_PATH;

const baseURL = isProduction ? backendApiUrl : proxyPath;

console.log(`Running in ${isProduction ? 'Production' : 'Development'} mode.`);
console.log('Axios baseURL has been set to:', baseURL);

const service = axios.create({
  baseURL: baseURL
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Axios request failed:', error);
    return Promise.reject(new Error(error));
  },
);

export default service;
