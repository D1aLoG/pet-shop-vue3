import axios from 'axios';

const BASE_API = import.meta.env.VITE_BASE_API;

const service = axios.create({
  baseURL: BASE_API,
});

service.interceptors.request.use(
  (config) => {
    const conf = config;

    conf.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    return conf;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  (error) => {
    Promise.reject(new Error(error));
  }
);

export default service;
