import { Card, Container, Link, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import NextLink from 'next/link';
import { ReactElement } from 'react';
import Page from 'src/components/Page';
import { LoginForm } from 'src/container/auth';
import Layout from 'src/layouts';
import { PATH_AUTH } from 'src/routes/paths';
import { NextPageWithLayout } from 'src/types';
import { DeveloperIllustrator } from '../../assets';

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

const Login: NextPageWithLayout = () => {
  return (
    <Page title="Login">
      <RootStyled>
        <TextStyled>
          <Typography variant="body2">Don’t have an account?</Typography>
          <NextLink href={PATH_AUTH.register}>
            <Link underline="hover" variant="subtitle2" sx={{ cursor: 'pointer' }}>
              Get stated
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
            <Typography variant="h5">Login to assess</Typography>
            <LoginForm />
          </Stack>
        </Container>
      </RootStyled>
    </Page>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout variants="logoOnly">{page}</Layout>;
};

export default Login;
