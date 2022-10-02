import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getDistrict } from 'src/api/province';
import { Nullable } from 'src/types';

export interface UseDistrictReturn {
  district_id?: string;
  district_name?: string;
  district_type?: string;
  lat?: Nullable<string>;
  lng?: Nullable<string>;
  province_id?: string;
  inputValue?: string;
}

export default function useDistrict(provinceId?: string): UseDistrictReturn[] {
  const { data } = useQuery(['district', { provinceId }], () => getDistrict(provinceId), {
    enabled: !!provinceId,
  });

  return data?.data.results || [];
}
