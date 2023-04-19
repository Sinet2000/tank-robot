import axios from 'axios';

const api = axios.create();

export const setApiBaseUrl = (baseUrl: string) => {
  api.defaults.baseURL = baseUrl;
};

export default api;
