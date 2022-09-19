import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserResponse } from 'src/types';
import axiosInstance from 'src/utils/axios';

export const getAllUser = async (option: AxiosRequestConfig): Promise<AxiosResponse<UserResponse>> =>
  await axiosInstance({
    method: 'GET',
    url: '/api/message/getUser',
    ...option,
  });
export const getMessage = async (option: AxiosRequestConfig) =>
  await axiosInstance({
    method: 'GET',
    url: 'api/message/get-message',
    ...option,
  });
