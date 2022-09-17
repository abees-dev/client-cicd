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
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { formatError } from '../../../utils/formatError';
import { MyError } from '../../../types/error';

export default function LoginForm() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

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

  const onSubmit = async (data: LoginInput) => {
    try {
      const actionResult = await dispatch(userLoginThunk(data));
      const result = unwrapResult(actionResult);
      enqueueSnackbar(result.message, {
        variant: 'success',
      });
    } catch (error) {
      const err = error as MyError;
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
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
