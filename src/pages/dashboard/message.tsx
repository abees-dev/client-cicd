import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { MessageBox } from '../../container/dashboard/message';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

const Message: NextPageWithLayout = () => {
  return (
    <Box mt={8}>
      <MessageBox />
    </Box>
  );
};

Message.getLayout = function getLayout(page: ReactElement) {
  return <Layout variants="main">{page}</Layout>;
};

export default Message;
