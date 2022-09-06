import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

const Task: NextPageWithLayout = () => {
  return <div>Task</div>;
};

Task.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Task;
