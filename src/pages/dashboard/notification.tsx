import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from 'src/types';

const Notification: NextPageWithLayout = () => {
  return (
    <>
      <Typography>Notification </Typography>
    </>
  );
};

Notification.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notification;
