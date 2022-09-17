import { Card, Container, Link, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactElement } from 'react';
import { DeveloperIllustrator } from '../../assets';
import Page from '../../components/Page';
import { LoginForm, RegisterForm } from '../../container/auth';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';
import NextLink from 'next/link';
import { PATH_AUTH } from '../../routes/paths';

const RootStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  padding: theme.spacing(2),
}));

const TextStyled = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(6),
  top: theme.spacing(6),
  display: 'flex',
  gap: theme.spacing(0.5),
}));

const Register: NextPageWithLayout = () => {
  return (
    <Page title="Login">
      <RootStyled>
        <TextStyled>
          <Typography variant="body2">Already have an account?</Typography>
          <NextLink href={PATH_AUTH.login}>
            <Link underline="hover" variant="subtitle2" sx={{ cursor: 'pointer' }}>
              Login
            </Link>
          </NextLink>
        </TextStyled>
        <Card
          sx={{
            height: 1,
            display: {
              xs: 'none',
              lg: 'block',
            },
          }}
        >
          <Typography variant="h4" align="center" mt={15} mb={5}>
            Hi, Wellcome my app
          </Typography>
          <DeveloperIllustrator sx={{ maxWidth: 500 }} />
        </Card>
        <Container maxWidth="sm">
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{
              height: 1,
            }}
          >
            <Typography variant="h5">Register Now</Typography>
            <RegisterForm />
          </Stack>
        </Container>
      </RootStyled>
    </Page>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Layout variants="logoOnly">{page}</Layout>;
};

export default Register;
