import { Box, Divider } from '@mui/material';
import React, { ReactElement } from 'react';
import { MessageBox } from '../../container/dashboard/message';
import Layout from '../../layouts';
import { NextPageWithLayout } from 'src/types';

const PageMessage: NextPageWithLayout = () => {
  return (
    <Box mt={8}>
      <MessageBox />
    </Box>
  );
};

PageMessage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageMessage;
