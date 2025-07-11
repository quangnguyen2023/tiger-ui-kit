import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const createAxiosInstance = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error || 'An error occurred');
    }
  );

  return apiClient;
};

const axiosInstance = createAxiosInstance(`${API_BASE_URL}/widgets`);
const axiosInstanceForAuth = createAxiosInstance(`${API_BASE_URL}/auth`);

export { axiosInstance, axiosInstanceForAuth };
