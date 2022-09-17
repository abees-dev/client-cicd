import { AxiosError } from 'axios';

export const formatError = (error: AxiosError) => {
  return {
    code: error.code,
    message: error.message,
  };
};
