import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useLogout } from '../redux/slice/auth.slice';
import { injectStore } from './injectStore';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BASE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const { dispatch, getState } = injectStore();
  const accessToken = getState().user.accessToken;

  console.log(accessToken);
  // if (!accessToken) {
  //   return dispatch(useLogout());
  // }
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
