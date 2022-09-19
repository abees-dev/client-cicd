import React, { ReactElement } from 'react';
import { NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const Dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
