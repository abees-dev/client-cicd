import axios from 'axios';
// import jwtDecode, { JwtPayload } from 'jwt-decode';
// import { refreshToken, useLogout } from '../redux/slice/auth.slice';
// import store from '../redux/store';
// import { getToken } from './jwt';

// interface RefreshTokenResponse {
//   code?: number;
//   message?: string;
//   accessToken?: string;
// }

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
//   const { dispatch } = store;
//   const accessToken = getToken();
//   if (!accessToken) {
//     dispatch(useLogout());
//   }

//   try {
//     const payload = accessToken && (jwtDecode(accessToken as string) as JwtPayload);

//     const currentTime = (new Date().getTime() + 1) / 1000;
//     const { retry } = config;

//     const whiteListUrl = !['/api/auth/login', '/api/auth/register'].includes(config.url as string);

//     if (payload && payload.exp && payload.exp > currentTime && whiteListUrl && !retry) {
//       config.retry = true;
//       console.log('first');
//       const response: AxiosResponse<RefreshTokenResponse> = await axios({
//         method: 'POST',
//         url: `${process.env.NEXT_BASE_API_URL}/api/auth/refresh-token`,
//         withCredentials: true,
//       });
//       dispatch(refreshToken(response.data));
//     }
//   } catch (error: any) {
//     console.log(error.message);
//     dispatch(useLogout());
//   }

//   config.headers = {
//     Authorization: `Bearer ${getToken()}`,
//   };
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

export default axiosInstance;
