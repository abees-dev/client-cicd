import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Autocomplete, Button, MenuItem, Stack, styled, TextField, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFSelect from 'src/components/hook-form/RHFSelect';
import useDistrict, { UseDistrictReturn } from 'src/hooks/useDistrict';
import useProvince, { useProvinceReturn } from 'src/hooks/useProvince';
import useWard, { UseWardReturn } from 'src/hooks/useWard';
import { AutocompleteValue } from 'src/types';
import * as Yup from 'yup';
import { Maybe, User, useUpdateUserProfileMutation } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { LoadingButton } from '@mui/lab';
import { updateProfile, updateUser } from 'src/redux/slice/auth.slice';
import { closeModal } from 'src/redux/slice/modal.slice';
import { useSnackbar } from 'notistack';
import { uploadSingle } from 'src/api/upload';

interface AddressState {
  wardId?: string;
  districtId?: string;
  provinceId?: string;
}

const RootStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const ProfileCreateForm = () => {
  const ProfileSchema = Yup.object().shape({
    province: Yup.string().required(),
    district: Yup.string().required(),
    ward: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    liveAt: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    gender: Yup.string().required(),
    dayOfBirth: Yup.date().required(),
    story: Yup.string().required(),
  });

  const { profile, firstName, lastName } = useAppSelector((state) => state.auth.user) as User;

  const defaultValues = {
    province: '',
    district: '',
    ward: '',
    firstName: firstName || '',
    lastName: lastName || '',
    liveAt: profile?.liveAt || '',
    phoneNumber: profile?.phoneNumber || '',
    gender: profile?.gender || '',
    dayOfBirth: new Date(profile?.dayOfBirth as string),
    story: profile?.story || '',
  };

  const user = useAppSelector((state) => state.auth?.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const [address, setAddress] = useState<AddressState>({
    provinceId: '',
    wardId: '',
    districtId: '',
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

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

  const handleOnchangePicker = (newDate: Maybe<Date>) => {
    setValue('dayOfBirth', newDate as Date);
  };

  const [updateProfileMutation, { loading }] = useUpdateUserProfileMutation();
  const onSubmit = async (formValue: any) => {
    try {
      const { data } = await updateProfileMutation({
        variables: {
          data: {
            user,
            ...formValue,
          },
        },
      });

      dispatch(updateUser(data?.updateProfile.user));
      dispatch(updateProfile(data?.updateProfile.profile));
      dispatch(closeModal('editProfile'));
      enqueueSnackbar('Update profile successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootStyled>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Edit personal information</Typography>
        <Stack spacing={2} mt={2} mb={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>

          <Stack direction="row" spacing={2}>
            <DesktopDatePicker
              label="Date desktop"
              value={new Date()}
              onChange={handleOnchangePicker}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />

            <RHFSelect name="gender" label="Gender">
              {['male', 'female', 'other'].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {capitalize(option)}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction="row" spacing={2}>
            <RHFTextField name="phoneNumber" label="Phone" />
            <RHFTextField name="liveAt" label="Live" />
          </Stack>
          <RHFTextField name="story" label="Story" />

          <Stack direction="row" spacing={2}>
            <Autocomplete
              options={provinces}
              freeSolo
              fullWidth
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Province"
                  helperText={
                    <Typography variant="caption" color="error.main">
                      {errors?.province && errors.province.message}
                    </Typography>
                  }
                />
              )}
              onChange={handleOnChangeProvince}
            />

            <Autocomplete
              options={districts}
              freeSolo
              fullWidth
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="District"
                  helperText={
                    <Typography variant="caption" color="error.main">
                      {errors?.district && errors.district.message}
                    </Typography>
                  }
                />
              )}
              onChange={handleOnChangeDistrict}
            />
            <Autocomplete
              options={wards}
              freeSolo
              fullWidth
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Wards"
                  helperText={
                    <Typography variant="caption" color="error.main">
                      {errors?.ward && errors.ward.message}
                    </Typography>
                  }
                />
              )}
            />
          </Stack>
        </Stack>
        <LoadingButton loading={loading} type="submit" variant="contained" size="large" fullWidth>
          Update
        </LoadingButton>
      </FormProvider>
    </RootStyled>
  );
};
