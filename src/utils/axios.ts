import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BASE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
