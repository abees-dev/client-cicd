import axios, { AxiosResponse } from 'axios';
import { UploadSingleResponse, UploadMultipleResponse } from 'src/types/response';

export const uploadSingle = async (data: FormData): Promise<AxiosResponse<UploadSingleResponse>> => {
  return await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/upload-single`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
};

export const uploadMultiple = async (data: FormData): Promise<UploadMultipleResponse> => {
  const res: AxiosResponse<UploadMultipleResponse> = await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/upload-multiple`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    withCredentials: true,
  });
  return res.data;
};
