import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const createAxiosInstance = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err || 'AxiosRequest: An error occurred');
    },
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error || 'AxiosResponse: An error occurred');
    },
  );

  return apiClient;
};

const axiosInstance = createAxiosInstance(`${API_BASE_URL}/widgets`);

export { axiosInstance };

////////////////////////////////////////////////////////////
// Axios for server side ⬇️⬇️⬇️
////////////////////////////////////////////////////////////

const createAxiosInstanceForServer = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(
    async (config) => {
      const session = await getServerSession(authOptions);
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err || 'AxiosRequest: An error occurred');
    },
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error || 'AxiosResponse: An error occurred');
    },
  );

  return apiClient;
};

const axiosServerForAuth = createAxiosInstanceForServer(`${API_BASE_URL}/auth`);

export { axiosServerForAuth };
