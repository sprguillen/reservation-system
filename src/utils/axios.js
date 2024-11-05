import axios from 'axios';

const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    const token = process.env.VUE_APP_BEARER_TOKEN;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
