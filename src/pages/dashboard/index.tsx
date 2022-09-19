import React, { ReactElement } from 'react';
import { NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const Dashboard: NextPageWithLayout = () => {
  return (
    <div>
      Dashboard
      <h1>CIDD</h1>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
