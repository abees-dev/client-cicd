import { Button, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import SocialButton from '../SocialButton';
import { userLogin } from '../../../api/auth';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userLoginThunk } from '../../../redux/slice/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { LoginInput } from '../../../types/input';

export default function LoginForm() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const methods = useForm<LoginInput>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: 'abeesdevjsadmin@gmail.com',
      password: 'abeesdevjs',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = async (data: LoginInput) => {
    console.log(data);
    try {
      const actionResult = await dispatch(userLoginThunk(data));
      const result = unwrapResult(actionResult);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField fullWidth name="email" label="Email" />
        <RHFTextField fullWidth name="password" label="Password" />
        <LoadingButton variant="contained" size="large" loading={isSubmitting} type="submit">
          Login
        </LoadingButton>
        <Divider>
          <Typography variant="subtitle1" color="text.secondary">
            Or
          </Typography>
        </Divider>
        <SocialButton />
      </Stack>
    </FormProvider>
  );
}