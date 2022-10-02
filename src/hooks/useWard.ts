import { useQuery } from '@tanstack/react-query';
import { getWard } from 'src/api/province';

export interface UseWardReturn {
  district_id?: string;
  ward_id?: string;
  ward_name?: string;
  ward_type?: string;
  inputValue?: string;
}

export default function useWard(districtId?: string): UseWardReturn[] {
  const { data } = useQuery(['wards', { districtId }], () => getWard(districtId), {
    enabled: !!districtId,
  });

  return data?.data.results || [];
}
