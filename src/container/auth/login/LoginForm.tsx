import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Divider, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useLoginMutation } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { loginSuccess } from 'src/redux/slice/auth.slice';
import { LoginInput } from 'src/types/input';
import * as Yup from 'yup';
import SocialButton from '../SocialButton';

export default function LoginForm() {
  const user = useAppSelector((state) => state.auth);
  // const socket = useSocket();
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const methods = useForm<LoginInput>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: 'abeesdevjs@gmail.com',
      password: 'abeesdevjs',
    },
  });

  const [login, _] = useLoginMutation({ fetchPolicy: 'no-cache' });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (input: LoginInput) => {
    console.log(input);
    const { data } = await login({ variables: { data: input } });
    const response = data?.login;
    if (response?.code === 200) {
      dispatch(loginSuccess(response));
      enqueueSnackbar(response?.message, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(response?.message, {
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
