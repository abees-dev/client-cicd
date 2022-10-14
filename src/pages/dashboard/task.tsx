import { Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from 'src/types';
import { useAppSelector } from 'src/redux/hooks';

const Task: NextPageWithLayout = () => {
  return <Typography>Task</Typography>;
};

Task.getLayout = function getLayout(page: ReactElement) {
  const user = useAppSelector((state) => state.auth.user);

  return <Layout>{page}</Layout>;
};

export default Task;
