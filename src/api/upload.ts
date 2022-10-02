import axios, { AxiosResponse } from 'axios';
import { UploadSingleResponse, UploadMultipleResponse } from 'src/types/response';
import axiosInstance from 'src/utils/axios';

export const uploadSingle = async (data: FormData): Promise<AxiosResponse<UploadSingleResponse>> => {
  return await axiosInstance({
    method: 'POST',
    url: '/upload-single',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
};

export const uploadMultiple = async (data: FormData): Promise<UploadMultipleResponse> => {
  const res: AxiosResponse<UploadMultipleResponse> = await axios({
    method: 'POST',
    url: ' http://localhost:3089/upload-multiple',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    withCredentials: true,
  });
  return res.data;
};
