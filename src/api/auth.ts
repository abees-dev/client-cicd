import { AxiosResponse } from 'axios';
import { RegisterValue } from '../container/auth/register/RegisterForm';
import { UserResponse } from '../types';
import { LoginInput } from '../types/input';
import axiosInstance from '../utils/axios';

export const userLogin = async (data: LoginInput): Promise<AxiosResponse<UserResponse>> =>
  await axiosInstance({
    method: 'POST',
    url: '/api/auth/login',
    data,
  });

export const useRegister = async (data: RegisterValue) =>
  await axiosInstance({
    method: 'POST',
    url: '/api/auth/register',
    data,
  });
