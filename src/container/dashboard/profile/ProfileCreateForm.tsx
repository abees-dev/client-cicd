import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, styled, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'src/components/hook-form';
import useDistrict, { UseDistrictReturn } from 'src/hooks/useDistrict';
import useProvince, { useProvinceReturn } from 'src/hooks/useProvince';
import useWard, { UseWardReturn } from 'src/hooks/useWard';
import { AutocompleteValue } from 'src/types';
import * as Yup from 'yup';

interface AddressState {
  wardId?: string;
  districtId?: string;
  provinceId?: string;
}

const RootStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const ProfileCreateForm = () => {
  const ProfileSchema = Yup.object().shape({
    province: Yup.string(),
    district: Yup.string(),
    ward: Yup.string(),
  });
  const defaultValues = {
    province: '',
    district: '',
    ward: '',
  };
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const [address, setAddress] = useState<AddressState>({
    provinceId: '',
    wardId: '',
    districtId: '',
  });

  const { handleSubmit, setValue, watch } = methods;

  const provinces = useProvince();

  const districts = useDistrict(address.provinceId);

  const wards = useWard(address.districtId);

  const handleOnChangeProvince = (_: SyntheticEvent, value: AutocompleteValue<useProvinceReturn>) => {
    if (typeof value !== 'string') {
      setAddress((prev) => ({ ...prev, provinceId: String(value?.province_id) }));
      setValue('province', value?.province_name || '');
    }
  };

  const handleOnChangeDistrict = (_: SyntheticEvent, value: AutocompleteValue<UseDistrictReturn>) => {
    if (typeof value !== 'string') {
      setAddress((prev) => ({ ...prev, districtId: String(value?.district_id) }));
      setValue('district', value?.district_name || '');
    }
  };

  const handleOnChangeWard = (_: SyntheticEvent, value: AutocompleteValue<UseWardReturn>) => {
    if (typeof value !== 'string') {
      setAddress((prev) => ({ ...prev, wardId: String(value?.ward_id) }));
      setValue('ward', value?.ward_name || '');
    }
  };

  useEffect(() => {}, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <RootStyled>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Edit personal information</Typography>
        <Autocomplete
          options={provinces}
          freeSolo
          renderOption={(props, option) => (
            <Typography component={'li'} {...props}>
              {option.province_name}
            </Typography>
          )}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return String(option.province_name);
          }}
          renderInput={(params) => <TextField {...params} label="Province" />}
          onChange={handleOnChangeProvince}
        />

        <Autocomplete
          filterSelectedOptions
          options={districts}
          freeSolo
          disabled={!watch('province')}
          renderOption={(props, option) => (
            <Typography component={'li'} {...props}>
              {option.district_name}
            </Typography>
          )}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return String(option.district_name);
          }}
          renderInput={(params) => <TextField {...params} label="District" />}
          onChange={handleOnChangeDistrict}
        />
        <Autocomplete
          options={wards}
          freeSolo
          disabled={!watch('district')}
          renderOption={(props, option) => (
            <Typography component={'li'} {...props}>
              {option.ward_name}
            </Typography>
          )}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return String(option.ward_name);
          }}
          onChange={handleOnChangeWard}
          renderInput={(params) => <TextField value={'123123'} {...params} label="Wards" />}
        />
        <Button type="submit">Submit</Button>
      </FormProvider>
    </RootStyled>
  );
};
