import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Divider, Stack, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import useSocket from 'src/hooks/useSocket';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { userLoginThunk } from 'src/redux/slice/auth.slice';
import { UserResponse } from 'src/types';
import { MyError } from 'src/types/error';
import { LoginInput } from 'src/types/input';
import * as Yup from 'yup';
import SocialButton from '../SocialButton';

export default function LoginForm() {
  const user = useAppSelector((state) => state.auth);
  const socket = useSocket();
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
      const result = unwrapResult(actionResult) as UserResponse;
      enqueueSnackbar(result.message, {
        variant: 'success',
      });

      socket?.emit('login', result.user.id);
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
