import { Button, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Illustrator404 } from '../assets';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from '../routes/paths';
import Layout from '../layouts';

const RootStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
}));

const Page404: NextPageWithLayout = () => {
  return (
    <RootStyled>
      <Stack justifyContent="center" alignItems="center" mt={5}>
        <Typography variant="h3">Sorry, page not found!</Typography>
        <Typography variant="subtitle2" align="center" color="text.secondary" mb={2}>
          Sorry, we couldn’t find the page you’re looking for.
          <br /> Perhaps you’ve mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Illustrator404
          sx={{
            width: 300,
            mb: 2,
          }}
        />
        <NextLink href={PATH_DASHBOARD.root || '/'} passHref>
          <Button variant="contained" size="large">
            Go to Home
          </Button>
        </NextLink>
      </Stack>
    </RootStyled>
  );
};

Page404.getLayout = function getLayout(page: ReactElement) {
  return <Layout variants="logoOnly">{page}</Layout>;
};
export default Page404;
