import { Button, Card, Container, styled, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DeveloperIllustrator } from '../../assets';
import * as Yup from 'yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';

type FormValues = {
  email: string;
  password: string;
};

const RootStled = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  padding: theme.spacing(2),
}));

export default function Login() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(),
  });

  const methods: UseFormReturn<FormValues> = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <RootStled>
      <Card sx={{ height: 1 }}>
        <Typography variant="h4" align="center" mt={15} mb={5}>
          Hi, Wellcome my app
        </Typography>
        <DeveloperIllustrator sx={{ maxWidth: 500 }} />
      </Card>
      <Container maxWidth="sm">
        <Stack>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="password" label="Password" />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </FormProvider>
          {/* <TextField fullWidth /> */}
        </Stack>
      </Container>
    </RootStled>
  );
}
