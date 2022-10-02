// https://vapi.vnappmob.com/api/province

import axios, { AxiosRequestConfig } from 'axios';

export const getProvince = async (option?: AxiosRequestConfig) =>
  await axios({
    method: 'GET',
    url: 'https://vapi.vnappmob.com/api/province',
    ...option,
  });

export const getDistrict = async (provinceId?: string, option?: AxiosRequestConfig) =>
  await axios({
    method: 'GET',
    url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
    ...option,
  });

export const getWard = async (districtId?: string, option?: AxiosRequestConfig) =>
  await axios({
    method: 'GET',
    url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
    ...option,
  });
