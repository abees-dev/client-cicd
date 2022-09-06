import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
