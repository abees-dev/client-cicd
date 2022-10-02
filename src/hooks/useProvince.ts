import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { getProvince } from 'src/api/province';

export interface useProvinceReturn {
  province_id?: string;
  province_name?: string;
  province_type?: string;
  inputValue?: string;
}
export default function useProvince(): useProvinceReturn[] {
  const { data } = useQuery(['province'], () => getProvince());
  return data?.data.results || [];
}
